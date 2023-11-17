import express from 'express'
import { checkTokenAdmin } from '../midlleware/CheckTokenAdmin.js'
import {
    changeUserPasswordControllers,
    getUserCurrentControllers,
    logoutUserControllers,
    registerUserControllers,
    searchUsersControllers,
    updateUserByAdminControllers,
    updateUserControllers,
} from '../controllers/UsersControllers.js'
import { checkTokenUsers } from '../midlleware/CheckTokenUsers.js'

export const usersRoute = express.Router()

usersRoute.post('/api/admin/users/register', checkTokenAdmin, registerUserControllers)
usersRoute.get('/api/users/current', checkTokenUsers, getUserCurrentControllers)
usersRoute.patch('/api/users/current', checkTokenUsers, updateUserControllers)
usersRoute.put('/api/users/change-password', checkTokenUsers, changeUserPasswordControllers)
usersRoute.patch('/api/admin/users/:id', checkTokenAdmin, updateUserByAdminControllers)
usersRoute.get('/api/admin/users', checkTokenAdmin, searchUsersControllers)
usersRoute.delete('/api/users/logout', logoutUserControllers)