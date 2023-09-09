import express from 'express'
import {
    getDataAdminController,
    logoutAdminControllers,
    registerAdminControllers,
    updateDaminControllers
} from '../controllers/AdminControllers.js'
import { checkTokenAdmin } from '../midlleware/CheckTokenAdmin.js'

export const adminRoute = express.Router()

adminRoute.post('/api/admin/register', registerAdminControllers)
adminRoute.get('/api/admin/current', checkTokenAdmin, getDataAdminController)
adminRoute.patch('/api/admin/current', checkTokenAdmin, updateDaminControllers)
adminRoute.delete('/api/admin/logout', logoutAdminControllers)
