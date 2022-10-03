const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "mail.mdtamiz.xyz",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'web@mdtamiz.xyz', // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

module.exports = transporter