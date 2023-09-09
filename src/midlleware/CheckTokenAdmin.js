import fs from 'fs'
import jwt from 'jsonwebtoken'

const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf-8')

export const checkTokenAdmin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) return res.status(401).json({message: 'Unauthorized'})

    const token = authorization.split(' ')[1]

    if (!token) return res.status(401).json({message: 'Unauthorized'})

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) return res.status(401).json({message: 'Token error'})

        req.adminId = decoded.adminId
        req.adminName = decoded.adminName
        req.role = decoded.role

        if (req.role !== 'admin') return res.status(403).json({message: 'Akses denied'})

        next()
    })
}