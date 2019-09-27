/**** 
 * 
 *   1.axios 默认是复杂请求 所以会发送预检请求 ，因为Content-Type : application/json
 *   
 *   2.服务端首页要允许 options 这个请求方法
 * 
 *   3. 当post 的请求给后台发送参数了，服务端接受的前端拿到的参数 可以利用koa-body 来做中间件
 * 
 *    4. 当post 请求头（headers 有带参数过去） 服务端要设置 
 *     ctx.set('Access-Control-Allow-Headers','Content-Length,Content-Type,对应的头部参数')
 * ***/

const koa = require('koa');
const Router = require('koa-router');
const koaHeader = require('koa-header'); //设置头部信息
const koaBody = require('koa-body'); //接受 post 请求的参数，ctx.request.body 就能拿到对应的参数
const app = new koa();
const route = new Router();

app.use( koaBody({
    multipart :true
}))
app.use( (ctx,next) => {
    //koaHeader('myName');
    //koaBody();
    ctx.set('Access-Control-Allow-Origin','*');
    ctx.set('Access-Control-Allow-Headers','Content-Type,Content-Length,myName');
    ctx.append('result','co');
    next();
})

route.options('*',ctx => {
   ctx.body = "";
})
route.post('/wcx', ctx => {


    //console.log(5555);
   // console.log(ctx.request.body);
    ctx.body =   JSON.stringify({
        name : 'mike',
        age : 20 ,
        hoby: 'sing',
        ...ctx.request.body
    })
});
//console.log( route );
app.use( route.routes() );

app.listen(3001,_ => {
    console.log('监听成功....,http://localhost:3001');
});
