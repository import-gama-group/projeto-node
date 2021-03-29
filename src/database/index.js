const dotenv = require('dotenv')
const postgresConfig = require('./config/postgres.json')
const mongoConfig = require('./config/mongo.json')
const ContaCorrenteDbModel = require('./models/conta-corrente-dbmodel')
const UsuarioDbModel = require('./models/usuario-dbmodel')
const PessoaDbModel = require('./models/pessoa-dbmodel')
const Sequelize = require('sequelize')
const Mongoose = require('mongoose');

dotenv.config()

const postgres = new Sequelize(postgresConfig[process.env.NODE_ENV])

ContaCorrenteDbModel.init(postgres)
UsuarioDbModel.init(postgres)
PessoaDbModel.init(postgres)

//console.log(conn.models)

PessoaDbModel.associate(postgres.models)
UsuarioDbModel.associate(postgres.models)
ContaCorrenteDbModel.associate(postgres.models)


// MONGODB

const config = mongoConfig[process.env.NODE_ENV]

const login = config.username ? `${config.username}:${config.password}@` : ''

let connectionString = `mongodb://${login}${config.host}:${config.port}/${config.database}`

Mongoose.connect(connectionString, { useNewUrlParser: true }, (err) => {
    if (err) console.error(`Falha ao conectar no mongo`, err)
})


module.exports = postgres


