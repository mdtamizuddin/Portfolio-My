const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sitelink: {
        type: String,
        required: true
    }
})

const Portfolio = new mongoose.model('Portfolio', schema)

module.exports = Portfolio