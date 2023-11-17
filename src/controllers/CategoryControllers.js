import { addCategoryService, getCategoryByIdService, searchCategoryService, updateCategoryService } from "../service/CategoryService.js"


export const addCategoryControllers = async (req, res, next) => {
    try {
        const data = await addCategoryService(req.body)

        res.status(201).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const getCategoryByIdControllers = async (req, res, next) => {
    try {
        const data = await getCategoryByIdService(req.params)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const updateCategoryControllers = async (req, res, next) => {
    try {
        const request = {
            id: req.params.id,
            name: req.body.name
        }
        const data = await updateCategoryService(request)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const searchCategoryControllers = async (req, res, next) => {
    try {
        const request = {
            name: req.query.name,
            page: req.query.page,
            size: req.query.size
        }
        const data = await searchCategoryService(request)

        res.status(200).json({
            data: data.data,
            paging: data.paging
        })
        
    } catch (error) {
        next(error)
    }
}