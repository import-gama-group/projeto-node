const PessoaDbModel = require("../database/models/pessoa-dbmodel");
const PessoaFactory = require("../factories/pessoa-factory");
const BaseRepository = require("./base-repository");
const ContaCorrenteRepository = require("./conta-corrente-repository");
const UsuarioRepository = require("./usuario-repository");
const DbConnection = require('../database')

class PessoaRepository extends BaseRepository {

    constructor(){
        super(PessoaDbModel)
    }

    async add(pessoaModel) {
        
        const transaction = await DbConnection.transaction()

        try{
            const dbmodel = PessoaFactory.ToDb(pessoaModel)

            const result = await PessoaDbModel.create(dbmodel, { transaction })
    
            
            const contaCorrenteRepository = new ContaCorrenteRepository()
    
            pessoaModel.contaCorrente.pessoa_id = pessoaModel.id
    
            await contaCorrenteRepository.add(pessoaModel.contaCorrente, transaction)
    
    
            const usuarioRepository = new UsuarioRepository()
    
            pessoaModel.usuario.pessoa_id = pessoaModel.id
    
            await usuarioRepository.add(pessoaModel.usuario, transaction)
    
            await transaction.commit()

            return result

        } catch (err) {

            await transaction.rollback()
        }
    }

    async getByCpf(cpf) {
        return await PessoaDbModel.findOne({ where: { cpf } })
    }
   
}

module.exports = PessoaRepository