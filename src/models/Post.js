const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: String,
    body: String,
})

module.exports = mongoose.model("Post", schema)
