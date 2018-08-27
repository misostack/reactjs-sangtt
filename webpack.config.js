const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const pathSrc = path.resolve(__dirname, 'src');

require('dotenv').config();
module.exports = {
  entry: [
    `${pathSrc}/index.js`
  ],
  
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },

  devServer: {
    contentBase: './public',
    port: '3000',
    historyApiFallback: true,
  },

  resolve: {
    // modules : [pathSrc, 'node_modules'],
    alias: {
      app: `${pathSrc}/app`,
      actions: `${pathSrc}/actions`,
      components: `${pathSrc}/components`,
      constants: `${pathSrc}/constants`,
      containers: `${pathSrc}/containers`,
      reducers: `${pathSrc}/reducers`,
      styles: `${pathSrc}/styles`,
      services: `${pathSrc}/services`,
      store: `${pathSrc}/store`,
      theme: `${pathSrc}/theme`,
      thumbnails: `${pathSrc}/thumbnails`,
      utils: `${pathSrc}/utils`,
    },
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: ["file-loader"]
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: ['file-loader'],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'public/vendors'), to: path.resolve(__dirname, 'build/vendors')}
    ])
  ]
}