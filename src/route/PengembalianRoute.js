import express from 'express'
import { checkTokenAdmin } from '../midlleware/CheckTokenAdmin.js'
import { addPengembalianControllers } from '../controllers/PengembalianControllers.js'


export const pengembalianRoute = express.Router()

pengembalianRoute.post('/api/admin/pengembalian', checkTokenAdmin, addPengembalianControllers)