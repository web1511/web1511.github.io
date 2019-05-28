let fs = require('fs');
let join = require('path').join;

function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
}


let filterArr = {
	allFile () { //返回全部文件
		let fileNames = findSync('./my_app/build');
		return fileNames;
	},
	mapFile() { // 返回 html的文件
		let newNames = this.allFile();
		return newNames.filter( (item,index) => {
	 			return item.indexOf('.map') > -1
		});
	},
	cssFile() { // 返回 css的文件
		let newNames = this.allFile();
		return newNames.filter( (item,index) => {
	 			return item.indexOf('.css') > -1
		});
	}
}

//筛选只是.html 的内容
let mapFiles = filterArr.mapFile();
console.log( mapFiles );

// fs.readFile( htmlFile[2],(err,data) => {
//  	if( err ) {
//  	}else{
//  		var newStr = '';
//  		var htmlStr = data.toString();
//  		newStr += '<template>' +htmlStr.split('<body>')[1].split('<script>')[0]+'</template>\n\t';
//  		newStr += '<script>' +htmlStr.split('<script>')[1].split('</script>')[0]+'</scrIpt>\n\t';
//  		newStr += '<style>' +htmlStr.split('<style>')[1].split('</style>')[0]+'</style>';
//  		//写入文件
//  		//const data = new Uint8Array(Buffer.from(newStr);
//          fs.writeFile( './renew/'+ htmlFile[2] + '.vue' ,newStr,
//          (err2) => {}
//      );
 		
//  	}
// });

