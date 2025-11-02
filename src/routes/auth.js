import express from 'express'
import { login, register, verifyEmail } from '../controllers/authController.js'
const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.get('/verify-email', verifyEmail)
export default authRoute;