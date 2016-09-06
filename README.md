


举个荔枝:
```
request({
    url: './test.json',
    method: 'get'
}, {
    standalone:"test2",
    hook:"ooo",
    cache: true
}).then(function(res) {
    console.log("success",res);
}).fail(function (err, msg) {
    console.log("fail",err,msg);
}).always(function (resp) {
    console.log("always do something");
});
```

url和method 为请求参数
```
{
    url: './test.json',
    method: 'get'
}
```

standalone,hook,cache为附加功能参数
```
{
    standalone:"test2",
    hook:"ooo",
    cache: true
}
```



then,fail,always分别是成功,失败,不论成败的 callback回调.
```
then(function(res) {
    console.log("success",res);
}).fail(function (err, msg) {
    console.log("fail",err,msg);
}).always(function (resp) {
    console.log("always do something");
})
```


这里只说比较重要的standalone,hook,cache三个参数的意思

- `standalone` string 或者 number标识, 两个standalone值相同的请求同时发出,后者请求失败
- `cache` cach为true时,相同的请求数据会被缓存
- `hook` string标识.

通过request.setHookFunction 设置hook function
如果有返回值,返回值为请求的返回数据

举个荔枝:
```
request.setHookFunction("ooo",function(data){
    console.log("debug");
    return {msg:"hoooook"};
});
```
