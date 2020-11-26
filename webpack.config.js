const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const ASSET_PATH = process.env.ASSET_PATH || './';

const open = require('open');
const openChrome = async () => {
  if (isProd) return;
  await open({app: 'chrome'});
  await open({app: 'google chrome'});
};
const plugins = () => {
  const plugins = [
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/pictures/'),
          to: path.resolve(__dirname, './dist/pictures/')
        },
      ],
    }),
  ];
  // if (isDev) {
  //   plugins.push(new Serve({
  //     open: openChrome(),
  //     static: path.resolve(__dirname, 'dist'),
  //     host: '127.0.0.1'
  //   }))
  // }
  return plugins;
}

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
      options: {},
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
  entry: ['@babel/polyfill', './index.js', 'webpack-plugin-serve/client'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: openChrome(),
    compress: true,
    hot: true,
    port: 3000
  },
  optimization:  optimization(),
  plugins: plugins(),
  watch: isDev,
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
