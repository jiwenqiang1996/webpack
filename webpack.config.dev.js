let {smart} = require('webpack-merge');
let base = require('./webpack.config');

module.exports = smart(base,{    
    mode: 'development',
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
    // 1)大而全  单独文件 显示行列
    // devtool:'source-map',// 增加映射文件，方便调试
    // 2)没有单独文件 显示行列
    // devtool:'eval-source-map',// 增加映射文件，方便调试
    // 3)有单独文件 不显示行列
    // devtool:'cheap-module-source-map',
    // 4)不产生文件，集成在打包文件中，不显示行列
    devtool:'cheap-module-eval-source-map',
    
})