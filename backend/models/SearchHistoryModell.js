const mongoose = require('mongoose')

const searchHistorySchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    url: String,
    created_at: { type: Date, default: Date.now },
    requires_auth: {type: Boolean, default: false},
    auth_email: String,
    auth_password: String,
    auth_username: String,
    scraped: Boolean, // if scraping was completed,
    ai_prompt: {
        type: String,
        default: null
    },
    ai_response: {
        type: mongoose.Schema.Types.Mixed, // Changed to Mixed type for JSON arrays
        default: null,
        get: function(data) {
            if (!data) return null;
            return typeof data === 'string' ? JSON.parse(data) : data;
        },
        set: function(data) {
            if (!data) return null;
            return typeof data === 'string' ? data : JSON.stringify(data);
        }
    },
    ai_summary: {
        type: String,
        default: null
    },
    ai_summary_prompt: {
        type: String,
        default: null
    },
    ai_generated:{ type: Date, default: null }, // time when ai generated the response
    productName: String,
    productCode: String,
    prompt: String,
    pinned: {type: Boolean, default: false},
})

// Add toJSON transform
searchHistorySchema.set('toJSON', {
    transform: function(doc, ret) {
        if (ret.ai_response) {
            try {
                ret.ai_response = typeof ret.ai_response === 'string' 
                    ? JSON.parse(ret.ai_response) 
                    : ret.ai_response;
            } catch(err) {
                console.error('Error parsing ai_response:', err);
            }
        }
        return ret;
    }
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema)