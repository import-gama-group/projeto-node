const Boom = require('@hapi/boom')

class BaseService {

    constructor(nomeEntidade, repository) {
        this.nomeEntidade = nomeEntidade
        this.repository = repository
    }

    async add(payload) {
        return await this.repository.add(payload)
    }


    async getById(id, include = null) {
        
        const result = await this.repository.getById(id, include)

        if(!result) throw Boom.notFound(`${this.nomeEntidade} não encontrada`)

        return result
    }


    async getAll(include = null) {
        return await this.repository.getAll(include)
    }

    async update(payload) {
        await this.repository.update(payload)
    }

    async remove(id){
        if(!id) Boom.badRequest(`informe o id`)

        await this.repository.remove(id)
    }

    async inactivate(id) {

        let result = await this.repository.getById(id)

        if (!result) throw Boom.notFound(`${this.nomeEntidade} não encontrada`)

        result.active = false

        await result.save()
    }

    async activate(id) {

        let result = await this.repository.getById(id)

        if (!result) throw Boom.notFound(`${this.nomeEntidade} não encontrada`)

        result.active = true

        await result.save()
    }

}

module.exports = BaseService