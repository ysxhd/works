/*
* @type 仪表盘
* @author xuyao
*/
import React, { Component } from 'react';
import extend  from 'extend';
import EchartBase from './base/EchartBase';
class BBDGauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currIndex: -1
        };
    }
    setOption(param){
        let series = param.series;
        let seriesItem = '';
        let seriesData = [];
        let seriesLength = series.length;
        for(let i = 0;  i < seriesLength; i++){
            seriesItem = {
                name: '速度',
                type: 'gauge',
                z: 3,
                min: 0,
                max: 220,
                splitNumber: 11,
                radius: '70%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 1
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                title: {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 16,
                        fontStyle: 'italic'
                    }
                },
                detail: {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder'
                    }
                },
                data: series[i]
            };
            seriesData.push(seriesItem);
        }
        const option = {
            series: seriesData
        };
        let op = extend(true, {}, option, param);
        return op;
    }
    render() {
        return ( 
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} />
        );
    }
}
export default BBDGauge;