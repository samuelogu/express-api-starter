const express = require('express')
const app = express();

// connect to mongodb and redis
require('./connectors/redis')
require('./connectors/mongodb')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const multer = require('multer')
const cors = require('cors')

require('dotenv').config()

// configure app to use bodyParser() and multer()s
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(multer().array())

//We want to access the api from on another domain
app.use(cors());

const port = process.env.PORT || 3000;

app.use(morgan('dev'))

// INCLUDE API ROUTES
// =============================================================================
const routes = require('./routes')

//  Connect all our routes to our application
app.use('/', routes)

// START THE SERVER
// =============================================================================
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
