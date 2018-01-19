/**login**/

$(function(){

   var store = {
     save : function(name,value){
       localStorage.setItem(name,JSON.stringify(value));
     },
     fetch:function(value){
       return JSON.parse(localStorage.getItem(value)) || [];
     }
   }
   var loginFn = function(){
	   	var phone = $('#phone');
	   	var pw = $('#pw');
	   	var loginBtn = $('#loginBtn');

	   	phone.on('input',function(){
	   		var phoneVal = $.trim(phone.val());
	   		if(/^(\D)|([\u4E00-\u9FA5]+)$/g.test(phoneVal)){
	   			$(phone).val('');
	   			pop('请输入正确的手机号码');
	   		}
	   	});
	   	loginBtn.click(function(){
	   		if( checkPhone() == false || checkPassword() == false ){
	   			return false;
	   		}
        var phoneVal = $.trim(phone.val());
        var pwVal = $.trim(pw.val());
        if( phoneVal == '13534200316' && pwVal == '123456' ) {
           store.save('lg',{phone:'13534200316',pw:'123456'})
           location.href = 'igxfq.html';
        }else{
           pop('手机号或密码错误');
        }
	   		
	   	});
	     
	   	function checkPhone(){
	   		var phoneVal = $.trim(phone.val());
	   		if(phoneVal ==''){
	   			pop('手机号不能为空');
	   			return false;
	   		}

	   		if(!/^((\+86)|(86)|\(86\)|(\+86\)))?(((13[0-9])|(15[0-9])|145|147|(17[0,1,3,5,6,7,8])|18[0-9])\d{8}$)/.test(phoneVal)){
	   			pop('手机号不正确');
	   			return false;
	   		}
	   		return true;
	   	}

	    function checkPassword(){
	      	var pwVal = $.trim(pw.val());
  	   		if(pwVal ==''){
  	   			pop('密码不能为空');
  	   			return false;
  	   		}
  	   		return true;
	    }
   };

   var entryFn = function(){
       var phone = $('#phone');
       var pw = $('#pw');
       var phoneV = phone.val();
       var pwV =  pw.val();
       var myPhone = '13534200316';
       var myPw = '123456';
       if(store.fetch('lg').phone != myPhone && store.fetch('lg').pw != myPw){
         location.href = 'login.html';
         return;
       }
    }

    if( location.href.indexOf('login.html') == -1 ){
         entryFn();
    }else{
         loginFn();
    }
   /**igfire**/
   var citySelectFn = function(){
        var cityBtn = $('#cityBtn,#cityBtn2');
        var arrSpan = $('span',cityBtn);
        if( cityBtn.length>0 ){
            cityBtn.cityPicker({
            prov:"北京市",
            city:"北京市",
            dist:"西城区",
            confirm:function(data){
                 arrSpan.eq(0).html(data.prov);
                 arrSpan.eq(1).html(data.city);
                 arrSpan.eq(2).html(data.dist);
            }
          })
       }
   }();

   var iconSwicthFn = function(){
        var openIcon = $('.iconSwich');
        openIcon.each(function(i){
            openIcon[i].onOff = true;
            $(this).click(function(){
                var _this = this;
                if($(this)[0].onOff){
                   askFn('确定要关闭报警推送设置吗？',function(){
                       $( _this).addClass('iconSwichClose');
                   });
                }else{
                     $(this).removeClass('iconSwichClose');
                }
                $(this)[0].onOff = !$(this)[0].onOff;
            });
        });
   }();

   //设备，地图，报警切换
   var igTabFn = function(){
        var liBtn = $('li','#footUl');
        var js_comS = $('.js_comS');
        liBtn.each(function(i){
          $(this).click(function(){
             if($(this).find('a').attr('id') == 'mapA'){
               $('#pop_btn').hide();
             }else{
               $('#pop_btn').show();
             }
             tabFn($(this),js_comS,i,'colorAct');
          });
        })
   }();
   
   /**dcdetail**/
   var chartFn = function(i){  //水压图表
      if($('.com_canvas').length >0){

       
        var mArrChart  = $('.com_canvas');
        var option = {};
        option.data = [0, 1, 1.2, 5.5, 4.8, 3.2, 7.8,5.3, 2, 1, 6, 6.5, 4.5, 4.2, 4.0, 3.2, 6.5, 7, 7.8, 7.6];
        comCHartFn(mArrChart[i],option);
      }
   };

   //设备，图表，报警
   var stbFn = function(){
        var liBtn = $('li','#navUl');
        var js_dcMes = $('.js_dcMes');
        liBtn.each(function(i){
           $(this).click(function(){
              tabFn($(this),js_dcMes,i,'colAct');
              chartFn(0);
           })
        });
   }();
   //电压图表
   var dCharFn = function(i){
        if($('.com_canvas').length >0){
          //var dChart  = $('#dChart').get(0);
          var dArrChart  = $('.com_canvas');

          var option = {};
          option.data = [0, 1, 1.2, 5.5, 4.8, 3.2, 7.8,5.3, 2, 1, 6, 6.5, 4.5, 4.2, 4.0, 3.2, 6.5, 7, 7.8, 7.6];
          comCHartFn(dArrChart[i],option);
        }
   };

   var presureWFn = function(){
       var spanBtn = $('span','#pressW');
       var com_cmes = $('.com_cmes');
       var swichBtn = $('.swichBtn');
       var com_swMes = $('.com_swMes'); // 切换为数据内容
       spanBtn.each(function(i){
          $(this).on('click',function(e){
             e.stopPropagation();
             tabFn($(this),com_cmes,i,'colorAct');
             dCharFn(i);
          });
       });
       /**切换图表**/
       swichBtn.each(function(i){
          swichBtn[i].onOff = true;
          $(this).click(function(){  
            if($(this)[0].onOff){
               $(this).siblings(com_swMes).eq(0).hide();
               $(this).siblings(com_swMes).eq(1).show();
               $(this).html('切换为图表');
            }else{
              $(this).siblings(com_swMes).eq(1).hide();
              $(this).siblings(com_swMes).eq(0).show();
              $(this).html('切换为数据');
            }
            $(this)[0].onOff = !$(this)[0].onOff;
          });
       });
   }();

   //地图
   $('#mapA').click(function(){
      //tobaidu();
        var imgIcon = [
          {id:0,im:'img/hydrant_n.png'},
          {id:1,im:'img/hydrant_u.png'}
        ];
        var map = new BMap.Map("mapBtn");
        var point = new BMap.Point(114.075475,22.553263);
        map.centerAndZoom(point, 11);
        
        //创建图标
        //createMark(114.065702,22.5319,imgIcon[0]);
        //createMark(114.25273,22.73535,imgIcon[1]);

        var markArr = [
            {ad:'深圳福田区',x:114.065702,y:22.5319,icon:imgIcon[0].im},
            {ad:'深圳龙岗区',x:114.25273,y:22.73535,icon:imgIcon[1].im}
        ];

        for(var i=0;i<markArr.length;i++){
           createMark(markArr[i].x,markArr[i].y,markArr[i].icon,imgIcon[i].id);
        }
        //创建标注函数
        function createMark(pointX,pointY,icon,iconid){
          var pt = new BMap.Point(pointX,pointY);
          var myIcon = new BMap.Icon(icon, new BMap.Size(64,104));
          var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
          map.addOverlay(marker2);
          var docTitle = document.title;
          var opts = {
             width : 200,     // 信息窗口宽度
             height: 100,     // 信息窗口高度
             title : "<h3 id='attrTitle'>"+docTitle+"</h3>" , // 信息窗口标题
             enableMessage:true,//设置允许信息窗发送短息
             message:""
           }
            if(iconid == 0){
                var adres = "<div id='inW'><div>最后通讯：2018-01-09 12:28:56</div>\
                             <div>状态：正常</div>\
                             <div>水压：0.124Mpa</div>\
                             <div>电压：4.1V</div><div>\
                             ";
            }else{
               var adres = "<div id='inW'><div>最后通讯：2018-01-09 12:28:56</div>\
                           <div>状态：水压异常</div>\
                           <div>水压：0.865Mpa</div>\
                           <div>电压：4.1V</div><div>\
                           ";
            }
            createInfo(opts,marker2,pt,adres);

        } 
        //添加窗口信息
        function createInfo(opts,mark,point,address){
              var infoWindow = new BMap.InfoWindow(address, opts);  // 创建信息窗口对象 
              mark.addEventListener("click", function(){          
                map.openInfoWindow(infoWindow,point); //开启信息窗口
              });
        }
 
        
        //地址解析
        function createAddress(address){
            var myGeo = new BMap.Geocoder();
            //深圳市龙华区清祥路宝能科技园
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(address, function(point){
              if (point) {
                map.centerAndZoom(point, 12);
                //createMark(point.lng, point.lat,imgIcon[0].im,imgIcon[0].id);
                map.addOverlay(new BMap.Marker(point));
              }else{
                pop("您选择地址没有解析到结果!");
              }
            }, "中国");
            
        }
         
        //搜索地址定位
        var searchOn = true;
        var eqOn = true;
        var searchMapFn = function(){
             var mapSw = $('#mapSw');
             var mapEqSw = $('#mapEqSw');
             var aBtn = mapSw.find('a');
             
             $('#msBtn').click(function(){
                if( searchOn ){
                  mapSw.show();
                  mapEqSw.hide();
                  eqOn = true;
                }else{
                  mapSw.hide();
                }
                searchOn = !searchOn;
               
             }); 

             aBtn.click(function(){
                 var asVal = $.trim(mapSw.find('input').val());
                 if( asVal != ''){
                   map.clearOverlays();
                   createAddress(asVal);
                 }
             });
        }();
          
        //搜索设备定位
        var eQsearchFn = function(){
            var mapSw = $('#mapSw');
            var mapEqSw = $('#mapEqSw');
            $('#eqBtn').click(function(){
               
               if( eqOn ){
                 mapEqSw.show();
                 mapSw.hide();
                 searchOn = true;
               }else{
                 mapEqSw.hide();
               }
               eqOn = !eqOn;
            }); 
        }();

        //点击定位图标
        $('#geoBtn').click(function(){
             map.clearOverlays();
             var geolocation = new BMap.Geolocation();
             geolocation.getCurrentPosition(function(r){
               if(this.getStatus() == BMAP_STATUS_SUCCESS){
                 var mk = new BMap.Marker(r.point);
                 map.addOverlay(mk);
                 map.panTo(r.point);
                 //map.addOverlay(new BMap.Marker(point));
                 //alert('您的位置：'+r.point.lng+','+r.point.lat);
                //createMark(r.point.lng,r.point.lat,imgIcon[0].im,imgIcon[0].id);
               }
               else {
                 alert('failed'+this.getStatus());
               }        
             },{enableHighAccuracy: true})
        });
   });
   //遮罩显示
   var shadowFn = function(){
        var str = '<div class="indexPopBg"></div>\
         <div class="indexPopCont">\
          <div class="PopCont_inner clearfix">\
             <div>\
              <a href="igxfq.html">\
                <span>智能消火栓</span>\
                <em class="wl"></em>\
              </a>\
              <a href="igmanhole.html">\
                <span>智能窨井</span>\
                <em class="sb"></em>\
              </a>\
              <a href="wqmonitor_a.html">\
                <span>水质监测设备A</span>\
                <em class="lx"></em>\
              </a>\
            </div>\
            <div>\
              <a href="wqmonitor_b.html">\
                <span>水质监测设备B</span>\
                <em class="zx"></em>\
              </a>\
              <a href="psmonitor.html">\
                <span>压力监测</span>\
                <em class="ll"></em>\
              </a>\
              <a href="flmonitor.html">\
                <span>流量监测</span>\
                <em class="gz"></em>\
              </a>\
            </div>\
            <div style="clear:both;"></div>\
            <a href="javascript:;">\
              <em class="close" id="popClose"></em>\
            </a>\
          </div>\
         </div>';
        tagReplace( 'shade','wrpaId',str);
        var pop_btn = $('#pop_btn');
        var indexPopBg = $('.indexPopBg');
        var indexPopCont = $('.indexPopCont');
        var popClose = $('#popClose');         
          pop_btn.click(function(e){
            e.stopPropagation();
            indexPopBg.show();
            indexPopBg.addClass('fadeInRight');
            indexPopCont.show();
            indexPopCont.addClass('fadeInRight2');
          });
          popClose.click(function(e){
            e.stopPropagation();
            indexPopBg.fadeOut();
            indexPopBg.removeClass('fadeInRight');
            indexPopCont.fadeOut();
            indexPopCont.removeClass('fadeInRight2');
          });

          if(pop_btn.length>0){
            drag(pop_btn[0]);
          }  
          function drag(obj){
             if(!obj) return;
              obj.addEventListener('touchstart',start,false);
              function start(ev){
                  var downX =0;
                  var downY =0;
                  var touchs =ev.changedTouches[0];
                  downX = touchs.pageX-obj.offsetLeft;
                  downY = touchs.pageY-obj.offsetTop;
                  obj.addEventListener('touchmove',move,false);
                  function move(ev){
                      var touchs =ev.changedTouches[0];
                      var L = touchs.pageX-downX;
                      var T = touchs.pageY-downY;
                      var maxL = document.documentElement.clientWidth-obj.offsetWidth;
                      var maxT = document.documentElement.clientHeight-obj.offsetHeight;
                      if(L<0){
                          L =0;
                      }else if(L>maxL){
                          L =maxL;
                      }
                      if(T<0){
                          T =0;
                      }else if(T>maxT){
                          T = maxT;
                      }
                      this.style.left = L + 'px';
                      this.style.top  = T + 'px';
                      ev.preventDefault(); //阻止滚动条滚动
                  }
                  obj.addEventListener('touchend',end,false);
                  function end(ev){
                      var touchs = ev.changedTouches[0];
                      this.ontouchmove =null;
                      this.ontouchend = null;
                  }
              }
          }
   }();


   //时间间隔

   var timeJgFn = function(){
        var tSapnC = $('.comTimeCs');
        var com_timeUl = $('.com_timeUl');
        tSapnC.each(function(i){
           tSapnC[i].onOff = true;
           tSapnC.eq(i).click(function(e){
               e.stopPropagation();
               if( tSapnC.get(i).onOff ){
                  com_timeUl.eq(i).show();
                }else{
                  com_timeUl.eq(i).hide();
                }
               tSapnC.get(i).onOff = !tSapnC.get(i).onOff;
           });
           com_timeUl.eq(i).on('click','li',function(e){
              e.stopPropagation();
              $(this).addClass('colActive').siblings().removeClass('colActive');

              if($('.com_canvas').length >0){

               
                var mArrChart  = $('.com_canvas');
                var option = {};
                option.data = [0, 1, 1.2, 5.5, 4.8, 3.2,10,5.3, 2, 1, 6, 6.5, 4.5, 4.2, 4.0, 3.2, 6.5, 7, 7.8, 7.6];
                comCHartFn(mArrChart[i],option);
              }
           });
            $(document).click(function(){
                com_timeUl.eq(i).hide();
                tSapnC[i].onOff = true;
            });
        });
   }();

   

  

})

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
function askFn(msg,callBack){
   layer.open({
       content: msg,
       btn: ['确定', '取消'],
       yes: function(index){
         callBack && callBack();
         layer.close(index);
       }
     });
}


