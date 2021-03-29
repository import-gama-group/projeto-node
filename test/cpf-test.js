const { assert } = require("chai")
const CpfUtil = require("../src/util/cpf-util.js")

describe("Testes de CPF", () => {

    describe("UNITARIOS", () => {

        it("Deve retornar 'false' quando passado o um CPF inválido", () => {

            var cpf = "1234124sdafasf"

            assert.isFalse(CpfUtil.isValid(cpf))
        })

        it("Deve retornar 'true' quando passado um CPF válido com máscara", () => {

            var cpf = "178.453.910-42"

            assert.isTrue(CpfUtil.isValid(cpf))
        })

        it("Deve retornar 'true' quando passado um CPF válido sem máscara", () => {

            var cpf = "17845391042"

            assert.isTrue(CpfUtil.isValid(cpf))
        })
    })
})