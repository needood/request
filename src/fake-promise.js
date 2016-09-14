function FakePromise(req) {
    this.fakeData = req.fakeData;
    this.context = this.fakeData.success;
}

FakePromise.prototype = {
    then: function(cb, errFn) {
        if (!this.fakeData.fail) {
            this.context = cb(this.context);
        } else if (errFn) {
            errFn(this.fakeData.fail, this.fakeData.fail);
        }
        return this;
    },
    fail: function(cb) {
        if (this.fakeData.fail) {
            cb(this.fakeData.fail, this.fakeData.fail.message);
        }
        return this;
    },
    always: function(cb) {
        this.context = cb(this.context);
        return this;
    },
    block: function(cb){
        if (this.fakeData.block) {
            cb(this.fakeData.block);
        }
        return this;
    },
    constructor: FakePromise
};

module.exports = FakePromise;
