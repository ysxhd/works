import React, { Component } from 'react';
import extend  from 'extend';
import EchartBase from './base/EchartBase';

class BBDTree extends Component {
    constructor(props) {
        super(props);
    }
    setOption(parm) {
        const option = {
            title: {
                show: false
            },
            series: {
                type: 'sunburst',
                highlightPolicy: 'ancestor',
                data: [],
                radius: [0, '90%'],
                label: {
                    rotate: 'radial'
                },
                sort: null,
                levels: [{}, {
                    r0: '0%',
                    r: '30%',
                    itemStyle: {
                        borderWidth: 1
                    },
                    label: {
                        rotate: 'tangential',
                        fontSize: 12
                    }
                }, {
                    r0: '30%',
                    r: '60%',
                    label: {
                        align: 'right',
                        fontSize: 10
                    }
                }, {
                    r0: '65%',
                    r: '67%',
                    label: {
                        position: 'outside',
                        fontSize: 9,
                        color: '#fff',
                        fontWeight: 'lighter',
                        fontFamily: 'Arial'
                    },
                    itemStyle: {
                        borderWidth: 1
                    },
                    downplay: {
                        label: {
                            opacity: 0.5
                        }
                    }
                }]
            }
        };

        let op = extend(true, {}, option, parm);
        return op;
    }
    render() {
        return (
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} onEvents={this.props.onEvents} />
        );
    }
}
export default BBDTree;