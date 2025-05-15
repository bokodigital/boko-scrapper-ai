const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    name: {type: String},
    email: {type: String, unique: true, required: true},
    password: String,
    google_id: String,
    profile_image:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Image',
        default: null
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,  
    time_joined:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)