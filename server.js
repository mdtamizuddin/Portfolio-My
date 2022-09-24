const express = require('express')
const app = express()
app.use(express.json())
const nodemailer = require('nodemailer')
const PORT = process.env.PORT || 5000
const cors = require('cors')
app.use(cors())



let transporter = nodemailer.createTransport({
    host: "mail.mdtamiz.xyz",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'tamiz@mdtamiz.xyz', // generated ethereal user
        pass: '@mttarin.420', // generated ethereal password
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});


app.post('/send', (req, res) => {
    const body = req.body
    async function main() {

        let info = await transporter.sendMail({
            from: '"Website Mail " <tamiz@mdtamiz.xyz>', // sender address
            to: "mdtomiz.official@gmail.com", // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.message, // plain text body
            html: `<p>${req.body.message}</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);
    res.status(200).send({ message: "Message Sent" })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(PORT, () => {
    console.log('Example app listening')
})