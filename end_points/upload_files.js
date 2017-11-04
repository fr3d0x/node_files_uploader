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
                    if (!fs.existsSync(dir+payload.file_name)){
                        shell.mkdir('-p', dir+payload.file_name);
                    }
                    fs.writeFileSync(paths.files_route+payload.file_name+"/"+payload.nombre+payload.ext, payload.documento, 'base64');
                    payload.documento = paths.files_route+payload.file_name+"/"+payload.nombre+payload.ext;
                    let attatchments_folder = paths.files_route+payload.file_name+"/anexos";
                    if(payload.anexos.length > 0){
                        if (!fs.existsSync(attatchments_folder)){
                            shell.mkdir('-p', attatchments_folder);
                        }
                        payload.anexos.forEach(function (anexo) {
                            fs.writeFileSync(attatchments_folder+anexo.nombre+anexo.ext, anexo.documento, 'base64');
                            anexo.documento = attatchments_folder+anexo.nombre+anexo.ext;
                        })
                    }
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