import express from 'express'
import { refreshTokenAdminControllers, refreshTokenUsersControllers } from '../controllers/RefreshTokenControllers.js'

export const refreshTokenRoute = express.Router()

refreshTokenRoute.get('/api/admin/refresh-token', refreshTokenAdminControllers)
refreshTokenRoute.get('/api/users/refresh-token', refreshTokenUsersControllers)