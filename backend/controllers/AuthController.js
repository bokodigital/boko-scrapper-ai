const errorHandler = require('../middlewares/ErrrorHandler')
const UserServices = require('../services/UserServices')
const EmailSender = require('../resend/email')

const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}


const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        //data verification
        if (!username || !email || !password) {
            return res.status(400).json({success:false, message:'All fields are required'})
        }
        if (password.length < 8) {
            return res.status(400).json({success:false, message:'Password must be at least 8 characters long'})
        }

        const user = await UserServices.addUserToDB(username, email, password, res)
        await EmailSender.sendWelcomeEmail(email) //send welcome email
        return res.status(200).json({ success: true, message: 'User registered successfully', user })
    }
    catch (error) {
        return errorHandler(error, res)
    }
}

const Login = async (req, res) => {
    try {
        const { username, email, password } = req.body
        //data verification
        if (!username && !email) {
            return res.status(400).json({success:false, message:'All fields are required'})
        }
        if (!password) return res.status(400).json({success:false, message:'Password is required'})

        const user = await UserServices.loginUser(email, password, res)
        return res.status(200).json({ success: true, message: 'User logged in successfully', user })
    }
    catch (error) {
        return errorHandler(error, res)
    }
}

const Logout = async (req, res) => {
    try {
        res.clearCookie('jwt')
        return res.status(200).json({ success: true, message: 'Logged out successfully' })
    }
    catch (e) {
        return errorHandler(e, res)
    }
}

//google auth handler
const GoogleAuth = async (req, res) => {
    try {
        const { email, name, sub } = req.body
        const user = await UserServices.googleAuth(email, name, sub, res)
        return res.status(200).json({ success: true, message: 'User logged in successfully', user })
    } catch (error) {
        return errorHandler(error, res)
    }
}


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ success: false, message: 'you email is required' })
        }
        const forgotLogic = await UserServices.forgotPassword(email)
        await EmailSender.sendResetPasswordEmail(forgotLogic.email, forgotLogic.resetUrl)
        return res.status(200).json({ success: true, message: 'Reset password email sent successfully, check your email link expires in 1 hour' })

    } catch (error) {
        return errorHandler(error, res)
    }
}


const resetPassword = async (req, res) => {
    try {
        const { resetPasswordToken } = req.params
        const { newPassword } = req.body
        const resetLogic = await UserServices.resetPassword(resetPasswordToken, newPassword)
        //send reset password email successfully
        await EmailSender.sendResetPasswordSuccessfullyEmail(resetLogic.email)
        return res.status(200).json({ success: true, message: 'Password reset successfully' })
    } catch (error) {
        return errorHandler(error, res)
    }
}
const checkAuth = async (req, res) => {
    try {
        const user = await UserServices.getUserbyId(req.userId)
        return res.status(200).json({
            success: true, user: user
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


module.exports = { health, Register, Login, Logout, GoogleAuth, forgotPassword, resetPassword, checkAuth }