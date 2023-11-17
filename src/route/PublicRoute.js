import express from 'express'
import { loginAdminControllers } from '../controllers/AdminControllers.js'
import { loginUserControllers } from '../controllers/UsersControllers.js'

export const publicRoute = express.Router()

publicRoute.post('/api/admin/login', loginAdminControllers)
publicRoute.post('/api/users/login', loginUserControllers)