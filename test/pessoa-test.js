const { assert, expect } = require("chai")
const PessoaModel = require("../src/models/pessoa-model.js")
const Messages = require('../src/messages.js')
const UsuarioModel = require("../src/models/usuario-model.js")
const ContaCorrenteModel = require("../src/models/conta-corrente-model.js")
const PessoaService = require("../src/services/pessoa-service.js")
const PessoaRepository = require("../src/repositories/pessoa-repository.js")
const sinon = require('sinon')
const DbConnection = require('../src/database')

describe("Testes de PESSOA", () => {

    describe("UNITÀRIOS", () => {

        before(() => {
            this.conn = require('../src/database')
            this.sandbox = sinon.createSandbox()
        })

        afterEach(() => {
            sinon.restore()
            this.sandbox.restore()
        })

        describe("Teste no campo Nome", () => {

            it("Deve lançar uma exceção quando passado o paramentro nome vazio", () => {
                expect(() => { new PessoaModel("", "321654") }).to.throw(Messages.Pessoa.NomeNulo)
            })

            it("Deve lançar uma exceção quando passado o paramentro nome nulo", () => {
                expect(() => { new PessoaModel(null, "321654") }).to.throw(Messages.Pessoa.NomeNulo)
            })

            it("Deve lançar uma exceção quando passado o paramentro nome em branco", () => {
                expect(() => { new PessoaModel(" ", "321654") }).to.throw(Messages.Pessoa.NomeNulo)
            })
        })

        describe("Teste no campo CPF", () => {

            it("Deve lançar uma exceção quando passado o paramentro cpf vazio", () => {
                expect(() => { new PessoaModel("Nome Teste", "") }).to.throw(Messages.Pessoa.CPFNulo)
            })

            it("Deve lançar uma exceção quando passado o paramentro cpf nulo", () => {
                expect(() => { new PessoaModel("Nome Teste", null) }).to.throw(Messages.Pessoa.CPFNulo)
            })

            it("Deve lançar uma exceção quando passado o paramentro cpf em branco", () => {
                expect(() => { new PessoaModel("Nome Teste", " ") }).to.throw(Messages.Pessoa.CPFNulo)
            })
        })

        it("Deve lançar uma exceção quando passamos o parametro usuario com o tipo incorreto", () => {
            expect(() => { new PessoaModel("Nome Teste", "17845391042", "usuario") }).to.throw(Messages.Pessoa.UsuarioTipoErrado)
        })

        it("Deve obter sucesso se passado um usuario do tipo correto", () => {

            const usuario = new UsuarioModel("teste", "teste")

            const pessoa = new PessoaModel("Nome Teste", "17845391042", usuario)
        })

        it("Deve lançar uma exceção quando passamos o parametro contaCorrente com o tipo incorreto", () => {

            var usuario = new UsuarioModel("teste", "teste")

            expect(() => { new PessoaModel("Nome Teste", "17845391042", usuario, "conta-corrente") }).to.throw(Messages.Pessoa.ContaCorrenteTipoErrado)
        })

        it("Deve obter sucesso se passado um usuario do tipo correto", () => {

            const usuario = new UsuarioModel("teste", "teste")

            const contaCorrente = new ContaCorrenteModel()

            const pessoa = new PessoaModel("Nome Teste", "17845391042", usuario, contaCorrente)

            assert.isTrue(true)
        })

        it("Deve lançar exceção quando uma pessoa existe com o mesmo cpf", async () => {

            const payload = { nome: "REMETENTE", cpf: "11111111111", login: "remetente", senha: "teste" }

            const repository = new PessoaRepository()

            this.sandbox.stub(repository, 'getByCpf').resolves(payload)

            const service = new PessoaService()

            service.repository = repository

            try {

                await service.add(payload)

                assert.fail()

            } catch (err) {

                assert.isNotNull(err)
            }
        })
    })

    describe("INTEGRADOS", () => {

        beforeEach(async () => {

            this.pessoaService = new PessoaService();

            const remetente = { nome: "REMETENTE", cpf: "11111111111", login: "remetente", senha: "teste" }

            const destinatario = { nome: "DESTINATARIO", cpf: "22222222222", login: "destinatario", senha: "teste" }

            this.pessoaOrigem = await this.pessoaService.add(remetente)

            this.pessoaDestino = await this.pessoaService.add(destinatario)

            assert.isTrue((this.pessoaOrigem != null && this.pessoaOrigem != null))
        })

        afterEach(async () => {
            //await this.pessoaService.remove(this.pessoaOrigem.id)
            //await this.pessoaService.remove(this.pessoaDestino.id)
        })

        it("Deve obter todas as pessoas na base de dados", async () => {

            const result = await this.pessoaService.getAll()

            assert.isTrue(result.length == 2)
        })

        it.only("Deve obter uma pessoa pelo id na base de dados", async () => {

            const result = await this.pessoaService.getById(this.pessoaOrigem.id)

            assert.isNotNull(result)
        })

        it("Deve atualizar uma pessoa pelo id na base de dados", async () => {

            await this.pessoaService.update(this.pessoaOrigem.id, { nome: "ALTERADO", senha: "12345" })
        })

        it("Deve inativar uma pessoa pelo id na base de dados", async () => {

            await this.pessoaService.inactivate(this.pessoaOrigem.id)
        })

        it("Deve lançar exceção quando uma pessoa existe com o mesmo cpf", async () => {

            const payload = { nome: "REMETENTE", cpf: "11111111111", login: "remetente", senha: "teste" }

            try {

                await this.pessoaService.add(payload)

                assert.fail()

            } catch (err) {

                assert.isNotNull(err)
            }
        })
        
    })
})

