// import ContaCorrenteService from '#service/conta-corrente'
// import BaseHandler from './base-handler.js'

const ContaCorrenteService = require('#service/conta-corrente')
const BaseHandler = require('./base-handler.js')

class ContaCorrenteHandler extends BaseHandler {
    
    constructor() {
        super("conta-corrente", new ContaCorrenteService())
    }
}

//export default new ContaCorrenteHandler()

module.exports = new ContaCorrenteHandler()

