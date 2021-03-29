const UsuarioRepository = require("../repositories/usuario-repository");
const BaseService = require("./base-service");

class UsuarioService extends BaseService{

    constructor(){
        super('Usuário', new UsuarioRepository())
    }

    async getByLogin(login){
        return await this.repository.getByLogin(login)
    }
}

module.exports = UsuarioService