let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin  = require('optimize-css-assets-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    devServer: { // 开发服务器的配置
        port: 3000,
        progress: true,
        // contentBase: './dist'
    },
    performance: { // 解决limit
        hints: false
    },
    optimization: { // 优化项
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    mode: 'development', // 模式 生产 production 开发 development
    // mode: 'production',
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径
        // publicPath: 'http://' //配置公共地址
    },
    externals: { // 配置不需要打包的第三方库，例如cdn引用
        jquery:'$'
    },
    module: {
        rules: [ //规则 右->左  下->上  
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },          
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
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
            // {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     use: [
            //         {
            //             loader: 'eslint-loader',
            //         }
            //     ]
            // },
            {  //css-loader
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,                    
                    'css-loader',
                    'postcss-loader' 
                ]
            },
            {  //css-loader
                test:/\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader' 
                ]
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
            template: './src/index.html',
            filename: 'index.html'            
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        // new webpack.ProvidePlugin({ // 每个模块注入jQuery
        //     $: 'jquery'
        // })
    ]
}