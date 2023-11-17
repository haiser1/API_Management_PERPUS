import express from 'express'
import { checkTokenAdmin } from '../midlleware/CheckTokenAdmin.js'
import {
    addAdminAddressControllers,
    getAdminAddressControllers,
    updateAdminAddressControllers
} from '../controllers/AdminAddressControllers.js'


export const adminAddressRoute = express.Router()

adminAddressRoute.post('/api/admin/address', checkTokenAdmin, addAdminAddressControllers)
adminAddressRoute.get('/api/admin/address/current', checkTokenAdmin, getAdminAddressControllers)
adminAddressRoute.patch('/api/admin/address/current', checkTokenAdmin, updateAdminAddressControllers)