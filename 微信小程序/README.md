##  微信小程序的注意事项

### 开发的准备阶段
 - 注册一个公司的账号，这样没有那么多限制
 - 下载微信开发工具
 -  微信支付可以提前申请
### 开发中
-  如果已经有了h5页面，这时候只需要把样式文件、结构文件转化一下， 首先转化结构文件.wxml  把body里面的内容复制的需要的页面，转化样式文件可以利用less/scss的工具
-  转化为.wxss 文件，如果设计稿刚好是750的，那这时转化就很简单只需要把样式里面的文件单位变量@单位、$单位改为  @1rpx ，转化为.wxss 我这里利用的是vscode的less插件，生成wxss文件 
- 小程序的绑定事件是用bind + 事件名  ，例如bindtap ，bindchange 等 
- 小程序的传参一般是在元素设置 data-自定义属性 = "{{变量}}"  ，然后在执行的函数e（事件源）里接收
-  小程序 表单组件比较常用 ，一般用<form bindsubmit="formFn"><input type="text" name="msg"/><button form-type="submit">提交</button></form> 注意按钮用button 然后里面
   form-type对应bindsubmit 的事件名，这样在formFn 函数接收一个事件参数，包含input 的name为msg 的属性 ，其他也是一样
- 小程序的列表 渲染 ，用的是wx:for="{{数组}}" ，最好在外层加个<block wx:for="{{arr}}" wx:key="{{index}}"></block>  绑定一下wx:key  
- 如果样式要引入其他文件的样式，用@import '../html/xx.wxss'; 使用相对路径
- xx.js 要引入公共的js 使用 import { layerMsg } from '../../utils/xx.js'  这样使用的是按需加载方法 ，在utils/xx.js' 的js 要用 module.exports = {  layerMsg }
-  1. 如果要使用插件，现在后台添加需要插件，然后在app.json里面加入 
  "plugins": {
      "cityLd": {
        "version": "1.0.6",
        "provider": "wx000afcfee2b0af8f"
      }
    }
  2.  在你需要的文件的xx.json 加入
     "usingComponents": {
      "region": "plugin://cityLd/region"  这是插件的一个协议
     },
  3. 在页面的js 用  let cityObj = requirePlugin('cityLd'); 引入 这样就可以对应的插件功能
    



### 我的文件目录
   - pages
      - html
        - xx.wxml
        - xx.wsxx
        - xx.js
        - xx.json
      - utils (公用的方法)
        - xxx.js 
      - index
        - index.wxml
        - index.wxss
        - index.js
        - index.json
      - app.js
      - app.wxss(公共的样式放在这里)
      - app.json
      


