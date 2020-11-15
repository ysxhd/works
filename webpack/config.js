import path from 'path';

export const build = 'build'; // 打包的根目录名称
export const packageName = 'blog'; // zip包的名字
export const buildPath = '../' + build + '/' + packageName;
export const src = '../src'; // 源码目录

export const resolve = function (url) {
    return path.resolve(__dirname, url);
};