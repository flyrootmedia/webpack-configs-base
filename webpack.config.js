// must use common.js modules in webpack config

// NOTE: see https://github.com/webpack/webpack-dev-server/issues/2029 for incompatibility between latest webpack-cli
// and webpack-dev-server as of 11/18/20

// must use path.resolve for absolute paths in outputs. Path is included with node
const path = require('path');

// Terser is the preferred method for minimizing JS now, and is included OOTB with Webpack 5+
const TerserPlugin = require('terser-webpack-plugin');

// MiniCssExtractPlugin for creating separate CSS bundle for prod
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// CssMinimizerPlugin for minimizing CSS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// CleanWebpackPlugin to clean the output directory (note this is a named export)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// HtmlWebpackPlugin for dynamically generating html with updated hashed filename includes
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // webpack-dev-server options, if you're using it
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  entry: './src/index.js',
  output: {
    // adding [contenthash] adds a random hash that updates whenever
    // there are changes to support browser caching
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    // NOTE: without this publicPath, file-loader resolves using the file system
    // path instead of relative to the project root. This can be an absolute path
    // to your site domain as well, or empty
    // publicPath: 'dist/'

    // when using HtmlWebpackPlugin, index.html will end up in the dist folder as well,
    // so make this empty otherwise 'dist/' will be added to the paths in the generated html
    publicPath: ''
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  module: {
    // NOTE: install all loaders as dev dependencies
    rules: [
      {
        test: /\.(xml)$/,
        use: ['xml-loader']
      },
      {
        // file-loader moves a copy to dist and hashes the file name
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        //use: ['file-loader']
        options: {
          // use this template to keep the same path/filename as the src directory
          // name: '[path][name].[ext]',
          outputPath: 'images',
          // I added this to resolve the images path properly in an html file in a subdirectory. This works fine with a web
          // server, but not if you're just viewing your file through the file system. May need to look into the correct
          // way to configure this
          publicPath: '/images/'
        }
      },
      {
        // css-loader allows imports of CSS files, style-loader
        // injects rules into the DOM in style tags at runtime.
        // NOTE: style-loader is usually only used for dev mode because it
        // causes all of the styles to be bundled in your bundle.js
        // file, which then loads them, so that can get super bloated.
        // for prod, separate them into a CSS bundle for better performance with MiniCssExtractPlugin
        // see the docs for how to configure dev/prod differently
        test: /\.css$/,
        use: [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        // add sass-loader for compiling/loading sass.
        // note the order of the loaders. Webpack runs them from right to left,
        // so order matters. When using sass-loader, be sure to install node-sass as well
        test: /\.(sass|scss)$/,
        use: [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        // use babel-loader for all JS, excluding the node_modules directory
        // install both babel-loader and @babel/core library
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // @babel/env takes the latest JS standard and compiles down to ES5
              // module to install is @babel/preset-env, but looks like you can exclude the "preset-"
              // prefix when adding to your presets
              '@babel/env'
            ],
            plugins: [
              // this plugin is specifically for recognizing class properties. Search the babel
              // docs if you need plugin support for any specific features
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        // Note: when using the handlebars-loader, you need to also install Handlebars as a prod dependency
        test: /\.hbs$/,
        use: ['handlebars-loader']
      }
    ]
  },
  plugins: [
    // NOTE: install all plugins as dev dependencies
    // Terser can be added here, but I added it above in the optimazation settings per the Webpack docs
    //new TerserPlugin(),
    // MiniCssExtractPlugin extracts files into a separate file rather than bundling with JS
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),
    // CleanWebpackPlugin to clean the output folder before a build, removing old hashed files, etc.
    new CleanWebpackPlugin({
      // use this option if you need to clean any directories outside the main output (dist) folder
      // paths are relative to the output directory, so '**/*' specifies dist and all subdirectories,
      // the path.join line is used for outside directories
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*')
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack 5: The Complete Guide for Beginners',
      // use the filename option to specify a custom path and/or output file
      // filename: 'templates/custom-filename.html',

      // specify a template, in this case we're using handlebars
      template: 'src/index.hbs',

      // if the description meta tag is in your template, set the option at the same level
      // as the template rather than in the meta section
      description: 'A basic webpack template for testing various build options',

      // use meta object to generate meta tags
      meta: {
        // description: 'A basic webpack template for testing various build options'
        robots: 'noindex, nofollow'
      }
    })
  ]
};
