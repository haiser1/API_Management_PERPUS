import express from 'express'
import { checkTokenAdmin } from '../midlleware/CheckTokenAdmin.js'
import {
    addPeminjamanControllers,
    searchPeminjamanControllers,
} from '../controllers/PeminjamanControllers.js'


export const peminajamRoute = express.Router()

peminajamRoute.post('/api/admin/peminjaman', checkTokenAdmin, addPeminjamanControllers)
peminajamRoute.get('/api/admin/peminjaman', checkTokenAdmin, searchPeminjamanControllers)