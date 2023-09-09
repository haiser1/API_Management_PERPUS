import express from 'express'
import { loginAdminControllers } from '../controllers/AdminControllers.js'

export const publicRoute = express.Router()

publicRoute.post('/api/admin/login', loginAdminControllers)