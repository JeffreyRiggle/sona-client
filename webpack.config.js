const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: [ 
      'aurelia-bootstrapper'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',    
    chunkFilename: '[name].js'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['src', 'node_modules'],
  },

  module: {
    rules: [
      { 
        test: /\.(js)$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: { 
          presets: [['env', { modules: false }]],
          plugins: ['transform-class-properties', 'transform-decorators-legacy']
        }
      },
      { 
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      { 
        test: /\.html$/i, 
        use: 'html-loader' 
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        Map: 'core-js/es6/map',
        WeakMap: 'core-js/es6/weak-map',
        Promise: 'core-js/es6/promise',
        regeneratorRuntime: 'regenerator-runtime'
    }),
    new AureliaWebpackPlugin.AureliaPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: false,
      allChunks: true
    }), 
    new HtmlWebpackPlugin({
        template: '!html-webpack-plugin/lib/loader!index.html',
        filename: 'index.html'
    })
  ],
  devServer: {
    port: 3000,
    proxy: {
      '/repos' : {
        target: 'https://api.github.com/',
        changeOrigin: true
      },
      '/sona' : {
        target: 'http://localhost:8080/',
        changeOrigin: true
      }
    }
  },
};