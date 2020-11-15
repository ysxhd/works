/*
* @desc 桑葚图
* @author xuyao
*/
import React, { Component } from 'react';
import extend  from 'extend';
import EchartBase from './base/EchartBase';

class BBDMulberry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currIndex: -1
        };
    }
    setOption(parm){
        const option = {
            title: [{
                text: '',
                textStyle: {
                    fontSize: 12
                },
                left: '3%'
            },
            {
                text: '',
                textStyle: {
                    fontSize: 12
                },
                left: '43%'
            },
            {
                text: '',
                textStyle: {
                    fontSize: 12
                },
                left: '83%'
            }],
            series: [
                {
                    type: 'sankey',
                    layout: 'none',
                    data: [],
                    links: [],
                    left: '5%',
                    right: '10%',
                    top: '12%',
                    nodeWidth: 20,
                    itemStyle: {
                        normal: {
                            borderWidth: 1
                        }
                    },
                    lineStyle: {
                        normal: {
                            curveness: 0.6
                        }
                    },
                    label: {
                        normal: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 12
                            },
                            formatter: function(parms){
                                return parms.name + ': ' + parms.value;
                            }
                        }
                    }
                }
            ]
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
export default BBDMulberry;