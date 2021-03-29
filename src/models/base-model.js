//import { uuid }  from "uuidv4"
//import { v4 as uuid_v4 } from "uuid";

const { uuid } = require("uuidv4")

class BaseModel {
    
    id
    active

    constructor(){

        this.id = uuid()
        this.active = true
    }
}

//export default BaseModel

module.exports = BaseModel