const nodemailer = require('nodemailer');
require('dotenv').config();

function sendEmail(fatherData) {

    const email = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    });

    const emailOptions = {
        from: process.env.email,
        to: fatherData.email,
        subject: 'Verify your Account Now!',
        text: `Now you can verify your account clicking in the next link!
        http://localhost:5500/redirec.html/?id=${fatherData.email}
        Please dont share click the link if you arent login in TubeKids!`
    };

    email.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log(error);
            throw new Error("Something doesnt work as we expected")
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {sendEmail};