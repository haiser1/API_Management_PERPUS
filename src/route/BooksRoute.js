import express from 'express'
import { checkTokenAdmin } from '../midlleware/CheckTokenAdmin.js'
import {
    addBookControllers,
    deleteBookControllers,
    getBookByIdControllers,
    searchBooksControllers,
    updateBookControllers
} from '../controllers/BooksControllers.js'

export const booksRoute = express.Router()

booksRoute.post('/api/admin/books', checkTokenAdmin, addBookControllers)
booksRoute.get('/api/admin/books/:id', checkTokenAdmin, getBookByIdControllers)
booksRoute.patch('/api/admin/books/:id', checkTokenAdmin, updateBookControllers)
booksRoute.get('/api/admin/books', checkTokenAdmin, searchBooksControllers)
booksRoute.delete('/api/admin/books/:id', checkTokenAdmin, deleteBookControllers)