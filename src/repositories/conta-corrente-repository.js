const ContaCorrenteDbModel = require("../database/models/conta-corrente-dbmodel")
const BaseRepository = require("./base-repository")

class ContaCorrenteRepository extends BaseRepository{

    constructor(){
        super(ContaCorrenteDbModel)
    }
}

module.exports = ContaCorrenteRepository