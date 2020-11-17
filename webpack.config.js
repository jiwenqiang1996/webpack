const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './main.js',
    output: {
        //将所有依赖的模块合并输出到 bundle.js 文件
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist'),
    },
    module:{
        rules: [
            {
                //用正则表达式去匹配要用该 Loader 转换的 css 文件
                 //解析.scss文件
                test: /\.css$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    // "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"    // 提取出来的css文件路径以及命名
        }),
    ]
}