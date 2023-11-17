import { refreshTokenAdmin, refreshTokenUsers } from "../service/RefreshToken.js"

export const refreshTokenAdminControllers = async (req, res, next) => {
    try {
        const data = await refreshTokenAdmin(req.cookies.refreshTokenAdmin)

        res.status(200).json({token: data})
        
    } catch (error) {
        next(error)
    }
}

export const refreshTokenUsersControllers = async (req, res, next) => {
    try {
        const data = await refreshTokenUsers(req.cookies.refreshTokenUser)

        res.status(200).json({token: data})
    } catch (error) {
        next(error)
    }
}