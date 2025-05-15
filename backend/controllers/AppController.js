const AppServices = require('../services/AppServices')
const UserServices = require('../services/UserServices')
const errorHandler = require('../middlewares/ErrrorHandler')
const AI = require('../AI/AI')
const Directory = require('../models/DirectoriesModel')
const ScrappedData = require('../models/ScrappedData')
const SearchHistory = require('../models/SearchHistoryModell')



const health = async (req, res) => {
    return res.json({ 'status': 'ok', success: true })
}


const newDirectory = async (req, res) => {
    try {
        const { name, website, requires_auth, auth_email, auth_password, auth_username, internal_prompt } = req.body
        if (!name || !website) {
            return res.status(400).json({ success: false, message: 'name and website are required' })
        }
        if(requires_auth && (!auth_email && !auth_username || !auth_password)) {
            return res.status(400).json({ success: false, message: 'credentails are required when website requires_auth is true' })
        }
        const directory = await AppServices.addNewDirectory({ name, website, requires_auth, auth_email, auth_password, auth_username, internal_prompt })
        return res.status(200).json({ success: true, message: 'Directory created successfully', directory })
    } catch (error) {
        return errorHandler(error, res)
    }
}

//get all save directories
const getDirectories = async (req, res) => {
    try {
        const directories = await AppServices.allDirectories()
        return res.status(200).json({ success: true, directories })
    } catch (error) {
        return errorHandler(error, res)
    }
}

//get a directory
const getDirectory = async (req, res) => {
    try {
        const{directoryId} = req.body
        const directory = await AppServices.getDirectory(directoryId)
        return res.status(200).json({ success: true, directory  })
    } catch (error) {
        return errorHandler(error, res)
    }
}

//delete directories
const deleteDirectory = async (req, res) => {
    try {
        const directory = await AppServices.deleteDirectory(req.body.directory_id)
        return res.status(200).json({ success: true, message: 'Directory deleted successfully', directory })
    } catch (error) {
        return errorHandler(error, res)
    }
}

// get all saved searches
const getSearches = async (req, res) => {
    const user = await UserServices.getUserbyId(req.userId)
    const searches = await AppServices.allSearchHistory(user._id)
    return res.status(200).json({ success: true, searches })
}

//add new search history
const addSearchHistory = async (req, res) => {
    try {
        const { name, url, requires_auth, auth_email, auth_password, auth_username, ai_prompt, ai_response} = req.body
        if (!name || !url || !ai_prompt || !ai_response) {
            return res.status(400).json({ success: false, message: 'some required fields are missing' })
        }
        const user = await UserServices.getUserbyId(req.userId)
        const search = await AppServices.addNewSearchHistory({ user_id: user._id, name, url, requires_auth, auth_email, auth_password, auth_username, ai_prompt, ai_response })
        return res.status(200).json({ success: true, message: 'Search saved successfully', search })
    } catch (error) {
        return errorHandler(error, res)
    }
}


//get a search history
const getSearchHistory = async (req, res) => {
    try {
        const search = await AppServices.getSearchHistory(req.body.searchId)
        return res.status(200).json({ success: true, search })
    } catch (error) {
        return errorHandler(error, res)
    }
}


// delete search history
const deleteSearchHistory = async (req, res) => {
    try {
        const search = await AppServices.deleteSearchHistory(req.body.searchId)
        return res.status(200).json({ success: true, message: 'Search deleted successfully', search })
    } catch (error) {
        return errorHandler(error, res)
    }
}

//get ai data
const getAiData = async (req, res) => {
    try {
        const {scrappedDataId, prompt } = req.body
        const scrappedData = await ScrappedData.findById(scrappedDataId)
        const content = "You are an experienced, detailed, data oriented and top market researcher"
        const arrange_prompt = `in this data ${scrappedData.scraped_data} , ${prompt} strictly follow these steps as your output: 1-parse your response in json format that easily can be converted to csv for example like this arrangement {{"header1":"value1","header2":"value2", "header3":"value3"}, {"header1":"value1","header2":"value2", "header3":"value3"}}, 2 -if you cant find the information on the site just return { success: "false"} 3- do not explain or hallucinate, just respond with the json only that nothing else.`
        const dataResponse = await AI.AiDataGetter(content, arrange_prompt)
        //add search history
        await SearchHistory.create({ user_id: req.userId, url:scrappedData.url, ai_prompt:arrange_prompt, ai_response:dataResponse, name:scrappedData.url, ai_generated: new Date() , prompt:prompt})
        return res.status(200).json({ success: true, dataResponse })
    } catch (error) {
        return errorHandler(error, res)
    }
}

