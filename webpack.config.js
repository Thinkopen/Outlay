const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: {

        bundle : path.join(__dirname,'public/index.js'),
        vendor : ['jquery, bootstrap, react-bootstrap'],
    }, 
    output: {
        
        path: path.join(__dirname,'public/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: require.resolve('style-loader')
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: require.resolve('sass-loader')
                    },
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },{
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff',
                query: {
                    name: 'static/media/files/[name].[hash:8].[ext]'
                }
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                query: {
                    name: 'static/media/fonts/[name].[hash:8].[ext]'
                }
            },
            // Load images.
            {
                test: /\.(gif|jpe?g|png)$/,
                loader: 'url-loader?limit=25000',
                query: {
                    limit: 10000,
                    name: 'static/media/images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080"
        },
    },
   /* plugins: [
        new HtmlWebPackPlugin({
            template: "./public/views/index.html",
            filename: "./public/views/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]*/
};