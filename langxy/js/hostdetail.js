$(function(){

    /**** 状态颜色改变 ****/
    stateChange();
    function stateChange() {
        var active = '#009966';
        var noActive = '#d2d2d2';
        var  icon =  $('.iconfont');
        icon.each(function(i){
            icon[i].onOff = true;
            $(this).click(function(){
                if( $(this)[0].onOff ) {
                    $(this).css({
                        color: active
                    });
                }else{
                    $(this).css({
                        color: noActive
                    });
                }
                $(this)[0].onOff = !$(this)[0].onOff;
            });
        })
    }

});