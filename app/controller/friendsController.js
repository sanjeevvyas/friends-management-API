import  friendsService from '../service/friendsService.js'

const friendsController = {
    friendsList:async(req,res)=>{
        try {
            let response = await friendsService.friendsList(req)
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    }
}

export default friendsController ;