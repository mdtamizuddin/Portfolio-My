const linearServer = require('../../server2')
const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const { portfolio } = linearServer()

router.get("/", async (req, res) => {
    const data = await portfolio.find({}).toArray()
    res.send(data)
})

router.get("/:id", async (req, res) => {
    const data = await portfolio.findOne({ _id: ObjectId(req.params.id) })
    res.send(data)
})

router.post('/post', async (req, res) => {
    const newData = req.body
    const result = await portfolio.insertOne(newData)
    res.send(result)
})
router.put('/:id', async (req, res) => {
    const data = req.body
    const result = await portfolio.updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
            name: data.name,
            image: data.image,
            desc: data.desc
        }
    }
    )
    res.send(result)
})
router.delete('/:id', async (req, res) => {
    const result = await portfolio.deleteOne({ _id: ObjectId(req.params.id) })
    res.send(result)
})


module.exports = router