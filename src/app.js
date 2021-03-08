const express = require('express')
const app = express();
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
const database_url = process.env.DATABASE_URL || 'mongodb://localhost:27017/my_database';

// INCLUDE API ROUTES
// =============================================================================
const routes = require('./routes')

//  Connect all our routes to our application
app.use('/', routes)

// START THE SERVER WITH MONGODB
// =============================================================================
mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        app.listen(port, () => {
            console.log(`Express app running on http://localhost:${port}`)
        })
    }).catch(error => {
    console.error(error)
})
