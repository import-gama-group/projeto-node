const PessoaService = require("#service/pessoa")
const BaseHandler = require("#handler/base")

class PessoaHandler extends BaseHandler{

    constructor(){
        super("pessoa", new PessoaService())
    }
}

module.exports = new PessoaHandler()