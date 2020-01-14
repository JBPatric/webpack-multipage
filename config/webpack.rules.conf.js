//单独打包css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rules = [{
        test: /\.(sc|sa|c)ss$/,
        // 区别开发环境和生成环境
        use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader", "postcss-loader"] : [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: "../"
                }
            },
            {
                loader: "css-loader"
            },{
                loader:"postcss-loader"
            },{
                loader: "sass-loader",
                options: {
                    implementation: require('sass')
                }
            }
        ]
    },
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-transform-runtime"]
            }
        }
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            esModule: false,
            name: "img/[name].[hash:7].[ext]"
        }
    },
    {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            name: "fonts/[name].[hash:7].[ext]"
        }
    },
    {
        test: /\.(htm|html)$/i,
        // html中的img标签
        use: {
            loader: 'html-loader',
            options: {
                attrs: ['img:src', 'img:data-src', 'audio:src']
            }
        }
    }
];
module.exports = rules;