const mongoose = require('mongoose')

const database_url = process.env.MONGODB_URL || 'mongodb://localhost:27017/washjunkie';

mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => {
    console.error(error)
})

mongoose.connection.on('connected', () => {
    console.log('Client connected to mongo database');
})

mongoose.connection.on('error', (err) => {
    console.log(err.message);
})

mongoose.connection.on('disconnected', () => {
    console.log('Client disconnected from mongodb');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})