/**
 * Created by fr3d0 on 30/05/17.
 */
const Sequielize = require('sequelize');
const env = require('../config/env_conf.json').db_conn;
const db = new Sequielize(env);
module.exports = db;