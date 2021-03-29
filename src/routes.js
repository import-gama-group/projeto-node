const PessoaRoutes = require('#route/pessoa')
const ContaCorrenteRoutes = require('#route/conta-corrente')
const OperacaoRoutes = require('#route/operacao')
const AuthRoutes = require('./security/auth-routes')

//export default [
module.exports = [
    ...PessoaRoutes,
    ...ContaCorrenteRoutes,
    ...OperacaoRoutes,
    ...AuthRoutes
]