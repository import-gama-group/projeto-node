const UsuarioDbModel = require("../database/models/usuario-dbmodel")
const BaseRepository = require("./base-repository")

class UsuarioRepository extends BaseRepository{

    constructor(){
        super(UsuarioDbModel)
    }

    async getByPessoaId(pessoa_id){
        return await UsuarioDbModel.findOne({ where: { pessoa_id }})
    }

    async getByLogin(login){
        return await UsuarioDbModel.findOne({ where: { login }})
    }

}

module.exports = UsuarioRepository