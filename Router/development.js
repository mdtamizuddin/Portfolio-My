const express = require("express");
const Development = require("../Model/Development");
const router = express.Router();

router.get("/:category", (req, res) => {
    Development.find({ category: req.params.category, }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem On Server" });
        } else {
            const newData = data.reverse()
            res.status(200).json(newData);
        }
    });
});

router.get("/", (req, res) => {
    Development.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem On Server" });
        } else {
            const newData = data.reverse()
            res.status(200).json(newData);
        }
    });
});

router.get("/one/:id", (req, res) => {
    Development.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" });
        } else {
            res.status(200).json(data);
            if (data) {
                Development.updateOne({ _id: req.params.id }, { $set: { visitor: data.visitor + 1 } }, (err, data) => {

                })
            }

        }
    });
});
router.post("/", (req, res) => {
    const newPortfolio = new Development(req.body);
    newPortfolio.save((err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" });
        } else {
            res.status(200).json({ message: "data inserted success" });
        }
    });
});

router.put("/:id", (req, res) => {
    const portfolio = req.body;
    Development.updateOne(
        { _id: req.params.id },
        {
            $set: {
                title: portfolio.title,
                category: portfolio.category,
                desc: portfolio.desc,

            },
        },
        (err) => {
            if (err) {
                res.status(500).json({ message: "There is A Problem on Server" });
            } else {
                res.status(200).json({ message: "data update success" });
            }
        }
    );
});

router.delete("/:id", (req, res) => {
    Development.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" });
        } else {
            res.status(200).json({ message: "data deleted" });
        }
    });
});

module.exports = router;
