const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
    // clean:true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', ],
      },
      // {
      //   test: /\.(jpe?g|gif|png|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]',
      //     outputPath: 'img',
      //     publicPath: '/img',
      //   },
      // },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // Asset Modules の処理対象ファイル
        test: /\.(jpe?g|gif|png|svg)$/,
        // Asset Modules のタイプ
        // file-loader と同じことを実現したい場合は asset/resource を指定する
        type: 'asset/resource',
        generator: {
          // 画像の出力先と出力するファイル名
          // [name] にはバンドル前のファイル名が入り、[ext] にはバンドル前のファイルの拡張子が入る
          // また、画像のデフォルトの出力先は output.path に指定したパス（このサンプルでは public）になる
          // そのため、このサンプルコードでは public/images に background.jpg が出力される
          filename: 'img/[name][ext]',
          // 出力されるファイル（CSS など）に指定される画像のパス
          // 次のように指定すると、出力された CSS に記述されるパスは ./images/background.jpg のようになる
          publicPath: './',
        },
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ['**/*', '!img/**'],
    // }),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),    
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
  ],
};
