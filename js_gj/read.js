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
		let fileNames = findSync('./');
		return fileNames;
	},
	htmlFile() { // 返回 html的文件
		let newNames = this.allFile();
		return newNames.filter( (item,index) => {
	 			return item.indexOf('.html') > -1
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
let htmlFile = filterArr.htmlFile();


htmlFile.forEach( (item,index) => {
	createFile( index );
});


function createFile( index ) {
	let htmlArr = [];
	fs.readFile( htmlFile[index],(err,data) => {
		if( err ) {
		}else{
			var newStr = '';
			var htmlStr = data.toString();
			var reHtml = /<body[^>]*>([\w\W]*)<script>/g;
			// newStr += '<template>' +htmlStr.replace(/<body>(.)<\/body>/g,function($1,$2){
			// 	console.log($1,$2)
			// })+'</template>\n\t';
		    htmlStr.replace(reHtml,function($1,$2){
				htmlArr.push($1);
			});
			console.log(htmlArr[index]);
			return;
			//newStr += '<script>' +fileArr[index].split('<script>')[1].split('</script>')[0]+'</scrIpt>\n\t';
			newStr += htmlStr.split(/^<style>.<\/style>$/g)[0];
			//写入文件
			//const data = new Uint8Array(Buffer.from(newStr);
			fs.mkdir('./renew', { }, (err1) => {
			  
			   fs.writeFile( './renew/'+ htmlFile[index].split('.html')[0] + '.vue' ,newStr,
				   (err2) => {}
			   );
		   });
			
		}
	});
	
}


