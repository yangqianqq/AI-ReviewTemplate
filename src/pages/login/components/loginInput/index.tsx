import React, { useEffect, useRef, useState, forwardRef } from 'react';
import MInput from '@/components/mInput';
import {
    PHONE_NUMBER_REG,
    PHONE_NUMBER_REG_TEXT,
    PASSWORD_REG,
    PASSWORD_REG_TEXT
} from '@/pages/login/constants/reg';
import Request from '@/src/pages/login/common/api/index';
import { LoginCommonResult } from '@/src/pages/login/types/index';

/**
 * @export
 * @description 电话号码输入框
 * @param {*} { phoneNumberHandler }
 * @return {*}
 */
function Phone_Number_Input({ phoneNumberHandler }, ref) {
    const [phoneNumber, setPhoneNumber] = phoneNumberHandler;
    const [phoneDeleteIcon, setPhoneDeleteIcon] = useState<string>('');
    // const phoneInput = useRef(null);

    // 手机号码快捷删除键show/hide
    useEffect(() => {
        !!phoneNumber &&
            setPhoneDeleteIcon(`${IMG_COMMON_URL}phone_delete.png`);
        !phoneNumber && setPhoneDeleteIcon('');
    }, [phoneNumber]);

    function phoneInputHandler(e) {
        const { value } = e.detail;
        setPhoneNumber(value);
    }

    return (
        <MInput
            ref={ref}
            className="login_input"
            name="phone"
            type="number"
            placeholder="请输入手机号"
            value={phoneNumber}
            onInput={phoneInputHandler}
            toVerify
            verifytxt={PHONE_NUMBER_REG_TEXT}
            verifyReg={PHONE_NUMBER_REG}
            beforeIconUrl={`${IMG_COMMON_URL}phone_number_img.png`}
            afterIconUrl={phoneDeleteIcon}
            afterIconHandler={() => setPhoneNumber('')}
            clearFa={() => setPhoneNumber('')}
        ></MInput>
    );
}

export const PhoneNumberInput = forwardRef(Phone_Number_Input);

/**
 * @export
 * @description 密码输入框
 * @param {*} { passwordHandler }
 * @return {*}
 */
function Password_Input({ passwordHandler }, ref) {
    const [password, setPassword] = passwordHandler;
    const [passwordToSee, setPasswordToSee] = useState<boolean>(false);

    function passwordInputHandler(e) {
        const { value } = e.detail;
        setPassword(value);
    }

    function toChagePasswordSee() {
        setPasswordToSee(!passwordToSee);
    }
    return (
        <MInput
            ref={ref}
            className="login_input"
            name="password"
            type="text"
            password={!passwordToSee}
            placeholder="请输入密码"
            value={password}
            onInput={passwordInputHandler}
            toVerify
            verifytxt={PASSWORD_REG_TEXT}
            verifyReg={PASSWORD_REG}
            beforeIconUrl={`${IMG_COMMON_URL}password_img.png`}
            afterIconUrl={
                passwordToSee
                    ? `${IMG_COMMON_URL}password_show.png`
                    : `${IMG_COMMON_URL}password_hidden.png`
            }
            afterIconHandler={toChagePasswordSee}
            clearFa={() => setPassword('')}
        ></MInput>
    );
}

export const PasswordInput = forwardRef(Password_Input);

/**
 * @export
 * @description 验证码输入框
 * @param {*} { VCodeHandler, phoneNumber, vType }
 * @return {*}
 */
function V_Code_Input(
    { VCodeHandler, phoneNumber, vType, hasGetVCode = false },
    ref
) {
    const [vCode, setVCode] = VCodeHandler;

    function vCodeInputHandler(e) {
        const { value } = e.detail;
        setVCode(value);
    }

    function toGetVCodeHandler() {
        return Request.getVerifyCode<LoginCommonResult>({
            phoneNumber,
            vType
        });
    }

    return (
        <MInput
            ref={ref}
            className="login_input"
            name="code"
            type="text"
            placeholder="请输入验证码"
            value={vCode}
            onInput={vCodeInputHandler}
            beforeIconUrl={`${IMG_COMMON_URL}verify_code.png`}
            vCodebtn={toGetVCodeHandler}
            clearFa={() => setVCode('')}
            hasGetVCode={!!hasGetVCode}
        ></MInput>
    );
}

export const VCodeInput = forwardRef(V_Code_Input);

/**
 * @export
 * @description 确认密码输入框
 * @param {*} { PasswordConfirmHandler }
 * @return {*}
 */
function Password_Confirm_Input({ PasswordConfirmHandler }, ref) {
    const [confirmPassword, setConfirmPassword] = PasswordConfirmHandler;
    const [confirmPasswordToSee, setConfirmPasswordToSee] =
        useState<boolean>(false);

    function confirmPasswordInputHandler(e) {
        const { value } = e.detail;
        setConfirmPassword(value);
    }

    function toChageconfirmPasswordSee() {
        setConfirmPasswordToSee(!confirmPasswordToSee);
    }

    return (
        <MInput
            ref={ref}
            className="login_input"
            name="confirm_password"
            type="text"
            password={!confirmPasswordToSee}
            placeholder="请再次确认密码"
            value={confirmPassword}
            onInput={confirmPasswordInputHandler}
            toVerify
            verifytxt={PASSWORD_REG_TEXT}
            verifyReg={PASSWORD_REG}
            beforeIconUrl={`${IMG_COMMON_URL}password_img.png`}
            afterIconUrl={
                confirmPasswordToSee
                    ? `${IMG_COMMON_URL}password_show.png`
                    : `${IMG_COMMON_URL}password_hidden.png`
            }
            afterIconHandler={toChageconfirmPasswordSee}
            clearFa={() => setConfirmPassword('')}
        ></MInput>
    );
}

export const PasswordConfirmInput = forwardRef(Password_Confirm_Input);
