import express from 'express'
import { checkTokenAdmin } from '../midlleware/CheckTokenAdmin.js'
import {
    addCategoryControllers,
    getCategoryByIdControllers,
    searchCategoryControllers, 
    updateCategoryControllers
} from '../controllers/CategoryControllers.js'


export const categoryRoute = express.Router()

categoryRoute.post('/api/admin/category', checkTokenAdmin, addCategoryControllers)
categoryRoute.get('/api/admin/category/:id', checkTokenAdmin, getCategoryByIdControllers)
categoryRoute.patch('/api/admin/category/:id', checkTokenAdmin, updateCategoryControllers)
categoryRoute.get('/api/admin/category', checkTokenAdmin, searchCategoryControllers)