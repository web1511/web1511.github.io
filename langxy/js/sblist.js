$(function() {

    /****解绑事件***/
    isBindFn();
    function isBindFn() {
        var reset = $('.reset');
        reset.each( function(i){
            reset[i].onOff = true;
            $(this).click(function() {
                if( $(this)[0].onOff ) {
                    pop('解绑成功');
                    $(this).html('绑定');
                }else{
                    $(this).html('解绑');
                    pop('绑定成功');
                }
                $(this)[0].onOff = !$(this)[0].onOff;
            });
        });
    }
    /**** 筛选*/
    var opt = {
        el:'#sxBtn',
        textArr : [  
            { name: '烟感报警器',attr:'0' } ,
            { name: '门报警器',attr:'1' } 
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
})