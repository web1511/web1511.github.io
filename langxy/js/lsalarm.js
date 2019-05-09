$(function(){
  
    /**** 时间****/
    dateFn();
    function dateFn() {
        var theme = "android-ics light";
        var mode = "scroller";
        var display = "bottom";
        var lang="zh";
        var currYear = (new Date()).getFullYear();	
        var opt = {};
        var optEnd = {};
        opt.datetime = {preset : 'datetime'};
        optEnd.dateEndtime = {preset : 'datetime'};
        optEnd.default = {
            theme: theme,
            mode: mode,
            display: display,
            lang: lang,
            dateFormat:"yyyy-mm-dd",
            //minDate: new Date(2000,3,10,9,22,20),
            //maxDate: new Date(2030,7,30,15,44,30),
            //nowText: "今天",
            startYear: currYear - 10, //开始年份
            endYear: currYear + 10 ,//结束年份
            stepMinute: 1,
            setText: '确定',
            cancelText: '取消',
            showNow: false,
            onBeforeShow: function (inst) { 
            },
            formatResult: function(arr) { //回调函数
                
            },
            onSelect: function (value, inst) {//选择时事件（点击确定后）
               $('#dateTimeE').val($('.dwv').html());
            }
        }
        opt.default = {
            theme: theme,
            mode: mode,
            display: display,
            lang: lang,
            dateFormat:"yyyy-mm-dd",
            //minDate: new Date(2000,3,10,9,22,20),
            //maxDate: new Date(2030,7,30,15,44,30),
            //nowText: "今天",
            startYear: currYear - 10, //开始年份
            endYear: currYear + 10 ,//结束年份
            stepMinute: 1,
            setText: '确定',
            cancelText: '取消',
            showNow: false,
            onBeforeShow: function (inst) { 
            },
            formatResult: function(arr) { //回调函数
                
            },
            onSelect: function (value, inst) {//选择时事件（点击确定后）
               $('#dateTimeS').val($('.dwv').html());
            }
        }
        var optDateTime = $.extend(opt['datetime'], opt['default']);
        var optDateEndTime = $.extend(optEnd['dateEndtime'], optEnd['default']);
        $('#dateTimeS').mobiscroll(optDateTime).datetime(optDateTime);
        $('#dateTimeE').mobiscroll(optDateEndTime).datetime(optDateEndTime);
    }
    /**** 筛选*/
    var opt = {
        el:'#sxBtn',
        textArr : [  
            { name: '已处理',attr:'0' } ,
            { name: '未复核',attr:'1' } ,
            { name: '误报',attr:'2' } ,
            { name: '测试',attr:'3' } 
        ] ,
        init : function() {},
        cancel  :function( index) {

        },
        success :function(index){
            var msg = $('.scroll-li').eq(index).html();
            pop(msg);
        }
    }
    Picker( opt );
});