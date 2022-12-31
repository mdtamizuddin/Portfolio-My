const linearServer = require('../../server2')
const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const {  genarelpsBD } = linearServer()

router.get("/", async (req, res) => {
    const data = await genarelpsBD.find({}).toArray()
    res.send(data)
})

router.get("/:id", async (req, res) => {
    const data = await genarelpsBD.findOne({ _id: ObjectId(req.params.id) })
    res.send(data)
})

router.post('/post', async (req, res) => {
    const newData = req.body
    const result = await genarelpsBD.insertOne(newData)
    res.send(result)
})
router.put('/:id', async (req, res) => {
    const data = req.body
    const result = await genarelpsBD.updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
            pricing: data
        }
    }
    )
    res.send(result)
})
router.delete('/:id', async (req, res) => {
    const result = await genarelpsBD.deleteOne({ _id: ObjectId(req.params.id) })
    res.send(result)
})


module.exports = router