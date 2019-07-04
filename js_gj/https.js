let https = require('https');
let fs = require('fs');
let body = '';
let options = {
        key: fs.readFileSync('./privatekey.pem'),
        cert: fs.readFileSync('./certificate.pem')
}

let data = JSON.stringify({
        grant_type : 'client_credential',
        appid : 'wx67d23815eff76fe9',
        secret : '5563eda802f0bb52ae5b6038bdc7c88e'
})
let reqOpt = {
        host: 'localhost',
        port: '3008',
        method: 'POST',
        path: 'https://api.weixin.qq.com/wxa/getwxacode',
        headers: {
                "Content-Type": 'application/json',
                "Content-Length": data.length
        }

}

const server = https.createServer(options, (req, res) => {
        // let reqs = https.request(reqOpt, function (res) {
        //         console.log("response: " + res.statusCode);
        //         res.on('data', function (data) {
        //                 body += data;
        //         }).on('end', function () {
        //                 console.log('这是我的数据',body);
                       
        //         });
        // }).on('error', function (e) {
        //         console.log("error: " + e.message);
        // })
        res.write('ss');
        res.end()
        
});


server.listen(3008);
console.log('启动成功');
