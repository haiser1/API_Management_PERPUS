import { addBookService, deleteBookService, getBookById, serachBooksService, updateBookService } from "../service/BooksService.js"


export const addBookControllers = async (req, res, next) => {
    try {
        const data = await addBookService(req.body, req.adminId)

        res.status(201).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const getBookByIdControllers = async (req, res, next) => {
    try {
        const data = await getBookById(req.params)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const updateBookControllers = async (req, res, next) => {
    try {
        const request = {
            id: req.params.id,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            publication_year: req.body.publication_year,
            stock: req.body.stock,
            category: req.body.category
        }
        const data = await updateBookService(request)

        res.status(200).json({data: data})
    } catch (error) {
        next(error)
    }
}

export const searchBooksControllers = async (req, res, next) => {
    try {
        const request = {
            page: req.query.page,
            size: req.query.size,
            title: req.query.title,
            author: req.query.author,
            publisher: req.query.publisher,
            publication_year: req.query.publication_year,
            stock: req.query.stock,
            category: req.query.category
        }
        const data = await serachBooksService(request)

        res.status(200).json({
            data: data.data,
            paging: data.paging
        })
    } catch (error) {
        next(error)
    }
}

export const deleteBookControllers = async (req, res, next) => {
    try {
        const data = await deleteBookService(req.params)

        res.status(200).json({data: 'Ok'})

    } catch (error) {
        next(error)
    }
}