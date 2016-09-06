request({
    url: './test.json',
    method: 'get'
}, {
    standalone:"test",
    cache: true
}).then(function(res) {
    console.log(1,res);
});
request.setHookFunction("ooo",function(data){
    console.log("debug");
    return {msg:"hoooook"};
});
request({
    url: './test.json',
    method: 'get'
}, {
    standalone:"test2",
    hook:"ooo",
    cache: true
}).then(function(res) {
    console.log(2,res);
});
request({
    url: './test.json',
    method: 'get'
}, {
    standalone:"test",
    cache: true
}).fail(function(err,msg) {
    console.log(3,err,msg);
});

setTimeout(function() {
    request({
        url: './test.json',
        method: 'get'
    }, {
    standalone:"test",
    cache: true
})
    .then(function(res) {
        console.log(4,res);
    });
}, 500);
