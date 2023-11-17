import { addPengembalianService } from "../service/PengembalianService.js"


export const addPengembalianControllers = async (req, res, next) => {
    try {
        const data = await addPengembalianService(req.body, req.adminId, req.adminName)

        res.status(201).json({data: data})

    } catch (error) {
        next(error)
    }
}