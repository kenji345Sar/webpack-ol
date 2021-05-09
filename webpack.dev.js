const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  watch: true,
  // devtool: 'inline-cheap-module-source-map',
  devtool:false,
  devServer: {
    open: true,
    port: 9000,
    contentBase: path.resolve(__dirname, 'public'),
  },
});

