const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        main: path.join(__dirname,'./src/main.js')
    },
    output:{
        path: path.join(__dirname, "./build"),
        filename: "[name].[hash:8].js"
    },
    devtool: 'cheap-source-map', //开启调试模式，cheap-source-mao提升打包速度和编译速度
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
        new HtmlWebpackPlugin({
            title: '首页',
			filename: 'index.html',
			template: './index.html'  // 这个是需要引入的模板
        }),
        new HtmlWebpackPlugin({
            title: '主要页面',
			filename: 'test.html',
			template: './pages/test.html' 
        })

    ]

}