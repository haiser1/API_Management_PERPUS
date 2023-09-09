import Joi from "joi"

export const addAddressAdminValidate = Joi.object({
    street: Joi.string().max(100).required(),
    city: Joi.string().max(100).required(),
    postal_code: Joi.number().max(999999999999).required()
})