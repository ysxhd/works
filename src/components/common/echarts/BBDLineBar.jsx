/*
 * @type 折线柱状组合图
 * @author xuyao
 */
import React, { Component } from 'react';
import extend from 'extend';
import EchartBase from './base/EchartBase';
class BBDLineBar extends Component {
    constructor(props) {
        super(props);
    }

    setOption(param) {
        let series = param.series;
        let seriesItem = '';
        let seriesLength = series.length;
        let seriesData = [];
        for (let i = 0; i < seriesLength; i++) {
            let seriesItem = {
                type: series[i].type,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                data: series[i].data
            };
            seriesData.push(seriesItem);
        }
        const option = {
            title: {
                show: false,
                link: '',
                target: 'self',
                text: '',
                x: 'left',
                padding: [40, 0, 0, 0],
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    fontFamily: 'Microsoft Yahei'
                }
            },
            tooltip: {
                trigger: 'axis',
                padding: [10, 10, 10, 10],
                axisPointer: {
                    type: 'none'
                }
            },
            legend: {
                padding: [15, 0, 0, 0],
                itemGap: 5,
                itemWidth: 20,
                itemHeight: 5,
                width: 'auto',
                show: false,
                left: 'auto',
                right: 'auto',
                bottom: 'auto',
                top: 'auto',
                data: [],
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'Microsoft Yahei'
                }
            },
            grid: {
                top: 80,
                left: 0,
                right: 20,
                bottom: 20,
                containLabel: true
            },
            xAxis: [
                {
                    name: '',
                    type: 'category',
                    data: [],
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#68DAFF'
                        }
                    },
                    axisLabel: {
                        margin: 15,
                        textStyle: {
                            color: '#666',
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        },
                        formatter: '{value}'
                    }
                },
                {
                    show: false,
                    name: '',
                    type: 'category',
                    data: [],
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#68DAFF'
                        }
                    },
                    axisLabel: {
                        margin: 15,
                        textStyle: {
                            color: '#666',
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        },
                        formatter: '{value}'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    data: [],
                    name: '',
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#68DAFF'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            color: '#666',
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        },
                        formatter: '{value}'
                    }
                },
                {
                    show: false,
                    type: 'value',
                    name: '',
                    data: [],
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#68DAFF'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            color: '#666',
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        },
                        formatter: '{value}'
                    }
                }
            ],
            series: seriesData
        };
        let op = extend(true, {}, option, param);
        return op;
    }

    getEchartsInstance = (instance)=> {
        const {getInstance} = this.props;
        this.instance = instance;
        getInstance && getInstance(instance);
    }

    getDataURL(){
        return this.instance.getDataURL();
    }
    
    render() {
        return <EchartBase getChartObj={this.props.getChartObj ? this.props.getChartObj : null}
                           option={this.setOption(this.props.option)} style={this.props.style} getInstance={this.getEchartsInstance}/>;
    }
}
export default BBDLineBar;