const getAiDataForDirectories= async (req, res) => {
    try {
        const {productName} = req.body;
        // Capitalize only the first word
        const productNameCap = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();

        // get details of the directory
        const directory = await Directory.findOne({name:'Trademap'})
        
        if (!directory) {
            return res.status(404).json({ success: false, message: 'Directory not found' })
        }

        //get json data
        const scrapedContents = await ScrappedData.findOne({productName:productNameCap})

        // check search history if product is already searched
        const checkSearchHistory = await SearchHistory.findOne({url:directory.website, name:productNameCap, user_id:req.userId})
        if (checkSearchHistory) {
            return res.status(200).json({ success: true, data: checkSearchHistory.ai_response })
        }

        if (scrapedContents.scraped_data === null) {
            const content = "You are an experienced, detailed, data oriented and top market researcher"
            const arrange_prompt = ` first the name of the product might be in spanish or english, so you need to check the name of the product and then you need to check the data of the product, the product is ${productName},${directory.no_data_prompt}`
            const data = await AI.AiDataGetter(content, arrange_prompt)
            const summary_prompt = `this is the json data ${data} and the product is ${productName},${directory.summary_prompt}`
            const summary = await AI.AiDataGetter(content, summary_prompt)
            await SearchHistory.create({ user_id: req.userId, url:directory.website, ai_prompt:arrange_prompt, ai_response:data, name:productNameCap, ai_generated: new Date(), ai_summary:summary.content, ai_summary_prompt:summary_prompt})
            return res.status(200).json({ success: true, data, summary })
        }

        const content = "You are an experienced, detailed, data oriented and top market researcher"
        const arrange_prompt = `this is the json data ${scrapedContents.scraped_data[0].content} and the product is ${productName},${directory.internal_prompt}`
        const data = await AI.AiDataGetter(content, arrange_prompt)
        //save search history
        await SearchHistory.create({ user_id: req.userId, productName:productNameCap, productCode: null, url:directory.website, ai_prompt:arrange_prompt, ai_response:data, name:`${productName}`, ai_generated: new Date() })
        return res.status(200).json({ success: true, data })
    } catch (error) {
        return errorHandler(error, res)
    }
}

const scrapeTradeMark = async (req, res) => {
    const {productName} = req.body;
        // Capitalize only the first word
        const productNameCap = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();
    // get details of the  TradeMark  directory
    const directory = await Directory.findOne({name:'Trademap'})

    try {
        //check if product name has been scraped before and return data
        const checkprev = await SearchHistory.findOne({productName: productNameCap})
        if (checkprev) {
            return res.status(200).json({ success: true, data: checkprev })
        }
        //scrape data
        const data = await AppServices.scrapeTradeMark(directory.website, true, directory.auth_email, directory.auth_password, productNameCap ,  null ) 
        return res.status(200).json({ success: true, data })
    } catch (error) {
        if (error.message === 'Python script error: ') {
            await ScrappedData.create({
                url: directory.website,
                productName: productNameCap,
                scraped_data: null,
                directory_id: directory._id,
                productName: productNameCap
            })
            return res.status(200).json({ success: true, data: 'No data found' })
        }else{
            return errorHandler(error, res)
        }
    }
}

const scrapeCustomUrl = async (req, res) => {
    try {
        const { url, auth,loginUrl, email, password } = req.body
        //check if site has been scraped before and return data
        // const checkSiteContnts = await ScrappedData.findOne({ url })
        // if (checkSiteContnts) {
        //     return res.status(200).json({ success: true, data: checkSiteContnts })
        // }
        const data = await AppServices.scrapeWebsite(url, auth, loginUrl, email, password)
        return res.status(200).json({ success: true, data })
    } catch (error) {
        return errorHandler(error, res)
    }
}



const getScrapedContents = async (req, res) => {
    try {
        const { id } = req.body
        const data =await ScrappedData.findById(id)
        return res.status(200).json({ success: true, data })
    } catch (error) {
        return errorHandler(error, res)
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware
        const {name, username, password} = req.body;
        await UserServices.updateUser(name, username, password, userId);
        
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });
        
    } catch (error) {
        return errorHandler(error, res)
    }
};

const pinSearch = async (req, res) => {
    try {
        const { searchId } = req.body
        if (!searchId) {
            return res.status(400).json({ success: false, message: 'Search ID is required' })
        }

        const search = await SearchHistory.findById(searchId)
        if (!search) {
            return res.status(404).json({ success: false, message: 'Search not found' })
        }

        // Toggle the pinned status
        search.pinned = !search.pinned
        await search.save()

        return res.status(200).json({ 
            success: true, 
            message: `Search ${search.pinned ? 'pinned' : 'unpinned'} successfully`,
            search 
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}

module.exports = { health, newDirectory, getDirectories, getSearches, addSearchHistory, 
    deleteSearchHistory, deleteDirectory, getDirectory, getAiData, getAiDataForDirectories,
    getSearchHistory, scrapeCustomUrl, getScrapedContents, scrapeTradeMark, updateProfile,
    pinSearch }