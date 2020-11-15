import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import config from 'config/config';
// import { login } from 'services/login';
import queryString from 'query-string';
import {isNotEmpty} from 'utils/util'; // 封装的公用方法
import { getCookie, setCookie } from 'utils/cookie';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
class AuthRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        };
    }
    componentWillMount(){
        // let newUrl = location.origin + location.hash;
        // let isLogin = getCookie('x-session-id');
        // if(isLogin){
        //     this.setState({isLogin: isLogin});
        // }else{
        //     const parsed = queryString.parse(location.search);
        //     let code = isNotEmpty(parsed) && parsed.code;
        //     if(code){
        //         login({code: code}).then((data)=>{
        //             history.pushState({}, {}, newUrl); 
        //             this.setState({isLogin: true});
        //         });
        //     }else{
        //         login().then((data)=>{
        //            //
        //         });
        //     }
        // }
    }
    componentDidMount() {
      //
    }

    render() {
        let {component: Component, routes, isNavRoute, hasFooter, ...rest} =  this.props;
        let { path } = rest;
        let { isLogin } = this.state;
        return isLogin ? (<Route
            {...rest}
            render={props =>
                (
                [   
                    <Component key="component" {...props} routes={routes}/>
                ]
                )
            }
        />) : (
            null
        );
    }
}

export default AuthRoute;
