import $ from 'jquery';
window.jQuery = $;
window.$ = $;
export const API_VERSION = "1.0.0";
export const API_LOCATION = "http://localhost/Leilo-API/api.php";

export const SUCCESS = 0;
export const ERR_DB = 1;
export const ERR_ENTITY_ALREADY_EXISTS = 2;
export const ERR_ENTITY_NONEXISTENT = 3;
export const ERR_NO_PERMS = 4;
export const ERR_INVALID_ARGS = 5;
export const ERR_INVALID_REQ = 6;
export const ERR_VERSION_MISMATCH = 7;
export const ERR_INVALID_LOGIN = 8;
export const ERR_INVALID_CALL = 9;

function APIException(message, errorCode) {
    this.message = message;
    this.errorCode = errorCode;
}

function apicall(name, params) {
    return new Promise(function(resolve,reject) {
        $.ajax({
            type: "POST",
            url: API_LOCATION,
            data: JSON.stringify({
                version: API_VERSION,
                call: name,
                params: params
            }),
            success: function (res) {
                let obj = JSON.parse(res);
                if (obj.returnCode === SUCCESS)
                    resolve(obj.returnData);
                else
                    reject(new APIException(obj.returnData, obj.returnCode));
            }
        }).catch(function (err) {
            reject(new APIException("Could not complete AJAX request", -1));
        });
    });
}

export {APIException};
export {apicall};