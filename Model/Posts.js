const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        default: "public"
    },
    text: {
        type: String,
        default: ""
    },
    react: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0
    },
    comment: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        required: true
    },
})

const Posts = new mongoose.model('Post', postSchema)

module.exports = Posts