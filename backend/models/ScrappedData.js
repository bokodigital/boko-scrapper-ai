const mongoose = require('mongoose')

const scrappedSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    subdomains: [{
        type: String
    }],
    scraped_data: [{
        url: String,
        content: String
    }],
    directory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Directory',
    },
    productName:{
        type:String,
        default:null
    }
})

// Add index on url and timestamp
scrappedSchema.index({ url: 1, timestamp: -1 })

// Add method to get only scraped data contents
scrappedSchema.methods.getScrapedContents = function() {
    return this.scraped_data.map(item => item.content);
}

// Add static method to get scraped data for multiple documents
scrappedSchema.statics.getScrapedDataForDirectories = async function(directoryIds) {
    const documents = await this.find({
        directory_id: { $in: directoryIds }
    });
    
    return documents.reduce((acc, doc) => {
        acc.push(...doc.getScrapedContents());
        return acc;
    }, []);
}

module.exports = mongoose.model('ScrappedData', scrappedSchema)