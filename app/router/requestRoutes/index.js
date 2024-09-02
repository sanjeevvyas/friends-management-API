import express from 'express'
import requestController from '../../controller/requestController.js'
import auth from '../../config/auth.js'

const Router = express.Router()
const requestRouter = () => {
    Router.post('/send-request', auth.tokenVerified, requestController.sendRequest)
    Router.get('/change-requset-status', auth.tokenVerified, requestController.updateRequestStatus)
    return Router
}

export default requestRouter