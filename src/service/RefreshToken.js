import { ResponseError } from "../error/ResponseError.js"
import jwt from 'jsonwebtoken'
import fs from 'fs/promises'


const publicKey = await fs.readFile(process.env.PUBLIC_KEY_PATH, 'utf-8')
const privateKey = await fs.readFile(process.env.PRIVATE_KEY_PATH, 'utf-8')

export const refreshTokenAdmin = async (token) => {
    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) reject(new ResponseError(401, 'Token error'))

            const {id, name, role} = decoded
            const accessToken = jwt.sign({id, name, role},privateKey, {
                expiresIn: '30m',
                algorithm: 'RS256'
            })
            resolve(accessToken)
        })
    })

}

export const refreshTokenUsers = async (token) => {
    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) reject(new ResponseError(401, 'Token error'))

            const {id, name, role} = decoded
            const accessToken = jwt.sign({id, name, role},privateKey, {
                expiresIn: '5m',
                algorithm: 'RS256'
            })
            resolve(accessToken)
        })
    })

}