var hookMap = {};



function getCache(key,data) {
    if(hookMap[key]){
        return hookMap[key](data);
    }
}

function setCache(key, value) {
    if(typeof value === "function"){
        hookMap[key] = value;
    }else{
        hookMap[key] = function(){
            return value;
        };
    }
    return hookMap;
}



module.exports = {
    setHookFunction:setCache,
    mid:function reqwestWrap(req) {
        var resp, data = req.data;
        if (req.hook) {
            resp = getCache(req.hook,data);
            if (resp) {
                req.fake = true;
                req.fakeData.success = resp;
            } else {
                req._successHandle.push(function(resp) {
                    return resp;
                });
            }
        }
    }
};
