$(function(){
    /*** 单选****/
    signSelect( '#alarmSet' );
    signSelect( '#wangluo' );
    function signSelect( obj ) {
        var comBtn = $(obj).find('.comBtn');
        var iconfont = $(obj).find('.iconfont');
        comBtn.each( function(i){
           comBtn.attr('state',false);
           $(this).click(function(){
              comBtn.attr('state',false);
              $(this).attr('state',true);
              iconfont.addClass('icon-danxuanweixuanzhong');
              $(this).find('.iconfont').removeClass('icon-danxuanweixuanzhong');
           });
        });
    }

    /**** 设置 ****/
    settingFn('#alarmSet' );
    settingFn('#wangluo' );
    function settingFn( obj ) {
        var comBtn = $(obj).find('.comBtn');
        var iconfont = $(obj).find('.iconfont');
        var isActive = null;
        $( obj + '_Btn' ).click(function(){
            for( var i=0;i<comBtn.length;i++ ) {
                if( comBtn.eq(i).attr('state') == 'true') {
                    isActive = true;
                    break;
                }
                isActive = false;
            }
            if( isActive ) {
                askFn('设置成功',function(){
                        //确定的回调
                },function(){
                        //取消的回调
                });
            }else{
                pop('请选择相关设置');
                //break;
            }
           
        })
        
    }
    /**** 时间的设置 ***/
    $('#timerBtn').click(function(){
        var txt = $.trim($('#num').val());
        if( txt == '') {
            pop('请输入数字');
            return;
        }
        askFn('设置成功',function(){

        });
    });

    /*** 数字加减 ****/
    numChnage() ;
    function numChnage() {
        var num = 0;
        var add = $('#addIcon');
        var jsIcon = $('#jsIcon');
        var numInput = $('#num');
        add.click(function() {
            num ++;
            if( num >=255 ) {
                num = 255;
            }
            numInput.val( num );

        });
        jsIcon.click(function() {
            num --;
            if( num <= 0 ) {
                num = 0;
            }
            numInput.val( num );

        });
    }
});