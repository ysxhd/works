/*
* @desc 中国地图数据分布图
* @author xuyao
*/
import React, { Component } from 'react';
import echarts from 'echarts';
import extend  from 'extend';
import EchartBase from './base/EchartBase';

class BBDMapChinaScatter extends Component {
    constructor(props) {
        super(props);
    }
    setOption(param){
        let geoJson = param.geoJson;
        echarts.registerMap('china', geoJson);
        let option = {
            backgroundColor: '#FAFAFC',
            geo: {
                map: 'china',
                zoom: 1.2,
                show: true,
                roam: true,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(242, 242, 242, 0.7)',
                        borderColor: 'rgba(240, 242, 245, 0.8)',
                        borderWidth: 1
                    },
                    emphasis: {
                        areaColor: 'rgba(242, 242, 242, 1)',
                        borderColor: '#d0d0d0'
                    }
                }
            },
            series: [
                {
                    name: '城市',
                    type: 'scatter',
                    zoom: 1.2,
                    roam: true,
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: function (val) {
                        return val[2] / 2;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#007FC3'
                        }
                    }
                },
                {
                    name: '前5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zoom: 1.2,
                    roam: true,
                    data: [],
                    symbolSize: function (val) {
                        return val[2] / 2;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#007FC3',
                            shadowBlur: 10,
                            shadowColor: '#007FC3'
                        }
                    },
                    zlevel: 1
                }
            ]
        
        };
        let op = extend(true, {}, option, param.option);
        return op;
    }
    render() {
        return ( 
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} />
        );
    }
}

export default BBDMapChinaScatter;