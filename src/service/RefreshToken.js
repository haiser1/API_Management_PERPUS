import { ResponseError } from "../error/ResponseError.js"
import Admin from "../models/AdminModels.js"
import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf-8')
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf-8')

export const refreshTokenAdmin = async (token) => {
    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    const refreshToken = await Admin.findOne({
        where: {
            refreshToken: token
        }
    })

    if (!refreshToken){
        throw new ResponseError(401, 'Unauthorized')
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) reject(new ResponseError(401, 'Token error'))

            const {adminId, adminName, role} = decoded
            const accessToken = jwt.sign({adminId, adminName, role},privateKey, {
                expiresIn: '5m',
                algorithm: 'RS256'
            })
            resolve(accessToken)
        })
    })

}