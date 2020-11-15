/*
* @type 中国地图数据分布图
* @author xuyao
*/
import React, { Component } from 'react';
import echarts from 'echarts';
import extend  from 'extend';
import EchartBase from './base/EchartBase';

class BBDMapChinaDataRange extends Component {
    constructor(props) {
        super(props);
    }
    setOption(param){
        let geoJson = param.geoJson;
        let mapType = param.mapType || 'china';
        echarts.registerMap(mapType, geoJson);
        let option = {
            series: [
                {
                    type: 'map',
                    mapType: 'china',
                    data: []
                }
            ]
        };
        let op = extend(true, {}, option, param.option);
        return op;
    }
    render() {
        return (
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style}  onEvents={this.props.onEvents}/>
        );
    }
}
export default BBDMapChinaDataRange;