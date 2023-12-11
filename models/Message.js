const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    isFirstMessage:{
        type: Boolean,
        default: false,
    },
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',    
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;