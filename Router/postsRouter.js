const express = require('express')
const encrypter = require('../encripter')
const Posts = require('../Model/Posts')
const router = express.Router()
const verifyJWT = require('../verifyJWT')



router.get('/', (req, res) => {
    Posts.find({}, (err, data) => {
        const posts = data.reverse()
        if (data) {
            res.send({ counter: data.length, posts: posts })
        }
        else {
            res.send(err)
        }
    })
})
router.get('/all/:email', (req, res) => {
    Posts.find({ email: req.params.email }, (err, data) => {
        const posts = data.reverse()
        if (data) {
            res.send({ counter: data.length, posts: posts })
        }
        else {
            res.send(err)
        }
    })
})
router.get('/', (req, res) => {
    Posts.find({}, (err, data) => {
        const posts = data.reverse()
        if (data) {
            res.send({ counter: data.length, posts: posts })
        }
        else {
            res.send(err)
        }
    })
})

router.get('/:id', (req, res) => {
    Posts.findOne({ _id: req.params.id }, (err, data) => {
        if (data) {
            res.send({ counter: data.length, data })
        }
        else {
            res.send(err)
        }
    })
})

router.put('/like', (req, res) => {
    const { postId, user, react, name } = req.body
    Posts.findOne({ _id: postId }, (err, result) => {
        if (result) {
            const isExist = result.react.filter(r => r.email === user)
            if (isExist.length > 0) {
                const removeYou = result.react.filter(r => r.email !== user)
                Posts.updateOne({ _id: postId }, {
                    $set: {
                        react: removeYou
                    }
                }, (err, data) => {
                    if (err) {
                        res.status(500).send({ success: false, err })
                    }
                    else {
                        res.send({ success: true, data })
                    }
                })
            }
            else {
                Posts.updateOne({ _id: postId }, {
                    $set: {
                        react: [...result.react, { email: user, react: react, name }]
                    }
                }, (err, data) => {
                    if (err) {
                        res.status(500).send({ success: false, err })
                    }
                    else {
                        res.send({ success: true, data })
                    }
                })
            }
        }
        else {
            res.status(500).send({ success: false, err })
        }
    })
})

router.post('/', (req, res) => {
    const newPost = new Posts(req.body)

    newPost.save((err, data) => {
        if (err) {
            res.send({ success: false, err })
        }
        else {
            res.send({ success: true, data })
        }
    })
})

router.delete('/:id', (req, res) => {
    const email = req.headers.email

    Posts.findOne({ _id: req.params.id }, (err, data) => {
        if (data) {
            if (data.email === email) {
                Posts.deleteOne({ _id: req.params.id }, (err, data) => {
                    if (data) {
                        res.send({ success: false, err })
                    }
                    else {
                        res.status(500).send({ success: true, data })
                    }
                })
            }
            else {
                res.status(500).send({ success: false })
            }
        }
        else {
            res.status(500).send({ success: false, err })
        }
    })
})

module.exports = router