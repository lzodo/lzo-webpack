const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动生成html
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const UglifyJsPlugin = require("uglify-js-plugin"); //压缩js
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const { DefinePlugin, ProvidePlugin } = require("webpack");

// 使用env就用缓存函数
module.exports = {
  // 开发环境 和 生产环境内部都会设置一大堆默认值
  mode: "development",
  devtool: "inline-source-map",
  //   entry: "./src/index.js",
  entry: {
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
    // 生成html
    new HtmlWebpackPlugin({
      title: "title",
      template: "index.html", // 他自己有一个默认模板
    }),

    // 分离css
    new miniCssExtractPlugin({
      //配置完成需要在响应的loder use 前的style-loader替换成miniCssExtractPlugin.loader 的配置
      // filename: 'style.[name].css',
      chunkFilename: "[name].style.css", //入口文件分别生成引入各种的css
    }),

    // 压缩js
    new uglifyjsWebpackPlugin(),

    // vue 支持
    new VueLoaderPlugin(),

    // 定义变量，默认注入了 process
    // DefinePlugin通过定义不同的变量值，使我们在开发和发布的时候执行不同的代码。例如一个典型的变量process.env.NODE_ENV，会拿到mode值。
    new DefinePlugin({
      BASE_URL: "'./'", // value 是一段可执行代码
      globalMsg: "'注入全局变量，globalMsg，任何地方可以直接使用'",
    }),

    // 在使用时将不再需要import和require进行引入，直接使用即可。
    new ProvidePlugin({
      ProvidePluginApi: [
        path.join(__dirname, "./src/utils/tool.js"),
        "default",
      ],
    }),
  ],
  resolve: {
    // 使扩展名可以忽略
    extensions: [
      ".js",
      ".json",
      ".wasm",
      ".vue",
      ".css",
      ".less",
      ".scss",
      ".ts",
    ],
    // 别名 默认就是 node_module, 所以 import xx from 'vue' 可以定位到 node_module 下的 vue
    alias: {
      "@": path.resolve(__dirname, "./src"), // 一定是配置文件所在位置下的src
      //'assets':path.resolve("@/assets"),//如果引用的时候不是通过import，比如模板中的图片路径，那么需要添加'~assets/xxx'
      // vue$: "vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      {
        // 多个loder顺序从右往左
        test: /\.css|.scss|.less$/i,
        use: [
          // "style-loader",
          miniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "less-loader",
          "postcss-loader", // autoprefixer 配合 postcss-loader 添加浏览器前缀
        ], // css 只负责解析，解析好后 style 负责插入到页面
      },
      {
        // 使用内置的 Asset Modules
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset", // asset/resource(生成单独文件) asset/inline(生成base64) asset(自动判断用前面的哪个)
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024,
          },
        },
        generator: {
          filename: "img/[name]_[hash][ext]", // 如果生成图片文件
        },
      },
      {
        // 使用内置的 Asset Modules 解析字体
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        // 转换 es6 ts jsx 等文件
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env", // env es6预设，react react预设，typescript ts预设
            ],
          ],
        },
      },
      {
        // vue 处理, vue 还要额外配置插件 VueLoaderPlugin
        test: /\.vue$/i,
        use: ["vue-loader"],
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
