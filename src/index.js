var FakePromise = require('./fake-promise.js');
var reqwest = require('reqwest');
var setHookFunction = require("./hook").setHookFunction;
function reqwestWrap(data, opt) {
    opt = opt || {};
    var standalone = opt.standalone;
    var cache = opt.cache;
    var hook = opt.hook;
    var request = {
        data: data,
        standalone: standalone,
        cache: cache,
        hook:hook,
        _successHandle: [],
        _failHandle: [],
        _handle: [],
        fake: false,
        fakeData: {}
    };
    var promise;

    function mid(fn) {
        fn(request);
    }
    mid(require("./hook").mid);
    mid(require("./throttle"));
    mid(require("./cache"));
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
}
reqwestWrap.setHookFunction = setHookFunction;
module.exports = reqwestWrap;
