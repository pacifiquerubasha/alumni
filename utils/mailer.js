const nodemailer = require('nodemailer')


const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
    }
}


const transporter = nodemailer.createTransport(config);

const sendEmail = (data) => {
    transporter.sendMail(data, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            return info.response;
        }
    });
}


module.exports = {sendEmail}
