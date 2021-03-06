var listObj = [
    {
        title: '玩转属性操作',
        url: [
             {
                type: 'rn',
                t: '揉捏div'
            },
            {
                type: 'rn_a',
                t: 'a标签价rel的属性'
            }
       ]
    },
    {

        title: '数据筛选与判断',
        url: [{
            type: 'yzqq',
            t: '验证qq号码'
        }]
    },
    {

        title: 'for循环',
        url: [
            {
                type: 'cf',
                t: '乘法表'
            },
            {
                type: 'pt',
                t: '图片拼图'
            },
            {
                type: 'hp',
                t: '数据合并' 
            },
            {
                type:'dsx',
                t: '数据筛选'
            },
            {
                type: 'xl',
                t: '下拉菜单'
            }
        ]
    },
    {
        title: '定时器',
        url : [
            {
               type:'timer_tab',
               t:'自动选项卡'
            },
            {
                type:'timer_towtab',
                t:'选项卡嵌套'
            },
            {
                type:'timer_ys',
                t:'QQ延时显示弹框'
            },
            {
                type:'timer_ad',
                t:'出现广告'
            },
            {
                type:'timer_dj',
                t:'倒计时'
            }
        ]
    },
    {
        title: '字符串与数组练习',
        url : [
            {
                type:'str_replace',
                t:'查找替换文字'
            },
            {
                type:'str_by',
                t:'文字搬运工'
            },
            {
                type:'str_sort',
                t:'排序'
            },
            {
                type:'arr_3d',
                t:'伪3D图片切换'
            },
            {
                type:'arr_select',
                t:'全选与反选'
            },
            {
                type:'arr_loop',
                t:'无限级菜单'
            }
        ]
    },
    {
        title: '动画练习',
        url : [
            {
               type:'dh_t',
               t:'transition'
            },
            {
                type:'dh_a',
                t:'animation'
            },
            {
                type:'dh_kj',
                t:'运动框架封装'
            },
            {
                type:'dh_wf',
                t:'无缝滚动'
            },
            {
                type:'dh_nav',
                t:'3d导航菜单'
            },
            {
                type:'dh_bpan',
                t:'表盘与日历'
            }
        ]
    },
    {
        title: 'flex布局',
        url : [
            {
               type:'flex_vw',
               t:'flex布局与vw的使用'
            }
        ]
    },
    {
        title: 'js设计模式',
        url : [
            {
               type:'ms_sp',
               t:'发布_订阅'
            }
        ]
    },
    {
        title: 'Es6练习',
        url : [
            {
               type:'es6_list',
               t:'员工列表' 
            },
            {
                type:'es6_allcheck',
                t:'百度全选'  
            }, 
            {
                type:'es6_async',
                t:'链式运动的'  
            },
            {
                type:'es6_await',
                t:'异步的同步写法'  
            }
        ]
    },
    {
        title: 'DOM练习',
        url : [
            {
               type:'dom_munu',
               t:'递归_菜单' 
            },
            {
                type:'dom_mununode',
                t:'递归菜单_dom' 
            },
            {
                type:'dom_yupan',
                t:'云盘练习' 
            },
            {
                type:'dom_star',
                t:'星星评价' 
            }
        ]
    },
    {
        title: '事件详解',
        url : [
            {
               type:'ev_munu',
               t:'自定义菜单' 
            },
            {
                type:'ev_drag',
                t:'拖拽' 
            },
            {
                type:'ev_keycode',
                t:'键盘控制图片' 
            }
        ]
    },
    {
        title: '面向对象',
        url : [
            {
               type:'obj_tap',
               t:'面向对象tab选项卡' 
            },
            {
                type:'obj_class',
                t:'es6的类' 
            }
        ]
    },
    {
        title: 'nodejs',
        url : [
            {
               type:'node_http',
               t:'node_动态页面' 
            }
        ]
    },
    {
        title: '移动端',
        url : [
            {
               type:'page_yd',
               t:'摇一摇' 
            } ,
            {
                type:'page_flex',
                t:'flex布局与vw的使用' 
             } ,
             {
                type:'page_bsjz',
                t:'上拉刷新与下拉加载' 
             } ,

             {
                type:'page_picker',
                t:'picker的使用' 
             }
        ]
    }



];


function $(obj) {
    return document.querySelector(obj);
}

function $$(obj) {
    return document.querySelectorAll(obj);
}

/*** 设置样式 ***/

function css( obj,sVal ) {
    if( typeof sVal == 'object' &&  sVal ) {
        for( var i in sVal ) {
            obj.style[i] = sVal[i];
        }
    }
    return 0;
}

//深拷贝
function deepCopy(obj){
    var newObj;
    if( RepType(obj) === 'array'){
        newObj = []
    }else if( RepType(obj) === 'object'){
        newObj = {}
    }else{
        return obj;
    }
    for( var i in obj ){
      if( obj.hasOwnProperty(i) ) {
         if( typeof obj[i] === 'object') {
          newObj[i] = deepCopy(obj[i])
         }else{
             newObj[i] = obj[i]
         }
      }
        
    }
    return newObj;
}
//判断类型
function RepType(ry){
    return Object.prototype.toString.call(ry).toLowerCase().slice(8,-1);
}
//解析地址参数
function getQueryObject( url ) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);                
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}
function getCssStyle( obj ) {
    return obj.currentStyle ? obj.currentStyle : document.defaultView.getComputedStyle(obj);
}

//缓存数据
var store = {
    save : function(name,value){
      localStorage.setItem(name,JSON.stringify(value));
    },
    fetch:function(value){
      return JSON.parse(localStorage.getItem(value)) || [];
    },
    remove : function(name){
        localStorage.removeItem(name);
    },
    clear : function(){
         localStorage.clear();
    }
}