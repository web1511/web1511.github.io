/***** 
 * 使用这个函数 首先引用 css/picker.css
 *  然后引用 plugins/bScroll/bscroll.min.js
 *  最后引用 plugins/picker/picker.js
 *  opt Object  
 * {
 *    el : '点击出现绑定的元素' 
 *    textArr : [  { name: 'ss',attr:'' } ]  // 滚动的里面数组内容 ，name是内容，attr是自定义属性
 *    init : 初始化函数
 *    cancel ： 取消按钮的回调，里面有一个参数num 是 确定滚动第几个
 *    success ： 确定按钮的回调，里面有一个参数num 是 确定滚动第几个
 * }
 * ***/
function Picker( opt ) {
    opt.textArr = opt.textArr || []; 
    create( opt.textArr );
    opt.init && opt.init(); // 初始化函数
    var pickW = $('.pickW');
    var pickCont = $('.pickCont');
    var scrollW = $('.scrollW');
    var scroll = $('.scroll');
    var sLi = $('.scroll-li');
    var resetBtn = $('#resetBtn');
    var comfirmBtn = $('#comfirmBtn');
    var num = 0;
    opt.el = $(opt.el);
    opt.el.click(function( ){
        
        pickW.css({
            transform: 'translateY(0)'
        });
    });
    resetBtn.click(function(){
        opt.cancel && opt.cancel(num); // 取消回调
        pickW.css({
            transform: 'translateY(100%)'
        });
    });
    var s = new BScroll(  scrollW[0] ,{
        wheel : {
            adjustTime:100,
            selectedIndex: num,
            wheelWrapperClass:  'scroll', 
            wheelItemClass: 'scroll-li',
            rotate: 0
        },
        swipeTime : 500
    });

    s.on('scrollEnd',function(val){
        num = s.getSelectedIndex();
    });
    comfirmBtn.click(function(){
        opt.success && opt.success( num ); // 取消回调
        //pop(sLi.eq(num).html());
        pickW.css({
            transform: 'translateY(100%)'
        });
    });
    
}


function create( textArr) {
    var str = '';
    str += '<div class="pickW">\
                    <div class="pickCont">\
                        <div class="clearfix title">\
                                <a href="javascript:;" class="fl" id="resetBtn">取消</a>\
                                <a href="javascript:;" class="fr" id="comfirmBtn">确定</a>\
                        </div>\
                        <div class="scrollW">\
                            <ul class="scroll">';
                                for( var i=0 ;i< textArr.length;i++ ) {
                                    if ( textArr.length == 0 ) {
                                        break;
                                    }
                                    str +=  '<li class="scroll-li" data-attr="'+textArr[i].attr +'">'+ textArr[i].name+'</li>';
                                }
    str += ' </ul><em class="line"></em></div></div></div>'; 
           
    $('body').append(str);
}