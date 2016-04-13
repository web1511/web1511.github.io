function move(obj,attrs,callBack){
	var json = {};
	var arr=[];
	for(var attr in attrs){
		json[attr] = {};
		//起始位置。
		if(attr == 'opacity'){
			json[attr].b = Math.round(css(obj,attr)*100);
		}else{
			json[attr].b = parseFloat(css(obj,attr));
		}
		//总距离

		json[attr].c = attrs[attr].target - json[attr].b;

		//运动时间
		json[attr].d = attrs[attr].duration ;

		arr.push(json[attr].d);
	}
	//得出最大运动时间。
	var d = Math.max.apply(null,arr);
	//起始时间。
	var startTime = +new Date();

	obj.timer = setInterval(function(){
		//得到已过去时间。
		var t = +new Date() - startTime;

		if(t >= d){
			t = d
			clearInterval(obj.timer);
		}
		for(var attr in json){
			json[attr].t=t;

			if(json[attr].t >= json[attr].d){
				json[attr].t = json[attr].d;
			}
			if(json[attr].t <= json[attr].d){
				var value = Tween[attrs[attr].fx](
					json[attr].t,
					json[attr].b,
					json[attr].c,
					json[attr].d
				);
				if(attr == 'opacity'){
					obj.style.opacity = value/100;
					obj.style.filter = 'alpha(opacity = '+value+')';
				}else{
					obj.style[attr] = value+'px';
				}
			}
		}
		if(t === d){
			callBack&&callBack();
		}

	}, 30);
}
function css(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}