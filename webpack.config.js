const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const ASSET_PATH = process.env.ASSET_PATH || './';

const optimization = () => {
  const config =  {
    splitChunks: {
      chunks: 'all'
    }
  }
  if(isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        //hmr: isDev,
        // reloadAll: true,
      },
    },
    'css-loader'
      ]
      if (extra) {
        loaders.push(extra)
      }
    return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
  },
  optimization:  optimization(),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, './src/pictures/cards'),
    //     to: path.resolve(__dirname, './dist/pictures/cards')
    //   }
    // ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: ['file-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
      ]
    }
  }
