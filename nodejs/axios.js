
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
async function testAjax() {
    let res = await reAjax.post('http://localhost:3001/wcx',{
       name : 'wcx'
    },{
        headers : {
          myName:'mike'
        }
    });
    console.log( res );
  }
  
  testAjax();