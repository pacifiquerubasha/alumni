const {Server} = require('socket.io');
const { sendMessage } = require('../controllers/messages');

let io; // Initialize io as undefined

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });
    
    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);

        //Join room
        socket.on("join__room", (room) => {
            socket.join(room);
        });
        
        //Send message
        socket.on("send__message", async(messageData) => {
            const {sender, recipient} = messageData;
            const message = await sendMessage(messageData);

            if(message){
                socket.to(`${sender}-${recipient}`).emit("receive__message", messageData);
                // socket.broadcast.emit("receive__message", messageData);
            }
        });

        
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    }
    );
}

function getIO() {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
}

module.exports = {
    initSocket,
    getIO,
};
