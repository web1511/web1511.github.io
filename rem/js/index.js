$(function(){

		var oTop = $('#top'); 

		var oBanner = $('#J_banner');

		oBanner.ontouchstart = oBanner.ontouchmove= function(ev){

			ev.stopPropagation();

			ev.cancelBubble = true;
		}
	
		//banner图片滑动
		var mySwiper = new Swiper ('.swiper-container', {

		    direction: 'horizontal',//横向

		    loop: true,

		    pagination: '.swiper-pagination',// 分页器

		    autoplay: 3000,//自动播放

		    // width : window.innerWidth,
		    
		    autoplayDisableOnInteraction:false
		    
		  });

		  //模仿iphone滑屏效果
	var touchstart = 'touchstart';

	var touchmove = 'touchmove';

	var touchend = 'touchend';

	var $scrollBox = $('.J_pageMain');

	function init() { //初始化

		device();

		pagesMain.init();
	}

	function device() { //兼容pc端和移动端

	// 	// console.log(navigator.userAgent);

		var isMobile = /Mobile/i.test(navigator.userAgent);

			if (!isMobile) {

	            touchstart = 'mousedown';

			    touchmove = 'mousemove';

				touchend = 'mouseup';
			}
	}

	var pagesMain = (function() {

		var downY = 0;

		var downTop = 0;

		var parentH = $('.J_Main').height();

		var childH = $scrollBox.height();

		var prevY = 0; //开始速度(手指按下坐标)

		var iSpeed = 0; //速度初始值

		var timer = null;

		var onoff1 = true;

		var onoff2 = true;


		function init() {

			moveScroll();
		}

		function moveScroll() { //滑动列表

			$(document).on(touchmove, function(ev) {

				ev.preventDefault();
			});

			$scrollBox.on(touchstart, function(ev) {

				if (parentH > childH) {

					return false
				}

				var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;

				var This = this;

				downY = touch.pageY;

				prevY = touch.pageY;

				downTop = $(this).position().top;

				onoff1 = true;

				clearInterval(timer);

				$(document).on(touchmove + '.off', function(ev) {

					var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;

					var iTop = $(This).position().top;

					iSpeed = touch.pageY - prevY;

					prevY = touch.pageY;

					if (iTop >= 0) { //头

						if (onoff1) {

							onoff1 = false;

							downY = touch.pageY;
						}

						$(This).css('transform', 'translate3d(0,' + (touch.pageY - downY) / 3 + 'px,0)');

					} else if (iTop <= parentH - childH) { //尾

						if (onoff2) {

							onoff2 = false;

							downY = touch.pageY;
						}

						$(This).css('transform', 'translate3d(0,' + ((touch.pageY - downY) / 3 + (parentH - childH)) + 'px,0)');

					} else {

						$(This).css('transform', 'translate3d(0,' + (touch.pageY - downY + downTop) + 'px,0)');

					}
				});

				$(document).on(touchend + '.off', function(ev) {

					$(this).off('.off');

					clearInterval(timer);

					timer = setInterval(function() {

						var iTop = $(This).position().top;

						if (Math.abs(iSpeed) <= 1 || iTop > 50 || iTop < parentH - childH) {

							clearInterval(timer);

							if (iTop >= 0) {

								$(This).css('transition', '.2s');

								$(This).css('transform', 'translate3d(0,0,0)');

							} else if (iTop <= parentH - childH) {

								$(This).css('transition', '.2s');

								$(This).css('transform', 'translate3d(0,' + (parentH - childH) + 'px,0)');
							}

						} else {

							iSpeed *= 0.9;

							$(This).css('transform', 'translate3d(0,' + (iTop + iSpeed) + 'px,0)');

							if(iTop <-parentH){
							
								//回到顶部
								
						$('.backTop').fadeIn();
										
							}else{

								$('.backTop').fadeOut();
							
							}

							$('.backTop').on(touchstart,function(){
							
								$(This).css('transition', '600ms');

								$(This).css('transform', 'translate3d(0,0,0)');

								$('.backTop').fadeOut();
							});


						}

					}, 13);

				});

				return false;
			});

			$scrollBox.on('transitionend webkitTransitionEnd', function() {

				$(this).css('transition', '');

			});
		}

		return {

			init: init

		}

	})();

	init();
		
		//测试代码

		//$('.mask').css({'width':$(window).width(),'height':$(window).height(),'lineHeight':$(window).height(),'textAlign':'center'});

		//$('body a').on('click',function(){
			
			//alert('sorry哦！只作了首页而已');
		
		//});

});