/*
* @desc 模块名
* @author xuyao
*/
import styles from './example.scss';// 样式
import React, { Component } from 'react'; // react
import { Link, Switch, Route } from 'react-router-dom'; // react-router4推荐引入
import AuthRoute from 'components/common/authRoute/AuthRoute';
import {isNotEmpty} from 'utils/util'; // 封装的公用方法
import BBDLineBar from 'components/common/echarts/BBDLineBar'; // 引入echarts
import { getBarLine } from 'services/example'; // 引入接口
// import { login } from 'services/example';
export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: null
        };
    }
    componentDidMount(){
        // login({code: '3f47ac75762ffe3bae3a4eedcbfe5f0a'}).then((data)=>{
        //     console.log(data);
        // });
        // this.getData();
    }
    getData(){
        // getBarLine().then((data) => {
        //     this.initData(data);
        // }, (error) => { // 请求失败, 通常情况无需自行处理, higgsPromise会自动处理, 除非需要自定义处理错误请求的时候才执行此方法.
        //     // messager.error('服务异常, 请稍后再试');
        // });
    }
    // 初始化数据
    initData(data){
        let series = data.series;
        let xAxis = data.xAxis;
        let bar = series.bar;
        let line = series.line;
        var seriesData = [];
        let barName = ['成交量'];
        if(bar.length){
            for(var i = 0; i < bar.length; i++) {
                var seriesBarItem = {
                    name: barName[i],
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    stack: '',
                    barWidth: 'auto',
                    data: bar[i],
                    itemStyle: {
                        normal: {},
                        emphasis: {}
                    }
                };
                seriesData.push(seriesBarItem);
            }
        }
        var barAreaStyle = {};
        let lineName = ['综合利率'];
        if(line.length){
            for(var j = 0; j < line.length; j++){
                var seriesLineItem = {
                    name: lineName[j],
                    type: 'line',
                    symbolSize: 5,
                    yAxisIndex: 1,
                    data: line[j]
                };
                seriesData.push(seriesLineItem);
            }
        }

        let option = {
            tooltip: {
                formatter: function (v) {
                    return '成交量：' + v[0].data + '亿元</br>' + '综合利率：' + v[1].data + '%';
                }
            },
            legend: {
                show: true,
                right: '30',
                data: ['成交量', '综合利率']
            },
            yAxis: [
                {
                    name: '亿元'
                },
                {
                    name: '综合利率'
                }
            ],
            xAxis: [
                {
                    name: '',
                    type: 'category',
                    data: xAxis
                }
            ],
            'series': seriesData
        };
        this.setState({ option });
    }

    render() {
        const { match, routes } = this.props;
        // console.log(routes, 'routes');
        let lineBarChart = null;
        if(this.state.option){
            lineBarChart = <BBDLineBar option={this.state.option}/>;
        }
        return (
            <div className={styles.example}>
            <div className="aa"><div className="bb"></div></div>
                <span>这是例子的主页</span>
                {
                    isNotEmpty(routes) && routes.map((item, index) => {
                        return (
                            <Link key={item.name} to={`${match.path}${item.path}`}>{item.name}</Link>
                        );
                    })
                }
                <div className={styles.box}>
                    <div className={styles.lineBar}>
                        {lineBarChart}
                    </div>
                    <Switch>
                        {
                            isNotEmpty(routes) && routes.map((item, index) => {
                                let {path, ...rest} = item;
                                return (
                                <AuthRoute 
                                    {...rest}
                                    key={item.name}
                                    path={`${match.path}${path}`}
                                />);
                            })
                        }
                    </Switch>
                </div>
            </div>
        );
    }
}