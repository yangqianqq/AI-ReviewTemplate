import React, { useEffect, useRef } from 'react';
import Taro, {
    setStorageSync,
    login,
    checkSession,
    getCurrentInstance,
    redirectTo
} from '@tarojs/taro';
import { View, Button, Image, Text } from '@tarojs/components';
import { useDispatch } from 'react-redux';
// redux
import { AsyncGetUserInfo } from '@/store/userInfo';
// 自定义方法
import BaseRequest from '@/utils/request/index';
import NoTokenNeedLogin from '@/utils/loginBack/index';
// login公共
import AgreementBar from '@/pages/login/components/agreementBar';
import Request from '@/pages/login/common/api/index';
import { LoginCommonResult } from '@/pages/login/types/index';
import '@/pages/login/common/assets/css/index.scss';

function LogIn() {
    const wxcode = useRef('');
    const query: any = getCurrentInstance().router?.params;
    const dispatch = useDispatch();

    useEffect(() => {
        login({
            success(e) {
                const { code } = e;
                wxcode.current = code;
            }
        });
    }, []);

    /**
     *@func
     *@desc 查询session是否有效，调用登录接口，成功登录并且跳转首页
     */
    function toLogin(pdata) {
        checkSession({
            success(e) {
                if (e.errMsg === 'checkSession:ok') {
                    Request.toWXLogin<LoginCommonResult>({
                        ...pdata,
                        wx_code: wxcode.current,
                        recommender: Taro.getStorageSync('recommender') || null,
                        activityCode:
                            Taro.getStorageSync('activityCode') || null
                    })
                        .then(res => {
                            const { code, msg, data } = res;
                            if (code === 200) {
                                const { token } = data;
                                const empUserId =
                                    Taro.getStorageSync('empUserId');
                                setStorageSync('uniqueToken', token);
                                BaseRequest.token = token;
                                if (empUserId) {
                                    Request.addEmployeeClient({
                                        empUserId: empUserId
                                    });
                                }
                                Request.getFreeMemberList({
                                    pageNum: 1,
                                    pageSize: 10
                                });
                                if (empUserId) {
                                    let loginBack =
                                        Taro.getStorageSync('loginBack');

                                    redirectTo({
                                        url: `${loginBack}`
                                    });

                                    Taro.removeStorage({
                                        key: 'loginBack'
                                    });
                                    dispatch(AsyncGetUserInfo());
                                } else {
                                    dispatch(AsyncGetUserInfo());
                                    NoTokenNeedLogin.LoginBackTo(
                                        '/pages/index/index'
                                    );
                                }
                            } else {
                                console.log(msg, 'code', code);
                            }
                        })
                        .catch(err => console.log(err, 'err'));
                } else {
                    console.log('登录code已过期,请重新进入小程序');
                }
            }
        });
    }

    function getPhoneNumber(e) {
        const { encryptedData, iv } = e.detail;
        const data = {
            wx_data: encryptedData,
            wx_iv: iv
        };
        toLogin(data);
    }

    return (
        <View
            className="login_wx"
            // @ts-ignore
            style={`height:${window.USER_CLIENT_HEIGHT}px`}
        >
            <Image src={`${IMG_COMMON_URL}logo.png`} className="logo"></Image>
            <Text className="login_title">微信一键登录</Text>
            <Text className="login_tips">欢迎登录黑马科创云</Text>
            <Button
                open-type="getPhoneNumber"
                onGetPhoneNumber={getPhoneNumber}
                className="wx_login_button .login_submit_active"
            >
                微信用户一键登录
            </Button>
            {/* <View className="wx_password_login">
                <Navigator
                    className="wx_password_login_enter"
                    hoverClass="none"
                    url="/pages/login/passwordLogin/index"
                >
                    密码登录
                </Navigator>
            </View> */}
            <AgreementBar currentEnter="登录"></AgreementBar>
        </View>
    );
}

export default LogIn;
