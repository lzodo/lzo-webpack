const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动生成html

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  //   entry: "./src/index.js",
  entry: {
    // 多入口打包
    index: "./src/index.js",
    print: "./src/print.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/", // 开发环境不要点，生产环境加个点
  },
  devServer: {
    // 文件可以从 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 访问
    static: "./dist", // 让 dev server 应从 ./dist 开始查找文件
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  module: {
    rules: [
      {
        // module loader 可以链式调用, 'style-loader' 在前，而 'css-loader' 在后
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // 使用内置的 Asset Modules
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        // 使用内置的 Asset Modules 解析字体
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  // 多入口打包时配置，不然会有问题
  optimization: {
    runtimeChunk: "single",
  },
};

/**
 *  1、设置入口文件，输出位置
 *  2、配置loading，识别转换不认识的文件
 *  3、配置插件，HtmlWebpackPlugin 生成html首页
 *  4、clean: true, 打包前清空dist文件夹
 *  5、配置环境 mode: 'development'
 *  5、打包生成生产代码
 *  5、到代码分离优化
 */

/**
 *  开发环境
 *  1、通过不同环境，判断是否要设置 devtool: 'inline-source-map' 映射
 *  -、安装 webpack-dev-server，配置 web server
 *  -、通过 express（ express webpack-dev-middleware） 配置服务
 */
