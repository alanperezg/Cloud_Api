const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

const ClientController = require('./controllers/ClientController')
const ProviderController = require('./controllers/ProviderController')
const ServiceController = require('./controllers/ServiceController')
const NewsFeedSubscriberService = require('./controllers/NewsFeedSubscriptionController')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express();
app.use(cors());
app.use(bodyParser.json())

//Client Endpoints
app.post('/client/login', ClientController.login);

//Provider Endpoints
app.post('/provider/login', ProviderController.login);

//Services Enpoints
app.get('/services', ServiceController.getServices)

//News Feed Enpoints
app.post('/news-feed-subscription', NewsFeedSubscriberService.newSubscription)
app.delete('/news-feed-subscription/:email', NewsFeedSubscriberService.deleteSubscription)

app.listen(PORT, () => console.log(`App listening on ${PORT}`));