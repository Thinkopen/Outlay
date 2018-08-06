const path = require('path');
const webpack = require('webpack');

const publicDir = path.join(__dirname, 'public');
const stylesDir = path.join(publicDir,'styles')

const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    entry: {

        bundle : [path.join(publicDir,'index.js'),path.join(stylesDir,'main.scss')],
        vendor : ['jquery','bootstrap','react-bootstrap'],
    }, 
    output: {
        
        path: path.join(__dirname,'public/dist'),
        filename: '[name].js'
    },
    resolve : {
        extensions: ['.js', '.jsx'],
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
   /* devServer: {
        historyApiFallback: true,
        
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080"
        },
    },*/
    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      },
    plugins: [
        new webpack.ProvidePlugin({ // inject ES5 modules as global vars
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
          }),
          new WebpackCleanupPlugin(),
         /* new optimization.splitChunks({ // seperate vendor chunks , TODO implement split chunks config
            name: ['vendor'],
          }),*/
    ]
};