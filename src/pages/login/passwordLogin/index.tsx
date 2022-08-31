import React, { useState, useRef, useEffect } from 'react';
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
// 自定义方法
import { reload7m } from '@/src/common/js/common';
import BaseRequest from '@/utils/request/index';
import NoTokenNeedLogin from '@/utils/loginBack/index';
// login公共
import {
    PhoneNumberInput,
    PasswordInput
} from '@/pages/login/components/loginInput';
import Request from '@/src/pages/login/common/api/index';
import { LoginCommonResult } from '@/src/pages/login/types/index';
import '@/pages/login/common//assets/css/index.scss';

function PasswordLogIn() {
    const query: any = getCurrentInstance().router?.params;

    const [phoneNumber, setPhoneNumber] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [submitClass, setSubmitClass] = useState<string>('login_submit');

    const dispatch = useDispatch();

    const HasCustomTabHeight =
        process.env.TARO_ENV === 'h5'
            ? // @ts-ignore
              window.USER_CLIENT_HEIGHT - 44
            : // @ts-ignore
              window.USER_CLIENT_HEIGHT;

    // todo useRef获取对应元素
    const phoneNumberRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

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
    // 填充表单更改submit-button的样式
    useEffect(() => {
        !!phoneNumber && !!password && setSubmitClass('login_submit_active');
        (!phoneNumber || !password) && setSubmitClass('login_submit');
    }, [phoneNumber, password]);

    function submitHandler() {
        Request.toPasswordLogin<LoginCommonResult>({
            userName: phoneNumber,
            password
        }).then(res => {
            const { code, msg, data } = res;
            if (code === 200) {
                let loginBack = Taro.getStorageSync('loginBack');
                const { token } = data;
                setStorageSync('uniqueToken', token);
                setStorageSync('phone', phoneNumber);
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

    return (
        <View className="login_h5" style={`height:${HasCustomTabHeight}px`}>
            <Image src={`${IMG_COMMON_URL}logo.png`} className="logo"></Image>
            <Text className="login_title">密码登录</Text>
            <Text className="login_tips">
                新用户？
                <Text
                    onClick={() =>
                        redirectTo({ url: '/pages/login/quickLogin/index' })
                    }
                    style={{ color: '#DF0A17' }}
                >
                    使用快捷登录注册
                </Text>
            </Text>
            <MSbmit onClick={submitHandler} className={submitClass}>
                <PhoneNumberInput
                    ref={phoneNumberRef}
                    phoneNumberHandler={[phoneNumber, setPhoneNumber]}
                ></PhoneNumberInput>
                <PasswordInput
                    ref={passwordRef}
                    passwordHandler={[password, setPassword]}
                ></PasswordInput>
            </MSbmit>
            <View className="other_methods">
                <Text
                    className="forget_password_enter bottom_enter"
                    onClick={() =>
                        redirectTo({ url: '/pages/login/modifyPassword/index' })
                    }
                >
                    忘记密码?
                </Text>
                <Text
                    className="quick_login_enter bottom_enter"
                    onClick={() =>
                        redirectTo({ url: '/pages/login/quickLogin/index' })
                    }
                >
                    快捷登录
                </Text>
            </View>
            {/* <Text
                className="register_at_bottom at_bottom"
                onClick={() =>
                    navigateTo({ url: '/pages/login/register/index' })
                }
            >
                立即注册
            </Text> */}
        </View>
    );
}

export default PasswordLogIn;
