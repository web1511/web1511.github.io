var gulp = require('gulp'),
	clean = require('gulp-clean'),//用来清空文件夹，防止多余文件
    rev = require('gulp-rev'),//生成静态资源版本号 用于清楚缓存，现在没用到
	revCollector = require('gulp-rev-collector'),
	htmlmin = require('gulp-htmlmin'),
	cleanCss = require('gulp-clean-css'),//css压缩插件
	imagemin = require('gulp-imagemin'), //图片自动压缩
	uglify = require('gulp-uglify');//js压缩插件
	
var browserSync = require('browser-sync').create(); //开发实时更新
var proxy = require('http-proxy-middleware');	//代理，解决跨域问题


// 定义css js 源文件路径


var config = {

	filePaths : {
		cleanPath:'dist/*',
		htmlSrc : '*.html',
		cssSrc : './css/*.css', //本地文件引入口
		jsSrc : './js/*.js', //本地文件引入口
		imgSrc : './img/**/*', //本地文件引入口
		pluginSrc: './plugins/**/*', //插件入口
		fontSrc: {
			path : ['css/font/**/*','css/font_new/**/*'],
			basePath: 'css' //字体包入口,注意要设置下base(string) 从css之后的路径开始匹配
		}, 
		outCss : 'dist/css' ,// 打包之后的路径
		outJs : 'dist/js', // 打包之后的路径
		outImg : 'dist/img', // 打包之后的路径
		outHtml : 'dist', // 打包之后的路径
		outPlugin : 'dist/plugins', // 打包之后的路径
		outFont : 'dist/css' // 打包之后的路径
	}

};

var filePaths = config.filePaths;


// 错误处理
function swallowError(error) {
	console.error(error.toString());
	this.emit('end');
}


var tasks = {
	clean:function(){ //一定要加return 因为要返回promise对象
		return gulp.src(filePaths.cleanPath,{read:false})
			.on('error', swallowError)
			.pipe(clean())
		;
	},
	copyImg:function(){
		return gulp.src(filePaths.imgSrc)
			.on('error', swallowError)
			.pipe(imagemin({
				    interlaced: true,
				    progressive: true,
				    optimizationLevel: 7,
				    svgoPlugins: [{removeViewBox: true}]
			 }))
			.on('error', swallowError)
			.pipe(gulp.dest(filePaths.outImg))
		;
	},
	jsmin:function(){
		return gulp.src(filePaths.jsSrc)
			.pipe(uglify())
			.on('error', swallowError)
			.pipe(gulp.dest(filePaths.outJs))
		;
	}
	,cssmin:function(){
		return gulp.src(filePaths.cssSrc)
			.pipe(cleanCss())
			.on('error', swallowError)
			.pipe(gulp.dest(filePaths.outCss))
		;
	},
	copyHtml:function(){
		return gulp.src(filePaths.htmlSrc)
			   .pipe(htmlmin({
				  collapseWhitespace:true, //清楚空格
				  removeComments:true , //清楚注释
				  minifyJS:true, //压缩html中的javascript代码
				  minifyCSS:true
			   }))
			   .on('error', swallowError)
			   .pipe(gulp.dest(filePaths.outHtml));
			   
	},
	copyPlugins: function(){
		return gulp.src(filePaths.pluginSrc)
			   .on('error', swallowError)
			   .pipe(gulp.dest(filePaths.outPlugin));
	},
	copyFonts: function(){
		/**
		 *  { base: 'css' }  这样 匹配就是 从 css后面开始匹配开始，不然， 就是 
		 *  font后面开始匹配
		 *
		 * 
		 */
		return gulp.src(filePaths.fontSrc.path,{ base: filePaths.fontSrc.basePath })
			   .on('error', swallowError)
			   .pipe(gulp.dest(filePaths.outFont));
	}
}


// 清空public文件夹
gulp.task('clean',function(){
    return  tasks.clean();
});
// css压缩
gulp.task('cssmin', function () {
     tasks.cssmin();
});
// js压缩
gulp.task('jsmin', function () {
    return tasks.jsmin();
});

//复制图片并且压缩图片
gulp.task('copyImg',function(){
	tasks.copyImg();
});


gulp.task('dist',['clean'],function(){
	async function fn() {
		await p(tasks.copyHtml);
		await p( tasks.cssmin );
		await p(tasks.jsmin);
		await p(tasks.copyImg);
		await p(tasks.copyPlugins);
		await p(tasks.copyFonts);
	}
	fn();
	
});

//定义一个promise
function p( fn ) {
    return new Promise(function(resolve){
			 fn && fn();
			 resolve();
    });
}


/***** 开发环境  *****/
var jsonPlaceholderProxy = proxy('/api', {
	target: 'http://www.yholink.com:8086/api.aspx',//代理的地址
	changeOrigin: true, // for vhosted sites, changes host header to match to target's host
	logLevel: 'debug',
	pathRewrite: {'^/api': ''}
});
gulp.task('dev',function(){
    var f = [
        'h5_new/dist/**/*.html',
        'h5_new/dist/**/*.css',
        'h5_new/dist/**/*.js'  
    ];
    browserSync.init(f,{
        server: {
            baseDir: "./",
            port:3000,
            middleware: [jsonPlaceholderProxy]
        }
    });
});





