let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const  webpack  = require('webpack');

module.exports = {    
    performance: { // 解决limit
        hints: false
    },   
    // 抽取公共代码
    optimization:{
        splitChunks:{//分割代码块
            cacheGroups:{//缓存组
                common:{ //公共模块
                    chunks:'initial',
                    minSize:0,
                    minChunks:2
                },
                vendor:{
                    priority:1,
                    test:/node_modules/,
                    chunks:'initial',
                    minSize:0,
                    minChunks:2
                }
            }
        }
    },   
    // 多入口
    entry: {
        index:'./src/index.js',
        other:'./src/other.js'
    }, 
    output: {
        filename: '[name].js', // 打包后的文件名
        path: path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径
        // publicPath: 'http://' //配置公共地址
    },
    mode: 'development',    
    module: {
        noParse: /jquery/, // 不解析jquery
        rules: [ //规则 右->左  下->上 
            {  //css-loader
                test:/\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader,                    
                    'css-loader',
                    'postcss-loader' 
                ]
            },       
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                ["@babel/plugin-proposal-decorators",{"legacy": true}],
                                ['@babel/plugin-proposal-class-properties',{"loose": true}],
                                "@babel/plugin-transform-runtime"
                            ]
                        }
                    }
                ],               
                include: path.resolve(__dirname,'src'),
                exclude: /node_modules/
            },            
            { 
                test:/\.(jpg|png|gif)$/,
                // 图片大小限制，低于限制转化成base64
                use: [                  
                    {
                        loader:'url-loader',
                        options:{
                            limit: 100*1024,
                            outputPath: '/img/',
                            // publicPath: 'http://' //配置公共地址  例如cdn地址
                        } 
                    }
                ]
            },
            {  
                test:/\.html$/,
                use: [                  
                    'html-withimg-loader' 
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'     
        }), 
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname,'dist','manifest.json')
        // })
    ]
}