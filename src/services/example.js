import AxiosRequest from 'utils/axiosRequest';

/* 登录请求
 * POST请求, data为传递给后台的参数, 其他参数使用请查看AxiosRequest对象
*/
export function getBarLine(data) {
    return AxiosRequest({
        url: '/example/lineBar.json',
        type: 'get',
        data: data
    });
}

/* 登录请求
 * POST请求, data为传递给后台的参数, 其他参数使用请查看AxiosRequest对象
*/
export function login(data) {
    return AxiosRequest({
        url: '/api/v1.0/portrait/hotKeyWord',
        type: 'get',
        data: data
    });
}