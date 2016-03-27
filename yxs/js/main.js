$(function(){
	/*悬浮框*/
	$(window).scroll(function(){
		var _top= $(window).scrollTop();
		document.title = _top;
		if(_top>200){
			$('#pfix').css({
				'position':'fixed'
			});
	    }else if(_top ==0){
	    	document.title = '英雄杀官网';
	    }
	})
	/*广告1*/
	$('.navigation_total').has('#ost_p').hover(function(){
		//注意 #ost_p 一定要是 navigation_total的后代
		//$(this).find('#ost_p').show();
		/*if($('#ost_p')){//另一种写法
			$('#ost_p').show();
		}*/
		$('#ost_p').show();
	},function(){
		$('#ost_p').hide();
	});
	/*广告2*/
	$('.navigation_ad').has('#ad2').hover(function(){
		$('#ad2').stop().show(50);
		$('#ad1').stop().hide(50);
	},function(){
		$('#ad2').stop().hide(50);
		$('#ad1').stop().show(50);
	});
	/*nav*/
	$('#navlist ').find('li').has('.nav_sub').hover(function(){
		$(this).find('.nav_sub').show();
	},function(){
		$(this).find('.nav_sub').hide();
	});
	/*banner*/
	var banner = (function(){
			  var timer = null;
			  var $rollBox = $('#roll-box');
			  var $aLiBtn = $('#roll-btn').find('li');
			  var $liWidth= $rollBox.find('li').eq(0).clone(true);
			  var num = 0,m=0;
			  var onOff = true;
			  /*init*/
			  $rollBox.append($liWidth);
			  var $aLi = $rollBox.find('li');
			  var lenNum = $aLi.length;
			  $rollBox.css('width',$aLi.eq(0).outerWidth()*lenNum);
			 function run(){
			 	 num ++;
			 	 if(num>=lenNum){
			 	 	num=1;
			 	 	$rollBox.css('left',0);
			 	 }
			 	 /*btn*/
			 	 if(m >$aLiBtn.length-1 ){
			 	 	 m =0
			 	 }
			 	 $aLiBtn.removeClass('cur');
			 	 $aLiBtn.eq(m).addClass('cur');
			 	 timer = setTimeout(function(){
			 	 	m = num;
			  		$rollBox.stop().animate({
			  			left : -$aLi.eq(0).outerWidth()*num
			  		},function(){
			  			if(onOff){
			  				run();
			  			}
			  		}) 	
			   },1000)
			 }
			 if(onOff)run();
			 $aLiBtn.mouseover(function(){
			 	clearTimeout(timer)
			 	onOff = false; //判断定时器是否运动
			 	 var index= $(this).index();
			 	 $(this).addClass('cur').siblings('li').removeClass('cur');
			 	  m = index;
			 	  /*点击当前的时候运动到指定的图片*/
			 	  $rollBox.stop().animate({
			  			left : -$aLi.eq(0).outerWidth()*m
			  	  }); 	
			 });
			 $('.roll').hover(function(){
			 	clearTimeout(timer);
			 	onOff = false;
			 },function(){
			 	onOff = true;
			 	num =$aLiBtn.eq(m).index();
			 	run();
			 })
    })();
    /*tab卡*/
    var tab =(function(){
    	var $content = $('#news-in').find('.news-content');
    	var $tabBtn = $('#tab-btn').find('a');
    	$tabBtn.hover(function(){
    		var index = $(this).index();
    		$content.eq(index).show().siblings('.news-content').hide();	
    	}); 

    })();
    $('body').find('a').click(function(){
    	$('body').find('a').attr('href','javascript:;')
    	alert('抱歉，只做了首页！');
    });
    /*var iframe= window.top.document.getElementById("gameRank");
    var abody = $(iframe).find('body');
    console.log( abody.find('a'))
    abody.find('a').attr('href','#');*/
   //console.log($("#gameRank").contents())
/*  var aIframe = $('#gameRank').get(0);
   var $bb = $(aIframe.contentWindow).find('#rank_control1');
   console.log($(aIframe.contentWindow).find('#rank_control1').html());
   $bb.find('a').attr('href','');*/
});