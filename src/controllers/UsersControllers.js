import {
    changeUserPasswordService,
    getUserCurrentService,
    loginUserService,
    logoutUserService,
    registerUserService,
    searchUsersService,
    updateUserByAdminService,
    updateUserService,
} from "../service/UsersService.js"


export const registerUserControllers = async (req, res, next) => {
    try {
        const data = await registerUserService(req.body, req.adminId)

        res.status(201).json({data: data})
    } catch (error) {
        next(error)
    }
}

export const loginUserControllers = async (req, res, next) => {
    try {
        const data = await loginUserService(req.body)

        res.cookie('refreshTokenUser', data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 * 12
        })
        res.status(200).json({data: data.accessToken})
    } catch (error) {
        next(error)
    }
}

export const getUserCurrentControllers = async (req, res, next) => {
    try {
        const data = await getUserCurrentService(req.userId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const updateUserControllers = async (req, res, next) => {
    try {
        const data = await updateUserService(req.body, req.userId)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const changeUserPasswordControllers = async (req, res, next) => {
    try {
        await changeUserPasswordService(req.body, req.userId)

        res.status(201).json({data: 'Ok'})
        
    } catch (error) {
        next(error)
    }
}

export const updateUserByAdminControllers = async (req, res, next) => {
    try {
        const request = {
            id: req.params.id,
            nim: req.body.nim,
            name: req.body.name,
            class: req.body.class
        }
        const data = await updateUserByAdminService(request)

        res.status(200).json({data: data})

    } catch (error) {
        next(error)
    }
}

export const searchUsersControllers = async (req, res, next) => {
    try {
        const request = {
            nim: req.query.nim,
            name: req.query.name,
            email: req.query.email,
            class: req.query.class,
            page: req.query.page,
            size: req.query.size
        }
        const data = await searchUsersService(request)

        res.status(200).json({
            data: data.data,
            paging: data.paging
        })

    } catch (error) {
        next(error)
    }
}

export const logoutUserControllers = async (req, res, next) => {
    try {
        await logoutUserService(req.cookies.refreshTokenUser)

        res.clearCookie('refreshTokenUser')
        res.status(200).json({data: 'Ok'})

    } catch (error) {
        next(error)
    }
}