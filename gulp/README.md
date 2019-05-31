## gulp 开发和打包的简单配置

### gulp 开发配置
 - 采用的是browser-sync的方法，十分方便同时和手机端和pc端同步
### gulp 打包配置
- gulp的src为文件入口文件，gulp.dest为文件输出路径，注意的是gulp.task接受一个自定义命令，返回的是一个promise
- gulp每个执行的任务都是异步的，所以执行的时候要注意不能这样写
 1. gulp.task('随便来点文字了',['clean','cssmin','jsmin']) 这样执行是同步会报错，最好是先执行完清除，然后接受回调，在里面用async/await 或者promise来
   写，这样基本不会报错


### 我的文件目录
   - h5
      - css
        - font
        - font_new
        - xxx.css
      - js
        - xxx.js 
      - img
        - index
          - xxx.png
        - banner
          - xxx.png
      - plugins
        - swiper
           - xx.js
        - popup
           - xx.js
      - dist     
      - xxx.html
      - xxx2.html

     ### 打包之后的文件就全部在dist目录下啦           


