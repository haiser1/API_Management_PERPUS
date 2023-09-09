import { getDataAdminService, loginAdminService, logoutAdminService, registerAdminService, updateAdminService } from "../service/AdminService.js"


export const registerAdminControllers = async (req, res, next) => {
    try {
        const data = await registerAdminService(req.body)
        const {name, email} = data

        res.status(201).json({data: {name, email}})
    } catch (error) {
        next(error)
    }
}

export const loginAdminControllers = async (req, res, next) => {
    try {
        const data = await loginAdminService(req.body)

        res.cookie('refreshTokenAdmin', data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 * 12
        })
        res.status(200).json({token: data.accessToken})

    } catch (error) {
        next(error)
    }
}

export const getDataAdminController = async (req, res, next) => {
    try {
        const data = await getDataAdminService(req.adminId)

        res.status(200).json({data: data})
    
    } catch (error) {
        next(error)
    }
}

export const updateDaminControllers = async (req, res, next) => {
    try {
        const data = await updateAdminService(req.body, req.adminId)

        res.status(200).json({data: data})
        
    } catch (error) {
        next(error)
    }
}

export const logoutAdminControllers = async (req, res, next) => {
    try {
        await logoutAdminService(req.cookies.refreshTokenAdmin)

        res.clearCookie('refreshTokenAdmin')
        res.status(200).json({data: 'Ok'})

    } catch (error) {
        next(error)
    }
}
