let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const  webpack  = require('webpack');
// let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// let OptimizeCssAssetsWebpackPlugin  = require('optimize-css-assets-webpack-plugin');

module.exports = {
    devServer: { // 开发服务器的配置
        // port: 3000,
        // contentBase: './dist'
        progress: true,
        // 1
        // proxy: {
        //     '/api':{
        //         target:'http://localhost:3000',
        //         pathRewrite:{'/api':''}
        //     }
        // }
        // 2 模拟数据
        // before(app){
        //     app.get('/user',(req,res)=>{
        //         res.json({name:'wahaha-before'})
        //     })
        // }
        // 3 node服务中启用webpack 见server.js
        
    },
    performance: { // 解决limit
        hints: false
    },
    
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
    resolve:{ // 解析第三方包
        // modules: [path.relative('node_modules')],
        // extensions: ['.js','.css','.json'], // 拓展名
        //mainFields: [], //入口文件名 
        //mainFields: ['style','main], // 默认入口为main
        //alias: { //别名
        //  bootstrap: 'bootstrap/dist/css/bootstrap.css'
        //}
    },  
    module: {
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
    //     new webpack.DefinePlugin({
    //         DEV: JSON.stringify('dev')
    //     })
    new webpack.DefinePlugin({
        DEV: JSON.stringify('dev1'),
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify("5fa3b9"),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: "1+1",
        "typeof window": JSON.stringify("object")
      })
    ]
}