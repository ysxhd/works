import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackMerge from 'webpack-merge';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import baseConfig from './webpack.config.base';
import antdTheme from './antdTheme';
import { resolve, packageName, build, src } from './config';
const STATIC_PATH = 'static';
export default webpackMerge(baseConfig, {
    // entry: {
    //     main: resolve(src + '/index.jsx')             // 主网站入口
    //     // vendor: ['react', 'react-dom', 'react-router', '@babel/polyfill']
    // },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                include: resolve('../node_modules'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9' 
                                    ]
                                })
                            ]
                        }
                    },
                    { 
                        loader: 'less-loader', 
                        options: {javascriptEnabled: true, modifyVars: antdTheme} 
                    }

                ]
            },
            {
                test: /\.(css|scss)$/,
                include: resolve(src),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9' 
                                    ]
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                /**
                 * eslint代码规范校验
                 */
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                include: resolve(src),
                exclude: resolve(src + '/libs'),
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        configFile: '.eslintrc.prod.json'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: `${STATIC_PATH}/css/[contenthash].[name].css`}),
        new OptimizeCssAssetsPlugin(),
        new webpack.DefinePlugin({               // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        })
        // new FileManagerPlugin({ 
        //     onEnd: {
        //         // mkdir: ['./build'],
        //         archive: [
        //             { source: resolve('../' + build), destination: resolve('../' + build + '/' + packageName + '.zip') }
        //         ]
        //     }
        // })
    ]
});
