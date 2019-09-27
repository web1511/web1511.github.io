let fs = require('fs');

// fs.open('1.txt','r',( err,data)=>{
//    // console.log( err,data);
//     // try {
//     //     console.log('打开成功')
//     // } catch (error) {
//     //     throw error;
//     // }

//     if( err ) {
//         console.log('文件打开失败')
//     }else{
//         fs.read('')
//     }
// });

fs.watch('1.txt',function(ev,fn){
    console.log(ev);
    if( fn ) {
        console.log( fn + '发生了改变')
    }else{
        console.log('.....');
    }
})
