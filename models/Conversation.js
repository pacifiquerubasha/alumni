const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    lastMessageDate: {
        type: Date,
    },
    lastMessageTime: {
        type: String,
    },
    lastMessageSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },    
})

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;