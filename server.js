const express = require("express");
const app = express();
app.use(express.json());
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const uri = process.env.DB_URI;
const mongoose = require("mongoose");
const multer = require("multer");
const transporter = require("./Model/transporter");
const http = require("http");
const server = http.createServer(app);

// // Socket Server

// const { Server } = require("socket.io");
// const io = new Server(server);

// io.on('connection', (socket)=> {
//     console.log("New User Added")
// })

// Socket Server End Here

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Is Connected"))
  .catch((err) => console.log(err));

const rendom = (Math.random() + 13).toString(36).substring(7);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, rendom + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
app.use("/api/images", express.static("public/images"));
app.use("/api/portfolio", require("./Router/portfolioRouter"));
app.use("/api/messages", require("./Router/messageRouter"));
app.use("/api/user", require("./Router/userRouter"));
app.use("/api/components", require("./Router/componentRouter"));
app.use("/api/members", require("./Router/member"));

app.post("/api/upload", upload.single("image"), (req, res) => {
  res.send(`images/${req.file.filename}`);
});

app.use(express.static("public"));

app.post("/api/send", (req, res) => {
  const body = req.body;
  async function main() {
    let info = await transporter.sendMail({
      from: '"Website Mail " <web@mdtamiz.xyz>', // sender address
      to: "mdtomiz.official@gmail.com", // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
      html: `<p>${req.body.message}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);
  res.status(200).send({ message: "Message Sent" });
});

server.listen(PORT, () => {
  console.log("Example app listening");
});
