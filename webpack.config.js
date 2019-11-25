  const path = require('path')
  const HtmlWebPackPlugin = require('html-webpack-plugin')

  const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname,'./src/index.html'), //源文件
    filename: 'index.html'
  })
  module.exports = {
    mode:'development',
    plugins:[
      htmlPlugin
    ],
    module:{
      rules: [
        { 
          test: /\.js|jsx$/, 
          loader:'babel-loader',
          exclude:/node_modules/ //排除
        },
        {
          test:/\.css$/,
          // css-loader添加参数 为普通css启用模块化
          use:['style-loader','css-loader'],
        },
        {
          test:/\.scss$/,
          use:[{
            loader:'style-loader'
          },{
            loader:'css-loader',
            options: {
              modules:{
                localIdentName: '[path]-[name]-[hash:base64:5]'   //类名
              }
              }
            },{
            loader:'sass-loader'
          }]
        },
        {
          test:/\.ttf|woff|woff2|eot|svg$/,
          loader:'url-loader'
        },
      ]
    },
    resolve:{
      extensions: ['.js','.jsx','.json','.css','.scss'],
      alias:{
        '@':path.join(__dirname,'./src')
      }
    }
  }