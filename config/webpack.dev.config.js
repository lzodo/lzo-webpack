const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  // 开发环境 和 生产环境内部都会设置一大堆默认值
  mode: "development",
  devtool: "inline-source-map",
  output: {
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
});
