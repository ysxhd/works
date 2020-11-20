import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HappyPack from 'happypack';
import ProgressBarPlugin  from 'progress-bar-webpack-plugin';
import CaseSensitivePathsPlugin  from 'case-sensitive-paths-webpack-plugin';
import { resolve, build, buildPath, src } from './config';

const STATIC_PATH = 'static';

export default {
    cache: true,
    output: {
        publicPath: '/',
        path: resolve(buildPath),
        filename: `${STATIC_PATH}/js/[hash].[name].js`
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            components: resolve(src + '/components/'),
            common: resolve(src + '/components/common/'),
            utils: resolve(src + '/utils/'),
            images: resolve(src + '/images/'),
            constants: resolve(src + '/constants'),
            services: resolve(src + '/services'),
            config: resolve(src + '/config'),
            data: resolve(src + '/data')
        },
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: resolve(src),
            exclude: resolve(src + '/fonts'),
            // use: [{
            //     loader: 'babel-loader',
            //     options: {
            //         cacheDirectory: true
            //     }
            // }]
            loader: 'happypack/loader',
            options: {
                cacheDirectory: true
            }
        }, 
        {
            test: /\.(woff|eot|ttf|js|svg)$/,
            include: resolve(src + '/fonts'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${STATIC_PATH}/fonts/[hash].[ext]`
                }
            }]
        /**
         * 图片加载器
         */
        }, 
        {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            // include: [resolve(src), resolve('node_modules/higgs-ui')],
            // exclude: resolve(src + '/images/companyInfoGraph'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: `${STATIC_PATH}/images/[hash].[ext]`
                }
            }]          
        }, 
        {
            test: /\.ico$/,
            include: resolve(src + '/images'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${STATIC_PATH}/images/[name].[ext]`
                }
            }]        
        }]
    },
    plugins: [
        new CleanWebpackPlugin([build], {
            root: resolve('../')
        }),              // 清除编译目录
        // 主页面入口index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ProgressBarPlugin(),
        new CaseSensitivePathsPlugin(),
        new HappyPack({
            loaders: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }],
            threads: 4
        })
        // new CopyWebpackPlugin([
        //     {
        //         from: resolve(src + '/data'),
        //         to: `${STATIC_PATH}/data/`,
        //         toType: 'dir'
        //     },
        //     {
        //         from: resolve(src + '/libs'),
        //         to: `${STATIC_PATH}/libs`,
        //         toType: 'dir'
        //     },
        //     {
        //         from: resolve(src + '/fonts'),
        //         to: `${STATIC_PATH}/fonts/`,
        //         toType: 'dir'
        //     }
        // ])
    ]
};