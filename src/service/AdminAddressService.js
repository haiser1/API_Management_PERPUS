import { ResponseError } from "../error/ResponseError.js"
import Address from "../models/AdminAddress.Models.js"
import Admin from "../models/AdminModels.js"
import { addAddressAdminValidate } from "../validation/AdminAddressValidation.js"


export const addAdminAddressService = async (request, adminId) => {
    const result = await addAddressAdminValidate.validateAsync(request)

    const address = await Address.findOne({
        where: {
            id_admin: adminId
        }
    })

    if (address){
        throw new ResponseError(400, 'Your address aleready exist')
    }

    await Address.create({
        id_admin: adminId,
        street: result.street,
        city: result.city,
        postal_code: result.postal_code
    })

    return result
}

export const getAdminAddress = async (adminId) => {
    const admin = await Address.findOne({
        attributes: ['street', 'city', 'postal_code'],
        include: [{
            model: Admin,
            attributes: ['name', 'email']
        }],
        where: {
            id_admin: adminId
        }
    })

    if (!admin){
        throw new ResponseError(404, 'Data not found')
    }

    return admin


}