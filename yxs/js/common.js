var ran=String(new Date()).split(":")[1],d=decodeURIComponent;
function script(u) {
    var o = document.createElement("script");
    o.src = u;
    o.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(o);
    return o;
}
function chkload(u, s, v) {
    var e = script(u);
    if (navigator.userAgent.indexOf("MSIE") != -1) {
        e.onreadystatechange = function() {
            if (this.readyState && this.readyState == "loading") {
                return;
            } else {
                s(v);
            };
        };
    } else {
        e.onload = function() {
            s(v);
        };
    };
}
function gId(id) {
    return id && document.getElementById(id);
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, "");
}
function GetUrl() {
    var url = window.location.href,
    arr_path = new Array();
    arr_path = url.split("/");
    return arr_path;
}
function HandleSubmit() {
    searching_input_value = document.getElementById("searching_input").value;
    if (searching_input_value != "") {
        searching_url = 'http://news.soso.com/n.q?sc=news&cid=news.qqgames&w='+searching_input_value+'+site%3Ahttp%3A%2F%2Fyxs.qq.com%2Fwebplat%2Finfo';
        document.getElementById("searching_form").action = searching_url;
    }
}
function loadSWF(obj, swf, w, h) {
    gId(obj).innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '"><param name="movie" value="' + swf + '" /><param name="allowScriptAccess" value="always" /><param name="quality" value="high" /><param name="scale" value="scale" /><param name="salign" value="T" /><param name="wmode" value="transparent" /><embed type="application/x-shockwave-flash" src="' + swf + '" width="' + w + '" height="' + h + '" scale="scale" salign="T" quality="high" wmode="transparent" allowScriptAccess="always"></embed></object>';
}
function check_game_active() {
/**
    try {
        var oQQGameDom = new ActiveXObject("QQGAMEDETECT.QQGameDetectCtrl.1");
        if (193 >= 0) {
            window.open("qqgameprotocol:///QUICKGAME GAMEID:" + parseInt(193), "newwindow");
        } else {
            window.open("qqgameprotocol:///ENTERROOM SERVERID:-1 ROOMID:-1", "newwindow");
        }
    } catch(e) {
        window.open("http://dl_dir3.qq.com/minigamefile/QQGame_setup_web.EXE", "newwindow");
    }
    return false;
**/

	if(document.all && document.compatMode){ //如果是IE浏览器  先判断大厅的安装状态 
		try {//如果已安装大厅 则拉起游戏
			var oQQGameDom  = new ActiveXObject("QQGAMEDETECT.QQGameDetectCtrl.1") ;
			window.open("qqgameprotocol:///QUICKGAME GAMEID:193","_self");   
		} catch(e){//如果没有安装大厅 则下载大厅
			window.open("http://dl_dir3.qq.com/minigamefile/QQGame_setup_web.EXE","newwindow");	
		}  
	}  	
	else{  //如果不是IE浏览器 则直接开始游戏   不判断大厅的安装状态
		window.open("qqgameprotocol:///QUICKGAME GAMEID:193","_self");
	}
}

function footer(){
   $("#footer").html($("#footer").find("textarea").val());
}
function load_bg(){
	$("body").addClass("bg");
    $(".wrapper").addClass("wrapper_bg");
	$(".health-inner").addClass("health-bg");
}
//顶部人物图切换
function RegRollAds(){
	var fcImgWrp = $('.fc_hero ul');
	var fcImgLth = fcImgWrp.find('img').length;	
	var fcSec = 5000;  //间隔时间
	var fcOnInd = 0;
	function fnFcTimer(){
		fcOnInd++;			
		if(fcOnInd==fcImgLth){fcOnInd=0;};
		fcImgWrp.find('li').stop(true,true).hide();
		fcImgWrp.find('li').stop(true,true).eq(fcOnInd).fadeIn();
	};
	var fcTimer = setInterval(function(){fnFcTimer();},fcSec);
}
//开始游戏
function gotoPage() {
	startGame();
}

function startGame(){
if ($("#agreen").is(":checked")) {
		chkload("http://ossweb-img.qq.com/images/js/login/loginmanagerv2.js?onlyCookie=1&needMaskDiv=1&needReloadPage=1",function(){
			LoginManager.checkLogin(function() {
			    $("#userqq").html(LoginManager.getUserUin());
				$("#GamePage").attr("src","http://happy.qq.com/yxs/yxs.html");
				document.documentElement.style.overflow="hidden";
                                //$("window").scrollTop(0); 
                                $(document).scrollTop(0); 
                                $("#game_layer").show().scrollTop(0);
                                if(document.documentElement.scrollTop!=0){

		document.getElementById("game_layer").style.top=0;

		window.scrollTo(0, 0);

   }
                                
			},
			function() {
				LoginManager.login(function() {
				    $("#userqq").html(LoginManager.getUserUin());
					$("#GamePage").attr("src","http://happy.qq.com/yxs/yxs.html");
					document.documentElement.style.overflow="hidden";
                                        $("window").scrollTop(0);
                                        $("#game_layer").show().scrollTop(0);
                                        if(document.documentElement.scrollTop!=0){

		document.getElementById("game_layer").style.top=0;

		window.scrollTo(0, 0);

   }
				        
				});
			});
		},"");
	} else {
		alert("请确认已经阅读并同意用户协议！")
	}

}

$(".J_btn_dl").hover(function(){
			$(".start .code").hide();
			var code_index =$(".J_btn_dl").index($(this));
			$(".start .code").eq(code_index).show();
		},function(){$(".start .code").hide();});

(function(){
	chkload("http://ossweb-img.qq.com/images/js/login/loginmanagerv2.js?onlyCookie=1&needMaskDiv=1&needReloadPage=1",function(){
		LoginManager.checkLogin(function() {
			$("#userqq").html(LoginManager.getUserUin());
		
		});
		
	},"");
})();

function CloseDiv(){
	$("#GamePage").attr("src","about:blank");
	$("#game_layer").hide();
	document.documentElement.style.overflow="auto";
}
function run(){
  chkload('http://ossweb-img.qq.com/images/js/title.js?v=0428',function(){ostb_int()},"");
  chkload("http://pingjs.qq.com/tcss.ping.js",function() {if (typeof(pgvMain) == 'function') pgvMain(); },"");
  loadSWF("start_swf", "http://ossweb-img.qq.com/images/yxs/web201202/Btn.swf", 200, 200);
  $("#vote_IFR").attr("src", "http://gameact.qq.com/vote/246/index.htm");
  $(".fc_hero").html($(".fc_hero").find("textarea").val());
  RegRollAds();	
  $("body").append('<div id="game_layer" class="game_layer dn" style="height:98%"><iframe id="GamePage" name="GamePage" src="about:blank" width="100%" scrolling="auto" height="97%" frameborder="0"></iframe></div>')
}

$("#nav li:has(div)").hover(function() {
	$(this).find("div").addClass("sub-nav-bg").show();
},function() {
	$(this).find("div").hide();
});

script("http://ossweb-img.qq.com/images/js/comm/delayImage.min.js");
addLoadEvent(function(){
  run();
  load_bg();
  
});/*  |xGv00|a0858ed846bc937e99e10553e782493f */