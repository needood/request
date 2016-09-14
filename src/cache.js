var reqwest = require('reqwest');
var cache = {};

function getCache(data) {
    return cache[JSON.stringify(data)];
}

function setCache(data, resp) {
    cache[JSON.stringify(data)] = resp;
    return cache;
}



module.exports = function reqwestWrap(req) {
    var resp, data = req.data, cache = req.cache;
    function needCache(resp){
        if(cache === true){
            return true;
        }else if(typeof cache === "function"){
            return cache(resp);
        }
        return false;
    }
    if (req.cache) {
        resp = getCache(data);
        if (resp) {
            req.fake = true;
            req.fakeData.success = resp;
        } else {
            req._successHandle.push(function(resp) {
                if(needCache(resp)){
                    setCache(data, resp);
                }
                return resp;
            });
        }
    }
};
