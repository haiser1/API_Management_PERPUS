import { Op } from "sequelize"
import db from "../config/Database.js"
import { ResponseError } from "../error/ResponseError.js"
import Books from "../models/BooksModels.js"
import Peminjaman from "../models/PeminjamanBooksModels.js"
import Users from "../models/UserModels.js"
import { addPeminjamanValidate, searchPeminjamanValidate } from "../validation/PeminjamanValiddation.js"
import moment from 'moment'


export const addPeminjamanService = async (request, adminId, adminName) => {
    const result = await addPeminjamanValidate.validateAsync(request)
    const user = await Users.findOne({
        where: {
            nim: result.nim
        },
        attributes: ['id', 'name', 'nim']
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
            nim_peminjam: user.nim,
            title_book: book.title,
            status: true
        }
    })
    // cek apakah user meminjam buku yang belum user kembalikan
    if (pinjam){
        throw new ResponseError(400, 'The user has not returned the book')
    }

    // cek apakah request qty lebih besar dari stock buku
    if (result.qty > book.stock){
        throw new ResponseError(400, 'Stock not available')
    }

    // default deadline pinjam 7 hari
    const today = new Date()
    const sevenDaysLater = new Date(today)
    sevenDaysLater.setDate(today.getDate() + 7)
    const t = await db.transaction()
    try {
        await Books.update({
            stock: book.stock - result.qty
        }, {
            where: {
                id: book.id
            }
        }, {transaction: t})

        await Peminjaman.create({
            id_user: user.id,
            id_book: book.id,
            id_admin: adminId,
            nim_peminjam: result.nim,
            name_peminjam: user.name,
            title_book: result.title_book,
            category: book.name_category,
            name_admin: adminName,
            qty: result.qty,
            deadline_pinjam: sevenDaysLater
        }, {transaction: t})

        await t.commit()
        return result
    } catch (error) {
        await t.rollback()
        console.log(`Error: ${error}`)
        throw new ResponseError(500, `Internal server error, ${error}` )
    }
} 

export const searchPeminjamanService = async (request) => {
    const result = await searchPeminjamanValidate.validateAsync(request)
    const filters = []

    // const isoDate = `${result.tgl_pinjam}T00:00:00.000Z`

    if (result.nim){
        filters.push({nim_peminjam: {[Op.like]: `%${result.nim}%`}})
    }

    if (result.title_book){
        filters.push({title_book: {[Op.like]: `%${result.title_book}%`}})
    }

    if (result.category){
        filters.push({category: {[Op.like]: `%${result.category}%`}})
    }

    if (result.name_admin){
        filters.push({name_admin: {[Op.like]: `%${result.name_admin}%`}})
    }


    const { rows, count } = await Peminjaman.findAndCountAll({
        attributes: ['nim_peminjam', 'name_peminjam', 'title_book', 'category', 'name_admin', 'qty', ['createdAt', 'tgl_pinjam'], 'deadline_pinjam'],
        where: {
            [Op.and]: filters,
            status: true
        },
        limit: result.size,
        offset: (result.page - 1) * result.size
    })
    const total_page = Math.ceil(count / result.size)
    console.log(rows[0].tgl_pinjam)

    return {
        data: rows,
        paging: {
            page: result.page,
            total_page: total_page,
            total_item: count
        }
    }
}