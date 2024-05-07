const FileManagerWebpackPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: { index: path.join(__dirname, 'src', 'index.js') },
  module: {
    rules: [
      { test: /\.(?:js|mjs|cjs)$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.html$/i, loader: 'html-loader' },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.png/i, type: 'asset/resource' },
    ],
  },
  output: {
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new FileManagerWebpackPlugin({ events: { onStart: { delete: ['dist'] } } }),
    new HtmlWebpackPlugin({ filename: 'index.html', template: path.join(__dirname, 'src', 'index.html') }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
};
