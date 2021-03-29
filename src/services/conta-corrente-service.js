const ContaCorrenteRepository = require("../repositories/conta-corrente-repository.js")
const BaseService = require("./base-service.js")

class ContaCorrenteService extends BaseService {

    constructor() {
        super('Conta-Corrente', new ContaCorrenteRepository())
    }
}

module.exports = ContaCorrenteService