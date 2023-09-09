import express from 'express'
import { refreshTokenAdminControllers } from '../controllers/RefreshTokenControllers.js'

export const refreshTokenRoute = express.Router()

refreshTokenRoute.get('/api/admin/refresh-token', refreshTokenAdminControllers)