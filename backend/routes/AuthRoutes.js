const router = require('express').Router()
const {verifyToken} = require('../middlewares/Auth')
const authcontroller = require('../controllers/AuthController')

router.get('/health', authcontroller.health)
router.post('/register', authcontroller.Register)
router.post('/login', authcontroller.Login)
router.get('/logout', authcontroller.Logout)
router.post('/google-auth', authcontroller.GoogleAuth)
router.post('/forgot-password', authcontroller.forgotPassword)
router.post('/reset-password/:resetPasswordToken', authcontroller.resetPassword)
router.get('/check-auth', verifyToken, authcontroller.checkAuth)
module.exports = router