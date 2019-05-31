## gulp 开发和打包的简单配置

### gulp 开发配置
 - 采用的是browser-sync的方法，十分方便同时和手机端和pc端同步
 - 用法gulp.task('dev') 里面有个数组~就是配置基于当前目录的文件 例如 css/**/*.css 这样就是监听当前目录下的所有css文件，当然其他文件也是一样的，全部丢到数组里面
   然后执行 npm run dev
### gulp 打包配置
- gulp的src为文件入口文件，gulp.dest为文件输出路径，注意的是gulp.task接受一个自定义命令，返回的是一个promise
- gulp每个执行的任务都是异步的，所以执行的时候要注意不能这样写
 1. gulp.task('随便来点文字了',['clean','cssmin','jsmin']) 这样执行是同步会报错，最好是先执行完清除，然后接受回调，在里面用async/await 或者promise来
   写，这样基本不会报错
 2. 注意的gulp.src(['css/font/**/*','css/font2/**/*'],{base:'css'}).pipe(gulp.dest('dist/css')) 当src里面接受一个数组表示匹配多个的文件的时候，最后设置一下base:css 这样表示从font开始匹配，输出的文件就是 dist/css/font/xx.svg;如果不设置输出的文件就是dist/css/xx.svg;这个是要特别注意的
 3. 配置后文件目录之后 命令行输入  npm run dist  


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
      - package.json
      - gulpfile.js

     ### 打包之后的文件就全部在dist目录下啦           


