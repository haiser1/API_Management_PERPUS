import { Op } from "sequelize"
import { ResponseError } from "../error/ResponseError.js"
import Category from "../models/CategoryModels.js"
import { addCategoryValidate, getCategoryByIdValidate, searchCategoryValidate, updateCategoryValidate } from "../validation/CategoryValidation.js"
import db from "../config/Database.js"
import Books from "../models/BooksModels.js"

export const addCategoryService = async(request) => {
    const result = await addCategoryValidate.validateAsync(request)

    const [category, created] = await Category.findOrCreate({
        where: {
            name: result.name
        },
        defaults: {
            name: result.name
        }
    })

    if (!created){
        throw new ResponseError(400, 'Category already exist')
    }

    return {
        name: category.name
    }
}

export const getCategoryByIdService = async (params) => {
    const result = await getCategoryByIdValidate.validateAsync(params)
    const category = await Category.findOne({
        attributes: ['name'],
        where: {
            id: result.id
        }
    })

    if (!category){
        throw new ResponseError(404, 'Category not found')
    }

    return category
}

export const updateCategoryService = async (request) => {
    const result = await updateCategoryValidate.validateAsync(request)

    const category = await Category.findOne({
        where: {
            id: result.id
        }
    })

    if (!category){
        throw new ResponseError(404, 'Category not found')
    }

    const t = await db.transaction()

    try {
        await Category.update({
            name: result.name
        }, {
            where: {
                id: result.id
            }
        }, { transaction: t})

        await Books.update({
            name_category: result.name
        }, {
            where: {
                id_category: result.id
            }
        }, {transaction: t})

        await t.commit()
        return result
    } catch (error) {
        await t.rollback()
        throw new ResponseError(500, `Internal Server Error ${error}`)
    }

    
}

export const searchCategoryService = async (request) => {
    const result = await searchCategoryValidate.validateAsync(request)

    const {rows, count} = await Category.findAndCountAll({
        attributes: ['id', 'name'],
        where: [{
            name: {[Op.like]: `%${result.name}%`}
        }],
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