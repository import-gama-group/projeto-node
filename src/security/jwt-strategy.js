const dotenv = require('dotenv')
const AuthHandler = require('./auth-handler')

dotenv.config()

module.exports = {
    key: process.env.JWT_SECRET,
    validate: AuthHandler.validateToken
}