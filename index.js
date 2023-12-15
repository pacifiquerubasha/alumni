require('dotenv').config(); 

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require("http");

const {initSocket} = require('./utils/socket')

const { authMiddleware } = require('./middlewares/authMiddleware');
const { userRouter } = require('./routes/user-routes');
const { eventsRouter } = require('./routes/event-routes');
const { newsRouter } = require('./routes/news-routes');
const { activityRouter } = require('./routes/activities-routes');
const { contactRouter } = require('./routes/contact-routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);


const allowedOrigins = [process.env.FRONTEND_URL, 'https://cron-job.org']
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || origin == undefined) {
            callback(null, true)
        } 
        else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

const server = http.createServer(app);

// initSocket(server);

app.use('/images', express.static('uploads'));

app.use("/api/users", userRouter);
app.use("/api/events", eventsRouter);
app.use("/api/news", newsRouter);
app.use("/api/activities", activityRouter);
app.use("/api/contacts", contactRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "success",
        data: {
            message: "Welcome to the ALUmineers API"
        }
    })
})

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



module.exports = app;
