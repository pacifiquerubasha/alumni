const Conversation = require("../models/Conversation");
const Message = require("../models/Message");


const startConversation = async(data)=>{
    try{
        const {senderId, recepientId} = req.body;

        const newConversation = new Conversation({
            participants: [senderId, recepientId],  
        });

        const savedConversation = await newConversation.save();
        return savedConversation;

    }catch(err){
        console.log(err);
        return null
    }
}

const getUserConversations = async(req, res)=>{

    try{
        const userId = req.params.userId;

        const conversations = await Conversation.find({
            participants: userId,
        });

        res.status(200).json(conversations);
    }catch(err){
        res.status(500).json(err);
    }
}

const getConversationMessages = async(req, res)=>{
    try{
        const conversationId = req.params.conversationId;
        //Find messages that have this conversationId
        const messages = await Message.find({
            conversationId: conversationId,
        });

        res.status(200).json(messages);
        
    }catch(err){
        res.status(500).json(err);
    }
}

const deleteConversation = async(req, res)=>{
    try{
        const id = req.params.id;
        const deletedConversation = await Conversation.findByIdAndDelete(id);
        res.status(200).json({
            message: "success",
            data: {
                conversation: deletedConversation,
            }
        });
    }catch(err){
        res.status(500).json(err);
    }

}

module.exports = {
    startConversation,
    getUserConversations,
    getConversationMessages,
    deleteConversation,
}