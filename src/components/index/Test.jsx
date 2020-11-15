import React, { Component } from 'react';
import zrender from 'zrender';
import styles from './index.scss';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            linkHref: ''
        };
        this.circle = null;
    }
    componentDidMount() {
        var zr = zrender.init(document.getElementById('main'));
        // debugger;
        // this.circle = new zrender.Circle({
        //     shape: {
        //         cx: 150,
        //         cy: 50,
        //         r: 40
        //     },
        //     style: {
        //         fill: 'none',
        //         stroke: '#F00'
        //     }
        // });
        // zr.add(this.circle);
        // var rect = new zrender.Rect({
        //     shape: {
        //         x: 0,
        //         y: 0,
        //         width: 100,
        //         height: 100
        //     },
        //     style: {
        //         stroke: '#ffc8aa'
        //     },
        //     position: [10, 10]

        // });
        // rect.animateTo({
        //     position: [10, 200]
        // }, 1000, 0, 'linear');

        // let circle = new zrender.Sector({
        //     silent: false,
        //     style: {
        //         fill: '#C3DF',
        //         opacity: 0.8,
        //         stroke: null
        //     },
        //     shape: {
        //         cx: 260,
        //         cy: 250,
        //         r: 160,
        //         r0: 180
        //     }
        // });
        zr.add(circle);
    }
    render() {
        return (
            <div id="main" onClick={() => {
                // this.circle.attr('shape', {
                //     r: 60 // 只更新 r。cx、cy 将保持不变。
                // });
            }} className={styles.test}>

            </div>
        );
    }
}
