$(function(){
	var password = $('#password');
	var phone = $('#phone');
	var loginBtn = $('#loginBtn');
	store.remove('user');
	
	loginBtn.on('click',function(){
		if(   testPhone( phone ) == false || testPsw( password ) == false  ) {
			return false;
		}
		var regData = {
			Command : 'AdminLogin',
			UserName_c : $.trim( phone.val()),
			Password :  hex_md5($.trim( password.val()))		
		};
		_debounce(function(){
			reAjax( api.url, regData ,function(data,status,xhr) {
				if( data.Code == 0 ) {
					store.save('user',data);
					location.href = "./index.html";
				}else{
					pop(data.Msg);
				}
		    });
		});
	});
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



