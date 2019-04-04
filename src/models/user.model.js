const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, "email can not be empty"],
        unique: true
    }
})

module.exports = mongoose.model('User', UserSchema)