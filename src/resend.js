var core = require("./core");
module.exports = function reqwestWrap(req) {
    var resend = req.resend;
    if (resend) {
        req._handle.push(function(resp) {
            resend(resp,function(){
                core(req);
            });
            return resp;
        });
    }
};
