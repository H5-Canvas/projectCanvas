

 const path = require('path');
 const htmlWebpckPlugin = require('html-webpack-plugin')

 module.exports = {
     mode:"development", // 设置当前环境 开发环境或胜场环境 当前为生产环境
     entry:"./app.js", // 入口文件
     output:{  // 出口文件
         path:path.resolve(__dirname,"build"), // 打包的文件路径
         filename:"bundle.js" // 打包的文件名
     },
     plugins:[
         // 插件模块
         // new htmlWebpckPlugin()
     ]
 };