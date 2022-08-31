import Taro from '@tarojs/taro';
import store from '@/store/index';
import NoTokenNeedLogin from '@/utils/loginBack/index';
import ModalUtils from './ModalUtils';

// 本功能服务需要开通会员，如需使用，请开通会员
// 现在开通
// 登录与否去做的事情
export const doWithLogin = (action, path = '/pages/index/index') => {
    const token = Taro.getStorageSync('uniqueToken');
    const currentPages = Taro.getCurrentPages();

    if (token) {
        action();
    } else {
        NoTokenNeedLogin.ReadyForBack({
            toLogin: '/pages/login/quickLogin/index',
            key: 'toModifyPassword',
            backPath: path || (currentPages?.[0]?.path ?? path)
        });
        // loginutils.show({ action });
    }
};

// 登录的装饰器
function redirectLoginDecorator(target, name, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function () {
        oldValue(arguments[0])();
        // doWithLogin(oldValue(arguments[0]));
    };

    return descriptor;
}

export default class LoginPerModule {
    // 有登录有权限的
    static redirectToAuthLoginPath(perKey, action, needLogin = true) {
        const token = Taro.getStorageSync('uniqueToken');
        const currentPages = Taro.getCurrentPages();
        const permissions = store.getState()?.permissions?.data ?? {};
        if (needLogin) {
            if (token) {
                const vipCount: any = store.getState()?.vipDisplay?.data ?? {};
                if (permissions[perKey] === '1') {
                    action();
                } else {
                    Taro.showModal({
                        title: '提示',
                        content: '本服务需要开通会员，如需使用，请开通会员',
                        cancelText: '取消',
                        confirmText: '现在开通',
                        confirmColor: '#e02021',
                        success: function (res) {
                            if (res.confirm) {
                                Taro.navigateTo({
                                    url: `/pages/serveDeatils/index?productCode=${vipCount.defVipProductCode}`
                                });
                            }
                        }
                    });
                }
            } else {
                NoTokenNeedLogin.ReadyForBack({
                    toLogin: '/pages/login/quickLogin/index',
                    key: 'toModifyPassword',
                    backPath: currentPages?.[0]?.path ?? '/pages/index/index'
                });
            }
        } else {
            action();
        }
    }

    @redirectLoginDecorator
    static redirectToLoginPath(data) {
        let action = () => {
            // todo
        };
        switch (data.type) {
            case 0:
                break;

            // web页面
            // url：跳转的URL
            case 1:
                if (
                    data.params.url !== ' ' &&
                    data.params.url !== '' &&
                    data.params.url !== '“”' &&
                    data.params.url !== "''"
                ) {
                    action = () => {
                        window.open(data.params.url);
                    };
                }
                // window.location.href = data.params.url;
                break;

            // 商品列表
            // categoryId：分类ID
            case 2:
                action = () =>
                    Taro.navigateTo({
                        url: `/shop/${data.params.categoryId}`
                    });
                break;

            // 商品详情
            // productCode：产品编码
            case 3:
                action = () =>
                    Taro.navigateTo({
                        url: `/shop/index/${data.params.productCode}`
                    });
                break;

            // orderState:订单状态
            // 我的订单列表： 1.待支付、2.已支付、3.线下-待审批、4线下-驳回、5.已取消
            case 4:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/order'
                    });
                break;

            // 订单详情
            // orderNum：订单号
            case 5:
                action = () =>
                    Taro.navigateTo({
                        url: `/info/order/myorderDetails/${data.params.orderNum}`
                    });

                break;

            // 我的发票列表（可包含发票状态0.待开具、1.已开具、2.被驳回）
            // invoiceState:0
            case 6:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/invoice'
                    });
                break;

            // 发票详情
            // todo
            // invoiceId: 发票id
            case 7:
                action = () =>
                    Taro.navigateTo({
                        url: `/info/address/addressDetails/${data.params.workOrderNo}`
                    });

                break;

            // 我的案件列表
            // workStatus：0全部，1服务中，2已结案，3终止
            case 8:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/address'
                    });
                break;

            // 我的案件详情（包含子订单号）
            // workOrderNo：工单号
            case 9:
                action = () =>
                    Taro.navigateTo({
                        url: `/info/address/addressDetails/${data.params.workOrderNo}`
                    });

                break;

            // 我的合同主体列表(可包含合同主体类型1.企业、2.个人)
            // subjectType：1
            case 10:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/subject'
                    });
                break;

            // 我的合同主体详情(包含合同主体id)
            // subjectId：
            case 11:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/subject'
                    });
                break;

            // 我的邮寄地址列表
            case 12:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/mailAddress'
                    });
                break;

            // 我的智能风险监测
            case 13:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/riskDetection'
                    });

                break;

            // 我的企业风险监控
            case 14:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/monitoring/dynamic'
                    });
                break;

            // 我的IP智能管家
            case 15:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/collocation/collocationDynamic'
                    });
                break;

            // 我的IP档案馆
            case 16:
                action = () =>
                    Taro.navigateTo({
                        url: '/iptools/archives'
                    });
                break;

            // 我的产业监控
            case 17:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/industryMonitoring'
                    });
                break;

            // 我的会员
            case 18:
                break;

            // 我的优惠券
            // couponType：不传=全部，1优惠券，2折扣券
            case 19:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/discounts'
                    });
                break;

            // 我的分期
            // payStatus：不传=全部，0=待还款，1=已还清
            case 20:
                action = () =>
                    Taro.navigateTo({
                        url: '/info/aging'
                    });
                break;

            // APP首页
            case 21:
                action = () =>
                    Taro.navigateTo({
                        url: '/pages/index/index'
                    });
                break;

            // 我的官方文件
            case 22:
                break;

            // 我的材料
            case 23:
                break;

            // 知产档案馆
            case 24:
                action = () =>
                    Taro.navigateTo({
                        url: '/iptools/archives'
                    });
                break;
            // 专精特新评测
            case 25:
                action = () =>
                    Taro.navigateTo({
                        url: '/iptools/specialization/index'
                    });
                break;
            // 专利续费
            case 26:
                // action = () => history.push('/info/industryMonitoring');
                break;
            // 商标自主注册
            case 27:
                // action = () => history.push('/info/industryMonitoring');
                break;
            // 商标近似分析
            case 28:
                action = () =>
                    Taro.navigateTo({
                        url: '/iptools/trademark'
                    });
                break;
            // 高企评测
            case 29:
                action = () =>
                    Taro.navigateTo({
                        url: '/iptools/companyEvaluating'
                    });
                break;
            // 竞争情报分析
            case 30:
                // action = () => history.push('/info/industryMonitoring');
                break;
            // 政策分析
            case 31:
                // action = () => history.push('/info/industryMonitoring');
                break;
            default:
                break;
        }

        return action;
    }
}
