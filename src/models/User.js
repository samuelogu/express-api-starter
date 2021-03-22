const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
})

module.exports = mongoose.model("User", schema)
