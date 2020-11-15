import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import config from '../src/config/config';
import antdTheme from './antdTheme';
import { resolve, buildPath, src } from './config';
const mockDataFirst = config.mockDataFirst;
const apiServer = config.apiServer;
const mockServer = config.mockServer;
const env = process.env;
const HOST = env.HOST || env.npm_package_config_host;
const PORT = env.POST || env.npm_package_config_port;

export default webpackMerge(baseConfig, {
    entry: [
        'webpack-dev-server/client?http://' + HOST + ':' + PORT, //  为webpack-dev-server的环境打包好运行代码
        // 'webpack/hot/only-dev-server', // 为热替换（HMR）打包好运行代码,//  only- 意味着只有成功更新运行代码才会执行热替换（HMR）
        resolve(src + '/index.jsx')        // 主网站入口
    ],
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                // include: [resolve('../node_modules')],
                use: [
                    'style-loader',
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
                        options: {
                            javascriptEnabled: true,
                            modifyVars: antdTheme
                        }
                    }

                ]
            },
            {
                test: /\.(css|scss)$/,
                include: resolve(src),
                use: [
                    'style-loader',
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
                        configFile: '.eslintrc.json'
                    }
                }]
            }]
    },
    plugins: [
        // 配置全局变量
        new webpack.DefinePlugin({
            __DEV__: true,
            __MOCK__: false,
            __CREDIT_REPORT_ROOT__: false
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: resolve(buildPath),
        host: HOST,
        port: PORT,
        hot: true,
        // inline: true,
        open: true,
        // allowedHosts: [
        //     'localhost:9090'
        // ],
        // https: {
        //     key: fs.readFileSync('server.key'),
        //     cert: fs.readFileSync('server.crt')
        // },
        proxy: {
            '/': {
                target: mockDataFirst ? mockServer : apiServer,
                changeOrigin: true,
                cookieDomainRewrite: '',
                cookiePathRewrite: '/'
            }
        }
    }
});
