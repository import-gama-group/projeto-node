const Boom = require("@hapi/boom")

class BaseRepository {

    constructor(dbModel) {
        this.dbModel = dbModel
    }

    async add(model, transaction = null) {
        return await this.dbModel.create(model, { transaction })
    }

    async getAll(include) {
        return await this.dbModel.findAll({ include })
    }

    async getById(id, include) {
        return await this.dbModel.findByPk(id, {include})
    }

    async update(model, transaction = null) {

        const result = await this.getById(model.id)

        Object.assign(result, model)

        await result.save({ transaction })
    }

    async remove(id) {

        const result = await this.getById(id)

        if (!result) throw Boom.notFound("Registro não encontrado")

        result.destroy()
    }

}

module.exports = BaseRepository