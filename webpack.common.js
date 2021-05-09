const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img',
          publicPath: '/img',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: {
      //       loader: 'url-loader',
      //       options: {
      //           name: './public/img/icon/[name].[ext]'
      //       }
      //   }
      // }
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!img/**'],
    }),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),    
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
  ],
};
