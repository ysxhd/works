/**
 * @desc 页面底部组件
 * @author 
 */
import React, { Component } from 'react';
import styles from './footer.scss';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.footer}>
                底部
            </div>
        );
    }
}

