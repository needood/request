var hookMap = {};



function getCache(key,data,fn) {
    if(hookMap[key]){
        return hookMap[key](data,fn);
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
            resp = getCache(req.hook,data,req.setHandle);
            if (resp) {
                req.fake = true;
                if(Object.prototype.toString.call(resp)=== "[object Error]"){
                    req.fakeData.fail = resp;
                }else{
                    req.fakeData.success = resp;
                }
            }
        }
    }
};
