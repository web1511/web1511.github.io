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

//登录名跳转登录页

