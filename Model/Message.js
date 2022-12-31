const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    sender: {
        type: Object,
        required: true,
    },
    receiver: {
        type: Object,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    emoji: {
        type: String,
        default: ""
    },
    sticker: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },

    date: {
        type: String,
        default: ""
    },
})

const Message = new mongoose.model('Message', messageSchema)

module.exports = Message