const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  // 开发环境 和 生产环境内部都会设置一大堆默认值
  mode: "production",
  output: {
    clean: true, // 清除dist
    publicPath: "./", // 开发环境不要点，生产环境加个点
  },
  optimization: {
    //优化项
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  plugins: [
    // 压缩js
    new uglifyjsWebpackPlugin(),
  ],
});
