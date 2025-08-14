const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true /*hashed: not yet*/
    },
    role: {
        type: String,
        required: true
    }
    
});

userSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.log(this.password);
        
    }
});

module.exports = mongoose.model('user', userSchema);