$(function(){

	//banner图片滑动
	
	(function(){

		var mySwiper = new Swiper ('.swiper-container', {

		    direction: 'horizontal',//横向

		    loop: true,

		    pagination: '.swiper-pagination',// 分页器

		    autoplay: 3000,//自动播放

		    // width : window.innerWidth,
		    
		    autoplayDisableOnInteraction:false
		    
		  });

	})();

	//页面滚动top背景透明度变化
	
	(function(){

		var $Topbar = $('.topbar');

		$(window).scroll(function() {

			var $srcollTop = $(document).scrollTop();

			if ($srcollTop >130) {

				$Topbar.css('background','rgba(207,25,22,0.85)');
			}else{
				$Topbar.css('background','');
			}
			
		});

	})();

});