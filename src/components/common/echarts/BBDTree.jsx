  /*
   * @desc tree
   * @author yangfan
   */
  import React, { Component } from 'react';
  import extend  from 'extend';
  import EchartBase from './base/EchartBase';
  
  class BBDTree extends Component {
      constructor(props) {
          super(props);
      }
      setOption(parm) {
          const option = {};
  
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