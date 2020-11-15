/**
 * @desc 项目配置文件
 */
export default {
    timeout: 30000,                         // API接口请求超时时间, 默认10秒
    systemMsgDuration: 3,
    apiServer: 'http://10.28.200.214:8083',
    apiDevServerName: '',     // 针对服务器端名字变动设置的配置 开发环境请求配置
    apiProdServerName: '',     // 针对服务器端名字变动设置的配置  上线环境请求配置
    mockServer: 'http://localhost:8000',  // mock数据服务器地址
    mockDataFirst: true
};

export const baseUrl =  '/api/';
