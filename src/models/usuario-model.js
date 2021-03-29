// import BaseModel from "./base-model.js"
// import Boom from '@hapi/boom'

const BaseModel = require("./base-model.js")
const Boom = require('@hapi/boom')

class UsuarioModel extends BaseModel {

    login
    senha
    pessoa_id

    constructor(login, senha){
        super()

        this.login = login
        this.senha = senha

        this.validate()
    }

    validate(){

        if(!this.login?.trim())
            throw Boom.badRequest("Login não informado")

        if(!this.senha?.trim())
            throw Boom.badRequest("Senha não informada")
    }

}

//export default UsuarioModel

module.exports = UsuarioModel