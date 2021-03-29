class BaseHandler {

    service
    modelName

    constructor(modelName, service) {
        this.service = service

        this.modelName = modelName
    }

    add = async (request, h) => {

        const result = await this.service.add(request.payload)

        return h
            .response(result)
            .location(`http://localhost:8081/api/v1/${this.modelName}/${result.id}`)
            .code(201)
    }

    getAll = async (request, h) => {
        return h
            .response(await this.service.getAll())
            .code(200)
    }

    getById = async (request, h) => {

        const id = request.params.id

        return h
            .response(await this.service.getById(id))
            .code(200)
    }

    update = async (request, h) => {
        await this.service.update(request.params.id, request.payload)
        return h.response().code(200)
    }

    remove = async (request, h) => {
        await this.service.remove(request.params.id)
        return h.response().code(200)
    }

    inactivate = async (request, h) =>{
        await this.service.inactivate(request.params.id)
        return h.response().code(200)
    }

}
//export default BaseHandler

module.exports = BaseHandler

