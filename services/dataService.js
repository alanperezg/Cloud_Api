const fetch = require('node-fetch');
const { logError } = require('../utils/logger')

const getHeaders = ({req, isPost}) => {
    const headers = {}
    if(req.headers.token) headers.token = req.headers.token
    if(isPost) headers['Content-Type'] = 'application/json'
    return headers
}

const validateAndCreateResponse = async ({res}) => {
    if(res.status >= 200 && res.status < 300 || res.status == 401 ){
        try {
            const textBody = await res.text()
            const jsonBody = JSON.parse(textBody)
            return { body: jsonBody, status: res.status }
        } catch(err) {
            return { status: res.status }
        }
    }
    throw new Error(JSON.stringify({ responseStatus: res.status }))
    
}

const getClientToken = async ({req, body}) => {
    try{
        const reqBody = { user: body.user, password: body.password }
        const res = await fetch(`${process.env.DATA_SERVICE_ENDPOINT}client/token`,{
            method: 'POST',
            headers: getHeaders({req, isPost: true}),
            body: JSON.stringify(reqBody)
        })
        return await validateAndCreateResponse({res})
    }catch(e){
        logError(e)
        return null
    }
}

const getProviderToken = async ({req, body}) => {
    try{
        const reqBody = { user: body.user, password: body.password }
        const res = await fetch(`${process.env.DATA_SERVICE_ENDPOINT}provider/token`,{
            method: 'POST',
            headers: getHeaders({req, isPost: true}),
            body: JSON.stringify(reqBody)
        })
        return await validateAndCreateResponse({res})
    }catch(e){
        logError(e)
        return null
    }
}

const getServicesCatalogue = async ({req}) => {
    try{
        const res = await fetch(`${process.env.DATA_SERVICE_ENDPOINT}services`,{
            headers: getHeaders({req}),
        })
        return await validateAndCreateResponse({res})
    }catch(e){
        logError(e)
        return null
    }
}

module.exports = { getClientToken, getProviderToken, getServicesCatalogue }