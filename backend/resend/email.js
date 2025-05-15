const Resend  = require('../resend/config')
const emailTemplate = require('../resend/emailTemplate')


const companyName = process.env.COMPANY_NAME
const companyUrl = process.env.COMPANY_URL



const sendWelcomeEmail = async (email) => {
    try{
        const { data, error } = await Resend.emails.send({
            from: "Relaisia <no-reply@relaisia.com>",
            to: [email],
            subject: "Welcome to Relais",
            html: emailTemplate.welcomeMailTemplate(companyName, companyUrl),
          });
    }
    catch(err){
        console.log(err)
        throw new Error(err)
    }
}




const sendResetPasswordEmail = async (email, resetPasswordLink) => {
    try{
        const { data, error } = await Resend.emails.send({
            from: "Relaisia <no-reply@relaisia.com>",
            to: [email],
            subject: "Reset your Password",
            html: emailTemplate.resetPasswordMailTemplate(companyName, resetPasswordLink),
          });

    }
    catch(err){
        console.log(err)
        throw new Error(err)
    }
}

const sendResetPasswordSuccessfullyEmail = async (email) => {
    try{
        const { data, error } = await Resend.emails.send({
            from: "Relaisia <no-reply@relaisia.com>",
            to: [email],
            subject: "Your Password Has Been changed",
            html: emailTemplate.resetPasswordSuccessfullyMailTemplate(companyName),
          });
    }
    catch(err){
        console.log(err)
        throw new Error(err)
    }
}
module.exports = {sendWelcomeEmail, sendResetPasswordEmail, sendResetPasswordSuccessfullyEmail}