/**公共tab**/
/**
   obj: 点击的目标
   contShow 显示的内容
   i  显示的内容对应的索引值
   sClass  点击的按钮添加的样式class
**/
function tabFn(obj,contShow,i,sClass){
   $(obj).addClass(sClass).siblings().removeClass(sClass);
   $(contShow).hide();
   $(contShow).eq(i).show();
}

/**自定义标签替换
 @objId  自定标签的id 
 @wrpaId  包裹在最外面的标签的id 
 @str    插入wrpaId 里面的结构

     使用方法:          
    var str = '<div class="kk">啦啦啦，这是自定义内容</div>'
      tagReplace('box','pop',str);
**/
function tagReplace( objId,wrpaId,str){
  $('#' + objId).wrap('<div id="'+wrpaId+'"></div>').remove();
  $('#' + wrpaId ).append(str);
}

//公共数据图表
/*
  obj  图表显示的容器
  option objct 图表配置的具体数据
     option.data  例如
     option.data = [0, 1, 1.2, 5.5, 4.8, 3.2, 7.8,5.3, 2, 1, 6, 6.5, 4.5, 4.2, 4.0, 3.2, 6.5, 7, 7.8, 7.6];
*/
function comCHartFn(obj,option){
   var myChart = echarts.init(obj);
   var option = {
       title: {
           text: '一天测量数据',
           subtext: ''
       },
       tooltip: {
           trigger: 'axis',
           axisPointer: {
               type: 'cross'
           }
       },
       toolbox: {
           show: true,
           feature: {
               saveAsImage: {}
           }
       },
       xAxis:  {
           type: 'category',
           boundaryGap: false,
           data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
       },
       yAxis: {
           type: 'value',
           axisLabel: {
               formatter: '{value} m'
           },
           axisPointer: {
               snap: true
           }
       },
       visualMap: {
           show: true,
           dimension: 0,
           pieces: [{
               lte: 6,
               color: 'green'
           }, {
               gt: 6,
               lte: 8,
               color: 'red'
           }, {
               gt: 8,
               lte: 14,
               color: 'green'
           }, {
               gt: 14,
               lte: 17,
               color: 'red'
           }, {
               gt: 17,
               color: 'green'
           }]
       }, 
       grid:{
          left:'6%',
          containLabel: true
       },
       series: [
           {
               name:'测量数据(02-07)',
               type:'line',
               smooth: true,
               data: option.data
           }
       ]
   };
   myChart.clear();
   myChart.setOption(option);
   window.onresize = function(){
     myChart.resize();
   } 
}