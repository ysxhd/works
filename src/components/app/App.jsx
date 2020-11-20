/**
 * @desc 页面整体框架组件
 */
import './app.scss';
import React, { Component } from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import { message, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AuthRoute from '../common/authRoute/AuthRoute';
import routes from './router';

import { isNotEmpty } from 'utils/util';
import Index from 'components/index/Index';
message.config({
    top: 100,
    duration: 2,
    maxCount: 1
});
class App extends Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Index} />
                    </Switch>
                </Router>
            </ConfigProvider>
        );
    }
}
export default App;

