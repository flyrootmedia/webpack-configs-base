const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Module Federation available OOTB with Webpack 5+
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/helloWorld.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:9001/'
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
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties']
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
      filename: 'helloWorld.html',
      // removed chunks since there's only one bundle
      title: 'Hello world',
      description: 'some description',
      template: 'src/page-template.hbs'
    }),
    new ModuleFederationPlugin({
      // arbitrary app name. during build, webpack will generate a file
      // with everything this app exports to make it available to other apps
      name: 'HelloWorldApp',
      // remoteEntry.js is simply a convention for this exports file name
      filename: 'remoteEntry.js',
      // specify any modules you want to expose by giving them a name and
      // the location relative to the publicPath domain (set in output above)
      // Note we're now exposing page components for Micro Frontend architecture
      exposes: {
        './HelloWorldButton':
          './src/components/HelloWorldButton/HelloWorldButton.js',
        './HelloWorldPage': './src/components/HelloWorldPage/HelloWorldPage.js'
      }
    })
  ]
};
