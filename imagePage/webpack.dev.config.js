const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Module Federation available OOTB with Webpack 5+
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/imagePage.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    // be sure to set the publicPath when exposing components with Module Federation
    publicPath: 'http://localhost:9002/'
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    index: 'imagePage.html',
    // add a unique port for each app
    port: 9002,
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
      filename: 'remoteEntry.js',
      // Note we're now exposing the page components for Micro Frontend architecture
      // and no longer importing anything from helloWorld
      exposes: {
        './ImagePage': './src/components/ImagePage/ImagePage.js'
      }
    })
  ]
};
