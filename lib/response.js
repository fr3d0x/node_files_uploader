/**
 * Created by dawere on 24/05/17.
 */
'use strict';


/*Generate Json response*/
exports.generate_json = function(data, msg, status){
    var resp = {};
    resp.data = data;
    resp.msg = msg;
    resp.status = status;

  return resp;
};
