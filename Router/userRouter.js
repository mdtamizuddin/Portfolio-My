const express = require('express')
const encrypter = require('../encripter')
const Users = require('../Model/User')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyJWT = require('../verifyJWT')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('Hello Mother');

router.get('/', (req, res) => {
    const request = req.headers.sender

    Users.find({ email: { $nin: [request] } }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
})

router.get('/get/:email', (req, res) => {
    Users.findOne({ email: req.params.email }, (err, data) => {
        if (data) {
            res.send(data)
        }
        else if (data === null) {
            res.send({})
        }
        else {
            res.status(500).send(err)
        }
    })
})

router.post('/last-chat', (req, res) => {
    const friend = req.body.friend
    const user = req.body.user

    Users.findOne({ email: user }, (err, result) => {
        if (result) {
            Users.updateOne({ email: user }, {
                $set: {
                    lastChat: friend
                }
            }, (err, data) => {
                if (err) {
                    res.send({ success: false, message: "Something went wrong" })
                }
                else {
                    res.send({ success: true, data })
                }
            })
        }
    })
})
router.put('/add-friend', (req, res) => {
    const friend = req.body.email
    const user = req.body.user

    Users.findOne({ email: user }, (err, result) => {
        if (result) {
            const isExist = result.friendList.filter(u => u === friend)
            if (isExist.length === 0) {
                Users.updateOne({ email: user }, {
                    $set: {
                        friendList: [...result.friendList, friend]
                    }
                }, (err, data) => {
                    if (err) {
                        res.send({ success: false, message: "Something went wrong" })
                    }
                    else {
                        // Lest add you to your Friends Friend List
                        Users.findOne({ email: friend }, (err, data) => {
                            if (data) {
                                Users.updateOne({ email: friend }, {
                                    $set: {
                                        friendList: [...data.friendList, user]
                                    }
                                }, (err, data) => {
                                    if (err) {
                                        res.send({ success: false, message: "Something went wrong" })
                                    }
                                    else {
                                        res.send({ success: true, data })
                                    }
                                })
                            }
                            else {
                                res.send({ success: false, message: "Something went wrong" })
                            }
                        })



                    }
                })
            }
            else {
                res.send({ success: false, message: "User Is Alrady In Your Friendlist" })
            }

        }
    })
})

router.put('/login', (req, res) => {
    const body = req.body
    const password = encrypter(body.password, body.email)
    Users.findOne({ email: body.email }, (err, data) => {
        if (data) {
            if (data.password === password) {
                const email = cryptr.encrypt(body.email);
                token = jwt.sign({
                    you: email,
                    message: "Don't Try To Do this Again This Again"
                },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '1d' }
                )
                res.send({ token, message: "login success" })
            }
            else {
                console.log('Doesnt Matched')
                res.send({ message: "credentials does not match" })
            }

        }
        else {
            res.send({ message: "User not found" })
        }
    })
})



router.put('/new', (req, res) => {
    const body = req.body
    const password = encrypter(body.password, body.email)
    const newUser = new Users({ email: body.email, name: body.name, photoURL: body.photoURL, password, date: body.date })

    newUser.save((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send({ message: "User Inserted", data })
        }
    })
})




module.exports = router