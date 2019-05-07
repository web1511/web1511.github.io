var listObj = [
    {
        title: '玩转属性操作',
        url: [{
            type: 'rn',
            t: '揉捏div'
        }]
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
        title: '字符串练习',
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