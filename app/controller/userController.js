import userSevice from '../service/userService.js'

const userController = {
    userCreate: async (req, res) => {
        try {
            let response = await userSevice.userCreate(req)
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }

    },
    login: async (req, res) => {
        try {
            let response = await userSevice.login(req)
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }

    },
    changePassword: async (req, res) => {
        try {
            let response = await userSevice.changePassword(req)
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },
    updateProfile: async (req, res) => {
        try {
            let response = await userSevice.updateProfile(req)
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }

    },
    userList: async (req, res) => {
        try {
            let response = await userSevice.userList(req)
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    }
}

export default userController;