var adapa = (function(){
	setTimeout(function(){
		setRem();
	},30);
	window.addEventListener('orientation' in window?"deviceorientation":"resize",setRem);
	function setRem(){
		var html = document.documentElement;
		var width = html.getBoundingClientRect().width;
		html.style.fontSize = width/15 + "px";
	}
})();


//解析地址参数
function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        // var name = decodeURIComponent($1);
        // var val = decodeURIComponent($2);                
        // val = String(val);
        obj[$1] = $2;
    });
    return obj;
}

var store = {
	fetch : function(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	},
	save : function(key,val){
		localStorage.setItem(key,JSON.stringify(val));
	},
	remove : function (key) {
		localStorage.removeItem(key);
	},
	clear:function() {
		localStorage.clear();
	}
}



//弹窗提示信息
function pop(msg){
    layer.open({
        content: msg,
        style: 'bottom:2rem',
        skin: 'msg',
        time: 2 //2秒后自动关闭,
	 });
}

// 询问
/**
   msg: string   
   callBack 点击确定之后的回调函数
**/
function askFn(msg,callBack,cancelFn){
	layer.open({
		content: msg,
		btn: ['确定', '取消'],
		no:function(index){
		   cancelFn && cancelFn();
		   layer.close(index);
		},
		yes: function(index){
		  callBack && callBack();
		  layer.close(index);
		}
	  });
 }
/**** 返回***/

function Wcx(obj) {
	return document.querySelector(obj);
}

window.onload = function () {
	if( Wcx('.backIcon') ) {
		Wcx('.backIcon').onclick = function () {
			history.go(-1);
		}
	}
}