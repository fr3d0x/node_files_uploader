/**
 * Created by dawere on 25/05/17.
 */

const jwt_auth = {
    register: function(server, options, next){
        var auth = require('../lib/auth');
        var response = require('../lib/response');
        const jwt_scheme = function (server, options) {

            return {
                authenticate: function (request, reply) {
                    const req = request.raw.req;
                    const authorization = req.headers.authorization;
                    if (!auth.authenticate_token(authorization)) {
                        return reply(response.generate_json(null, 'no autorizado', 'UNAUTHORIZED')).code(401);
                    }else{
                        return reply.continue({ credentials: authorization });
                    }

                }
            };
        };
        server.auth.scheme('jwt', jwt_scheme);
        server.auth.strategy('jwt', 'jwt');

        next();
    }
};

jwt_auth.register.attributes = {
    name: "jwt_auth",
    version: "1.0.0"
};

module.exports = jwt_auth;



