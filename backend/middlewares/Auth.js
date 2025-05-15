const jwt = require('jsonwebtoken')

  const verifyToken = async (req, res, next) => {
    try{
      const token = req.cookies.jwt
      if(!token){
        return res.status(200).send({ success: false, message: 'Unauthorized' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if(!decoded){
        return res.status(200).send({ success: false, message: 'Unauthorized' })
      }

      req.userId = decoded.id
      next()
    }
    catch(e){
      return res.status(401).send({ success: false, message: 'Unauthorized' })
    }
  }


  module.exports = { verifyToken }