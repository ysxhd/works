/*
* @desc 散点图
* @author xuyao
*/
import React, { Component } from 'react';
import extend  from 'extend';
import EchartBase from './base/EchartBase';
class BBDBubbleGradient extends Component {
    constructor(props) {
        super(props);
    }
    setOption(parm){
        let seriesData = parm.series;
        let seriesDataLength = seriesData.length;
        let seriesItem = [];
        let series = [];
        for(let i = 0; i < seriesDataLength; i++){
            seriesItem = {
                name: '',
                type: 'scatter',
                symbolSize: 10,
                animationDelay: function (value) {
                    return value;
                },
                data: seriesData[i].data
            };
            series.push(seriesItem);
        }

        var option = {
            title: {
                text: '',
                link: '',
                target: 'self',
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'microsoft yahei',
                    fontWeight: 'normal'
                }
            },
            legend: {
                data: [],
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'Microsoft Yahei'
                },
                left: 'center',
                top: '15px'
            },
            tooltip: {
                padding: [10, 10, 10, 10],
                textStyle: {
                    fontSize: 12
                }
            },
            grid: {
                top: '10%',
                left: '5%',
                bottom: '5%',
                right: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: [],
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '',
                scale: true,
                data: [],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#353b45',
                        type: 'solid'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei'
                    }
                }
            },
            series: series
        };
        let op = extend(true, {}, option, parm);
        return op;
    }
    render() {
        return ( 
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} />
        );
    }
}
module.exports = BBDBubbleGradient;