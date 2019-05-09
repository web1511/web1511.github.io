$(function(){
	var username = $('#username');
	var password = $('#password');
	var phone = $('#phone');
	var yzText = $('#yzText');
	var yzBtn = $('#yzBtn');
	var registerBtn = $('#registerBtn');

	var timer = null;
	var second = 5;
	var waitNum = second;
	var reOn = true;
	
	yzBtn.on('click',function(){
		if( testPhone( phone ) == false) {
			return ;
		}
		yzTime();
		var yData = {
			 Command : 'InsertRegisterCode',
			 Phone : phone.val()		
		};
		//yData.sign = md5_Fn(yData);
		//yData = jmJson(yData);
		var yzFn = function(){
			reAjax(api.url,yData,function(data){
				if(data.Code == 0) {
					pop('验证码已经发送');
				}else{
					pop(data.Msg);
				}
			});
		}
	   _throttle(function(){
	   	  if( reOn ) {
	   	  	 yzFn();
	   	  }
			
		},300,200);
	})
	
	registerBtn.on('click',function(){
		if(  testPhone( phone ) == false || testPsw( password ) == false ||   testYz( yzText ) == false ) {
			return false;
		}
		var regData = {
			Command : 'RegisterCommonUser',
			Mobile : $.trim( phone.val()),
			Password :  $.trim( password.val()),
			Code : $.trim( yzText.val())
		};
		reAjax( api.url, regData ,function(data) {
				if(data.Code == 0 )  {
					pop('注册成功');
				}else{
					pop(data.Msg);
				}
		});
	});

	function yzTime( ) {
		clearTimeout(yzTime.timer);	
		yzTime.timer = setTimeout(function(){
				if( waitNum <= 0 ) {
				  clearTimeout(yzTime.timer);
				  yzBtn.html('发送验证码');
				  waitNum = second;
				  timer = null;
				  reOn = true;
				}else{
					reOn = false; // 倒计时中反正再次请求
					yzTime();
					yzBtn.html(waitNum + 's');
					waitNum --;
				}	
		},1000);

    }

});

function testUser( obj ) {
	var objVal = $.trim( obj.val());
	if( objVal == '' ) {
		pop('用户名不能为空');
		return false;
	}
	return true;
}

function testPsw( obj) {
	var objVal = $.trim( obj.val());
	if( objVal == '' ) {
		pop('密码不能为空');
		return false;
	}
	return true;
}
function testPhone( obj ) {
	var objVal = $.trim( obj.val());
	if( objVal == '' ) {
		pop('手机号码不能为空');
		return false;
	}
	if( !(/^((\+86)|(86)|\(86\)|(\+86\)))?(((13[0-9])|(15[0-9])|145|147|(17[0,1,3,5,6,7,8])|18[0-9])\d{8}$)/.test(objVal) ) ) {
		pop('请输入正确的手机号');
		return false;
	}
	return true;
}

function testYz( obj ) {
	var objVal = $.trim( obj.val());
	if( objVal == '' ) {
		pop('验证码不能为空');
		return false;
	}
	return true;
}

