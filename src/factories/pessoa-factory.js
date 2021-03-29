const ContaCorrenteModel = require("../models/conta-corrente-model");
const PessoaModel = require("../models/pessoa-model");
const UsuarioModel = require("../models/usuario-model");

class PessoaFactory{

    static ToModel(dbmodel){

        const usuario = new UsuarioModel(dbmodel['usuario'].dataValues.login, dbmodel['usuario'].dataValues.senha)

        let pessoa = new PessoaModel(
            dbmodel.nome,
            dbmodel.cpf,
            Object.assign(usuario, dbmodel['usuario'].dataValues),
            Object.assign(new ContaCorrenteModel(), dbmodel['conta_corrente'].dataValues)
        );

        pessoa.id = dbmodel.id
        pessoa.createdAt = dbmodel.createdAt
        pessoa.updatedAt = dbmodel.updatedAt
        pessoa.active = dbmodel.active

        delete pessoa.usuario.senha
        delete pessoa.usuario.pessoa_id
        delete pessoa.contaCorrente.pessoa_id

        return pessoa
    }   


    static ToDb(pessoaModel){
        return {
            id: pessoaModel.id,
            nome: pessoaModel.nome,
            cpf: pessoaModel.cpf,
        }
    }

    
}

module.exports = PessoaFactory


