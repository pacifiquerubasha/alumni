const Contact = require("../models/Contact");
const { receivedContactInformationTemplate } = require("../utils/mailTemplates");
const { sendEmail } = require("../utils/mailer");

const saveContact = async(req, res)=>{
    const {name, email, message} = req.body;
    
    try{

        const newContact = await Contact.create({
            name,
            email,
            message
        });

        //Check if name, email and message are provided
        if(!name || !email || !message){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Please provide all the required fields"
                }
            })
        }

        const mailOptions = {
            from: process.env.MAILER_EMAIL,
            to: "p.kishinyambwe@alustudent.com",
            subject: "New Message Submitted From ALUmineers !",
            html : receivedContactInformationTemplate({name, email, message}),
        }

        sendEmail(mailOptions);

        res.status(201).json(newContact);

    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    saveContact
}