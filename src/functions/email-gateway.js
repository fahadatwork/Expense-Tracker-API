const nodemailer = require('nodemailer');
require('dotenv').config()


let transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});



function sendMail(email, template){

    let mailOptions = {
        from: process.env.SMTP_USER,
        subject: 'F-Tracker API',
        html: template
    };

    mailOptions.to = email;
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}

module.exports = {
   createMessage : sendMail
}