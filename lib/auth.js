/**
 * Created by fr3d0 on 5/23/17.
 */
'user strict';

const jwt = require('jsonwebtoken');
const auth_options = require('../config/env_conf.json');
exports.authenticate_token = function(token){
    var valid = true;
    try {
        jwt.verify(token, auth_options.secret_key);
    } catch(err) {
        valid = false;
    }
    return valid;
};
