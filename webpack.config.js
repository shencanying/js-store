const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const devMode = true;

module.exports = {
  module: {
    rules: [{
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader',

      options: {
        plugins: ['syntax-dynamic-import'],

        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ]
        ]
      },

      test: /\.js$/
    },
    {
      test: /\.(sa|c|sc)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: loader => [
              require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] })
            ]
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: "file-loader?name=static/[name].[ext]"
    }
    ]
  },

  output: {
    chunkFilename: '[name].[hash].js',
    filename: '[name].[hash].js'
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    index: 'index.html'
  },

  mode: 'development',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),

    new HtmlWebpackPlugin({
      title: '1',
      filename: 'index.html',
      template: './src/assets/index.html',
      minify: {
        collapseWhitespace: false,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      title: '2',
      filename: 'library.html',
      template: './src/assets/library.html',
      minify: {
        collapseWhitespace: false,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.NamedModulesPlugin(),
  ]
};