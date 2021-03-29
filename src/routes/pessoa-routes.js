const PessoaHandler = require("#handler/pessoa")
const Joi = require('joi')

module.exports = [
    {
        method: 'POST',
        path: '/api/v1/pessoa',
        config: {
            auth: 'jwt',
            handler: PessoaHandler.add,
            description: 'Adicionar uma pessoa',
            notes: 'Retorna os dados de usuario e conta corrente da pessoa adicionada',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload: Joi.object({
                    nome: Joi.string().min(5).max(20).required(),
                    cpf: Joi.string().min(11).max(11).required(),
                    login: Joi.string().min(5).max(20).required(),
                    senha: Joi.string().min(5).max(20).required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/api/v1/pessoa',
        handler: PessoaHandler.getAll,
        config: {
            description: 'Obtem todas as pessoas',
            notes: 'Retorna os dados de todas as pessoas',
            tags: ['api'], // ADD THIS TAG
        }

    },
    {
        method: 'GET',
        path: '/api/v1/pessoa/{id}',
        handler: PessoaHandler.getById,
        config: {
            description: 'Obtem as pessoa por id',
            notes: 'Retorna os dados da pessoa',
            tags: ['api'], // ADD THIS TAG
        }
    },
    {
        method: 'PUT',
        path: '/api/v1/pessoa/{id}',
        handler: PessoaHandler.update,
        config: {
            description: 'Atualiza pessoa por id',
            notes: 'Retorna status OK',
            tags: ['api'], // ADD THIS TAG
            validate: {
                params: Joi.object({
                    id: Joi.string().guid()
                }),
                payload: Joi.object({
                    nome: Joi.string().min(5).max(20).required(),
                    senha: Joi.string().min(5).max(20).required()
                })

            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/v1/pessoa/{id}',
        handler: PessoaHandler.inactivate,
        config: {
            description: 'Inativa pessoa por id',
            notes: 'Retorna status OK',
            tags: ['api'], // ADD THIS TAG
            validate: {
                params: Joi.object({
                    id: Joi.string().guid()
                }),
            }
        }
    },
]
