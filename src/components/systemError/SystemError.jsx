import styles from './systemError.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SystemError extends Component {
    render() {
        return (
            <div className={styles.systemError}>
                <Link to="/">返回首页</Link>
            </div>
        );
    }
}
