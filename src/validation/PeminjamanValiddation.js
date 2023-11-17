import Joi from "joi"

export const addPeminjamanValidate = Joi.object({
    nim: Joi.string().max(15).required(),
    title_book: Joi.string().max(100).required(),
    qty: Joi.number().max(99999999999).positive().required(),
})

export const searchPeminjamanValidate = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    title_book: Joi.string().max(100).optional(),
    nim: Joi.string().max(15).optional(),
    category: Joi.string().max(100).optional(),
    name_admin: Joi.string().max(100).optional(),
})