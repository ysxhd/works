import Loadable from 'react-loadable';
import LoadingPage from '../loadingPage/LoadingPage';
export default function LoadableWrap(opts) {
    return Loadable(Object.assign({
        loading: LoadingPage,
        delay: 200,
        timeout: 300000 // 加载超过5分钟就超时 
    }, opts));
}