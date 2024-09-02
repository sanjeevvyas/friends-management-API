import userModel from '../model/userModel.js'
import jwt from "jsonwebtoken";
import bcrypt, { compare } from 'bcrypt';

const userService = {
    userCreate: async ({ body }) => {
        try {
            let payload = { ...body }
            const existUser = await userModel.findOne({ email: body.email })
            if (!existUser) {
                payload.password = await bcrypt.hash(payload.password, 8);
                let user = new userModel(payload)
                await user.save()
                return { status: 200, message: "success", data: { user } }
            } else {
                return { status: 200, message: "user already exist", data: {} }
            }
        } catch (error) {
            return { status: 400, message: error.message, data: {} }
        }

    },
    login: async ({ body }) => {
        try {
            let { email, password } = body
            const user = await userModel.findOne({ email: email })
            if (user && (await bcrypt.compare(password, user.password))) {
                let token = jwt.sign({ _id: user?._id, firstName: user?.firstName, email: user?.email, phone: user?.phone }, process.env.JWT_TOKEN);
                return { status: 200, message: "success", data: { token } }
            } else {
                return { status: 200, message: "user not exist", data: {} }
            }
        } catch (error) {
            return { status: 400, message: error.message, data: {} }
        }

    },
    changePassword: async ({ query }) => {
        try {
            let { userId, password } = query
            console.log(userId)
            const user = await userModel.findOne({ _id: userId })
            console.log(user)
            if (user) {
                user.password = await bcrypt.hash(password, 8)
                await user.save()
                return { status: 200, message: "changed password", data: {} }
            } else {
                return { status: 200, message: "user not exist", data: {} }
            }
        } catch (error) {
            return { status: 400, message: error.message, data: {} }
        }
    },
    updateProfile: async ({ body, params }) => {
        try {
            let { firstName, lastName, phone } = body
            let { id } = params
            const user = await userModel.findOne({ _id: id })
            if (user) {
                user.firstName = firstName
                user.lastName = lastName
                user.phone = phone
                await user.save()
                return { status: 200, message: "user updated", data: {} }
            } else {
                return { status: 200, message: "user not exist", data: {} }
            }
        } catch (error) {
            return { status: 400, message: error.message, data: {} }
        }
    },
    userList: async ({ query }) => {
        try {
            let { page, limit, search } = query;
            page = page ? parseInt(page) : ''
            limit = limit ? parseInt(limit) : ''
            let queryArgs = {}
            if (search) {
                queryArgs = {
                    "$or": [{ firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' }, },
                    { email: { $regex: search, $options: 'i' }, },]
                }
            }
            let userData = userModel.find(queryArgs).sort({ createdAt: -1 }).lean()
            let totalCount = await userModel.countDocuments(queryArgs).exec()

            if (page && limit) {
                userData = userData.skip((page - 1) * limit).limit(limit);
            }
            const data = await userData.exec();
            console.log(data)
            return { status: 200, message: "success", data: { totalCount, data } }
        } catch (error) {
            return { status: 400, message: error.message, data: {} }
        }
    }
}

export default userService