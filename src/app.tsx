/*
 * @Author: 姜通
 * @Date: 2021-09-01 15:37:31
 * @LastEditTime: 2021-12-02 19:52:33
 * @Description:
 * @FilePath: /kechuanyun/src/app.tsx
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'default-passive-events';
// @ts-ignore
import Nav from '@/components/Nav';
import Taro, { getSystemInfoSync, setStorageSync } from '@tarojs/taro';
import { reload7m } from '@/src/common/js/common';
import Request from '@/common/api';
import './common/style/custom-variables.scss';
import './app.scss';
import store from './store';

// if (process.env.TARO_ENV === 'h5') {
//     import('eruda').then(v => {
//         const eruda = v.default;
//         eruda.init();
//     });
// }

class App extends Component {
    componentDidUpdate() {
        const officialAccount = this.getUrlParam('officialAccount');

        // 如果openId已经存在，不再去重新获取
        const openId = Taro.getStorageSync('wx_openid');
        if (openId) return;

        // H5微信内置浏览器获取授权
        if (
            window.WeixinJSBridge &&
            process.env.TARO_ENV === 'h5' &&
            !officialAccount
        ) {
            var code = this.getUrlParam('code'); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
            var local = window.location.href;
            var APPID = 'wxac2eafd23d1633f5';
            if (code == null || code === '') {
                window.location.href =
                    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                    APPID +
                    '&redirect_uri=' +
                    encodeURIComponent(local) +
                    '&response_type=code&scope=snsapi_base&state=#wechat_redirect';
            } else {
                Request.getWxOpenId<any>({ wx_code: code }).then(res => {
                    if (res.code === 200) {
                        setStorageSync('wx_openid', res.msg);
                    }
                });
            }
        }
    }

    componentDidShow() {
        //注册七陌客服
        reload7m();
    }

    componentDidHide() {
        // console.log('componentDidHide');
    }

    componentDidCatchError() {}

    onLaunch() {
        // 设置全局变量 用户界面高度
        // @ts-ignore
        window.USER_CLIENT_HEIGHT = getSystemInfoSync().windowHeight;

        if (process.env.TARO_ENV === 'weapp') {
            this.autoUpdate();
        }
    }

    //获取地址栏的参数
    getUrlParam = function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r;
        if (process.env.TARO_ENV === 'h5') {
            r = window.location.search.substr(1).match(reg);
        } else {
            var href = Taro.getCurrentInstance().router?.path || '';
            var search = href.split('?')[1] ?? '';
            r = search.match(reg);
        }
        if (r != null) return unescape(r[2]);
        return null;
    };

    autoUpdate() {
        const updateManager = Taro.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate);
        });
        updateManager.onUpdateReady(function () {
            Taro.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    }
                }
            });
        });
        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
        });
    }

    // appCallH5() {
    //     const { router } = getCurrentInstance();
    //     let useRouter: IRouter = { ...router };
    //     if (useRouter?.token && useRouter?.productCode) {
    //     // console.log('params12345', router);
    //     if (router?.token && router?.productCode) {
    //         Taro.setStorage({
    //             key: 'token',
    //             data: useRouter?.token,
    //             success: res => {
    //                 console.log('res', res);
    //             }
    //         });
    //         BaseRequest.token = useRouter?.token;
    //     }
    // }

    // props.children 是将要会渲染的页面
    render() {
        return (
            <Provider store={store}>
                <Nav child={this.props.children}></Nav>
            </Provider>
        );
    }
}

export default App;
