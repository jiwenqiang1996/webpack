let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const  webpack  = require('webpack');
const { locale } = require('moment');
let Happypack = require('happypack');//多线程
// let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// let OptimizeCssAssetsWebpackPlugin  = require('optimize-css-assets-webpack-plugin');

module.exports = {    
    performance: { // 解决limit
        hints: false
    },      
    // 多入口
    entry: {
        index:'./src/index.js'
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
                use: 'Happypack/loader?id=js',                
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
        new Happypack({
            id: 'js',
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
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname,'dist','manifest.json')
        })
    ]
}