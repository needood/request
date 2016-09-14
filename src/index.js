var setHookFunction = require("./hook").setHookFunction;
var core = require("./core");
function reqwestWrap(data, opt) {
    opt = opt || {};
    var standalone = opt.standalone;
    var cache = opt.cache;
    var hook = opt.hook;
    var resend = opt.resend;
    var request = {
        data: data,
        standalone: standalone,
        cache: cache,
        hook:hook,
        resend:resend,
        _successHandle: [],
        _failHandle: [],
        _handle: [],
        fake: false,
        fakeData: {}
    };
    request.setHandle = function(successFn,failFn,alwaysFn){
        if(typeof successFn ==="function"){
            request._successHandle.push(successFn);
        }
        if(typeof failFn ==="function"){
            request._failHandle.push(failFn);
        }
        if(typeof alwaysFn ==="function"){
            request._handle.push(alwaysFn);
        }
    };
    var promise;

    function mid(fn) {
        fn(request);
    }
    mid(require("./hook").mid);
    mid(require("./throttle"));
    mid(require("./resend"));
    mid(require("./cache"));
    return core(request);
}
reqwestWrap.setHookFunction = setHookFunction;
module.exports = reqwestWrap;
