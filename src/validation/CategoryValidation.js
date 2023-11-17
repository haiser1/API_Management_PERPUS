import Joi from "joi"

export const addCategoryValidate = Joi.object({
    name: Joi.string().max(100).required()
})

export const getCategoryByIdValidate = Joi.object({
    id: Joi.number().max(99999999999).required()
})

export const updateCategoryValidate = Joi.object({
    id: Joi.number().max(99999999999).required(),
    name: Joi.string().max(100).optional()
})

export const searchCategoryValidate = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional()
})