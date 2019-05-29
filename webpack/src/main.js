import love from '../imgs/img.jpg';
import '../css/main.css';

class Tab {

    show(){
        console.log(555);
    }
}
let t = new Tab();
t.show();


$('#list li').each(function(){
    $(this).click( function(){
        console.log($(this).html());
    })
});


$('body').append(`<img src="${love}"/>`);


async function fn() {
    await new Promise((rs,rj)=>{
            setTimeout( ()=>{
                console.log('第一出现啦啦');
                rs();
            },1000);
    });
    await new Promise((rs,rj)=>{
        setTimeout( ()=>{
            console.log('第二出现啦啦');
            rs();
        },1000);
     })
}


fn();