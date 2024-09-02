import friendsModel from "../model/friendsModel.js";
import usersModel from "../model/userModel.js";

const friendsService = {
    friendsList: async ({ query }) => {
        try {
            let { page, limit, search, userId } = query
            page = page ? parseInt(page) : ''
            limit = limit ? parseInt(limit) : ''
            let friendIds = []
            const user = await usersModel.findOne({ _id: userId })
            if (user) {
                const friends = await friendsModel.find({ userId: userId }).lean()
                for (let i in friends) {
                    friendIds.push(friends[i].friendId)
                }
                if (search) {
                    var queryArgs = {
                        "$or": [{ firstName: { $regex: search, $options: 'i' } },
                        { lastName: { $regex: search, $options: 'i' }, },
                        { email: { $regex: search, $options: 'i' }, },]
                    }
                }
                const friendDetails = usersModel.find({ _id: { $in: friendIds }, queryArgs }, { password: 0 }).sort({ createdAt: -1 }).lean();
                const totalCount = await usersModel.countDocuments({ _id: { $in: friendIds }, queryArgs })
                if (page && limit) {
                    friendDetails = friendDetails.skip((page - 1) * limit).limit(limit);
                }
                let friendData = await friendDetails.exec();
                return { status: 200, message: "success", data: { totalCount, friendData } }
            } else {
                return { status: 200, message: "user not exist", data: {} }
            }
        } catch (error) {
            return { status: 400, message: error.message, data: {} }
        }
    }
}

export default friendsService
