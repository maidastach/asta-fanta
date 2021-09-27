import express from 'express'
import asyncHandler from 'express-async-handler'
import { login, registerAdmin, registerUser, forgotPassword, isLogged, logout } from '../controllers/AuthControllers';

const AuthRouter = express.Router()

//api/auth

AuthRouter.post('/login', asyncHandler(login))

AuthRouter.post('/register-admin', asyncHandler(registerAdmin))

AuthRouter.post('/register-user', asyncHandler(registerUser))

AuthRouter.post('/forgotpassword', asyncHandler(forgotPassword))

AuthRouter.get('/islogged', asyncHandler(isLogged))

AuthRouter.get('/logout', asyncHandler(logout))

export default AuthRouter;