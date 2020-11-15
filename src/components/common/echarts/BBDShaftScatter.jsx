/*
* @type 单轴的散点图
* @author xuyao
*/
import React, { Component } from 'react';
import extend  from 'extend';
import EchartBase from './base/EchartBase';

class BBDShaftScatter extends Component {
    constructor(props) {
        super(props);
    }
    setOption(param){
        let seriesLength = param.series.length;
        let singleAxis = [];
        let series = [];
        for(let i = 0; i < seriesLength; i++){
            let singleAxisItem = {
                type: 'category',
                boundaryGap: false,
                data: param.singleAxis[i].data,
                left: 'center',
                width: '80%',
                height: '80%',
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei'
                    }
                }
            };

            let seriesItem =  {
                coordinateSystem: 'singleAxis',
                type: 'scatter',
                symbolOffset: [0, 10],
                symbolSize: function(param){
                    return param[1] * 5;
                },
                label: {
                    emphasis: {
                        show: true,
                        position: 'bottom',
                        formatter: function(param){
                            return param.data[2] + ' : ' + param.data[1];
                        }
                    }
                },
                data: param.series[i].data
            };
            singleAxis.push(singleAxisItem);
            series.push(seriesItem);
        }

        const option = {
            singleAxis: singleAxis,
            series: series
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
export default BBDShaftScatter;