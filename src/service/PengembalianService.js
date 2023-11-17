import Books from "../models/BooksModels.js"
import Peminjaman from "../models/PeminjamanBooksModels.js"
import Users from "../models/UserModels.js"
import { ResponseError } from '../error/ResponseError.js'
import { addPengembalianValidate, searchPengembalianValidate } from "../validation/PengembalianValidation.js"
import db from "../config/Database.js"
import Pengembalian from "../models/PengembalianBooksModels.js"
import { Op } from "sequelize"


export const addPengembalianService = async (request, adminId, adminName) => {
    const result = await addPengembalianValidate.validateAsync(request)
    const user = await Users.findOne({
        where: {
            nim: result.nim
        },
        attributes: ['id', 'nim', 'name']
    })

    if (!user){
        throw new ResponseError(404, 'Nim user not found')
    }

    const book = await Books.findOne({
        where: {
            title: result.title_book
        }, 
        attributes: ['id', 'title', 'name_category']
    })

    if (!book){
        throw new ResponseError(404, 'Book not found')
    }

    const pinjam = await Peminjaman.findOne({
        where: {
            nim_peminjam: result.nim,
            title_book: result.title_book,
            status: true
        },
        attributes: ['deadline_pinjam', 'qty', 'id']
    })

    if (!pinjam){
        throw new ResponseError(404, 'The book you wanted to return was not found')
    }
    
    if (result.qty !== pinjam.qty){
        throw new ResponseError(400, `Quantity books returned not same with borrow`)
    }

    const bookReturn = new Date()
    const deadline = new Date(pinjam.deadline_pinjam)

    // Hitung selisih hari antara tanggal pengembalian dan deadline pinjam
    const diffInDays = Math.floor((bookReturn - deadline) / (1000 * 60 * 60 * 24))
    
    // Jika pengembalian terlambat
    let denda = 0;
    if (diffInDays > 0) {
        denda = diffInDays * 1000; // Denda 1000 per hari
    }

    const t = await db.transaction()
    try {
        await Books.update({
            stock: book.stock + result.qty
        }, {
            where: {
                id: book.id
            }
        }, {transaction: t})

        await Peminjaman.update({
            status: false
        }, {
            where: {
                id: pinjam.id
            }
        }, {transaction: t})

        await Pengembalian.create({
            id_user: user.id,
            id_book: book.id,
            id_admin: adminId,
            nim_peminjam: result.nim,
            name_peminjam: user.name,
            title_book: result.title_book,
            category: book.name_category,
            name_admin: adminName,
            qty: result.qty,
            denda: denda
        }, {transaction: t})

        await t.commit()
        return result

    } catch (error) {
        await t.rollback()
        console.log(`Error: ${error}`)
        throw new ResponseError(500, `Internal server error, ${error}` )
    }
}

export const searchPengembalianService = async (request) => {
    const result = await searchPengembalianValidate.validateAsync()
    const filters = []

    if (result.title_book){
        filters.push({title_book: {[Op.like]: `%${result.title_book}%`}})
    }

    const {rows, count} = Pengembalian.findAndCountAll({
        attributes: ['nim_peminjam', 'name_peminjam', 'title_book', 'category', 'name_admin', 'qty', 'createdAt', 'denda'],
        where: {
            [Op.and]: filters
        },
        limit: result.size,
        offset: (result.page - 1) * result.size
    })

}