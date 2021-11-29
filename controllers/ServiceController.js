const { getServicesCatalogue } = require('../services/dataService')

const getServices = async (req, res) => {
    const response = await getServicesCatalogue({req})
    if (!response) return res.status(500).send()
    if(response.status === 401) return res.status(response.status).send({ message: "Authentication error"})
    return res.status(response.status).send({ services: response.body.services })
}

module.exports = { getServices }