import requestService from '../service/requestService.js'

const requestController = {
    sendRequest: async (req, res) => {
        try {
            let response = await requestService.sendRequest(req)
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },
    updateRequestStatus: async (req, res) => {
        try {
            let response = await requestService.updateRequestStatus(req)
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },

}

export default requestController