const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const production = process.env.NODE_ENV !== 'development';
console.log('Is production? ', production);

module.exports = {
  mode: production ? 'production' : 'development',
  entry: {
    app: ['aurelia-bootstrapper']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: production ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
    sourceMapFilename: production ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map',
    chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['src', 'node_modules'].map(x => path.resolve(x)),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { "legacy": true}],
              ['@babel/plugin-proposal-class-properties', { "loose": true}]
            ]
          }
        }
      },
      { 
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !production
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !production
            }
          },
          'css-loader',
          'less-loader'
        ]
      },
      { 
        test: /\.html$/i, 
        use: 'html-loader' 
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  plugins: [
    new AureliaPlugin(),
    new MiniCssExtractPlugin({
      filename: production ? 'css/[name].[contenthash].bundle.css' : 'css/[name].[hash].bundle.css',
      chunkFilename: production ? 'css/[name].[contenthash].chunk.css' : 'css/[name].[hash].chunk.css'
    }), 
    new HtmlWebpackPlugin({
        template: 'index.ejs',
        filename: 'index.html',
        metadata: {
          title: 'Sona Client'
        }
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
  }
};