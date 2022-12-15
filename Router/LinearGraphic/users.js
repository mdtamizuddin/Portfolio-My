const linearServer = require('../../server2')
const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const { users } = linearServer()
const jwt = require('jsonwebtoken')
router.get("/", async (req, res) => {
    const data = await users.find({}).toArray()
    res.send(data)
})

router.get("/:email", async (req, res) => {
    const data = await users.findOne({ _id: ObjectId(req.params.id) })
    res.send(data)
})


router.put('/admin/:email', async (req, res) => {
    // const data = req.body
    const result = await users.updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
            role: "admin"
        }
    }
    )
    res.send(result)
})

router.put('/admin-r/:email', async (req, res) => {
    // const data = req.body
    const result = await users.updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
            role: "am-public"
        }
    }
    )
    res.send(result)
})

router.put('/:email', async (req, res) => {
    const data = req.body
    const email = req.params.email
    const user = await users.findOne({ email: req.params.email })
    if (user) {
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN)
        res.status(200).send({ message: "user Alrady Available", token: token })
    }
    else {
        const result = await users.insertOne(data)
        if (result) {
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN)
            res.status(200).json({ message: "New User Added", token: token })
        }
    }

})
router.delete('/:email', async (req, res) => {
    const result = await users.deleteOne({ email: ObjectId(req.params.email) })
    res.send(result)
})


module.exports = router