import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image } from '@tarojs/components';
import {
    navigateTo,
    setStorageSync,
    redirectTo,
    getCurrentInstance
} from '@tarojs/taro';
import { useDispatch } from 'react-redux';
// redux
import { AsyncGetUserInfo } from '@/store/userInfo';
// 自定义组件
import MSbmit from '@/components/mSubmit';
import MyToast from '@/utils/Mtoast';
//自定义方法
import BaseRequest from '@/utils/request/index';
import NoTokenNeedLogin from '@/utils/loginBack/index';
import { reload7m } from '@/src/common/js/common';
// login公共
import {
    PhoneNumberInput,
    VCodeInput
} from '@/pages/login/components/loginInput';
import AgreementBar from '@/pages/login/components/agreementBar';
import Request from '@/pages/login/common/api/index';
import { LoginCommonResult } from '@/pages/login/types/index';
import '@/pages/login/common/assets/css/index.scss';

function LogIn() {
    const query: any = getCurrentInstance().router?.params;

    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [vCode, setVCode] = useState<string>('');
    const [submitClass, setSubmitClass] = useState<string>('login_submit');
    const [getVCode, setGetVCode] = useState<boolean>(false);

    const dispatch = useDispatch();
    // @ts-ignore
    const HasCustomTabHeight = window.USER_CLIENT_HEIGHT - 44;

    // todo useRef获取对应元素
    const phoneNumberRef = useRef<any>(null);
    const vCodeRef = useRef<any>(null);

    function linkParamsToUrlSearch(linkParams) {
        return linkParams.replace(/-@-/gi, '=').replace(/-#-/gi, '&');
    }

    useEffect(() => {
        if (query?.loginBack) {
            setStorageSync(
                'loginBack',
                linkParamsToUrlSearch(query?.loginBack)
            );
        }
    }, []);

    // 填充手机号更改submit-button的样式
    useEffect(() => {
        !!phoneNumber && setSubmitClass('login_submit_active');
        !phoneNumber && setSubmitClass('login_submit');
    }, [phoneNumber]);

    // 填充验证吗更改submit-button的样式
    useEffect(() => {
        !!vCode && setSubmitClass('login_submit_active');
        !vCode && setSubmitClass('login_submit');
    }, [vCode]);

    function submitVCodeHandler() {
        Request.toQuickLogin<LoginCommonResult>({
            phoneNumber,
            vCode,
            recommender: Taro.getStorageSync('recommender') || null,
            activityCode: Taro.getStorageSync('activityCode') || null,
            registrant: process.env.TARO_ENV === 'h5' ? 'H5' : ''
        }).then(res => {
            const { code, msg, data } = res;
            if (code === 200) {
                let loginBack = Taro.getStorageSync('loginBack');
                const { token } = data;
                setStorageSync('phone', phoneNumber);
                setStorageSync('uniqueToken', token);
                BaseRequest.token = token;
                dispatch(AsyncGetUserInfo());
                if (loginBack) {
                    window.location.href = `${loginBack}&token=${token}`;
                    Taro.removeStorage({
                        key: 'loginBack'
                    });
                } else {
                    NoTokenNeedLogin.LoginBackTo('/pages/index/index');
                }
                //注册七陌客服
                reload7m();
            } else {
                MyToast.show({ title: msg });
            }
        });
    }

    function toGetVCodeHandler() {
        return Request.getVerifyCode<LoginCommonResult>({
            phoneNumber,
            vType: 0
        });
    }

    function submitPhoneNumberHandler() {
        toGetVCodeHandler().then(res => {
            const { code, msg } = res;
            if (code === 200) {
                setGetVCode(true);
                setSubmitClass('');
            } else {
                MyToast.show({ title: msg });
            }
        });
    }
    return (
        <View className="login_h5" style={`height:${HasCustomTabHeight}px`}>
            <Image src={`${IMG_COMMON_URL}logo.png`} className="logo"></Image>
            <Text className="login_title">快捷登录</Text>
            {!getVCode && (
                <>
                    <Text className="login_tips">
                        未注册的手机号登录后自动为您创建账号
                    </Text>
                    <MSbmit
                        onClick={submitPhoneNumberHandler}
                        formType="submit"
                        className={submitClass}
                        btnText="获取验证码"
                    >
                        <PhoneNumberInput
                            ref={phoneNumberRef}
                            phoneNumberHandler={[phoneNumber, setPhoneNumber]}
                        ></PhoneNumberInput>
                    </MSbmit>
                </>
            )}
            {!!getVCode && (
                <>
                    <Text className="login_tips">{`已发送手机号至${phoneNumber}`}</Text>
                    <MSbmit
                        onClick={submitVCodeHandler}
                        formType="submit"
                        className={submitClass}
                    >
                        <VCodeInput
                            ref={vCodeRef}
                            VCodeHandler={[vCode, setVCode]}
                            phoneNumber={phoneNumber}
                            vType="0"
                            hasGetVCode
                        ></VCodeInput>
                    </MSbmit>
                </>
            )}
            <View className="other_methods">
                {/* <Text
                    className="register_enter bottom_enter"
                    onClick={() =>
                        navigateTo({ url: '/pages/login/register/index' })
                    }
                >
                    立即注册
                </Text> */}
                <Text
                    className="password_login_enter bottom_enter"
                    onClick={() =>
                        redirectTo({ url: '/pages/login/passwordLogin/index' })
                    }
                >
                    密码登录
                </Text>
            </View>
            <AgreementBar currentEnter="登录"></AgreementBar>
        </View>
    );
}

export default LogIn;
