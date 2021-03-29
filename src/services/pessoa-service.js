const PessoaRepository = require("../repositories/pessoa-repository.js")
const PessoaModel = require("../models/pessoa-model.js")
const UsuarioModel = require("../models/usuario-model.js")
const ContaCorrenteModel = require("../models/conta-corrente-model.js")
const Boom = require("@hapi/boom")
const Messages = require("../messages.js")
const PessoaFactory = require("../factories/pessoa-factory.js")
const UsuarioRepository = require("../repositories/usuario-repository.js")
const BaseService = require("./base-service.js")

class PessoaService extends BaseService {

    constructor() {

        super('Pessoa', new PessoaRepository())

        this.usuarioRepository = new UsuarioRepository()
    }

    async add(payload) {

        const exists = await this.repository.getByCpf(payload.cpf)

        if (exists) throw Boom.badRequest(Messages.Pessoa.JaExiste)

        const usuario = new UsuarioModel(payload.login, payload.senha)

        const contaCorrente = new ContaCorrenteModel()

        const pessoa = new PessoaModel(payload.nome, payload.cpf, usuario, contaCorrente)

        const result = await this.repository.add(pessoa)

        return {
            id: pessoa.id,
            contaCorrenteId: contaCorrente.id,
            usuarioId: usuario.id,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    }

    async getAll() {
        
        const result = await super.getAll(['usuario', 'conta_corrente'])

        return result.map(pessoa => {
            return {
                nome: pessoa.nome,
                cpf: pessoa.cpf,
                login: pessoa.usuario.login,
                saldo: pessoa.conta_corrente.saldo,
                createdAt: pessoa.createdAt,
                updatedAt: pessoa.updatedAt
            }
        })
    }

    async getById(id) {

        const pessoa = await super.getById(id, ['usuario', 'conta_corrente'])

        return PessoaFactory.ToModel(pessoa)
    }

    async update(id, payload) {

        let pessoa = await this.repository.getById(id)

        if (!pessoa) throw Boom.notFound(Messages.Pessoa.NaoEncotrada)

        pessoa.nome = payload.nome

        await pessoa.save()

        let usuario = await this.usuarioRepository.getByPessoaId(id)

        usuario.senha = payload.senha

        await usuario.save()
    }
}
module.exports = PessoaService