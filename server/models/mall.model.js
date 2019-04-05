const mongoose = require('mongoose')

const MallSchema = new mongoose.Schema({
    name: String,
    address: String,
    
})

module.exports = mongoose.model('Mall', MallSchema)