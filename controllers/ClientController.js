const { getClientToken } = require('../services/dataService')

const login = async (req, res) => {
    const body = req.body;
    if(body.user !== undefined && body.password !== undefined){
        const reqBody = { user: body.user, password: body.password }
        const response = await getClientToken({req, body: reqBody})
        if (!response) return res.status(500).send()
        if(response.status === 401) return res.status(response.status).send({ message: "Wrong user or password"})
        return res.status(response.status).send({ token: response.body.token })
    }else{
        return res.status(400).send({ message: "User and password required"})
    }
}

module.exports = { login }
