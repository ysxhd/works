/*
* @desc 公共部分
* @author xuyao
*/
import React, { Component } from 'react';
import echarts from 'echarts';
import { bind } from 'size-sensor';
import echartTheme from './echartTheme.json';
class EchartBase extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let echartObj = this.renderEchartDom();
        let onEvents = this.props.onEvents || [];
        for (let eventName in onEvents) {
            if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
                echartObj.on(eventName, function (param) {
                    onEvents[eventName](param, echartObj);
                });
            }
        }
        if (this.echartsDom) {
            bind(this.echartsDom, () => {
                try {
                    echartObj.resize();
                } catch (e) {
                    // console.warn(e);
                }
            });
        }
        this.props.getChartObj ? this.props.getChartObj(echartObj) : null;
    }
    componentDidUpdate() {
        this.renderEchartDom();
    }
    componentWillUnmount() {
        echarts.dispose(this.echartsDom);
    }
    renderEchartDom() {
        let echartObj = this.getEchartsInstance();
        echartObj.setOption(this.props.option, {notMerge: true});
        if (this.props.showLoading) {
            echartObj.showLoading();
        } else {
            echartObj.hideLoading();
        }
        return echartObj;
    }
    getEchartsInstance() { // echarts.getInstanceByDom(this.echartsDom) || 
        const {getInstance} = this.props;
        echarts.registerTheme('echartTheme', echartTheme);
        const instance =  echarts.init(this.echartsDom, 'echartTheme');
        getInstance && getInstance(instance);
        return instance;
    }
    render() {
        let style = this.props.style || {
            height: '100%', 
            width: '100%'
        };
        return ( 
            <div ref = {(echartsDom) => {this.echartsDom = echartsDom;}} style = {style}  />
        );
    }
}
export default EchartBase;