import express from 'express'
import userController from '../../controller/userController.js'
import auth from '../../config/auth.js'

const Router = express.Router()
const userRouter = () => {
    Router.post('/signup', userController.userCreate)
    Router.post('/login', userController.login)
    Router.patch('/change-password', auth.tokenVerified, userController.changePassword)
    Router.put('/update/:id', auth.tokenVerified, userController.updateProfile)
    Router.get('/list', auth.tokenVerified, userController.userList)
    return Router
}

export default userRouter