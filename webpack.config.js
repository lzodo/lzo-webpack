const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动生成html

// 使用env就用缓存函数
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  //   entry: "./src/index.js",
  entry: {
    // // webpack-dev-middleware启用热更新
    hot: "webpack/hot/dev-server.js", // 热 webpack-dev-middleware启用热更新
    client: "webpack-dev-server/client/index.js?hot=true&live-reload=true", // 热
    // 多入口打包,两个入口文件如果都使用了lodash，那么打包后会有两份lodash代码被打包
    index: "./src/index.js",
    print: "./src/print.js",

    // 多入口打包，通过 dependOn 处理重复问题
    // index: {
    //   import: "./src/index.js",
    //   dependOn: "shared",
    // },
    // print: {
    //   import: "./src/print.js",
    //   dependOn: "shared",
    // },
    // shared: "lodash",
  },
  // 多入口打包时配置，不然会有问题
  optimization: {
    // 模块标识符：打包的时候只有发生变化的文件重新生成新的 hash，没变化的不变
    moduleIds: "deterministic",

    runtimeChunk: "single",
    splitChunks: {
      // 代替 dependOn 处理包重复问题
      chunks: "all",

      // 将第三方库提取到 vendors 中
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  output: {
    filename: "[name].[contenthash].bundle.js", // 添加hash 尽量避免浏览器缓存
    path: path.resolve(__dirname, "dist"), // 获取这个配置文件所在位置，加dist形成的绝对路径
    clean: true, // 清除dist
    publicPath: "/", // 开发环境不要点，生产环境加个点
  },
  // 通过 webpack-dev-server 启动项目，这个才能生效
  devServer: {
    // 文件可以从 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 访问
    // static: "./dist", // 让 dev server 应从 ./dist 开始查找文件
    host: "0.0.0.0", // 监听ipv4下所有地址，让同一个网段所有主机可以通过ip访问这边
    port: "3001",
    open: true,
    hot: true, // webpack-dev-server 启用热更新，默认就是true
    compress: false, // 是否对文件进行压缩,开发环境开启 gzip
    // client: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "title",
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        // 多个loder顺序从右往左
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // css 只负责解析，解析好后 style 负责插入到页面
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
};

/**
 *  1、设置入口文件，输出位置
 *  2、配置loading，识别转换不认识的文件
 *  3、配置插件，HtmlWebpackPlugin 生成html首页
 *  4、clean: true, 打包前清空dist文件夹
 *  5、配置环境 mode: 'development'
 *  5、输出hash配置，缓存问题
 *  5、多文件相同库重复问题处理
 *  5、第三方库统一提取出来到 vendors
 *  5、环境变量，module.exports 转函数
 *
 *  5、打包生成生产代码
 */

/**
 *  开发环境
 *  1、通过不同环境，判断是否要设置 devtool: 'inline-source-map' 映射
 *  -、安装 webpack-dev-server，配置 web server
 *  -、通过 express（ express webpack-dev-middleware） 配置服务
 */
