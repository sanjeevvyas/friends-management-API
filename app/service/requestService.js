import requestModel from "../model/requestModel.js";
import userModel from "../model/userModel.js"
import friendModel from '../model/friendsModel.js'

const requestService = {
    sendRequest: async ({ body }) => {
        try {
            let { senderId, reciverId } = body
            const sender = await userModel.findOne({ _id: senderId })
            const reciver = await userModel.findOne({ _id: reciverId })
            if (sender && reciver) {
                let request = await requestModel.findOne({ senderId: senderId, reciverId: reciverId })
                if (request) {
                    return { status: 200, message: "already send request", data: {} }
                } else {
                    request = await requestModel.create({ senderId, reciverId })
                    return { status: 200, message: "request sent", data: { request } }
                }
            } else {
                return { status: 200, message: "user not exist", data: {} }
            }
        } catch (error) {
            return { status: 400, message: error.message, data: {} }
        }
    },
    updateRequestStatus: async ({ query }) => {
        try {
            let { userId, friendId, status } = query
            const request = await requestModel.findOne({ senderId: userId, reciverId: friendId })
            if (request && request.status == 'pending') {
                if (status == 'accept') {
                    request.status = 'accept'
                    await request.save()
                    const friends = [
                        { userId: userId, friendId: friendId },
                        { userId: friendId, friendId: userId }
                    ];
                    await friendModel.insertMany(friends);
                    return { status: 200, message: "request accepted", data: {} }
                } else if (status == 'reject') {
                    await request.deleteOne()
                    return { status: 200, message: "request rejected", data: {} }
                }
            } else {
                return { status: 200, message: "request not exist", data: {} }
            }
        } catch (error) {
            return { status: 400, message: error.message, data: {} }
        }
    }
}

export default requestService; 