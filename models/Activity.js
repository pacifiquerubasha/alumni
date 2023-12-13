const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const activitySchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    path: {
        type: String,
    },
    type:{
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {timestamps: true})


module.exports = mongoose.model('Activity', activitySchema);