var FakePromise = require('./fake-promise.js');
var reqwest = require('reqwest');
module.exports = function(request){
    if(request.fake){
        promise = new FakePromise(request);
    }else{
        promise = reqwest(request.data);
    }
    var _successHandle = request._successHandle;
    var _failHandle = request._failHandle;
    var _handle = request._handle;
    for(var i=0;i<_successHandle.length;i++){
        promise.then(_successHandle[i]);
    }
    for(i=0;i<_failHandle.length;i++){
        promise.fail(_failHandle[i]);
    }
    for(i=0;i<_handle.length;i++){
        promise.always(_handle[i]);
    }
    return promise;
};
