const express = require("express");
const Member = require("../Model/Member");

const router = express.Router();

router.get("/", (req, res) => {
  Member.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Something Went to wrong on Seerver" });
    } else {
      res.status(200).send(data);
    }
  });
});
router.get("/:email", (req, res) => {
  Member.findOne({ email: req.params.email }, (err, data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500).send({ message: "Something Went to wrong on Seerver" });
    }
  });
});
router.post("/new", (req, res) => {
  const newMember = new Member(req.body);
  Member.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      newMember.save((err) => {
        if (err) {
          res
            .status(500)
            .send({ message: "Something Went to wrong on Seerver" });
        } else {
          res.status(200).send({ message: "New Member Inserted" });
        }
      });
    }
  });
});

module.exports = router;
