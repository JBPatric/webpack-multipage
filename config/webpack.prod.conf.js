const path = require('path');
const merge = require("webpack-merge");
// 清除目录等
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackConfigBase = require('./webpack.base.conf');

const webpackConfigProd = {
    mode: 'production', // 通过 mode 声明生产环境
	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
        filename: 'js/[name].[hash:7].js',
        publicPath: '../'
    },

    devtool: 'cheap-module-eval-source-map',

    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
	},
	plugins: [
		//删除dist目录
		new CleanWebpackPlugin(),
		// 分离css插件参数为提取出去的路径
        new MiniCssExtractPlugin({
            filename: ("css/[name].[contenthash:7].css"),
            chunkFilename: "css/[id].[contenthash:7].css",
        }),
		//压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		})
	]

};
module.exports = merge(webpackConfigBase, webpackConfigProd);