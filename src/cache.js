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
    var resp, data = req.data;
    if (req.cache) {
        resp = getCache(data);
        if (resp) {
            req.fake = true;
            req.fakeData.success = resp;
        } else {
            req._successHandle.push(function(resp) {
                setCache(data, resp);
                return resp;
            });
        }
    }
};
