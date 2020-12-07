let path = require('path');
let webpack = require('webpack');

module.exports = {
    mode:'development',
    entry: {
        react:['react','react-dom']
    }, 
    output: {
        filename: '_dll_[name].js', // 打包后的文件名
        path: path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径
        // publicPath: 'http://' //配置公共地址
        library: '_dll_[name]',
        // libraryTarget: 'var', // 默认var，取值有 this，common,umd....
    },
    plugins: [
        new webpack.DllPlugin({
            name:'_dll_[name]', // name == library
            path: path.resolve(__dirname,'dist','manifest.json')
        })
    ]
}