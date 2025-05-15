const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const generateJwtToken = require('../utils/GenerateJwt')
const EmailSender = require('../resend/email')
const crypto = require('crypto')
const axios = require('axios');


// Check if user email is in the authorized WordPress users list
const isAuthorizedUser = async (email) => {
    try {
        const config = {
            method: 'get',
            url: 'https://relaisoft.org/wp-json/wp/v2/users?roles[]=special-customer',
            headers: { 
                'Authorization': 'Basic Ym9rb2FkbWluOlR6eEwgY0NEZiBaWDY0IFRIVmMgalNhOSBwNUNw'
            }
        };

        const response = await axios.request(config);
        
        if (response.status === 200) {
            const authorizedUsers = response.data;
            // Check if user's email exists in the authorized users list
            return authorizedUsers.some(user => user.user_email.toLowerCase() === email.toLowerCase());
        }
        
        return false;
    } catch (error) {
        throw new Error('Authorization service unavailable. Please try again later.');
    }
};

const addUserToDB = async (username, email, password, res) => {
    try {
        // Check if user already exists or username is taken
        const checkUsername = await User.findOne({ username })
        const checkEmail = await User.findOne({ email })

        if (checkUsername) {
            throw new Error('please choose another username, this Username is already taken')
        }

        if (checkEmail) {
            throw new Error(' This email is already registered')
        }
        
        // Check if user is authorized via WordPress API
        // const isAuthorized = await isAuthorizedUser(email);
        // if (!isAuthorized) {
        //     throw new Error('Your email is not authorized. Please contact support for access.')
        // }

        const hashedPassword = await bcrypt.hash(password, 10)
        //create user
        const userData = {
            username,
            name: username,
            password: hashedPassword,
            email,
        }
        const user = await User.create(userData)
        // generate jwt
        generateJwtToken(res, user)

        return ({
            ...user._doc,
            password: undefined,
        })
    }
    catch (error) {
        throw new Error(`Registration failed: ${error.message}`)
    }
}


const loginUser = async (email, password, res) => {
    try {
        const user = await User.findOne({email: email})
        if (!user) {
            throw new Error('Invalid Credentials')
        }
        
        if (!user.password) {
            throw new Error('Login with Google or reset your password')
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect || !user) {
            throw new Error('Invalid Credentials')
        }

        // generate jwt
        generateJwtToken(res, user)

        return ({
            ...user._doc,
            password: undefined,
            resetPasswordToken: undefined,
            resetPasswordExpire: undefined
        })
    }
    catch (error) {
        throw new Error(`Login failed: ${error.message}`)
    }
}

async function googleAuth(email, name, googleId, res) {
    try {
        // const isAuthorized = await isAuthorizedUser(email);
        // if (!isAuthorized) {
        //     throw new Error('Your email is not authorized. Please contact support for access.')
        // }
        

  
        const userRecord = await User.findOne({ email });
        
        if (userRecord) {
            if (userRecord.google_id && userRecord.google_id !== googleId) {
                throw new Error('This email is already registered with another Google account');
            }

            // If the user exists but doesn't have a Google ID, link the Google account
            if (!userRecord.google_id) {
                userRecord.google_id = googleId;
                await userRecord.save();
            }
            if (!userRecord.name) {
                userRecord.name = name;
                await userRecord.save();
            }

            generateJwtToken(res, userRecord);
            return {
                ...userRecord._doc,
                password: undefined,
            };
        }

        // If no user exists, create a new user
        const newUser = new User({
            username: email,
            name: name,
            email,
            google_id: googleId,
        });
        await newUser.save();
        await EmailSender.sendWelcomeEmail(email);
        
        generateJwtToken(res, newUser);
        return {
            ...newUser._doc,
            password: undefined,
        };
    } catch (error) {
        throw new Error(`Error during Google authentication: ${error.message}`);
    }
}



const forgotPassword = async (email) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('This email is not registered' )
        }
        const resetPasswordToken = crypto.randomBytes(32).toString('hex')
        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordExpire = Date.now() + 1 * 60 * 60 * 1000 // valid for 1 hour
        await user.save()

        //send reset password email
        const clientUrl = process.env.NODE_ENV === 'Development' ? process.env.FRONTEND_URL_DEV : process.env.FRONTEND_URL_PROD
        const resetUrl = `${clientUrl}/reset-password/${resetPasswordToken}`
        const data = {
            email,
            resetUrl
        }
        return data

    }
    catch (error) {
        throw new Error(error)
    }
}

const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
        if (!user) {
            throw new Error('Invalid reset password token')
        }
        user.password = await bcrypt.hash(newPassword, 10)
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        return ({
            ...user._doc,
            password: undefined,
        })
    }
    catch (error) {
        throw new Error(`error from reseting your password ${error}`)
    }
}


const getUserbyId = async (id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            throw new Error('User not found')
        }
        return ({
            ...user._doc,
            password: undefined,
            resetPasswordToken: undefined,
            resetPasswordExpire: undefined
        })
    }
    catch (error) {
        throw new Error(`error from get user by id ${error}`)
    }
}

const updateUser = async (name, username, password, userId) => {
    try {
        const updatedUser = await User.findById(userId)
        if (!updatedUser) {
            throw new Error('User not found');
        }
        if (name){
            updatedUser.name = name
        }

        if (username){
            const checkUsername = await User.findOne({ username })
            if (checkUsername) {
                throw new Error('please choose another username, this Username is already taken')
            }
            updatedUser.username = username
        }
        if (password){
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long')
            }
            updatedUser.password = await bcrypt.hash(password, 10)
            updatedUser.password = await bcrypt.hash(password, 10)
        }
        await updatedUser.save()
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

module.exports = { addUserToDB, loginUser, googleAuth, forgotPassword, resetPassword, getUserbyId, updateUser }