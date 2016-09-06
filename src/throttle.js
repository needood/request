var map = {};
module.exports = function reqwestWrap(req) {
    var standalone = req.standalone;
    if (standalone) {
        if (map[standalone]) {
            req.fakeData.fail = {
                fail: "busy"
            };
            req.fake = true;
        } else {
            map[standalone] = true;
            req._handle.push(function(resp) {
                map[standalone] = false;
                return resp;
            });
        }
    }
};
