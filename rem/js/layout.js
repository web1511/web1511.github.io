	var iScale = 1;

	var dpr = window.devicePixelRatio;//获取手机设备像素比

	var iSiphone = /iPhone/i.test(navigator.userAgent);//正则检验是否是iphone设备

	var iWidth = 0;
	
	function joinMeta(obj){//设置meta标签函数

		document.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=' + obj + ',minimum-scale=' + obj + ',maximum-scale=' + dpr + '">');
	}

	function setFonsize(){//动态计算宽度设置根元素的字体大小函数

		$('html').css('fontSize', iWidth/10);
	}

	if(!iSiphone){

		dpr = 1;

		joinMeta(dpr);

		iWidth = $(window).width();

		if(iWidth >= 540){ iWidth = 540; }

		setFonsize();

	}else{

		iScale = iScale/window.devicePixelRatio;

		joinMeta(iScale);

		iWidth = $(window).width();

		setFonsize();

	}

$(function(){

		if(!iSiphone && $(window).width() >= 540){//安卓设备下宽度大于540px的 设置为540
			
			$('#main').css('width','540px');
		}
});