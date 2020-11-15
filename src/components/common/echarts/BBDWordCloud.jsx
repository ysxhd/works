/*
 * @desc 词云
 * @author ashima
 * @param radius 区别环形与饼图 eg：[0, '75%'] 内半径与外半径
 * @param roseType 南丁格尔玫瑰图专用，可选择两种模式 radius/area
 */
import React, { Component } from 'react';
import extend from 'extend';
import EchartBase from './base/EchartBase';
import wordCloud from 'echarts-wordcloud';

class BBDWordCloud extends Component {
    constructor(props) {
        super(props);
    }
    setOption(parm) {
        const option = {
            backgroundColor: '#FAFAFC',
            series: [{
                name: '',
                type: 'wordCloud',
                sizeRange: [12, 30],
                rotationRange: [-90, 90],
                rotationStep: 90,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function (v) {
                            return v.data.color;
                        }
                    },
                    emphasis: {
                        shadowBlur: 5,
                        shadowColor: '#333'
                    }
                },
                data: []
            }]
        };

        let op = extend(true, {}, option, parm);
        return op;
    }
    render() {
        return (
            <EchartBase option={this.setOption(this.props.option)} style={this.props.style} />
        );
    }
}
export default BBDWordCloud;