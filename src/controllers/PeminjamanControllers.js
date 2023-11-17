import { addPeminjamanService, searchPeminjamanService } from "../service/PeminjamanService.js"


export const addPeminjamanControllers = async (req, res, next) => {
    try {
        const data = await addPeminjamanService(req.body, req.adminId, req.adminName)

        res.status(201).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const searchPeminjamanControllers = async (req, res, next) => {
    try {
        const request = {
            page: req.query.page,
            size: req.query.size,
            nim: req.query.nim,
            title_book: req.query.title_book,
            name_admin: req.query.name_admin,
        }
        const data = await searchPeminjamanService(request)

        res.status(200).json({
            data: data.data,
            paging: data.paging
        })
        
    } catch (error) {
        next(error)
    }
}