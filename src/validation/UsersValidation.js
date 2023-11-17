import Joi from "joi"

export const registerUserValidate = Joi.object({
    nim: Joi.string().max(15).required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().max(100).email().required(),
    class: Joi.string().max(100).required(),
    password: Joi.string().max(255).required(),
    confirm_password: Joi.string().max(255).valid(Joi.ref('password')).required()
})

export const loginUserValidate = Joi.object({
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(255).required()
})

export const updateUserValidate = Joi.object({
    name: Joi.string().max(100).optional()
})

export const changeUserPasswordValidate = Joi.object({
    password: Joi.string().max(255).required(),
    new_password: Joi.string().max(255).required(),
    confirm_password: Joi.string().max(255).valid(Joi.ref('new_password')).required()
})

export const searchUserValidate = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    nim: Joi.string().max(15).optional(),
    name: Joi.string().max(100).optional(),
    email: Joi.string().max(100).optional(),
    class: Joi.string().max(100).optional(),
})

export const updateUserByAdminValidate = Joi.object({
    id: Joi.number().max(99999999999).required(),
    nim: Joi.string().max(15).optional(),
    name: Joi.string().max(100).optional(),
    class: Joi.string().max(100).optional(),
})

