const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Module Federation available OOTB with Webpack 5+
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/imagePage.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/static/'
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      automaticNameDelimiter: '_'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
            // removed plugin-proposal-class-properties because it's not used in this app
          }
        }
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'imagePage.html',
      // removed chunks since there's only one bundle
      title: 'Image Page',
      description: 'Image Page',
      template: 'src/page-template.hbs'
    }),
    new ModuleFederationPlugin({
      name: 'ImageApp',
      // in this app, we aren't exposing any modules, but rather consuming them from the
      // HelloWorldApp, so we need to configure the location of 'remotes' we want to pull
      // modules from
      remotes: {
        HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js'
      }
    })
  ]
};
