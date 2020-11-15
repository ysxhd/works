  /*
   * @desc 盒须图
   * @author yangfan
   */
  import React, { Component } from 'react';
  import extend  from 'extend';
  import EchartBase from './base/EchartBase';
  
  class BBDBoxPlot extends Component {
      constructor(props) {
          super(props);
      }
      setOption(parm) {
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
                  trigger: 'item',
                  axisPointer: {
                      type: 'shadow'
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
              xAxis: {
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
              yAxis: {
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
              }
          };
          let op = extend(true, {}, option, parm);
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
          return (
              <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} onEvents={this.props.onEvents}  getInstance={this.getEchartsInstance}/>
          );
      }
  }
  export default BBDBoxPlot;