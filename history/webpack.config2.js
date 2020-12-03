let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// let OptimizeCssAssetsWebpackPlugin  = require('optimize-css-assets-webpack-plugin');
// let webpack = require('webpack');

module.exports = {
    devServer: { // 开发服务器的配置
        port: 3000,
        progress: true,
        // contentBase: './dist'
    },
    performance: { // 解决limit
        hints: false
    },
    // optimization: { // 优化项
    //     minimizer: [
    //         new OptimizeCssAssetsWebpackPlugin()
    //     ]
    // },
    // mode: 'development', // 模式 生产 production 开发 development
    mode: 'production',
    // 多入口
    entry: {
        home:'./src/index.js'
    }, 
    output: {
        filename: '[name].js', // 打包后的文件名
        path: path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径
        // publicPath: 'http://' //配置公共地址
    },
    externals: { // 配置不需要打包的第三方库，例如cdn引用
        jquery:'$'
    },
    // 1)大而全  单独文件 显示行列
    // devtool:'source-map',// 增加映射文件，方便调试
    // 2)没有单独文件 显示行列
    // devtool:'eval-source-map',// 增加映射文件，方便调试
    // 3)有单独文件 不显示行列
    // devtool:'cheap-module-source-map',
    // 4)不产生文件，集成在打包文件中，不显示行列
    devtool:'cheap-module-eval-source-map',
    
    // watch: true, //监控实现自动打包
    // watchOptions: {
    //     poll:1000,//监测修改的时间(ms)
    //     aggregeateTimeout:500, //防止重复按键，500毫米内算按键一次
    //     ignored:/node_modules/,//不监测
    // },
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
                            // plugins: [
                            //     ["@babel/plugin-proposal-decorators",{"legacy": true}],
                            //     ['@babel/plugin-proposal-class-properties',{"loose": true}],
                            //     "@babel/plugin-transform-runtime"
                            // ]
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
            // {  //css-loader
            //     test:/\.css$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,                    
            //         'css-loader',
            //         'postcss-loader' 
            //     ]
            // },
            // {  //css-loader
            //     test:/\.less$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'postcss-loader',
            //         'less-loader' 
            //     ]
            // },
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
            template: './index.html',
            filename: 'index.html'     
        }),      
        // new MiniCssExtractPlugin({
        //     filename: 'css/main.css'
        // }),
        // new webpack.ProvidePlugin({ // 每个模块注入jQuery
        //     $: 'jquery'
        // })
    ]
}