import { Op } from "sequelize"
import { ResponseError } from "../error/ResponseError.js"
import Admin from "../models/AdminModels.js"
import Books from "../models/BooksModels.js"
import { addBookValidate, deleteBookValidate, getBookByIdValidate, searchBooksValidate, updateBookValidate } from "../validation/BooksValidation.js"
import Category from "../models/CategoryModels.js"


export const addBookService = async (request, adminId) => {
    const result = await addBookValidate.validateAsync(request)

    const category = await Category.findOne({
        where: {
            name: result.category
        }
    })

    if (!category){
        throw new ResponseError(404, 'Category not found')
    }

    const [book, created] = await Books.findOrCreate({
        where: {
            title: result.title
        },
        defaults: {
            title: result.title,
            author: result.author,
            publisher: result.publisher,
            publication_year: result.publication_year,
            stock: result.stock,
            id_admin: adminId,
            id_category: category.id,
            name_category: result.category
        }
    })

    if (!created){
        throw new ResponseError(400, 'Title book already exist')
    }
    return {
        id: book.id,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publication_year: book.publication_year,
        stock: book.stock,
        category: book.name_category
    }
}

export const getBookById = async (params) => {
    const result = await getBookByIdValidate.validateAsync(params)
    const book = await Books.findByPk(
        result.id,
            {
                attributes: [
                    'id', 
                    'title', 
                    'author', 
                    'publisher', 
                    'publication_year', 
                    'stock', 
                    ['name_category', 'category']],
                include: [{
                    model: Admin,
                    attributes: ['name']
                }]
            }
    )

    if (!book){
        throw new ResponseError(404, 'Book not found')
    }

    return book
}

export const updateBookService = async (request) => {
    const result = await updateBookValidate.validateAsync(request)

    const book = await Books.findOne({
        where: {
            id: result.id
        }
    })

    if (!book) {
        throw new ResponseError(404, 'Book not found')
    }

    if (result.title === book.title) {
        throw new ResponseError(400, 'Title already exists')
    }

    // Periksa apakah ada perubahan dalam kategori
    let category = book.name_category;
    console.log(result.category)
    if (result.category && result.category !== book.name_category) {
        category = await Category.findOne({
            where: {
                name: result.category
            }
        })

        if (!category) {
            throw new ResponseError(404, 'Category not found')
        }
    }

    // Persiapan objek pembaruan hanya dengan atribut yang berubah
    const updateData = {
        title: result.title,
        author: result.author,
        publisher: result.publisher,
        publication_year: result.publication_year,
        stock: result.stock,
        name_category: result.category
    };

    // Jika kategori berubah
    if (category) {
        updateData.id_category = category.id;
    }

    await Books.update(updateData, {
        where: {
            id: result.id
        }
    })

    return result
}


export const serachBooksService = async (request) => {
    const result = await searchBooksValidate.validateAsync(request)
    const filters = []

    if (result.title){
        filters.push({title: {[Op.like]: `%${result.title}%`}})
    }

    if (result.author){
        filters.push({author: {[Op.like]: `%${result.author}%`}})
    }

    if (result.publisher){
        filters.push({publisher: {[Op.like]: `%${result.publisher}%`}})
    }

    if (result.publication_year){
        filters.push({publication_year: {[Op.like]: `%${result.publication_year}%`}})
    }

    if (result.stock){
        filters.push({stock: {[Op.like]: `%${result.stock}%`}})
    }

    if (result.category){
        filters.push({name_category: {[Op.like]: `%${result.category}%`}})
    }

    const { rows, count } = await Books.findAndCountAll({
        attributes: [
            'id',
            'title',
            'author', 
            'publisher', 
            'publication_year', 
            'stock', 
            ['name_category', 'category']
        ],
        include: [{
            model: Admin,
            attributes: ['name']
        }],
        where: {
            [Op.and]: filters
        },
        limit: result.size,
        offset: (result.page - 1) * result.size
    })

    const total_page = Math.ceil(count / result.size)

    return {
        data: rows,
        paging: {
            page: result.page,
            total_page: total_page,
            total_item: count
        }
    }
}

export const deleteBookService = async (params) => {
    const result = await deleteBookValidate.validateAsync(params)

    const book = await Books.findOne({
        where: {
            id: result.id
        }
    })

    if (!book){
        throw new ResponseError(404, 'Book not found')
    }

    await Books.destroy({
        where: {
            id: result.id
        }
    })
}

