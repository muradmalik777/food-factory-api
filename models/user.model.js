const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    title: {
        type: String,
        default: ""
    },
    quantity:{
        type: Number,
        default: 0
    },
    description:{
        type: String,
        default: ""
    },
    image:{
        type: String,
        default: ""
    }
});

exports.Item = mongoose.model('Item', ItemSchema);