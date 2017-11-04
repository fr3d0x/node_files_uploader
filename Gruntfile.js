/**
 * Created by fr3d0 on 6/1/17.
 */
'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var conf_file = {
        dir: require('./package.json').config_path
    };
    var db_conf = require('./config/db.json');
    var server_conf = require('./config/server.json');
    var auth_conf = require('./config/auth.json');

    // Define the configuration for all the tasks
    grunt.initConfig({

        /**clean task for deleting files when needed**/
        clean: {
            json: ['./config/env_conf.json']
        },
        /** Fin de variables globales**/
        json_generator: {
            dev_config: {
                dest: "./config/env_conf.json",
                options: {
                    name: "development",
                    server: server_conf.dev,
                    secret_key: auth_conf.secret_key

                }
            },
            QA_config:{
                dest: "./config/env_conf.json",
                options: {
                    name: "QA",
                    server: server_conf.qa,
                    secret_key: auth_conf.secret_key
                }
            },
            production_config:{
                dest: "./config/env_conf.json",
                options: {
                    name: "production",
                    server: server_conf.production,
                    secret_key: auth_conf.secret_key

                }
            }
        }
    });



    grunt.registerTask('development', [
        'clean:json',
        'json_generator:dev_config' //Agregado para las variables globales
    ]);
    grunt.registerTask('QA', [
        'clean:json',
        'json_generator:QA_config' //Agregado para las variables globales
    ]);
    grunt.registerTask('production', [
        'clean:json',
        'json_generator:production_config' //Agregado para las variables globales
    ]);
};
