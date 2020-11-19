// must use common.js modules in webpack config

// must use path.resolve for absolute paths in outputs. Path is included with node
const path = require('path');

// Terser is the preferred method for minimizing JS now, and is included OOTB with Webpack 5+

// NOTE: you don't need to import it or add it to plugins in your production config because it runs
// by default. Also don't really need it in dev config because we don't need our code minified in dev.
// Just leaving here for reference because it is what webpack uses

// HOWEVER: if you have other optimization minimize settings, like for the CssMinimizerPlugin, it looks like
// that overrides the default, so Terser doesn't run, so you DO need to add it manually.

// const TerserPlugin = require('terser-webpack-plugin');

// MiniCssExtractPlugin for creating separate CSS bundle for prod (not needed in dev)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// CssMinimizerPlugin for minimizing CSS. Only necessary in production mode
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// CleanWebpackPlugin to clean the output directory (note this is a named export)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// HtmlWebpackPlugin for dynamically generating html with updated hashed filename includes
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // for a SPA with only one entry point, entry can be a simple string
  // entry: './src/index.js',

  // for multi-page app, entry is an object
  entry: {
    index: './src/index.js',
    imagePage: './src/imagePage.js'
  },
  output: {
    // adding [contenthash] adds a random hash that updates whenever
    // there are changes to support browser caching. Only need to do this
    // in the production mode config

    // for SPA, output file can be a single bundle
    // filename: 'bundle.[contenthash].js',

    // for multi-page app, replace hardcoded "bundle" with [name] token to match the entry file
    filename: '[name].[contenthash].js',

    path: path.resolve(__dirname, './dist'),
    // NOTE: without this publicPath, file-loader resolves using the file system
    // path instead of relative to the project root. This can be an absolute path
    // to your site domain as well, or empty
    // publicPath: 'dist/'

    // when using HtmlWebpackPlugin, index.html will end up in the dist folder as well,
    // so make this empty otherwise 'dist/' will be added to the paths in the generated html
    publicPath: ''
  },
  // mode options:
  // 'none' - no optimization settings
  // 'development' - sets process.env.NODE_ENV to 'development'
  // 'production' - sets process.env.NODE_ENV to 'production'
  mode: 'production',
  optimization: {
    // to split up common dependencies into their own bundles to prevent them being
    // included in every generated JS file. Webpack seems to know to add any vendor chunks
    // only where needed.

    // NOTE: weback only breaks out common files if they're over a certain
    // size (30kb?) so for example, including Lodash results in a separate asset, but including
    // React does NOT by default. To change this, use the minSize option (in bytes)

    // NOTE: the verbose naming (with the delimiter) only seems to affect dev mode. In production
    // the generated filename is a random number
    splitChunks: {
      chunks: 'all',
      minSize: 5000,
      automaticNameDelimiter: '_'
    }
    // minimize: true,
    // minimizer: [
    //   // when specifiying other optimizations, you need to still add Terser
    //   new TerserPlugin(),
    //   new CssMinimizerPlugin()
    // ]
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

    // Terser can be added here or above in the optimization settings per the Webpack docs
    // new TerserPlugin(),

    // MiniCssExtractPlugin extracts files into a separate file rather than bundling with JS
    new MiniCssExtractPlugin({
      // for SPA, output file can be a single bundle
      // filename: 'styles.[contenthash].css'

      // for multi-page app, replace hardcoded "styles" with [name] token to match the entry file
      filename: '[name].[contenthash].css'
    }),

    // CssMinimizerPlugin can be added here or in optimization settings. If you add it in the
    // optimmization minimize section you need to add Terser, too, or it won't run
    new CssMinimizerPlugin(),

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

    // HtmlWebpackPlugin to auto generate html files
    new HtmlWebpackPlugin({
      // use the filename option to specify a custom path and/or output file, or when you
      // have a multi-page app and need to differentiate entry points
      // filename: 'templates/custom-filename.html',
      filename: 'index.html',

      // add chunks array if you need to specify which bundles should be included.
      // NOTE: the chunk names come from the keys you specified in the entry points array
      chunks: ['index'],

      title: 'Webpack 5: The Complete Guide for Beginners',

      // if the description meta tag is in your template, set the option at the same level
      // as the template rather than in the meta section
      description: 'A basic webpack template for testing various build options',

      // use meta object to generate meta tags
      meta: {
        // description: 'A basic webpack template for testing various build options'
        robots: 'noindex, nofollow'
      },

      // specify a template, in this case we're using handlebars
      template: 'src/page-template.hbs'
    }),

    // for multi-page apps, add a new instance for each page
    new HtmlWebpackPlugin({
      filename: 'imagePage.html',
      chunks: ['imagePage'],
      title: 'Webpack 5: The Complete Guide for Beginners | Image Page',
      description: 'A second page to test a multi-page application',
      template: 'src/page-template.hbs'
    })
  ]
};
