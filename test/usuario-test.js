const Messages = require('../src/messages.js')
const UsuarioModel = require("../src/models/usuario-model.js")
const { expect, assert } = require("chai")

describe("Teste de Usuário", () => {

    describe("UNITÁRIOS", () => {

        it("Deve lançar uma exceção quando passado o paramentro login vazio", () => {
            expect(() => { new UsuarioModel("", "321654") }).to.throw(Messages.Usuario.LoginNulo)
        })

        it("Deve lançar uma exceção quando passado o paramentro login nulo", () => {
            expect(() => { new UsuarioModel(null, "321654") }).to.throw(Messages.Usuario.LoginNulo)
        })

        it("Deve lançar uma exceção quando passado o paramentro login em branco", () => {
            expect(() => { new UsuarioModel(" ", "321654") }).to.throw(Messages.Usuario.LoginNulo)
        })

        it("Deve lançar uma exceção quando passado o paramentro senha vazio", () => {
            expect(() => { new UsuarioModel("login", "") }).to.throw(Messages.Usuario.SenhaNula)
        })

        it("Deve lançar uma exceção quando passado o paramentro senha nulo", () => {
            expect(() => { new UsuarioModel("login", null) }).to.throw(Messages.Usuario.SenhaNula)
        })

        it("Deve lançar uma exceção quando passado o paramentro senha em branco", () => {
            expect(() => { new UsuarioModel("login", " ") }).to.throw(Messages.Usuario.SenhaNula)
        })

    })
})