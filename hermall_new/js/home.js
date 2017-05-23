/**
 * Created by mingxin on 2016/8/17.
 */
$(function() {
    setTimeout(function(){
        $("#loading").fadeOut();
    },1000);
    $('#dowebok').fullpage({
        'verticalCentered': false,
        'scrollingSpeed':500,
        'timeDelay':true,//翻页是否延时
        'timeDelaySpeed':800,//延时时间
        'easing':'easeInQuart',
        'anchors': ['page1', 'page2', 'page3', 'page4','page5', 'page6', 'page7', 'page8','page9', 'page10', 'page11', 'page12','page13', 'page14', 'page15'],
        'css3': true,
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': ['首页', '', '', '目录','ARTORIZ', '', '艺术设计中心', '','精工坊', '', '艺术设计学院', '','赫美愿景', '关于赫美', '联系我们'],
        'onLeave':function(index,nextIndex,direction){
            $(".fp-section:eq("+(index-1)+")").removeClass("is-active").removeClass("is-active-index").removeClass("isDelay");
            //console.log(index+'-------'+nextIndex+'-------'+direction)
            /*控制离开当前页之前*/
            var nextNode = $(".fp-section:eq("+(nextIndex-1)+")");
            if(direction=="up"){
                nextNode.removeClass("is-leave-bottom").addClass("is-leave-top");
            }else{
                nextNode.removeClass("is-leave-top").addClass("is-leave-bottom");
            }

            if(nextIndex==1||nextIndex==12||nextIndex==13){//显示白色的按钮
                if($('#fp-nav').hasClass('m_close')){
                    $('.my_menu').removeClass('my_menu_closed_b').addClass('my_menu_closed_w');
                }else{
                    $('.my_menu').removeClass('my_menu_opened_b').addClass('my_menu_opened_w');
                }
            }else{//显示黑色北京按钮
                if($('#fp-nav').hasClass('m_close')){
                    $('.my_menu').removeClass('my_menu_closed_w').addClass('my_menu_closed_b');
                }else{
                    $('.my_menu').removeClass('my_menu_opened_w').addClass('my_menu_opened_b');
                }
            }
            //nextNode.addClass("is-active-index").addClass("is-active");
            nextNode.addClass("is-active-index")
        },
        'afterLoad':function(anchorLink ,index){
            /*控制进入当前页之后*/
            $(".fp-section:eq("+(index-1)+")").addClass("is-active");
            if(index==6||index==12){
                setTimeout(function(){
                    $(".fp-section:eq("+(index-1)+")").addClass("isDelay");
                },1300);
            }
        }
    });

    $(".about-hmei a").click(function(){
        $(this).addClass("checked").siblings().removeClass("checked");
    });
    $(".about-hmei a:first").click(function(){
        $(".about-esg").slideDown(500);
        $(".about-english").hide(100);
    });
    $(".about-hmei a:last").click(function(){
        $(".about-english").slideDown(500);
        $(".about-esg").hide(100);
    })

    function pageResize(){
        var scaleX = $(window).width()/1920;
        var scaleY= $(window).height()/950;
        if(scaleX>scaleY){
            scaleX = scaleY;
        }else{
            scaleY = scaleX;
        }
        $(".page6-left,.page12-right").css({"-webkit-transform": "scale("+scaleX+","+scaleY+")","-moz-transform": "scale("+scaleX+","+scaleY+")","-ms-transform": "scale("+scaleX+","+scaleY+")","transform": "scale("+scaleX+"),"+scaleY+""});
        if($('body').hasClass('ie8')){
            $(".page6-left").css({'*zoom':scaleX,'zoom':scaleX,left:"-10%"});
            $(".page12-right").css({'*zoom':scaleX,'zoom':scaleX,right:'-'+((1-scaleX)*100)+'%'});
        }
    }
    //create menu switches
    var h = '<div class="my_menu my_menu_opened_w"><div class="menu_line"></div><div class="menu_line menu_line_2"></div><div class="menu_line isLastLine"></div><img class="my_menu_c_b" src="img/icon_close_01.png"><img class="my_menu_c_w" src="img/icon_close_02.png"><img class="my_menu_m_b" src="img/icon_menu_01.png"><img class="my_menu_m_w" src="img/icon_menu_02.png"></div>'
    $('body').append(h);
    $('.my_menu').on('click',function(e){
        var _this = $(this);
        if(_this.hasClass('my_menu_opened_w')||_this.hasClass('my_menu_opened_b')){
            $('#fp-nav').addClass('m_close');
            //判断显示不一样颜色的按钮
            if(_this.hasClass('my_menu_opened_w')){
                _this.removeClass('my_menu_opened_w').addClass('my_menu_closed_w');
            }else{
                _this.removeClass('my_menu_opened_b').addClass('my_menu_closed_b');
            }
        }else{
            $("#fp-nav").removeClass('m_close');
            //判断显示不一样颜色的按钮
            if(_this.hasClass('my_menu_closed_w')){
                _this.removeClass('my_menu_closed_w').addClass('my_menu_opened_w');
            }else{
                _this.removeClass('my_menu_closed_b').addClass('my_menu_opened_b');
            }
        }
        e.stopPropagation();
    });

    //next page
    $('.slip-tips').on('click',function(e){
        $('#dowebok').fullpage.moveSectionDown();
        e.stopPropagation();
    })
    $(window).resize(pageResize);
    pageResize();
});