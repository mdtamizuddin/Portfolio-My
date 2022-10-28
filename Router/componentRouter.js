const express = require("express");
const Component = require("../Model/Component");
const router = express.Router();

router.get("/:category", (req, res) => {
  Component.find({ category: req.params.category, status: 'ok' }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem On Server" });
    } else {
      const newData = data.reverse()
      res.status(200).json(newData);
    }
  });
});

router.get("/", (req, res) => {
  Component.find({ status: 'ok' }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem On Server" });
    } else {
      const newData = data.reverse()
      res.status(200).json(newData);
    }
  });
});
router.get("/status/:status", (req, res) => {
  Component.find({ status: req.params.status }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem On Server" });
    } else {
      const newData = data.reverse()
      res.status(200).json(newData);
    }
  });
});
router.get("/my/:email", (req, res) => {
  Component.find({ user: req.params.email }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem On Server" });
    } else {
      const newData = data.reverse()
      res.status(200).json(newData);
    }
  });
});
router.get("/one/:id", (req, res) => {
  Component.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem on Server" });
    } else {
      res.status(200).json(data);
      if (data) {
        Component.updateOne({ _id: req.params.id }, { $set: { visitor: data.visitor + 1 } }, (err, data) => {

        })
      }
    }
  });
});
router.post("/", (req, res) => {
  const newPortfolio = new Component(req.body);
  
  newPortfolio.save((err) => {
    if (err) {
      res.status(500).json({ message: "There is A Problem on Server" });
      console.log(err)
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
        img: portfolio.img,
        imgMobile: portfolio.imgMobile,
        desc: portfolio.desc,
        css: portfolio.css,
        status: portfolio.status
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


