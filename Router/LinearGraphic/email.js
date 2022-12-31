const nodemailer = require('nodemailer')
const express = require('express');
const router = express.Router()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tasrif.official@gmail.com',
        pass: 'rbgriciaoyscyhvf',
    },
});


transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

router.post('/', (req, res) => {
    const data = req.body
    async function main() {

        const info = await transporter.sendMail({
            from: 'tasrif@lineargraphic.net',
            to: 'tasrif@lineargraphic.net',
            subject: data.subject,
            text: "Linear Graphic Tasrif ✔",
            html: `
            </div>
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <h5 style="color: rgba(7, 0, 70, 0.89); font-size: 15px;">Name: ${data.name}</h5>
              <h5 style="color: rgba(7, 0, 70, 0.89); font-size: 14px;">Recived A Email From ${data.email}</h5>
              <p>${data.message}</p>
            </div>
              `,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);
    res.status(200).send({ message: "Email Send" })
})

module.exports = router