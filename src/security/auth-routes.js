const Joi = require('joi')
const AuthHandler = require("./auth-handler")

//export default [
module.exports = [
    {
        method: 'POST',
        path: '/api/v1/login',
        config: {
            auth: false,
            handler: AuthHandler.authenticate,
            description: 'Efetua a autenticação',
            notes: 'Retorna token de autenticação',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload: Joi.object({
                    login: Joi.string().min(5).max(20).required(),
                    senha: Joi.string().min(5).max(20).required()
                })
            }
        }
    }
]