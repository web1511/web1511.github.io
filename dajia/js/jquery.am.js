/**
 * Function:__anmwork,__frames_animation
 * author: Trent
 * date:2015-3-5
 * history:
 *
 */
;(function($){
    var __frames_animation = function(opt){//TODO多帧,传参数
        // setInterval(function() {
        //     var $t = $(opt.target);
        //     $t.css({
        //         'background-position': opt.amvalue
        //     });
        //     setTimeout(function() {
        //         $t.css({
        //             'background-position': opt.opposite_amvalue
        //         });
        //     }, 300);
        // }, 600); 
        var $t = $(opt.target);
        $t.css({
            'background-position':'left center'
        });
        setTimeout(function(){
            $t.css({
                'background-position':'right center'
            });
        },700);
        setTimeout(function(){
            __frames_animation(opt);
        },1400);
    },__anmwork = function(opt){
        $t = $(opt.target);
        $t.css({
            'transform': 'translate(' + opt.translateX + 'px,'+opt.translateY+'px)',
            '-webkit-transform': 'translate(' + opt.translateX + 'px,'+opt.translateY+'px)',
            'opacity': opt.opacityvalue
        });
    }
    $.extend({
        'framesAnimation':function(opt){
            var defaults = {
            }
            ;
            opt = $.extend({}, defaults, opt||{});
            __frames_animation(opt);
            return false;
        },
        'anmWork':function(opt){
            var defaults = {
                translateX:0,
                translateY:0,
                opacityvalue:1
            }
            ;
            opt = $.extend({}, defaults, opt||{});
            __anmwork(opt);
            return false;
        }
    });
    $.fn.extend({
        'framesAnimation':function(opt){
            var defaults = {
            }
            ;
            opt = $.extend({}, defaults, opt||{});
            return this.each(function(inx,item){
                opt.target=this;
                $.framesAnimation(opt);
            });
        },
        'anmWork':function(opt){
            var defaults = {
            }
            ;
            opt = $.extend({}, defaults, opt||{});
            return this.each(function(inx,item){
                opt.target=this;
                $.anmWork(opt);
            });
        }
    });
})(jQuery);