const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          argv.mode === 'production' ? MiniCssExtract.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtract({ filename: argv.mode === 'production' ? 'styles.[contenthash].css' : '[name].css' }),
  ],
  optimization: argv.mode === 'production'
    ? { minimizer: ['...', new CssMinimizer()] }
    : {},
  devtool: argv.mode === 'development' ? 'source-map' : false,
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    compress: true,
  },
});
