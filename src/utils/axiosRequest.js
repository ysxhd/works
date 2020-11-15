import qs from 'qs';
import axios from 'axios';
import emitter from './emitter';
import config from 'config/config';
import info from '../constants/information';
import { Event } from '../constants/common';
import { clearCookie } from 'utils/cookie';
import { setSession } from 'utils/storage';
import msger from './messager';
import { isString, isArray, isBlank, isEmpty, isNotEmpty, isNotBlank } from './util';

/**
 * @desc 使用axios第三方库访问后台服务器, 返回封装过后的Promise对象.
 * @param {string} url 请求的接口地址, 格式: "/xxx..."
 * @param {string} domain 跨域请求的域名地址, 如: http://www.baidu.com
 * @param {string} type HTTP请求方式, 默认GET.
 * @param {object} data 请求的数据, object对象格式
 * @param {boolean} formData 上传文件使用FormData
 * @param {function} onUpload 上传文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} onDownload 下载文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} cancel 取消请求的回调函数, 接收cancel参数, 当执行cancel()参数时请求被取消.
 * @param {number} timeout 配置请求超时时间, 为毫秒数, 默认从配置文件读取.
 * @param {boolean} loading 是否开启loading动画, 默认 type 为 POST 的请求显示.
 * @param {boolean} cache 是否开启缓存, 开启后同样的请求(url相同, 参数相同), 第二次请求时会直接返回缓存数据, 不会请求后台数据, 默认false.
 * @param {boolean} handleError 是否自动处理接口报错情况, 默认true.
 * @param {object} messager 配置一个系统提示消息处理器, 封装了系统提示的展示方式, 对象需要有showError(msg)方法, 默认为messager.
 * @return {object} - 返回一个promise的实例对象
 */
export default function AxiosRequest({ localData = false,
    url = null,
    domain = null,
    type = 'get',
    data = null,
    formData = false,
    onUpload = null,
    onDownload = null,
    cancel = null,
    timeout = config.timeout,
    loading = null,
    ContentType = null,
    cache = true,
    handleResponse = true,
    handleError = true,
    messager = msger }) {
    var getData;
    var postData;
    var cancelToken;
    var crossDomain = false;
    if (isEmpty(url)) {
        return Promise.resolve();
    }
    // type 为 POST 的请求会将参数转化为 formData 传递
    if (type === 'post') {
        if (isNotEmpty(data)) {
            // postData = data;
            if (ContentType === 'application/x-www-form-urlencoded') {
                postData = qs.stringify(data, { allowDots: true });
            } else {
                postData = data;
            }

        }
    } else {
        getData = data;
    }

    if (__DEV__) {
        if (!localData && isNotEmpty(url)) {
            url = config.apiDevServerName + url;
        }
    }

    if (!__DEV__) {
        if (!localData && isNotEmpty(url)) {
            url = config.apiProdServerName + url;
        }
    }

    if (!cache) {
        url += '?t=' + new Date().getTime();
    }
    if (formData) {
        let formTypeData = new FormData();
        for (let key in data) {
            if (key === 'file') { // 上传文件的key值和后端商量统一为file
                if (isArray(data[key])) {
                    data[key].forEach(ele => {
                        formTypeData.append('file', ele, encodeURI(ele.name)); // 对文件名字进行编码
                    });
                } else {
                    formTypeData.append(key, data[key], encodeURI(data[key].name)); // 对文件名字进行编码
                }
            } else {
                formTypeData.append(key, data[key]);
            }
        }
        // for (let key in data) {
        //     let newName = data[key].name;
        //     // console.log(newName, '22');
        //     formTypeData.append(key, data[key], encodeURI(newName)); // 对文件名字进行编码
        // }
        postData = formTypeData;
    }
    showLoading(type, loading);

    var promise = new Promise(function (resolve, reject) {
        //         header('Access-Control-Allow-Origin:*');
        // // 响应类型
        //         header('Access-Control-Allow-Methods:POST');
        // // 响应头设置
        //         header('Access-Control-Allow-Headers:x-requested-with,content-type');
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common['x-user'] = 'eyJlbWFpbCI6InRlc3RAYmJkLmNvbSIsImlkIjoxNTksImxvZ2luTmFtZSI6ImJpZ2RhdGEiLCJuYW1lIjoiYmlnZGF0YSIsInR5cGUiOiJCIn0';
        if (!formData) {
            axios.defaults.headers['Content-Type'] = ContentType || 'application/json';
        } else {
            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'; // 'multipart/form-data'; // 
        }

        var httpRequest = axios({
            method: type,
            baseURL: domain,
            url: url,
            timeout: timeout,
            params: getData,
            data: postData,
            withCredentials: crossDomain,
            onUploadProgress: onUpload,
            onDownloadProgress: onDownload,
            cancelToken: cancelToken
        }).then(function (response) {
            hideLoading(response.config, loading);
            if (handleResponse) {
                if (localData && response.status === 200) { // 用于请求本地data中的数据 例如: geoJson
                    resolve(response.data);
                } else if (response.status === 200) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                    var errorMsg = processError(response.data);
                    if (isNotBlank(errorMsg)) {
                        errorMsg = errorMsg === '未知异常' ? '网络繁忙，请稍后再试！' : errorMsg;
                        messager.error(errorMsg);
                    }
                }
            } else {
                resolve(response);
            }
        }).catch(function (error) {
            hideLoading(error.config, loading);
            // 服务端返回的异常
            if (error.response) {
                if (handleError) {
                    messager.error(info['SYSTEM_ERROR']);
                }
                console.error(error.response); // eslint-disable-line
                reject(error.response);
                // 浏览器抛出的异常, 不同浏览器可能有不同的行为
            } else {
                if (handleError) {
                    setTimeout(() => {
                        messager.error(info['BROWSER_ERROR']);
                    }, 1000);
                }
                console.error(error); // eslint-disable-line
                reject(error);
            }
        });
    });
    return promise;
}

function showLoading(method, isShow) {
    if (isShow || (isShow === null && method === 'post')) {
        emitter.emit(Event.SHOW_LOADING);
    }
}

function hideLoading(config, isShow) {
    // console.log(config, 'config');
    if (isShow || (isShow === null && config && config.hasOwnProperty('method') && config.method === 'post')) {
        emitter.emit(Event.HIDE_LOADING);
    }
}
/**
 * 处理异常返回, 根据后端同事返回的code进行相应的处理(code含义需与后端同事约定好, 此处只是浩格后台返回示例, 具体按项目实际情况调整代码).
 */
function processError(response) {
    // console.log(response, 'response');
    var errorMessage;
    switch (response.statusCode) {
        case 4001:   // 认证参数不合法
        case 4002:   // 登录状态过期
        case 4003:   // 登录信息验证失败
        case 4004:   // 登录信息验证失败
        case 4021:   // 没有访问权限
            clearCookie();
            // console.log(`${response.data}${config.loginCallBack}`, '测试');
            location.href = `${response.data}${location.origin}${location.hash}`;
            break;
        default:    // 未知错误
            errorMessage = response.message;
    }
    return errorMessage;
}

Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => {
                throw reason;
            }, 0);
        });
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => {
            throw reason;
        })
    );
};
