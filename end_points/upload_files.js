/**
 * Created by fr3d0 on 6/1/17.
 */
'use strict';

const response = require('../lib/response');
const fs = require('fs');
const paths = require('../config/env_conf.json').server.paths;
const shell = require('shelljs');
const upload_big_files = {
    register: function(server, option, next){
        server.route([
            {
                method: "POST",
                path: "/api/upload_files",
                config:{
                    payload:{
                        maxBytes: 200000000000
                    }
                },
                handler: function(request, reply){
                    const payload = request.payload;
                    const dir = require('../config/env_conf.json').server.paths.files_route;
                    if (!fs.existsSync(dir+payload.name)){
                        shell.mkdir('-p', dir+payload.name);
                    }
                    fs.writeFileSync(dir+payload.name+"/"+payload.name, payload.base64, 'base64');
                    payload.file_url = "/uploads/"+payload.name;
                    reply({payload: payload, status: "SUCCESS"}).code(200)
                }
            }
        ]);
        next();
    }
};

upload_big_files.register.attributes = {
    name: "upload_big_files",
    version: "1.0.0"
};

module.exports = upload_big_files;