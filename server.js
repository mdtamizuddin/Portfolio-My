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
const linearServer = require("./server2");
const flashfile = require("./Router/FlashFile/main");
const server = http.createServer(app);
const { Server } = require('socket.io');
const { activeUser, diactiveUser } = require("./Router/messageEditor");


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"]
  }
})

const users = {}

console.log(users)

io.on("connection", (socket) => {
  socket.on("new-user-connect", (data) => {
    users[socket.id] = data.email
    socket.broadcast.emit('user-joined', data)
    activeUser(data.email)
  })


  socket.on('disconnect', () => {
    socket.broadcast.emit("gaya", { id: users[socket.id] })
    diactiveUser(users[socket.id])
  });
  socket.on("send_message", (data) => {
    // Message
    socket.broadcast.emit("recive_message", data)
  })
})


mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Is Connected"))
  .catch((err) => console.log(err));



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

const upload2 = multer({
  storage: storage2,
});

app.use("/images/temp", express.static("temp"));
app.use("/images", express.static("images"));


app.use("/api/message", require("./Router/messageRouter"));
app.use("/api/users", require("./Router/userRouter"));

app.use("/api/portfolio", require("./Router/portfolioRouter"));
app.use("/api/components", require("./Router/componentRouter"));
app.use("/api/development", require("./Router/development"));
app.use("/api/members", require("./Router/member"));
app.use("/api/bhab", require("./Router/bhabSRoute"));

app.post("/upload-temp", upload.single("image"), (req, res) => {
  res.send({ url: `http://localhost:5000/images/temp/${req.file.filename}` });

});

app.post("/upload", upload2.single("image"), (req, res) => {
  res.send({ url: `http://localhost:5000/images/${req.file.filename}` });
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

const { client } = linearServer()

// Routes For Lineargraphic.com 
// Routes For Lineargraphic.com 
// Routes For Lineargraphic.com 

app.use('/linear/portfolio', require('./Router/LinearGraphic/Portfolio'))
app.use('/linear/pricing', require('./Router/LinearGraphic/pricing'))
app.use('/linear/pricing2', require('./Router/LinearGraphic/pricing2'))
app.use('/linear/titles', require('./Router/LinearGraphic/title'))
app.use('/linear/bangla-titles', require('./Router/LinearGraphic/titleBangla'))
app.use('/linear/users', require('./Router/LinearGraphic/users'))
app.use('/linear/email', require('./Router/LinearGraphic/email'))
app.use('/linear/genarel', require('./Router/LinearGraphic/genarelpricing'))
app.use('/linear/genarel-bd', require('./Router/LinearGraphicBd/genarelpricing'))



// Routes For Falshfiles 
// Routes For Falshfiles  
// Routes For Falshfiles 
// flashfile 
app.use('/flashfile/users', require('./Router/FlashFile/userRouter'))
app.use('/flashfile/files', require('./Router/FlashFile/flashfilesRouter'))
async function run() {
  await client.connect()
  console.log('Linear Graphic Database Connected')

}
run().catch(console.dir())


flashfile()

server.listen(PORT, () => {
  console.log("Example app listening");
});
