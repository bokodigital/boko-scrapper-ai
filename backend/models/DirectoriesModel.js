const mongoose = require('mongoose')

const directorySchema = new mongoose.Schema({
    name: String,
    website: {type: String, required: true},
    requires_auth: {type: Boolean, default: false},
    auth_email: String,
    auth_password: String,
    auth_username: String,
    login_url:{
        type:String,
        default:null
    },
    internal_prompt:String,
    summary_prompt:String,
    no_data_prompt:String
})

module.exports = mongoose.model('Directory', directorySchema)