let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: { // 开发服务器的配置
        port: 3000,
        progress: true,
        // contentBase: './dist'
    },
    mode: 'development', // 模式 生产 production 开发 development
    // mode: 'production',
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径
    },
    module: {
        rules: [ //规则
            {  //css-loader
                test:/\.css$/,
                use: [
                    {
                        loader:'style-loader',
                        options:{
                            insertAt: 'top'
                        }
                    },
                    'css-loader' 
                ]
            },
            {  //css-loader
                test:/\.less$/,
                use: [
                    {
                        loader:'style-loader',
                        options:{
                            insertAt: 'top'
                        }
                    },
                    'css-loader',
                    'less-loader' 
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, //删除引号
                collapseWhitespace: true     //变为一行
            }
        })
    ]
}