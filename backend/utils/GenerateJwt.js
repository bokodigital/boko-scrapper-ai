const jwt = require('jsonwebtoken')


const generateJwtToken = (res, user) => {
    const token  = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'Production',
        sameSite:  process.env.NODE_ENV  == 'Production' ? 'None' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return token
}

module.exports = generateJwtToken