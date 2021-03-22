const mongoose = require("mongoose")

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("User", schema)
