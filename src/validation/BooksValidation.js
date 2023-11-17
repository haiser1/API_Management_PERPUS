import Joi from "joi"

export const addBookValidate = Joi.object({
    title: Joi.string().max(100).required(),
    author: Joi.string().max(100).required(),
    publisher: Joi.string().max(100).required(),
    publication_year: Joi.number().max(99999999999).required(),
    stock: Joi.number().max(99999999999).required(),
    category: Joi.string().max(100).required()
})

export const getBookByIdValidate = Joi.object({
    id: Joi.number().max(999999).required()
})

export const updateBookValidate = Joi.object({
    id: Joi.number().max(999999).required(),
    title: Joi.string().max(100).optional(),
    author: Joi.string().max(100).optional(),
    publisher: Joi.string().max(100).optional(),
    publication_year: Joi.number().max(99999999999).optional(),
    stock: Joi.number().max(99999999999).optional(),
    category: Joi.string().max(100).optional()
})

export const searchBooksValidate = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    title: Joi.string().max(100).optional(),
    author: Joi.string().max(100).optional(),
    publisher: Joi.string().max(100).optional(),
    publication_year: Joi.number().max(99999999999).optional(),
    stock: Joi.number().max(99999999999).optional(),
    category: Joi.string().max(100).optional()
})

export const deleteBookValidate = Joi.object({
    id: Joi.number().max(999999).required()
})