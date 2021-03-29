// import BaseHandler from "#handler/base"
// import OperacaoService from '#service/operacao'

const BaseHandler = require("#handler/base")
const OperacaoService = require('#service/operacao')

class OperacaoHandler extends BaseHandler{

    constructor(){
        super("operacao", new OperacaoService())
    }
}

//export default new OperacaoHandler()

module.exports = new OperacaoHandler()