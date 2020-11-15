/**
 * @desc 页面整体框架组件
 */
import './app.scss';
import React, { Component } from 'react';
import { Switch, HashRouter as Router } from 'react-router-dom';
import { message, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AuthRoute from '../common/authRoute/AuthRoute';
import routes from './router';
import { isNotEmpty } from 'utils/util';
import Header from 'common/header/Header';
import Footer from 'common/footer/Footer';

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
                    <div className="app">
                        <Header />
                        <Switch>
                            {
                                isNotEmpty(routes) && routes.map((item, index) => {
                                    let { path, ...rest } = item;
                                    return (
                                        <AuthRoute
                                            key={item.name}
                                            {...rest}
                                            path={path}
                                        />);
                                })
                            }
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </ConfigProvider>
        );
    }
}
export default App;

