import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import {API_LOCATION, API_VERSION, SUCCESS} from '../consts';

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