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

const subscribe = async ({req, body}) => {
    try{
        const reqBody = { email: body.email }
        const res = await fetch(`${process.env.NEWS_FEED_SUBSCRIBER_SERVICE_ENDPOINT}subscription`,{
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

const unsubscribe = async ({req, params}) => {
    try{
        const res = await fetch(`${process.env.NEWS_FEED_SUBSCRIBER_SERVICE_ENDPOINT}subscription/${params.email}`,{
            method: 'DELETE',
            headers: getHeaders({req})
        })
        return await validateAndCreateResponse({res})
    }catch(e){
        logError(e)
        return null
    }
}

module.exports = { subscribe, unsubscribe }