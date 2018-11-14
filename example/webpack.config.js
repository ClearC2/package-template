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
        test: /\.css$/,
        loader: extractSASS.extract({
          fallback: 'style-loader',
          use: [ 'css-loader' ]
        })
      },
      {
        test: /\.scss/,
        loader: extractSASS.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader?sourceMap' ]
        })
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.mp3$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000, mimetype: 'application/font-woff' }
        }]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000, mimetype: 'application/octet-stream' }
        }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000, mimetype: 'image/svg+xml' }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8192 }
        }]
      }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.output.path = path.join(__dirname, '../docs')
  config.output.publicPath = './'
}

module.exports = config
