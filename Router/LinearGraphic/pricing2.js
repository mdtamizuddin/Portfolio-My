const linearServer = require('../../server2')
const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const { pricing2 } = linearServer()

router.get("/", async (req, res) => {
    const data = await pricing2.find({}).toArray()
    res.send(data)
})

router.get("/:id", async (req, res) => {
    const data = await pricing2.findOne({ _id: ObjectId(req.params.id) })
    res.send(data)
})

router.post('/post', async (req, res) => {
    const newData = req.body
    const result = await pricing2.insertOne(newData)
    res.send(result)
})
router.put('/:id', async (req, res) => {
    const data = req.body
    const result = await pricing2.updateOne({ _id: ObjectId(req.params.id) }, {
        $set: {
            name: data.name,
            price: data.price,
            desc: data.desc,
            service1: data.service1,
            service2: data.service2,
            service3: data.service3,
            service4: data.service4,
            service5: data.service5,
        }
    }
    )
    res.send(result)
})
router.delete('/:id', async (req, res) => {
    const result = await pricing2.deleteOne({ _id: ObjectId(req.params.id) })
    res.send(result)
})


module.exports = router