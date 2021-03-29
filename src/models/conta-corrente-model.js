//import BaseModel from "./base-model.js"

const BaseModel = require("./base-model.js")

class ContaCorrenteModel extends BaseModel { 

    saldo
    pessoa_id

    constructor(saldo){
        super()
        this.saldo = saldo || 0
    }
    
}

//export default = ContaCorrenteModel

module.exports = ContaCorrenteModel