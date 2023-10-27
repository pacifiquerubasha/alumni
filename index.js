require('dotenv').config(); 

const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require('./routes/user-routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { authMiddleware } = require('./middlewares/authMiddleware');
const { eventsRouter } = require('./routes/event-routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use('/images', express.static('uploads'));

app.use("/api/users", userRouter);
app.use("/api/events", eventsRouter);


app.all('*', (req, res, next) => {
    res.status(404).json({
        message: "fail",
        data: {
            message: "Page not found"
        }
    })
})

let server;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to mongoDB");
        server = app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

