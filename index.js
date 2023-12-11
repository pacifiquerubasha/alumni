require('dotenv').config(); 

const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require('./routes/user-routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require("http");

const {initSocket} = require('./utils/socket')

const { authMiddleware } = require('./middlewares/authMiddleware');
const { eventsRouter } = require('./routes/event-routes');
const { conversationsRouter } = require('./routes/conversation-routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

const server = http.createServer(app);

initSocket(server);

app.use('/images', express.static('uploads'));

app.use("/api/users", userRouter);
app.use("/api/events", eventsRouter);
app.use("/api/conversations", conversationsRouter);


app.all('*', (req, res, next) => {
    res.status(404).json({
        message: "fail",
        data: {
            message: "Page not found"
        }
    })
})


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to mongoDB");
        server.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => {
        console.log(err);
    });


