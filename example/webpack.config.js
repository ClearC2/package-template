const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSASS = new ExtractTextPlugin('[name].css')

let config = {
  entry: {
    app: [
      'babel-polyfill',
      './src/index.js'
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.ejs'
    }),
    extractSASS
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'package-template': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.scss/,
        loader: extractSASS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader?sourceMap']
        })
      }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.output.path = path.join(__dirname, '../docs')
  config.output.publicPath = './'
}

module.exports = config
