/**
 * Function:__popup
 * author: Trent
 * date:2015-8-24
 * history:
 *
 */
;(function($){
    var timer = null, 
        flag = 0
    ,__popup = function(opt){
        var $popup = $(opt.popup) , $mask = $(opt.mask) , $popup_close = $(opt.popup_close,$popup);
        $mask.show();
        $mask.addClass('cssShow');
        $popup.addClass('currentPop cssShow');
        if($popup.is('.pop_share')){
            pop_hidetimer = setTimeout(function(){
                $mask.click();
            },6000);
        }
        $(document).on('click',opt.mask,function(){
            // console.log(opt)
            __hidepop(opt);
            return false;
        });
        if($popup_close){
            $popup_close.click(function(){
                $mask.click();
                return false;
            });
        }

    },__hidepop = function(opt){
        // alert(1)
        var $popup = $(opt.popup) , $mask = $(opt.mask);
        // console.log(opt.hidecall.toString())
        if(opt.hidecall) {
            clearTimeout(callbacktimer);
            opt.hidecall.call($popup,opt);
        }
        $mask.removeClass('cssShow');
        // setTimeout(function(){
            $mask.hide();
        // },600);
        $popup.removeClass('currentPop cssShow');
        var $container = $('.mainscene .btns');
        var timer = setTimeout(function(){
            if($('.zhong',$container).is('.current') && $('.zhi',$container).is('.current') && $('.wen',$container).is('.current') && $('.xing',$container).is('.current') && $('.rui',$container).is('.current')&&flag == 0){
                flag = 1;
                $('.pop_huodezouzhang').popUp({
                    mask:'.mask_white'
                });
                var zouzhangpophidetimer = null , zouzhangshowtimer = null;
                zouzhangpophidetimer = setTimeout(function(){
                    $('.mask_white').click();
                },3000);
                zouzhangshowtimer = setTimeout(function(){
                    $('.chakanzouzhang').fadeIn('slow',function(){
                        clearTimeout(zouzhangpophidetimer);
                        clearTimeout(zouzhangshowtimer);
                    });
                },4000);
            }else{
                clearTimeout(timer);
            }
        },1000);
        clearTimeout(pop_hidetimer);
    }

    $.extend({
        'popUp':function(opt){
            var defaults = {
                mask:'.mask',
                popup:'.popup',
                hidecall:function(){}
            }
            ;
            opt = $.extend({}, defaults, opt||{});
            __popup(opt);
            return false;
        }
    });
    $.fn.extend({
        'popUp':function(opt){
            var defaults = {
            }
            ;
            opt = $.extend({}, defaults, opt||{});
            return this.each(function(inx,item){
                opt.popup=this;
                $.popUp(opt);
            });
        }
    });
})(jQuery);