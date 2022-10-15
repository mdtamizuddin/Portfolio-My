const express = require("express");
const Component = require("../Model/Component");
const router = express.Router();

router.get("/:category", (req, res) => {
  Component.find({ category: req.params.category }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem On Server" });
    } else {
      res.status(200).json(data);
    }
  });
});
router.get("/", (req, res) => {
  Component.find({}, (err, data) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem On Server" });
    } else {
      res.status(200).json(data);
    }
  });
});
router.get("/one/:id", (req, res) => {
  Component.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem on Server" });
    } else {
      res.status(200).json(data);
    }
  });
});
router.post("/", (req, res) => {
  const newPortfolio = new Component(req.body);
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
  Component.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: portfolio.name,
        category: portfolio.category,
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
  Component.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem on Server" });
    } else {
      res.status(200).json({ message: "data deleted" });
    }
  });
});

module.exports = router;
