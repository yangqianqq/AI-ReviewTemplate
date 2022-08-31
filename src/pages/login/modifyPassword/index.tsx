import React, { useState, useRef, useEffect } from 'react';
import { View } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
// 自定义组件
import MyToast from '@/utils/Mtoast';
import MSbmit from '@/components/mSubmit';
//获取用户信息
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/index';
// 自定义方法
import NoTokenNeedLogin from '@/utils/loginBack/index';
// login公共
import {
    PhoneNumberInput,
    PasswordInput,
    VCodeInput,
    PasswordConfirmInput
} from '@/pages/login/components/loginInput';
import Request from '@/src/pages/login/common/api/index';
import { LoginCommonResult } from '@/src/pages/login/types/index';
import '@/pages/login/common/assets/css/index.scss';

function ModifyPassword() {
    const getInfo: any = useSelector((state: RootState) => {
        return state.userinfo.userinfo;
    });
    const [phoneNumber, setPhoneNumber] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [confirmPassword, setConfirmPassword] = useState<any>('');
    const [vCode, setVCode] = useState<string>('');
    const [submitClass, setSubmitClass] = useState<string>('login_submit');

    // todo useRef获取对应元素
    const phoneNumberRef = useRef<any>(null);
    const vCodeRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const confirmPasswordRef = useRef<any>(null);

    // 填充表单更改submit-button的样式
    useEffect(() => {
        !!phoneNumber &&
            !!password &&
            !!vCode &&
            !!confirmPassword &&
            setSubmitClass('login_submit_active');
        (!phoneNumber || !password || !vCode || !confirmPassword) &&
            setSubmitClass('login_submit');
    }, [phoneNumber, password, vCode, confirmPassword]);

    function submitHandler() {
        const key = NoTokenNeedLogin.requestKey || 'toForgetPassword';
        Request[key]<LoginCommonResult>({
            phoneNumber,
            vCode,
            newPassword: password,
            confirmPassword
        }).then(res => {
            const { code, msg } = res;
            if (code === 200) {
                NoTokenNeedLogin.LoginBackTo('/pages/login/quickLogin/index');
            } else {
                MyToast.show({ title: msg });
            }
        });
    }

    useDidShow(() => {
        if (getInfo?.user?.phoneNumber) {
            setPhoneNumber(getInfo?.user?.phoneNumber);
        }
    });

    useEffect(() => {
        return () => {
            NoTokenNeedLogin.initData();
        };
    }, []);

    return (
        <View className="login_h5">
            <MSbmit
                onClick={submitHandler}
                className={submitClass}
                btnText="提交"
            >
                <PhoneNumberInput
                    ref={phoneNumberRef}
                    phoneNumberHandler={[phoneNumber, setPhoneNumber]}
                ></PhoneNumberInput>
                <VCodeInput
                    ref={vCodeRef}
                    VCodeHandler={[vCode, setVCode]}
                    phoneNumber={phoneNumber}
                    vType="2"
                ></VCodeInput>
                <PasswordInput
                    ref={passwordRef}
                    passwordHandler={[password, setPassword]}
                ></PasswordInput>
                <PasswordConfirmInput
                    ref={confirmPasswordRef}
                    PasswordConfirmHandler={[
                        confirmPassword,
                        setConfirmPassword
                    ]}
                ></PasswordConfirmInput>
            </MSbmit>
        </View>
    );
}

export default ModifyPassword;
