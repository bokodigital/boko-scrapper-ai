const Directory = require('../models/DirectoriesModel')
const User = require('../models/UserModel')
const SearchHistory = require('../models/SearchHistoryModell')
const { spawn } = require('child_process');
const path = require('path');
const ScrappedData = require('../models/ScrappedData');
const fs = require('fs');


const addNewDirectory = async (directory) => {
    try {
        const newDirectory = await Directory.create(directory)
        return newDirectory
    } catch (error) {
        throw error
    }
}

const allDirectories = async () => {
    try {
        const directories = await Directory.find()
        return directories
    } catch (error) {
        throw error
    }
}

const getDirectory = async (id) => {
    try {
        const directory = await Directory.findById(id)
        return directory
    } catch (error) {
        throw error
    }
}

const allSearchHistory = async (userId) => {
    try {
        const searchHistory = await SearchHistory.find({ user_id: userId })
            .sort({ 
                pinned: -1,  // First pinned items
                created_at: -1,  // Most recent first
            })
        return searchHistory
    } catch (error) {
        throw error
    }
}

const addNewSearchHistory = async (searchHistory) => {
    try {
        // If there's an AI response, update the generation timestamp
        if (searchHistory.ai_response) {
            searchHistory.ai_generated = new Date()
        }

        // Try to find existing search history with same name and URL
        const existingSearch = await SearchHistory.findOne({
            name: searchHistory.name,
            url: searchHistory.url,
            user_id: searchHistory.user_id
        });

        if (existingSearch) {
            // Update existing record
            const updatedSearch = await SearchHistory.findByIdAndUpdate(
                existingSearch._id,
                { 
                    ...searchHistory,
                    created_at: new Date() // Update timestamp
                },
                { new: true } // Return updated document
            );
            return updatedSearch;
        } else {
            // Create new record
            const newSearchHistory = await SearchHistory.create(searchHistory);
            return newSearchHistory;
        }
    } catch (error) {
        throw error;
    }
}


const getSearchHistory = async (id) => {
    try {
        const searchHistory = await SearchHistory.findById(id)
        return searchHistory
    } catch (error) {
        throw error
    }
}


const deleteSearchHistory = async (id) => {
    try {
        const deletedSearchHistory = await SearchHistory.findByIdAndDelete(id)
        return deletedSearchHistory
    } catch (error) {
        throw error
    }
}

const deleteDirectory = async (id) => {
    try {
        const deletedDirectory = await Directory.findByIdAndDelete(id)
        return deletedDirectory
    } catch (error) {
        throw error
    }
}



const runPythonScript = async ( mode, url, auth, loginUrl, email, password, productName, productCode) => {
  return new Promise((resolve, reject) => {
    const scriptPath = '/root/backend_relais/scraper_engine/main.py';
    // Use pipenv run python instead of direct python executable
    const pythonProcess = spawn('pipenv', [
      'run',
      'python',
      scriptPath,
      mode,
      url,
      auth.toString(),
      loginUrl || '',
      email || '',
      password || '',
      productName,
      productCode
    ], {
        cwd: '/root/backend_relais/scraper_engine' // Set working directory to absolute path
    });

    let dataString = '';
    let errorString = '';

    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorString += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script error: ${errorString}`));
        return;
      }
      try {
        resolve(JSON.parse(dataString));
      } catch (err) {
        reject(new Error('Failed to parse Python script output'));
      }
    });
  });
}

const scrapeWebsite = async (url, requires_auth, login_url, email, password ) => {
    try { 
        // Run python scraper
        const scrapedContent = await runPythonScript(
            'custom',
            url,
            requires_auth,
            login_url,
            email,
            password
        );
        
        if (!scrapedContent || scrapedContent.error) {
            throw new Error('Scraping failed');
        }
        // save to scrapped data if successful
        const data = new ScrappedData({
            url: scrapedContent.url,
            timestamp: new Date(scrapedContent.timestamp),  // Ensure the timestamp is a Date object
            subdomains: scrapedContent.subdomains,
            scraped_data: Object.keys(scrapedContent.scraped_data).map((url) => ({
                url: url,  // Subdomain URL
                content: scrapedContent.scraped_data[url],  // The scraped content for the subdomain
            }))  
        });

        // Save the document to the database
        const savedData = await data.save();

        return savedData;


    } catch (error) {
        throw error;
    }
};


const scrapeTradeMark = async (url, requires_auth, email, password, productName,  productCode ) => {
    try { 
        // Run python scraper
        // const scrapedContent = await runPythonScript(
        //     'product',
        //     url,
        //     requires_auth,
        //     '',
        //     email,
        //     password,
        //     productName,
        //     ''
        // );
        
        // if (!scrapedContent || scrapedContent.error) {
        //     throw new Error('Scraping failed');
        // }
        // // save to scrapped data if successful
        // const data = new ScrappedData({
        //     url: scrapedContent.url,
        //     timestamp: new Date(scrapedContent.timestamp),
        //     subdomains: [], // TradeMark doesn't use subdomains
        //     scraped_data: [{
        //         url: scrapedContent.url,
        //         content: JSON.stringify(scrapedContent.scraped_data[scrapedContent.url])
        //     }],
        //     productName:productName
        // });

        // // Save the document to the database
        // const savedData = await data.save();

        // return savedData;


       const data = await ScrappedData.create({
            url: url,
            productName: productName,
            subdomains: [],
            scraped_data: null,
            directory_id: null,
            productName: productName,
            productCode: productCode || null
        })

        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addNewDirectory,
    allDirectories,
    allSearchHistory,
    addNewSearchHistory,
    deleteSearchHistory,
    deleteDirectory,
    getDirectory,
    getSearchHistory,
    scrapeWebsite,
    scrapeTradeMark
}