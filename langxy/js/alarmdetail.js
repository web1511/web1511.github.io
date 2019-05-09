$(function(){
    /*** 筛选 ***/
    selectState();
    function selectState() {
        var bType = $('#bType');
        var aLi = bType.find('li');
        bType.on('click','li',function(){
            aLi.removeClass('active');
            $(this).addClass('active');
        })
    }
});