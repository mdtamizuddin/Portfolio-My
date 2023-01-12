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
mongoose.set('strictQuery', true)
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


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: Personal DB ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const rendom = Math.floor(Math.random() * 500)


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, rendom + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});



app.use("/images", express.static("Images"));


app.use("/api/message", require("./Router/messageRouter"));
app.use("/api/users", require("./Router/userRouter"));
app.use("/api/posts", require("./Router/postsRouter"));

app.use("/api/portfolio", require("./Router/portfolioRouter"));
app.use("/api/components", require("./Router/componentRouter"));
app.use("/api/development", require("./Router/development"));
app.use("/api/members", require("./Router/member"));
app.use("/api/bhab", require("./Router/bhabSRoute"));

app.post("/upload-one", upload.single("image"), (req, res) => {
  res.send({ url: `https://mdtamiz.xyz/images/${req.file.filename}` });

});

app.get("/", (req, res) => {
  res.send({ status: "Running server" })
})

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


// Routes For Falshfiles 
// Routes For Falshfiles  
// Routes For Falshfiles 
// flashfile 
// app.use('/flashfile/users', require('./Router/FlashFile/userRouter'))
// app.use('/flashfile/files', require('./Router/FlashFile/flashfilesRouter'))
// async function run() {
//   const { flash } = flashfile()

//   await flash.connect()
//   console.log('Flash File Connect')

// }
// run().catch(console.dir())




connectDB().then(() => {

  server.listen(PORT, () => {
    console.log("listening for requests");
  })
})