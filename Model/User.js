const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    friendList: {
        type: Array,
        default: []
    },
    lastChat: {
        type: Object,
        default: {}
    },
    active: {
        type: Boolean,
        default: false
    },
    photoURL: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
    },
    info: {
        type: String,
        default: ""
    },

    password: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
})

const Users = new mongoose.model('Users', userSchema)

module.exports = Users