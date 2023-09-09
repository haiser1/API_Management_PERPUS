import { refreshTokenAdmin } from "../service/RefreshToken.js"

export const refreshTokenAdminControllers = async (req, res, next) => {
    try {
        const data = await refreshTokenAdmin(req.cookies.refreshTokenAdmin)

        res.status(200).json({token: data})
        
    } catch (error) {
        next(error)
    }
}