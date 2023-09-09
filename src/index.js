import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import db from './config/Database.js'
import { adminRoute } from './route/AdminRoute.js'
import { errorHandling, urlNotfound } from './midlleware/ErrorHandling.js'
import { publicRoute } from './route/PublicRoute.js'
import { refreshTokenRoute } from './route/RefreshTokenRoute.js'
import { adminAddressRoute } from './route/AdminAddressRoute.js'

const app = express()


try {
    await db.authenticate()
    // await Books.sync()
    console.log('Success connect to database')
} catch (error) {
    console.error(`Failed connect to database, Error: ${error}`)
}

app.use(express.json())
app.use(cookieParser())
app.use(adminRoute)
app.use(publicRoute)
app.use(refreshTokenRoute)
app.use(adminAddressRoute)

app.use(errorHandling)
app.use(urlNotfound)


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server run on port: ${port}`)
})