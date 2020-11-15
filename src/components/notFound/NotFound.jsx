import styles from './notFound.scss';
import React, { Component } from 'react';
// import { Link } from 'react-router';
import NotFoundImg from 'images/404.png';

export default class NotFound extends Component {
    render() {
        return (
            <div className={styles.notFound}>
                <img src={NotFoundImg}/>
                <p>页面未找到</p>
                <div className={styles.test}></div>
            </div>
        );
    }
}
