const { subscribe, unsubscribe } = require('../services/newsFeedSubscriberService')

const newSubscription = async (req, res) => {
    const body = req.body;
    if(body.email !== undefined){
        const reqBody = { email: body.email }
        const response = await subscribe({req, body: reqBody})
        if (!response) return res.status(500).send()
        return res.status(response.status).send({ message: response.body.message })
    }else{
        return res.status(400).send({ message: "Email required"})
    }
}

const deleteSubscription = async (req, res) => {
    const params = req.params
    if(params.email !== undefined){
        const reqParams = { email: params.email }
        const response = await unsubscribe({req, params: reqParams})
        if (!response) return res.status(500).send()
        return res.status(response.status).send({ message: response.body.message })
    }
}

module.exports = { newSubscription, deleteSubscription }