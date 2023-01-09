const express = require('express')
const encrypter = require('../encripter')
const Message = require('../Model/Message')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyJWT = require('../verifyJWT')
const Cryptr = require('cryptr');


router.get('/', (req, res) => {
    Message.find({}, (err, data) => {
        if (data) {
            res.send({ counter: data.length, data })
        }
        else {
            res.send(err)
        }
    })
})

router.get('/message/:sender/:rechiver', (req, res) => {
    const sender = req.params.sender
    const rechiver = req.params.rechiver

    Message.find({ $or: [{ user: [`${sender}&${rechiver}`, `${rechiver}&${sender}`] }] }, (err, data) => {
        res.send(data)
    })
})

router.post('/message-in', (req, res) => {
    const newMessage = new Message(req.body)
    newMessage.save((err) => {
        if (err) {
            res.send({ success: false })
        }
        else {
            res.send({ success: true })
        }
    })
})


module.exports = router