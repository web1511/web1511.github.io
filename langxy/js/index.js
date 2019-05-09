

var banswiper = new Swiper('#bannerW', {
    pagination: '.swiper-pagination',
    paginationclickable: true,
    width: window.innerwidth,
    setwrappersize: true,
    spacebetween: 30,
    centeredslides: true,
    autoplay: 2500,
    loop: true,
    autoplaydisableoninteraction: false
});

var myVue = new Vue({
    
    el:'#listCont',
    data : {
    	list1 : [
    		{imgUrl:'img/about.png',text:'关于我们',tId:10000},
            {imgUrl:'img/hz.png',text:'合作案例',tId:10001},
            {imgUrl:'img/px.png',text:'培训教育',tId:10006},
            {imgUrl:'img/gx.png',text:'高薪申报',tId:10005},
            {imgUrl:'img/glgw.png',text:'管理顾问',tId:10002},
            {imgUrl:'img/glpx.png',text:'管理培训',tId:10003},
            {imgUrl:'img/tx.png',text:'体系认证',tId:10004},
    		{imgUrl:'img/lw.png',text:'劳务派遣',tId:10008}
    	]
    },
    methods:{
      urlFn : function(e,title,tid){
        var msgObj = {
            title : title,
            id :tid
        }
        if( msgObj.id != 10008 ) {
            store.save('msgObj', msgObj);
            location.href = 'moban.html';
        }else{
            location.href =  'about.html';
            //location.search = '?callback=jhGoback';
           // jhGoback();
        }
      	
      }
    }

});


function jhGoback(){
   
}