/*
* @desc 基于坐标的散点图
* @author xuyao
*/
import React, { Component } from 'react';
import extend  from 'extend';
import EchartBase from './base/EchartBase';

class BBDAxisScatter extends Component {
    constructor(props) {
        super(props);
    }
    setOption(param){
        let series = param.series;
        let seriesLength = series.length;
        let seriesData = [];
        for(var i = 0; i < seriesLength; i++){
            seriesData.push({
                type: 'scatter'
            });
        }

        const option = {
            title: {
                text: '',
                padding: [10, 0, 0, 10],
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft Yahei'
                }
            },
            grid: {
                left: '3%', 
                right: '13%', 
                bottom: '3%', 
                containLabel: true
            },
            // visualMap: {
            //     type: 'continuous',
            //     min: 0,
            //     max: 200,
            //     right: '2%',
            //     bottom: '8%',
            //     inRange: {
            //         colorLightness: [1, 0.5]
            //     },
            //     controller: {
            //         inRange: {
            //             symbolSize: [10, 200],
            //             color: ['#e14341']
            //         }
            //     },
            //     text: ['', ''], // 文本，默认为数值文本
            //     calculable: true
            // },
            tooltip: {
                position: 'top',
                padding: [10, 10, 10, 10],
                formatter: function(data){ 
                    return false;
                }
            },
            xAxis: [
                {   
                    name: '',
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#CBCBCB'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd',
                            type: 'solid'
                        }
                    }
                }
            ],
            yAxis: [
                {   
                    name: '',
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#CBCBCB'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd',
                            type: 'solid'
                        }
                    }
                }
            ],
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
export default BBDAxisScatter;