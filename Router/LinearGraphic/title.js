const linearServer = require('../../server2')
const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const { titles } = linearServer()

router.get("/", async (req, res) => {
    const data = await titles.find({}).toArray()
    res.send(data)
})

router.get("/:id", async (req, res) => {
    const data = await titles.findOne({ _id: ObjectId(req.params.id) })
    res.send(data)
})

router.post('/post', async (req, res) => {
    const newData = req.body
    const result = await titles.insertOne(newData)
    res.send(result)
})
router.put('/:id', async (req, res) => {
    const data = req.body
    const result = await titles.updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
            title: req.body.title,
            desc: req.body.desc,
        }
    }
    )
    res.send(result)
})
router.delete('/:id', async (req, res) => {
    const result = await titles.deleteOne({ _id: ObjectId(req.params.id) })
    res.send(result)
})


module.exports = router