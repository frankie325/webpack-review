const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.ts',
  // 缓存生成的 webpack 模块和 chunk，再次打包大幅度提升构建速度
  cache: {
    /*
    cache 会在开发模式下默认被设置成 type: 'memory' 而且在 生产 模式 中被禁用
    设置为filesystem则开启缓存，可以开放更多的可配置项
    */
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, './node_modules/.cache/webpack'), // 缓存的路径。默认为 node_modules/.cache/webpack。
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: './js/[name].[hash:6].js',
    // 指定静态资源的输出路径
    assetModuleFilename: 'assets/image/[name].[hash:6][ext]',
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   // include: path.resolve('src'),
      //   exclude: /node_modules/,
      //   use: [
      //     // 开启多进程打包，提升打包速度
      //     'thread-loader',
      //     // 耗时的 loader （例如 babel-loader）
      //     'babel-loader',
      //   ],
      // },
      // 1. 使用ts-loader，但没有polyfill功能
      // https://blog.csdn.net/iamxuqianqian/article/details/116067093, ts使用指南
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //         // transpileOnly: true, // 只做语言转换，而不做类型检查
      //       },
      //     },
      //   ],
      // },
      // 2. 使用babel-loader转换typescript，再配合typescript的 tsc --watch进行类型检查
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader'],
      },
      // 3.使用awesome-typescript-loader（高版本TypeScript与该插件不兼容，会有bug）
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   use: 'awesome-typescript-loader',
      // },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        // 处理.css
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        // 提取css到单独的文件，已经没有内联在js中，会被html-webpack-plugin注入到link标签中
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // 处理.less结尾文件
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        // 处理资源文件
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name].[hash:6][ext]',
        },
      },
    ],
  },
  devServer: {
    hot: true,
  },
  optimization: {
    chunkIds: 'natural', // id名称占位符使用哪种算法
    splitChunks: {
      chunks: 'all',
      minSize: 200, //文件小于200字节则不会进行分包

      cacheGroups: {
        // 将node_modules下引用的模块，打包到一个chunk中
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: './lib/[id]_vendors.js',
          priority: -10, //vendor分组优先级更高
          // name:"" // name也可以设置打包的文件名称，可以是字符也可以是函数，与filename的区别就是，名字是固定的，不能使用名称占位符
        },
        utils: {
          test: /utils/,
          filename: './utils/[name].[hash:6].js',
        },
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack复习', //生成的html文件中，title标签的内容
      template: './index.html',
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: 'static',
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash:6].css',
    }),
    new CssMinimizerPlugin(),
    // new BundleAnalyzerPlugin(),
    // new CheckerPlugin(),
  ],
};
