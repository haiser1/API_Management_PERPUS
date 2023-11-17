import Joi from "joi";


export const registerAdminValidate = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(255).required(),
    confirm_password: Joi.string().max(255).valid(Joi.ref('password')).required()
})

export const loginAdminValidate = Joi.object({
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(255).required()
})

export const updateAdminValidate = Joi.object({
    name: Joi.string().max(100).optional()
})

export const changeAdminPasswordValidate = Joi.object({
    password: Joi.string().max(255).required(),
    new_password: Joi.string().max(255).required(),
    confirm_password: Joi.string().max(255).valid(Joi.ref('new_password')).required()
})