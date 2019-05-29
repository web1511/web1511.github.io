const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); /*每次编译之前，先删除之编译好的文件夹*/
const ExtractTextPlugin = require("extract-text-webpack-plugin"); /*提取css到为单独文件*/
const HtmlWebpackPlugin = require('html-webpack-plugin'); /*生成html*/
const CopyWebpackPlugin = require('copy-webpack-plugin'); /*复制文件*/
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); //抽取公共的js引入一次
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')/*精简输出*/


module.exports = {
    entry: {
        ventors:[ './src/rem.js','./src/jquery.js'],
        test: path.join(__dirname,'./src/test.js') ,
        main: path.join(__dirname,'./src/main.js')
    },
    output:{
        path: path.join(__dirname, "./build"),
        filename: "js/[name].[hash:8].js"
    },
    module:{
        rules:[

            {
                //提取html里面的img文件
               test: /\.(htm|html)?$/i,
               loader: 'html-withimg-loader',
            },
            {
                test: /\.css?$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                  limit: 8192,
                  name: '[name].[ext]?[hash:7]',
                  publicPath:'../imgs/'
                }
            },
             {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 100000,
                  name: '[name].[ext]?[hash:7]',
                  publicPath:'../imgs/'
                }
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 100000,
                  name: 'media/[name].[hash:7].[ext]'
                }
              } ,
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[name].[hash:7].[ext]'
                }
              }
        ]
    },
    plugins:[

        new ExtractTextPlugin('./build/css/[name].[hash:8].css'),
        new HtmlWebpackPlugin({
            title: '首页',
			filename: 'index.html',
            template: './index.html' , // 这个是需要引入的模板
            minify:{
				caseSensitive:false, //是否大小写敏感
				removeComments:true, //去除注释
				removeEmptyAttributes:true,//去除空属性
				collapseWhitespace:true //是否去除空格
			},
			inject:'body'
        }),
        new HtmlWebpackPlugin({
            title: '主要页面',
			filename: 'test.html',
            template: './pages/test.html' ,
            minify:{
				caseSensitive:false, //是否大小写敏感
				removeComments:true, //去除注释
				removeEmptyAttributes:true,//去除空属性
				collapseWhitespace:true //是否去除空格
			},
			inject:'body'
        }),

        new CommonsChunkPlugin({
            names : 'ventors'
        }),

        new UglifyJsPlugin(),
        new CleanWebpackPlugin()

    ]

}