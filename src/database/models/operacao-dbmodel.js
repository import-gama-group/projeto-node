const Mongoose = require('mongoose')
const { uuid } = require('uuidv4')

const schema = new Mongoose.Schema({

    _id: { type: String },
    createdAt: { type: Date, default: new Date() },
    valor: Number,
    tipo: String,
    contaOrigemId: String,
    contaDestinoId: String

}, { collection: 'operacao' })

const OperacaoDbModel = Mongoose.model('Operacao', schema)

module.exports = OperacaoDbModel