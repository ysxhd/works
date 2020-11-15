import AxiosRequest from 'utils/axiosRequest';

/* 登录请求
 * POST请求, data为传递给后台的参数, 其他参数使用请查看AxiosRequest对象
*/
export function getLabelInfo(data) {
    return AxiosRequest({
        url: '/index/labelInfo.json',
        type: 'get',
        data: data
    });
}