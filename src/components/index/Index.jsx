import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import styles from './index.scss';
import CompanyInfoGraph from './companyInfoGraph';
import companyInfoData from './companyInfo.json';
import Test from './Test';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            linkHref: ''
        };
    }
    componentDidMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;

        let { qyxxId = '1234567894555554ddsad', companyName = 'xxxx科技有限公司', creditCode = '--' } = this.props.match.params;
        companyInfoData.companyName = companyName;
        companyInfoData.creditCode = creditCode === 'nc' ? '--' : creditCode;
        this.cig = new CompanyInfoGraph({
            id: 'cig',
            data: companyInfoData,
            clickBack: (data) => {
                this.props.history.push(`/holographicPortrait/search/subjectDetail/${data}/${qyxxId}`);
            }
        });
        // this.get2();
    }
    get2() {
        let { qyxxId = '1234567894555554ddsad', companyName = '成都数联铭品科技有限公司', creditCode = '--' } = this.props.match.params;
        companyInfoData.companyName = companyName;
        companyInfoData.creditCode = creditCode === 'nc' ? '--' : creditCode;
        this.cig = new CompanyInfoGraph2({
            id: 'cig2',
            data: companyInfoData,
            clickBack: (data) => {
                this.props.history.push(`/holographicPortrait/search/subjectDetail/${data}/${qyxxId}`);
            }
        });
    }
    componentWillUnmount() {
        this.cig.destory();
    }
    render() {
        let { loading, linkHref } = this.state;
        return (
            <div className={styles.index}>
                {/* <Test /> */}
                {/* <div className={styles.graphWraper}>
                    {loading ? <div className={styles.loading}><Spin /></div> : null}
                    <div className={styles.topBanner}></div>
                    <div className={styles.graph} id="cig2"></div>
                    <div className={styles.bottomBanner}></div>
                </div> */}
                <div className={styles.graphWraper} id="graphWraper">
                    {loading ? <div className={styles.loading}><Spin /></div> : null}
                    <div className={styles.topBanner}></div>
                    <div className={styles.graph} id="cig"></div>
                    <div className={styles.bottomBanner}></div>
                </div>
                <div className={styles.floatLayer} onClick={this.navigatorTo}><span>关联关系挖掘</span></div>
                {/* <Link to={`/relationGraph/graph/circle/${qyxxId}/${companyName}`} className={styles.floatLayer}><span>关联关系挖掘</span></Link> */}
                <Link id="simulatedClick" className={styles.simulatedClick} to={linkHref} target="_blank"></Link>
            </div>
        );
    }
}
