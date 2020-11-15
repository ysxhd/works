import React from 'react';
import { Spin } from 'antd';
import styles from './loadingPage.scss';
// import Loading from '../loading/Loading';

export default function LoadingPage(props) {
    if (props.error) {
        /* eslint-disable */
        console.error(props.error);
        return (
            <div className={styles.loadingPage}>
                <p className={styles.loadingPageText}>抱歉，加载失败！</p>
                <button onClick={props.retry} className={styles.btnReload}>
                    重新加载
                </button>
            </div>
        );
    } else if (props.timedOut) {
        return (
            <div className={styles.loadingPage}>
                <p className={styles.loadingPageText}>抱歉，加载超时！</p>
                <button onClick={props.retry} className={styles.btnReload}>
                    重新加载
                </button>
            </div>
        );
    } else if (props.pastDelay) {
    return <Spin size="large" className="global-spin" tip="加载中..."  className={styles.pastDelaySpin}/>;
    } else {
        return null;
    }
}
