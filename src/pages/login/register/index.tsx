/*
 * @Author: 姜通
 * @Date: 2021-08-18 11:59:40
 * @LastEditTime: 2021-11-29 11:11:38
 * @Description:
 * @FilePath: /kechuanyun/src/pages/login/register/index.tsx
 */
import React, { useState, useRef, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
// 自定义组件
import MSbmit from '@/components/mSubmit';
import MyToast from '@/utils/Mtoast';
// 自定义方法
import NoTokenNeedLogin from '@/utils/loginBack/index';
// login公共
import {
    PhoneNumberInput,
    PasswordInput,
    VCodeInput
} from '@/pages/login/components/loginInput';
import AgreementBar from '@/pages/login/components/agreementBar';
import Request from '@/pages/login/common/api/index';
import { LoginCommonResult } from '@/pages/login/types/index';
import '@/pages/login/common/assets/css/index.scss';

function Register() {
    const [phoneNumber, setPhoneNumber] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [vCode, setVCode] = useState<string>('');
    const [submitClass, setSubmitClass] = useState<string>('login_submit');

    const HasCustomTabHeight =
        process.env.TARO_ENV === 'h5'
            ? // @ts-ignore
              window.USER_CLIENT_HEIGHT - 44
            : // @ts-ignore
              window.USER_CLIENT_HEIGHT;

    // todo useRef获取对应元素
    const phoneNumberRef = useRef<any>(null);
    const vCodeRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    // 填充表单更改submit-button的样式
    useEffect(() => {
        !!phoneNumber &&
            !!password &&
            !!vCode &&
            setSubmitClass('login_submit_active');
        (!phoneNumber || !password || !vCode) && setSubmitClass('login_submit');
    }, [phoneNumber, password, vCode]);

    function submitHandler() {
        Request.toRegister<LoginCommonResult>({
            phoneNumber,
            vCode,
            password,
            recommender: Taro.getStorageSync('recommender') || null,
            activityCode: Taro.getStorageSync('activityCode') || null,
            registrant: process.env.TARO_ENV === 'h5' ? 'H5' : ''
        }).then(res => {
            const { code, msg } = res;
            if (code === 200) {
                NoTokenNeedLogin.LoginBackTo(
                    '/pages/login/passwordLogin/index'
                );
            } else {
                MyToast.show({ title: msg });
            }
        });
    }
    return (
        <View className="login_h5" style={`height:${HasCustomTabHeight}px`}>
            <MSbmit
                onClick={submitHandler}
                className={submitClass}
                btnText="提交注册"
            >
                <PhoneNumberInput
                    ref={phoneNumberRef}
                    phoneNumberHandler={[phoneNumber, setPhoneNumber]}
                ></PhoneNumberInput>
                <VCodeInput
                    ref={vCodeRef}
                    VCodeHandler={[vCode, setVCode]}
                    phoneNumber={phoneNumber}
                    vType="1"
                ></VCodeInput>
                <PasswordInput
                    ref={passwordRef}
                    passwordHandler={[password, setPassword]}
                ></PasswordInput>
            </MSbmit>
            <AgreementBar currentEnter="注册"></AgreementBar>
        </View>
    );
}

export default Register;
