const path = require('path');

const webpack = require("webpack");//引入webpack
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const miniCssExtractPlugin = require('mini-css-extract-plugin') //分离css,新建文件引入
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const UglifyJsPlugin = require('uglify-js-plugin');//压缩js

module.exports = {
	devServer: { //先安装webpack-dev-server  开发服务器配置
		port: 3000,
		progress: true,
		contentBase: './dist' //设置服务开启资源位置默认是项目根文件夹
	},
	entry: {
		index: './src/index.js',
		app: './src/app.js'
	},
	mode: 'development',
	optimization: { //优化项
		minimizer: [
			new UglifyJsPlugin({  //开发模式下不生效
				cache: true,
				parallel: true,
				sourcMap: true
			}),
			new OptimizeCssAssetsPlugin(),
		],
	},
	module: {
		rules: [ //解析从右到左，从下到上
			//css-loader 解析@import
			//style-loader 将css 插入到head中
			//sass-loader 将sass解析成css   与 node-sass一起安装
			//less-loader 将less解析成css   与 less一起安装
			//use 当个loader可以用字符串 多个可以用数组，如果需要配置参数可以用json

			//兼容前缀插件autoprefixer 通过 postcss-loader使用,在postcss.config.js 中配置
			//通过 browserslist 插件设置要兼容的浏览器  装三个
			{
				test: /\.css|.scss|.less$/,
				use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'less-loader', 'postcss-loader']
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name]-[hash:5].[ext]'  //这里img是存放打包后图片文件夹，结合publicPath来看就是/webBlog/build/img文件夹中，后边接的是打包后图片的命名方式。
				}
			},
			//安装 babel-loader @babel/core  @babel/preset-env
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					"presets": [
						[
							"@babel/preset-env",
							// {
							// 	"useBuiltIns": "entry"
							// }
						]
					],
					//"plugins": ["@babel/plugin-transform-runtime"]
				}
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
	output: {
		filename: '[name].[hash:4].js',
		path: path.resolve(__dirname, 'dist')
		//将相对路径转绝对路径,当前路径 + dist
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			hash: true
		}),
		new miniCssExtractPlugin({ //配置完成需要在响应的loder use 前的style-loader替换成miniCssExtractPlugin.loader 的配置
			filename: 'style.css',
		})
	]
}
