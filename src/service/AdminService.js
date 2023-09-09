import { ResponseError } from "../error/ResponseError.js"
import Admin from "../models/AdminModels.js"
import { loginAdminValidate, registerAdminValidate, updateAdminValidate } from "../validation/AdminValidation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf-8')

export const registerAdminService = async (request) => {
    const result = await registerAdminValidate.validateAsync(request)

    const admin = await Admin.findOne({
        where: {
            email: result.email
        }
    })

    if (admin){
        throw new ResponseError(400, 'Email already registered')
    }

    const hashPassword = await bcrypt.hash(result.password, 10)
    await Admin.create({
        name: result.name,
        email: result.email,
        password: hashPassword
    })

    return result

}

export const loginAdminService = async (request) => {
    const result = await loginAdminValidate.validateAsync(request)

    const admin = await Admin.findOne({
        where: {
            email: result.email
        }
    })

    if (!admin){
        throw new ResponseError(400, 'Email or password wrong')
    }

    const match = await bcrypt.compare(result.password, admin.password)

    if (!match){
        throw new ResponseError(400, 'Email or password wrong')
    }

    const adminId = admin.id
    const adminName = admin.name
    const role = admin.role
    const accessToken = jwt.sign({adminId, adminName, role}, privateKey, {
        expiresIn: '60s',
        algorithm: 'RS256'
    })
    const refreshToken = jwt.sign({adminId, adminName, role}, privateKey, {
        expiresIn: '12h',
        algorithm: 'RS256'
    })

    await Admin.update({
        refreshToken: refreshToken
    }, {
        where: {
            id: adminId
        }
    })

    return {accessToken, refreshToken}
}

export const getDataAdminService = async (adminId) => {
    const admin = await Admin.findOne({
        attributes: ['name', 'email'],
        where: {
            id: adminId
        }
    })

    if (!admin){
        throw new ResponseError(404, 'Data not found')
    }

    return admin

}

export const updateAdminService = async (request, adminId) => {
    const result = await updateAdminValidate.validateAsync(request)

    const admin = await Admin.findOne({
        where: {
            id: adminId
        }
    })

    if (!admin){
        throw new ResponseError(404, 'Data not found')
    }

    await Admin.update({
        name: result.name
    }, {
        where: {
            id: adminId
        }
    })

    return result
}

export const logoutAdminService = async (token) => {
    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    const admin = await Admin.findOne({
        where: {
            refreshToken: token
        }
    })

    if (!admin){
        throw new ResponseError(401, 'Unauthorized')
    }

    await Admin.update({
        refreshToken: null
    }, {
        where: {
            id: admin.id
        }
    })
}