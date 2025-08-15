const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const menuItemSchema = new Schema({
    menuName: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
    
});

module.exports = mongoose.model('menuItem', menuItemSchema);
