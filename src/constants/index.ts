//订单状态
export const orderStatus = {
    '1': {
        status: '待支付',
        img: IMG_COMMON_URL + 'dfk.svg',
        xqImg: IMG_COMMON_URL + 'xq-dzf.svg'
    },
    '2': {
        status: '已支付',
        img: IMG_COMMON_URL + 'yfk.svg',
        xqImg: IMG_COMMON_URL + 'xq-yzf.svg'
    },
    '3': {
        status: '线下支付-审核中',
        img: IMG_COMMON_URL + 'dfk.svg',
        xqImg: IMG_COMMON_URL + 'xq-dsh.svg'
    },
    '4': {
        status: '线下支付-被驳回',
        img: IMG_COMMON_URL + 'bbh.svg',
        xqImg: IMG_COMMON_URL + 'xq-dzf.svg'
    },
    '5': {
        status: '已取消',
        img: IMG_COMMON_URL + 'fwz.svg',
        xqImg: IMG_COMMON_URL + 'xq-yqx.svg'
    }
};

//作件状态
export const caseStatus = {
    '1': { status: '服务中', img: IMG_COMMON_URL + 'ajfwz.svg' },
    '2': { status: '已交付', img: IMG_COMMON_URL + 'ajyjf.svg' },
    '3': {
        status: '已终止',
        img: IMG_COMMON_URL + 'ajyzz.svg'
    }
};

//支付类型
export const payType = {
    0: '零元订单',
    1: '微信',
    2: '支付宝',
    3: '线下转账'
};

//订单商品类型
export const orderProductType = {
    1: IMG_COMMON_URL + 'shangbiao.svg',
    2: IMG_COMMON_URL + 'zhuanli.svg',
    3: IMG_COMMON_URL + 'banquan.svg',
    4: IMG_COMMON_URL + 'kejixiangmu.svg',
    5: IMG_COMMON_URL + 'pinpai.svg',
    6: IMG_COMMON_URL + 'jiaoyi.svg',
    7: IMG_COMMON_URL + 'kechuangyun/shoppingCart/confirmOrder/productList/7.svg',
    10: IMG_COMMON_URL + 'pinggu.svg',
    11: IMG_COMMON_URL + 'shewai.svg'
};

export const IPSolutions = {
    copyright: {
        title: '商标/版权提货券',
        bjImg: IMG_COMMON_URL + 'sbthq.svg',
        detail: '结合相关市场主体对商标注册保护、企业对软著登记的需求，定制的一款产品。',
        tab: [
            { id: '0', title: '商标提货券' },
            { id: '1', title: '版权提货券' }
        ],
        background: '#FFDFDF'
    },
    business: {
        title: '业务包',
        bjImg: IMG_COMMON_URL + 'ywb.svg',
        detail: '包括高企包、RCEP商标注册包、全球商标注册包，主要围绕高新技术企业或准高新技术企业提供集政策咨询及解读、资质培育辅导、长期过程服务为一体的企业咨询服务产品，同时对RCEP国家与全球主要经济体提供一站式商标注册保护服务。',
        tab: [
            { id: '0', title: '高企包' },
            { id: '1', title: 'RCEP商标注册包' },
            { id: '2', title: '全球商标注册包' }
        ],
        background: '#FFF2DF'
    },
    project: {
        title: '项目包',
        bjImg: IMG_COMMON_URL + 'xmb.svg',
        detail: '是一款为企业主体提供集项目规划、专业培训、资质培育、项目辅导申报为一体的企业项目服务产品。',
        background: '#FFECDF'
    },
    patent: {
        title: '专利提货券',
        bjImg: IMG_COMMON_URL + 'zlthq.svg',
        detail: '结合企业知识产权保护和企业发展周期需要，融合打通并全面解决企业专利的创新和保护问题，帮助企业更精准的规划、构筑核心技术壁垒，助力企业腾飞发展的一种知识产权品类消费券。',
        background: '#F7DED1'
    }
};

export const kcy_iPintelligentMonitoring_joinMonitor =
    'kcy_copyrightQuery_copyrightDetails';
export const kcy_ipIntelligentHousekeeper_joinHosting =
    'kcy_ipIntelligentHousekeeper_joinHosting';
export const kcy_riskDetection_immediatelyDetect =
    'kcy_riskDetection_immediatelyDetect';
export const kcy_industryMonitoring_addIndustryMonitoring =
    'kcy_industryMonitoring_addIndustryMonitoring';

// 商标查询.商标详情
export const kcy_trademarkQuery_trademarkDetails =
    'kcy_trademarkQuery_trademarkDetails';
// 专利查询.专利详情
export const kcy_patentQuery_patentDetails = 'kcy_patentQuery_patentDetails';
// 政策查询.政策详情
export const kcy_policyQuery_policyDetails = 'kcy_policyQuery_policyDetails';
// 版权查询.版权详情
export const kcy_copyrightQuery_copyrightDetails =
    'kcy_copyrightQuery_copyrightDetails';

export const per_key_obj = {
    collocation: kcy_ipIntelligentHousekeeper_joinHosting,
    detection: kcy_riskDetection_immediatelyDetect,
    monit: kcy_iPintelligentMonitoring_joinMonitor,
    specialization: 'specialization'
};
