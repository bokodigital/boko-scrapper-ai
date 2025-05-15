const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const ScrappedData = require('../models/ScrappedData')

async function saveJsonToDb() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://wilfred:2wzuZevqSDeFCokP@cluster0.rreco.mongodb.net/relais', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Read the JSON file
        const jsonPath = path.join(__dirname, '../../scraper_engine/results/scrape_result_20250307_144149.json');
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

        // Convert scraped_data object to array of {url, content} pairs
        const scrapedDataArray = Object.entries(jsonData.scraped_data).map(([url, content]) => ({
            url,
            content
        }));

        // Create new document using the model
        const newScrapedData = new ScrappedData({
            url: jsonData.url,
            timestamp: new Date(jsonData.timestamp),
            subdomains: jsonData.subdomains,
            scraped_data: scrapedDataArray,
            directory_id: "67c861913287d752b4494ad5"
        });

        // Save to database
        await newScrapedData.save();
        console.log('Data saved successfully!');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Run the script
saveJsonToDb();