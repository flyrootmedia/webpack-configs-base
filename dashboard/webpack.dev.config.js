const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Module Federation available OOTB with Webpack 5+
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/dashboard.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:9000/'
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    index: 'dashboard.html',
    // add unique port for each app
    port: 9000,
    writeToDisk: true,
    // for the shared dashboard wrapper app, this option tells webpack dev server to
    // return dashboard.html no matter what URL is in the address bar
    historyApiFallback: {
      index: 'dashboard.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // for the dashboard we aren't using any handlebars template
    new HtmlWebpackPlugin({
      filename: 'dashboard.html',
      title: 'Dashboard'
    }),
    new ModuleFederationPlugin({
      name: 'App',
      // define all the apps we need to load modules from
      remotes: {
        HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js',
        ImageApp: 'ImageApp@http://localhost:9002/remoteEntry.js'
      }
    })
  ]
};
