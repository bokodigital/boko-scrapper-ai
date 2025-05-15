const { verifyToken } = require('../middlewares/Auth')
const appcontroller = require('../controllers/AppController')

const router = require('express').Router()

router.get('/health', appcontroller.health)
router.post('/new-directory', verifyToken, appcontroller.newDirectory)
router.get('/get-directories', verifyToken, appcontroller.getDirectories)
router.post('/get-directory', verifyToken, appcontroller.getDirectory)
router.get('/get-searches', verifyToken, appcontroller.getSearches)
router.post('/get-search-history', verifyToken, appcontroller.getSearchHistory)
router.post('/add-search-history', verifyToken, appcontroller.addSearchHistory)
router.post('/delete-search-history', verifyToken, appcontroller.deleteSearchHistory)
router.post('/delete-directory', verifyToken, appcontroller.deleteDirectory)
router.post('/get-ai-data', verifyToken, appcontroller.getAiData)
router.post('/get-ai-data-for-directories', verifyToken, appcontroller.getAiDataForDirectories)
router.post('/scrape/website', verifyToken, appcontroller.scrapeCustomUrl)
router.post('/scrape/trademark', verifyToken, appcontroller.scrapeTradeMark)
router.post('/scrape/get/contents', verifyToken, appcontroller.getScrapedContents)
router.post('/update-profile', verifyToken, appcontroller.updateProfile)
router.post('/pin-search', verifyToken, appcontroller.pinSearch)

module.exports = router