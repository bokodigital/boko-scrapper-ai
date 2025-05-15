const allowedOrigins = [
    process.env.FRONTEND_URL_DEV,
    process.env.FRONTEND_URL_PROD,
    process.env.FRONTEND_URL_DEV_SERVER
]

module.exports = allowedOrigins;