/**
 * Created by fr3d0 on 6/1/17.
 */
'use strict';

const response = require('../lib/response');
const holamundo = {
    register: function(server, option, next){
        server.route([
            {
                method: "GET",
                path: "/api/holamundo",
                handler: function(request, reply){
                    reply({payload: "hola Server", status: "SUCCESS"}).code(200)
                }
            }
        ]);
        next();
    }
};

holamundo.register.attributes = {
    name: "holamundo",
    version: "1.0.0"
};

module.exports = holamundo;