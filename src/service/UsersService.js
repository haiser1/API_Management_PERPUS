import { ResponseError } from "../error/ResponseError.js"
import Users from "../models/UserModels.js"
import {
    changeUserPasswordValidate, 
    loginUserValidate, 
    registerUserValidate, 
    searchUserValidate, 
    updateUserByAdminValidate, 
    updateUserValidate 
} from "../validation/UsersValidation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs/promises'
import { Op } from "sequelize"
import Admin from "../models/AdminModels.js"

const privateKey = await fs.readFile(process.env.PRIVATE_KEY_PATH, 'utf-8')
const publicKey = await fs.readFile(process.env.PUBLIC_KEY_PATH, 'utf-8')

export const registerUserService = async (request, adminId) => {
    const result = await registerUserValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            [Op.or]: [
                {email: result.email},
                {nim: result.nim}
            ]
        }
    })

    if (user){
        if (user.email === result.email){
            throw new ResponseError(400, 'Email already registered')
        } else {
            throw new ResponseError(400, 'Nim already registered')
        }
        
    }

    const hashPassword = await bcrypt.hash(result.password, 10)
    await Users.create({
        nim: result.nim,
        name: result.name,
        email: result.email,
        class: result.class,
        password: hashPassword,
        id_admin: adminId       
    })

    return {
        nim: result.nim,
        name: result.name,
        email: result.email,
        class: result.class
    }
}

export const loginUserService = async (request) => {
    const result = await loginUserValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            email: result.email
        }
    })

    if (!user){
        throw new ResponseError(400, 'Email or password wrong')
    }

    const match = await bcrypt.compare(result.password, user.password)

    if (!match){
        throw new ResponseError(400, 'Email or password wrong')
    }

    const {id, name, role} = user
    const accessToken = jwt.sign({id, name, role}, privateKey, {
        expiresIn: '60s',
        algorithm: 'RS256'
    })
    const refreshToken = jwt.sign({id, name, role}, privateKey, {
        expiresIn: '12h',
        algorithm: 'RS256'
    })

    await Users.update({
        refreshToken: refreshToken
    }, {
        where: {
            id: id
        }
    })

    return {accessToken, refreshToken}
}

export const getUserCurrentService = async (userId) => {
    const user = await Users.findOne({
        attributes: ['nim', 'name', 'email', 'class'],
        where: {
            id: userId
        }
    })

    if (!user){
        throw new ResponseError(404, 'Data not found')
    }

    return user

}

export const updateUserService = async (request, userId) => {
    const result = await updateUserValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            id: userId
        }
    })

    if (!user){
        throw new ResponseError(404, 'Data not found')
    }

    await Users.update({
        name: result.name
    }, {
        where: {
            id: userId
        }
    })

    return result
}

export const changeUserPasswordService = async (request, userId) => {
    const result = await changeUserPasswordValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            id: userId
        }
    })

    if (!user){
        throw new ResponseError(404, 'Data not found')
    }

    const match = await bcrypt.compare(result.password, user.password)

    if (!match){
        throw new ResponseError(400, 'Password wrong')
    }

    const hashPassword = await bcrypt.hash(result.new_password, 10)
    await Users.update({
        password: hashPassword
    }, {
        where: {
            id: userId
        }
    })
}

export const updateUserByAdminService = async (request) => {
    const result = await updateUserByAdminValidate.validateAsync(request)

    const user = await Users.findOne({
        where: {
            id: result.id
        }
    })

    if (!user){
        throw new ResponseError(404, 'Data not found')
    }

    await Users.update({
        nim: result.nim,
        name: result.name,
        class: result.class
    }, {
        where: {
            id: result.id
        }
    })

    return result
}

export const searchUsersService = async (request) => {
    const result = await searchUserValidate.validateAsync(request)
    const filters = []

    if (result.nim){
        filters.push({nim: {[Op.like]: `%${result.nim}%`}})
    }

    if (result.name){
        filters.push({name: {[Op.like]: `%${result.name}%`}})
    }

    if (result.email){
        filters.push({email: {[Op.like]: `%${result.email}%`}})
    }

    if (result.class){
        filters.push({class: {[Op.like]: `%${result.class}%`}})
    }
    const { rows, count } = await Users.findAndCountAll({
        attributes: ['nim', 'name', 'email', 'class'],
        include: [{
            model: Admin,
            attributes: ['name'],
        }],
        where: {
            [Op.and]: filters
        },
        limit: result.size,
        offset: (result.page - 1) * result.size
    })

    const total_page = Math.ceil(count / result.size)

    return {
        data: rows,
        paging: {
            page: result.page,
            total_page: total_page,
            total_item: count
        }
    }
}

export const logoutUserService = async (token) => {
    if (!token){
        throw new ResponseError(401, 'Unauthorized')
    }

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err){
            throw new ResponseError(401, 'Token error')
        }
        return
    })
}