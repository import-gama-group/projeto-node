/// Composição dos teste
/// AAA => Arrange, Act e Assert
// Arrange => preparação do cenário do teste
// Act => a execução do test
// Assert => define o status do teste (falha/sucesso)

/// Metodo para se escrever testes
/// RGR => Red, Green e Refactor
/// Red => Primeiro escrevo todos os casos de testes e defino todos os status como falha
/// Green => Segundo, codificação para os testes acertarem
/// Refactor => Refatoração do seu codigo quando necessário

const { assert, expect } = require('chai')
const OperacaoModel = require('../src/models/operacao-model.js')
const TipoOperacaoModel = require('../src/models/tipo-operacao-model.js')
const ContaCorrenteModel = require('../src/models/conta-corrente-model.js')
const Messages = require('../src/messages.js')
const OperacaoService = require('../src/services/operacao-service')
const sinon = require('sinon')

const ContaCorrenteRepository = require('../src/repositories/conta-corrente-repository')
const DbConnection = require('../src/database')
const PessoaService = require('../src/services/pessoa-service.js')

describe("Testes de OPERACAO", () => {

    describe("UNITÁRIOS", () =>{

        before(() => {
            this.sandbox = sinon.createSandbox()
        })
    
        afterEach(() => {
            sinon.restore()
            this.sandbox.restore()
        })
    
        it("Deve lançar exceção quando o tipo de operação for inválido", () => {
            expect(() => {
                new OperacaoModel("SAQUE", 0, new ContaCorrenteModel())
            }).to.throw(Messages.Operacao.TipoInvalido)
        })
    
        it("Deve lançar exceção quando a conta-corrente origem for nula", () => {
            expect(() => {
                new OperacaoModel(TipoOperacaoModel.RETIRADA, 10, null)
            }).to.throw(Messages.Operacao.ContaCorrenteOrigemNulo)
        })
    
        it("Deve lançar exceção quando o valor da operação for inválido", () => {
            expect(() => {
                new OperacaoModel(TipoOperacaoModel.RETIRADA, 0, new ContaCorrenteModel())
            }).to.throw(Messages.Operacao.ValorInvalido)
        })
    
        it("Deve lançar exceção quando a conta-corrente destino for nula", () => {
            expect(() => {
                new OperacaoModel(TipoOperacaoModel.TRANSFERENCIA, 100, new ContaCorrenteModel())
            }).to.throw(Messages.Operacao.ContaCorrenteDestinoNula)
        })
    
        it("Deve lançar exceção quando a conta-corrente origem é a mesma da conta-corrente destino", () => {
            expect(() => {
                const conta = new ContaCorrenteModel()
                new OperacaoModel(TipoOperacaoModel.TRANSFERENCIA, 100, conta, conta)
            }).to.throw(Messages.Operacao.ContaOrigemIgualDestino)
        })
    
        it("Deve lançar exceção quando a operação tem o valor maior que o saldo da conta-corrente ", async () => {
    
            const service = new OperacaoService()
    
            const repository = new ContaCorrenteRepository()
    
            const conta = new ContaCorrenteModel()
    
            this.sandbox.stub(repository, 'getById').returns(conta)
    
            service.contaCorrenteRepository = repository
    
            const operacao = new OperacaoModel(TipoOperacaoModel.RETIRADA, 100, conta)
    
            try{
    
                await service.add(operacao)
    
                assert.fail()
    
            } catch(err){
                assert.isTrue(err.message == Messages.Operacao.SaldoInsuficiente)
            }
        })
    
        it("Deve realizer uma operação de RETIRADA com sucesso", async () => {
    
            const service = new OperacaoService()
    
            const contaCorrenterepository = new ContaCorrenteRepository()
    
            this.sandbox.stub(contaCorrenterepository, 'getById').returns({ id: "xpto", saldo: 3000 })
    
            this.sandbox.stub(contaCorrenterepository, 'update').call(() => { console.log('fez update') })
    
            service.contaCorrenteRepository = contaCorrenterepository
    
            const operacao = new OperacaoModel("RETIRADA", 200, "xpto")
    
            await service.add(operacao)
        })
    
        it("Deve realizar uma operação de DEPÓSITO com sucesso", async () => {
    
            const operacaoService = new OperacaoService()
    
            const contaCorrenterepository = new ContaCorrenteRepository()
    
            this.sandbox.stub(contaCorrenterepository, 'getById').returns({ id: "xpto", saldo: 3000 })
    
            this.sandbox.stub(contaCorrenterepository, 'update').call(() => { console.log('fez update') })
    
            operacaoService.contaCorrenteRepository = contaCorrenterepository
    
            const operacao = new OperacaoModel("DEPOSITO", 200, "xpto")
    
            await operacaoService.add(operacao)
        })
    
        it("Deve obter todas as operaçôes da base de dados", async () => {
    
            const service = new OperacaoService()
    
            const result = await service.getAll()
    
            //console.log(result)
    
            assert.isTrue(result.length > 0)
        })
    
        it("Deve obter todas as operações da base de dados de uma conta especifica", async () => {
    
            const operacaoService = new OperacaoService()
    
            const result = await operacaoService.getByAccountId("xpto")
    
            assert.isTrue(result.length > 0)
        })
    })

    describe("INTEGRADOS", () => {

        beforeEach(async() =>{

            const remetente = { nome: "REMETENTE", cpf: "11111111111", login: "remetente", senha: "teste" }

            const destinatario = { nome: "DESTINATARIO", cpf: "22222222222", login: "destinatario", senha: "teste" }

            this.pessoaService = new PessoaService()

            this.operacaoService = new OperacaoService()

            this.pessoaOrigem = await this.pessoaService.add(remetente)

            this.pessoaDestino = await this.pessoaService.add(destinatario)
            
        })

        afterEach(async() => {
            await this.pessoaService.remove(this.pessoaOrigem.id)
            await this.pessoaService.remove(this.pessoaDestino.id)
        })

        it("Deve realizar uma operação de DEPÓSITO com sucesso", async () => {

            const operacao = new OperacaoModel("DEPOSITO", 1000, this.pessoaOrigem.contaCorrenteId)

            await this.operacaoService.add(operacao)
        })

        it("Deve realizar uma operação de RETIRADA com sucesso", async () => {

            const deposito = new OperacaoModel("DEPOSITO", 1000, this.pessoaOrigem.contaCorrenteId)

            await this.operacaoService.add(deposito)

            const retirada = new OperacaoModel("RETIRADA", 200, this.pessoaOrigem.contaCorrenteId)

            await this.operacaoService.add(retirada)
        })

        it("Deve realizar uma transferência entre contas-corrente e registrar a operacao na base de dados", async () => {

            const deposito = new OperacaoModel("DEPOSITO", 1000, this.pessoaOrigem.contaCorrenteId)

            await this.operacaoService.add(deposito)

            const transferencia = new OperacaoModel("TRANSFERENCIA", 300, this.pessoaOrigem.contaCorrenteId, this.pessoaDestino.contaCorrenteId)

            await this.operacaoService.add(transferencia)
        })

        it("Deve obter uma operação da base de dados", async () => {

            const deposito = new OperacaoModel("DEPOSITO", 1000, this.pessoaOrigem.contaCorrenteId)

            await this.operacaoService.add(deposito)

            const result = await this.operacaoService.getById(deposito._id)

            assert.isNotNull(result)
        })
    })
})
