const linearServer = require('../../server2')
const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const { genarelps } = linearServer()

router.get("/", async (req, res) => {
    const data = await genarelps.find({}).toArray()
    res.send(data)
})

router.get("/:id", async (req, res) => {
    const data = await genarelps.findOne({ _id: ObjectId(req.params.id) })
    res.send(data)
})

router.post('/post', async (req, res) => {
    const newData = req.body
    const result = await genarelps.insertOne(newData)
    res.send(result)
})
router.put('/:id', async (req, res) => {
    const data = req.body
    const result = await genarelps.updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
            pricing: data
        }
    }
    )
    res.send(result)
})
router.delete('/:id', async (req, res) => {
    const result = await genarelps.deleteOne({ _id: ObjectId(req.params.id) })
    res.send(result)
})


module.exports = router