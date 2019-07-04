### node使用https，搭建网站
## HTTPS和HTTP的区别
  - https协议需要到ca申请证书，一般免费证书很少，需要交费。

  -  http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。

  -  http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

  -  http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

## 具体操作
 1. 只要安装了git客户端就会有openssl
 2. 首先下载安装git-bush这个
 3. 参考网站 https://www.cnblogs.com/xbblogs/p/9367764.html
 4. 进入的相应的目录 
  - 检测openssl是否安装
      - 输入命令  openssl version -a
  -  接下来开始生成证书：
     1. 生成私钥key文件：
        - openssl genrsa -out privatekey.pem 1024

      2. 通过私钥生成CSR证书签名  （需要填一些信息、可直接回车）
        - openssl req -new -key privatekey.pem -out certrequest.csr

      3. 通过私钥和证书签名生成证书文件 
         - openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem

 5. 执行完第三条命令会看到：     
     -  Signature ok

 ## Node.js 建立httpsvar 
       - let https = require('https')
            ,fs = require("fs");
            let options = {
                key: fs.readFileSync('./privatekey.pem'),
                cert: fs.readFileSync('./certificate.pem')
            };

            https.createServer(options, app).listen(3011, function () {
                console.log('Https server listening on port ' + 3011);
            });
          
  