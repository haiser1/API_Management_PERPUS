import { addAdminAddressService, getAdminAddress } from "../service/AdminAddressService.js"


export const addAdminAddressControllers = async (req, res, next) => {
    try {
        const data = await addAdminAddressService(req.body, req.adminId)

        res.status(201).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const getAdminAddressControllers = async (req, res, next) => {
    try {
        const data = await getAdminAddress(req.adminId)

        res.status(200).json({data: data})
        
    } catch (error) {
        next(error)
    }
}