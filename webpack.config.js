const path = require("path");

const webpack = require("webpack"); //引入webpack
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //通过 npm 安装
const miniCssExtractPlugin = require("mini-css-extract-plugin"); //分离css,新建文件引入
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const UglifyJsPlugin = require("uglify-js-plugin"); //压缩js

module.exports = {
  devServer: {
    //先安装webpack-dev-server  开发服务器配置
    port: 3007,
    progress: true,
    contentBase: "./dist", //设置服务开启资源位置默认是项目根文件夹
    open: true,
  },
  entry: {
    index: "./src/index.js",
    app: "./src/app.js",
    indexTs: "./src/index.ts",
  },
  output: {
    filename: "[name].[hash:3].js",
    path: path.resolve(__dirname, "dist"),
    //将相对路径转绝对路径,当前路径 + dist
    //publicPath:"dist/" // 打包的时候在所有涉及到URL的路径前面都会添加dist
  },
  resolve: {
    //?! 别名需要研究
    //extensions: ['.ts', '.tsx', '.js']
  },
  mode: "development",
  optimization: {
    //优化项
    minimizer: [
      new UglifyJsPlugin({
        //开发模式下不生效
        cache: true,
        parallel: true,
        sourcMap: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  module: {
    rules: [
      //解析从右到左，从下到上
      //css-loader 解析@import 是引入相关文不报错
      //style-loader 将css 插入到head中
      //sass-loader 将sass解析成css   与 node-sass一起安装
      //less-loader 将less解析成css   与 less一起安装
      //use 当个loader可以用字符串 多个可以用数组，如果需要配置参数可以用json

      //兼容前缀插件autoprefixer 通过 postcss-loader使用,在postcss.config.js 中配置
      //通过 browserslist 插件设置要兼容的浏览器  装三个
      {
        test: /\.css|.scss|.less$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
      // file-loader 一般用于处理文件或大图片
      // url-loader 处理小图片可以转文本base64格式
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          //图片小于指定大小是传成base64,大于的话会自动使用file-loader处理文件，安装但是可以不要配置
          limit:3000,
          name: "img/[name]-[hash:5].[ext]", 
        },
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: "file-loader",
      //   options: {
      //     name: "img/[name]-[hash:5].[ext]", //这里img是存放打包后图片文件夹，结合publicPath来看就是/webBlog/build/img文件夹中，后边接的是打包后图片的命名方式。
      //   },
      // },
      
      //安装 babel-loader @babel/core  @babel/preset-env
      {
        test: /\.js$/,
        //exclude:排除
        //include:包含
        exclude: /node_modules/,
        
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              // {
              // 	"useBuiltIns": "entry"
              // }
            ],
          ],
          //"plugins": ["@babel/plugin-transform-runtime"]
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        // include: [resolve('src')]
      },
      //js检测机制 先安装eslint eslint-loader
      //webpack 设置loader
      //根目录下新建配置文件 .eslintrc.js 制定规则
      // {
      // 	test: /\.js$/,
      // 	loader: 'eslint-loader',
      // 	enforce: "pre",
      // 	include: [path.resolve(__dirname, 'src')], // 指定检查的目录
      // 	options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
      // 		//formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
      // 	}
      // }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["index"], //添加引入的js,也就是entry中的key,映入各自的js
      template: "./src/index.html",
      filename: "index.html",
      title: "index",
      hash: true,
      // minify:{
      //     collapseWhitespace:true //折叠空白区域 也就是压缩代码
      // },
    }),
    new HtmlWebpackPlugin({
      chunks: ["app"],
      template: "./src/app.html",
      filename: "app.html",
      title: "app",
      hash: true,
    }),
    new HtmlWebpackPlugin({
      chunks: ["indexTs"],
      template: "./src/indexTs.html",
      filename: "indexTs.html",
      title: "index-ts",
      hash: true,
    }),
    new miniCssExtractPlugin({
      //配置完成需要在响应的loder use 前的style-loader替换成miniCssExtractPlugin.loader 的配置
      // filename: 'style.[name].css',
      chunkFilename: "[name].css", //入口文件分别生成引入各种的css
    }),
    // new miniCssExtractPlugin({
    // 	chunks:['app'],
    // 	filename: 'style.app.css',
    // })
  ],
};
