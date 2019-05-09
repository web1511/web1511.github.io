$(function(){
    
     /**** 筛选*/
    var opt = {
        el:'#sxBtn',
        textArr : [  
            { name: '在线',attr:'0' } ,
            { name: '离线',attr:'1' } ,
            { name: '报警',attr:'2' } 
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