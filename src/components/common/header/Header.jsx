/*
* @desc 头部
* @author
*/
import styles from './header.scss';
import React, { Component } from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }
  
    componentDidMount(){
       //
    }

    render() {

        return (
            <div className={styles.header}>
               头部
            </div>
        );
    }
}