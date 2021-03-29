const { uuid } = require("uuidv4");
const Messages = require("../messages.js")
const TipoOperacaoModel = require("./tipo-operacao-model.js")
const Boom = require("@hapi/boom")

class OperacaoModel {

    createdAt
    valor
    tipo

    contaOrigemId
    contaDestinoId

    constructor(tipo, valor, contaOrigemId, contaDestinoId=null){

        this._id = uuid()
        this.createdAt = Date.now()
        this.tipo = tipo
        this.valor = valor
        this.contaOrigemId = contaOrigemId
        this.contaDestinoId = contaDestinoId

        this.validate()
    }

    validate(){

        if(!TipoOperacaoModel[this.tipo.toUpperCase()] ) 
            throw Boom.badRequest(Messages.Operacao.TipoInvalido)

        if(!this.contaOrigemId) 
            throw Boom.badRequest(Messages.Operacao.ContaCorrenteOrigemNulo)

        if(this.valor == 0) 
            throw Boom.badRequest(Messages.Operacao.ValorInvalido)

        if(this.tipo == TipoOperacaoModel.TRANSFERENCIA && !this.contaDestinoId) 
            throw Boom.badRequest(Messages.Operacao.ContaCorrenteDestinoNula)

        if(this.tipo == TipoOperacaoModel.TRANSFERENCIA && this.contaOrigemId == this.contaDestinoId)
            throw Boom.badRequest(Messages.Operacao.ContaOrigemIgualDestino)
    }
}

//export default OperacaoModel
module.exports = OperacaoModel
