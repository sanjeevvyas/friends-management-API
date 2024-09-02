import express from 'express'
import friendsController from '../../controller/friendsController.js'
import auth from '../../config/auth.js'

const Router = express.Router()
const friendsRouter = ()=>{
    Router.get('/list',auth.tokenVerified,friendsController.friendsList)
    return Router

}

export default friendsRouter
