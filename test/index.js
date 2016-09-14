request({
    url: './test.json',
    method: 'get'
}, {
    standalone:"test",
    cache: true
}).then(function(res) {
    console.log(1,res);
}).fail(function(err,msg){
    console.log(err,msg,err.status);

});
request.setHookFunction("ooo",function(data,setHandle){
    console.log("debug");
    setHandle(null,null,function(resp){
        console.log("response debug",resp);
        return resp;
    });
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
}).block(function(req) {
    console.log(3,"block",req);
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


request({
    url: './test2.json',
    method: 'get'
}, {
    standalone:"test6",
    resend:function(resp,resend){
        console.log(resp,resp.status);
        if(resp.status===404){
            setTimeout(function(){
                resend();
            },500);

        }
    },
    cache: true
});
