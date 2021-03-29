const Routes = require("./routes.js")
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package.json');
const HapiJwt = require('hapi-auth-jwt2');
const JwtStrategy = require("./security/jwt-strategy");

class Server {

    static async init() {

        const server = await new Hapi.Server({ port: 8081, host: '0.0.0.0' })

        const swaggerOptions = {
            info: {
                title: 'Conta-Corrente API Documentation',
                version: Pack.version,
            },
        };

        await server.register([ Inert, Vision, { plugin: HapiSwagger, options: swaggerOptions }, HapiJwt ]);

        server.auth.strategy('jwt', 'jwt', JwtStrategy)

        server.auth.default('jwt');

        try {

            await server.start();

            console.log('Server running at:', server.info.uri);

        } catch(err) {
            console.log(err);
        }

        server.route(Routes);
    }
}

module.exports = Server