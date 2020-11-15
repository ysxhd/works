export const menuList = [
    { title: '首页', key: 'index', path: '/index', level: 1 },
    {
        title: '全息画像', key: 'holographicPortrait', path: '/holographicPortrait', level: 0, children: [
            { title: '主体查询', key: 'search', path: '/holographicPortrait/search' },
            { title: '标签管理', key: 'tag', path: '/holographicPortrait/tag' }
        ]
    },
    {
        title: '关联图谱', key: 'relationGraph', path: '/relationGraph', level: 0, children: [
            { title: '企业搜索', key: 'searchRelation', path: '/relationGraph/search' },
            { title: '关系探寻', key: 'seek', path: '/relationGraph/seek' },
            { title: '关系图谱', key: 'graph', path: '/relationGraph/graph', hide: true }
        ]
    },
    {
        title: '信用探测', key: 'creditRecognition', path: '/creditRecognition', level: 0, children: [
            { title: '舆情总览', key: 'overview', path: '/creditRecognition/overview' },
            { title: '定向探测', key: 'excavate', path: '/creditRecognition/excavate' },
            { title: '专题舆情', key: 'monitor', path: '/creditRecognition/monitor' },
            { title: '热点舆情', key: 'hotSentiment', path: '/creditRecognition/hotSentiment' },
            { title: '舆情报告', key: 'report', path: '/creditRecognition/report' },
            { title: '我的舆情', key: 'sentimentList', path: '/creditRecognition/sentimentList' }
        ]
    },
    {
        title: '信用评价', key: 'creditEvaluate', path: '/creditEvaluate', level: 0, children: [
            { title: '评价成果', key: 'fieldIndex', path: '/creditEvaluate/fieldIndex', level: 1 },
            {
                title: '领域管理', key: 'fieldManagement', path: '/creditEvaluate/fieldManagement', level: 1
            },
            { title: '评价模型', key: 'modelManagement', path: '/creditEvaluate/modelManagement', level: 1 },
            { title: '评价计算', key: 'EvaluateCalculate', path: '/creditEvaluate/evaluateCalculate', level: 1 },
            {
                title: '评价验证', key: 'threeValid', path: '/creditEvaluate/threeValid', level: 1
            },
            { title: '报告管理', key: 'reportManagement', path: '/creditEvaluate/reportManagement', level: 1 }
        ]
    },
    {
        title: '信用监测', key: 'creditMonitor', path: '/creditMonitor', level: 0, children: [
            { title: '主体监测', key: 'mainMonitor', path: '/creditMonitor/mainMonitor' },
            { title: '区域/行业监测', key: 'areaIndustry', path: '/creditMonitor/areaIndustry' },
            { title: '信用指数', key: 'creditIndex', path: '/creditMonitor/creditIndex' },
            { title: '变动提示', key: 'notify', path: '/creditMonitor/notify' }
        ]
    },
    {
        title: '风险预警', key: 'riskWarning', path: '/riskWarning', level: 0, children: [
            { title: '首页', key: 'industry', path: '/riskWarning/industry' },
            { title: '主体风险预警', key: 'warning', path: '/riskWarning/warning' },
            { title: '区域/行业风险预警', key: 'associated', path: '/riskWarning/associated' },
            { title: '红黑名单比对', key: 'list', path: '/riskWarning/list' }
            // { title: '自动风险识别', key: 'identification', path: '/riskWarning/identification' }
        ]
    },
    {
        title: '应用挖掘', key: 'application', path: '/application', level: 0, children: [
            { title: '综合分析', key: 'commonAnalysis', path: '/application/commonAnalysis', level: 1 },
            { title: '重点领域信用专题分析', key: 'specialzedGovernance', path: '/application/specialzedGovernance', level: 1 },
            // { title: '重大项目关联主体信用分析', key: 'sb3-5', path: '/application/areaAnalysis', level: 1 },
            // { title: '月度失信黑名单分析', key: 'sb3-1', path: '/application/blacklistAnalysis', level: 1 },
            { title: '重大项目关联主体信用分析', key: 'analysisResult', path: false, level: 1 },
            { title: '月度失信黑名单分析', key: 'blacklistAnalysis', path: false, level: 1 },
            { title: '信易+', key: 'creditplus', path: '/application/creditplus', level: 1 }
        ]
    },
    {
        title: '大屏展示', key: 'screenDisplay', path: '/screenDisplay/index', level: 1
        // children: [
        //     { title: '公共信用综合评价', key: 'sb2-1', path: '/screenDisplay/overview', level: 1 },
        //     { title: '月度失信黑名单', key: 'sb2-2', path: '/screenDisplay/blackList', level: 1 },
        //     { title: '风险预警', key: 'sb2-3', path: '/screenDisplay/riskWarning', level: 1 },
        //     { title: '重点领域专项治理', key: 'sb2-4', path: '/screenDisplay/specialzedGovernance', level: 1 },
        //     { title: '重点领域专题分析', key: 'sb2-5', path: '/screenDisplay/specialzedAnalysis', level: 1 },
        //     { title: '信易+成果展示', key: 'sb2-6', path: '/screenDisplay/twoAchievement', level: 1 },
        //     { title: '信用中国成果展示', key: 'sb2-7', path: '/screenDisplay/creditAchievement', level: 1 },
        //     { title: '联合奖惩成果展示', key: 'sb2-8', path: '/screenDisplay/combineAchievement', level: 1 },
        //     { title: '信用探测', key: 'sb2-9', path: '/screenDisplay/news', level: 1 }
        // ]
    }
];

export const basicIndexMenuList = [
    { title: '基础指标管理', key: 'manage', path: '/basicIndex/manage', level: 0 },
    { title: '指标操作日志', key: 'log', path: '/basicIndex/log', level: 0 },
    { title: '下载任务管理', key: 'download', path: '/basicIndex/download', level: 0 }
];
export const adminSystemMenuList = [
    { title: '用户管理', key: 'userManager', path: '/manageSystems/userManager', level: 1 },
    { title: '角色管理', key: 'roleManager', path: '/manageSystems/roleManager', level: 1 },
    { title: '功能配置', key: 'funcManager', path: '/manageSystems/funcManager', level: 1 },
    { title: '日志管理', key: 'logManager', path: '/manageSystems/logManager', level: 1 }
];
