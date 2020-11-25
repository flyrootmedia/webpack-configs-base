const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Module Federation available OOTB with Webpack 5+
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/helloWorld.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:9001/'
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    index: 'helloWorld.html',
    // add unique port for each app
    port: 9001,
    writeToDisk: true
  },
  module: {
    rules: [
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'helloWorld.html',
      // removed chunks since there's only one bundle
      title: 'Hello world',
      description: 'Hello world',
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
      exposes: {
        './HelloWorldButton':
          './src/components/HelloWorldButton/HelloWorldButton.js'
      }
    })
  ]
};
