const OperacaoRepository = require('#repository/operacao')
const OperacaoModel = require('#model/operacao')
const ContaCorrenteRepository = require('#repository/conta-corrente')
const Boom = require('@hapi/boom')
const Messages = require('../messages.js')
const DbConnection = require('../database')

class OperacaoService {

    repository
    contaCorrenteRepository

    constructor() {
        this.repository = new OperacaoRepository()
        this.contaCorrenteRepository = new ContaCorrenteRepository()
    }

    async add(payload) {

        //console.log('payload => ', payload)


        let operacao = payload

        if(!(payload instanceof OperacaoModel)){
            operacao = new OperacaoModel(payload.tipo, payload.valor, payload.contaOrigemId, payload.contaDestinoId)
        }

        //console.log('operacao => ', operacao)

        return await this[operacao.tipo.toLowerCase()](operacao)
    }

    async getAll() {
        return await this.repository.getAll()
    }

    async getById(operacaoId) {
        return await this.repository.getById(operacaoId)
    }

    async getByAccountId(contaCorrenteId) {
        return await this.repository.getByAccountId(contaCorrenteId)
    }

    async retirada(operacao) {
        
        const contaCorrente = await this.contaCorrenteRepository.getById(operacao.contaOrigemId)

        if (contaCorrente.saldo < operacao.valor)
            throw Boom.badRequest(Messages.Operacao.SaldoInsuficiente)

        contaCorrente.saldo = contaCorrente.saldo - operacao.valor

        await this.contaCorrenteRepository.update(contaCorrente)

        operacao.contaDestinoId = null

        await this.repository.add(operacao)

        return operacao
    }

    async deposito(operacao) {

        const contaCorrente = await this.contaCorrenteRepository.getById(operacao.contaOrigemId)

        contaCorrente.saldo = contaCorrente.saldo + operacao.valor

        await this.contaCorrenteRepository.update(contaCorrente)

        operacao.contaDestinoId = null

        await this.repository.add(operacao)

        return operacao
    }

    async transferencia(operacao) {

        const transaction = await DbConnection.transaction()

        try {

            let co = await this.contaCorrenteRepository.getById(operacao.contaOrigemId)

            let cd = await this.contaCorrenteRepository.getById(operacao.contaDestinoId)

            if(co.saldo < operacao.valor)
                throw Boom.badRequest(Messages.Operacao.SaldoInsuficiente)

            co.saldo = co.saldo - operacao.valor

            cd.saldo = cd.saldo + operacao.valor

            await this.contaCorrenteRepository.update(co, transaction)

            await this.contaCorrenteRepository.update(cd, transaction)

            await this.repository.add(operacao)

            await transaction.commit()

        } catch (err) {
            
            await transaction.rollback()

            throw err
        }

        return operacao
    }
}

module.exports = OperacaoService
