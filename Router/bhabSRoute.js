const express = require("express");

const router = express.Router();
const { model, Schema } = require("mongoose");
const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    mulbhab: {
        type: String,
        default: ''
    },
    somprobhab: {
        type: String,
        required: true
    },
    montobbo: {
        type: String,
        default: ''
    },
    user: {
        type: String,
        required: true
    }
});
const Bhabsomprosaron = new model("Bhabsomprosaron", schema);

router.get("/", (req, res) => {
    Bhabsomprosaron.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Something Went to wrong on Get Mode" });
        } else {
            res.status(200).send(data);
        }
    });
});
router.get("/one/:id", (req, res) => {
    Bhabsomprosaron.findOne({ _id: req.params.id }, (err, data) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(500).send({ message: "Something Went to wrong on Seerver (get single One)" });
        }
    });
});
router.post("/new", (req, res) => {
    const newMember = new Bhabsomprosaron(req.body);
    newMember.save((err) => {
        if (err) {
            res
                .status(500)
                .send({ message: "Something Went to wrong on Seerver Post Mode" , err});
        } else {
            res.status(200).send({ message: "New Post Inserted" });
        }
    });

})

module.exports = router;
