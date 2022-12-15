const flashfiles = require('./main')
const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const { files } = flashfiles()

router.get("/", async (req, res) => {
    const data = await files.find({}).toArray()
    res.send(data)
})
router.get("/brand/:name", async (req, res) => {
    const data = await files.find({ brand: req.params.name }).toArray()
    res.send(data)
})
router.get("/:id", async (req, res) => {
    const data = await files.findOne({ _id: ObjectId(req.params.id) })
    res.send(data)
})

router.post('/post', async (req, res) => {
    const newData = req.body
    const result = await files.insertOne(newData)
    res.send(result)
})
router.put('/:id', async (req, res) => {
    const data = req.body
    const result = await files.updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
            data: data
        }
    }
    )
    res.send(result)
})
router.delete('/:id', async (req, res) => {
    const result = await files.deleteOne({ _id: ObjectId(req.params.id) })
    res.send(result)
})


module.exports = router