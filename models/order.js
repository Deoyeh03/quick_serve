const { required } = require('joi');
const mongoose = require('mongoose');
const user = require('./user');

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    items: [{
       menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuItem'
       },
       quantity: {
        type: Number,
        required: true
       }
       
    }],
    orderStatus: {
        type: String, //pending, preparing, served, completed
        required: true /*hashed: not yet*/
    },
    createdBy: [{
        type: mongoose.Schema.type.ObjectId,
        ref: 'user'
    }],
    }
    // createdAt: {
    //     type: Date,
    //     required: true
    // }
    
);

module.exports = mongoose.model('order', orderSchema);

