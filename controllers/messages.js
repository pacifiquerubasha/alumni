const express = require('express');
const Message = require('../models/Message');


const sendMessage = async(data)=>{
    try{
        const {message, sender, recipient, date, time} = data;
        const newMessage = await Message.create({
            message,
            sender,
            recipient,
            date,
            time
        });

        return newMessage;

    }catch(error){
        console.error(error);
    }

}


module.exports = {
    sendMessage,
}
