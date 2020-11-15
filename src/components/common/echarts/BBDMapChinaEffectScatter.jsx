/*
* @type 中国地图数据分布图
* @author xuyao
*/
import React, { Component } from 'react';
import echarts from 'echarts';
import extend  from 'extend';
import EchartBase from './base/EchartBase';

class BBDMapChinaEffectScatter extends Component {
    constructor(props) {
        super(props);
    }
    setOption(param){
        let geoJson = param.geoJson;
        echarts.registerMap('china', geoJson);
        let option = {
            title: {
                text: '',
                subtext: '',
                sublink: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['pm2.5']
            },
            geo: {
                map: 'china',
                label: {
                    show: false
                },
                roam: true
            },
            series: [
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        show: true,
                        formatter: '{b}',
                        position: 'right'
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

export default BBDMapChinaEffectScatter;