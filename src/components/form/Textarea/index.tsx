// 上传佐证组件代码
import React, { useState, useEffect, useRef } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';

import { View, Textarea } from '@tarojs/components';

import './index.scss';

interface InterfaceRule {
    require: boolean; //是否必填
    message?: string; //提示信息
    pattern?: RegExp; //校验规则
}

interface InterfaceProps {
    rule?: InterfaceRule;
    [key: string]: any;
}

export default props => {
    const key = useRef<number>();

    const {
        value = '',
        name,
        title,
        direction = 'horizontal',
        maxLength = -1,
        style = {},
        placeholder = '请输入',
        rule,
        onInput,
        onBlur,
        onError
    }: InterfaceProps = props;
    const [showValue, setShowValue] = useState('');
    const [isIOS, setIsIOS] = useState(false);

    useDidShow(() => {
        key.current = Math.random();
        setShowValue(value);

        if (process.env.TARO_ENV !== 'h5') {
            var phone = Taro.getSystemInfoSync(); //调用方法获取机型
            setIsIOS(phone.platform === 'ios');
        }
    });

    useEffect(() => {
        setShowValue(value);
        if (process.env.TARO_ENV !== 'h5') {
            var phone = Taro.getSystemInfoSync(); //调用方法获取机型
            setIsIOS(phone.platform === 'ios');
        }
    }, [value]);

    // const debounceSetText = e => {
    //     const inputValue = e.target.value;
    //     if (rule?.require && inputValue === '') {
    //         MyToast.show(rule?.message || `请输入${title}`);
    //     }
    //     if (rule?.pattern) {
    //         var regRule = new RegExp(rule?.pattern);
    //         if (!regRule.test(inputValue)) {
    //             MyToast.show(`请输入正确的${title}`);
    //         }
    //     }
    // };

    // const { run } = useDebounce(debounceSetText, 1000);

    return (
        <View
            key={key.current}
            className={`formTextarea  ${direction}Form`}
            style={style}
        >
            <View className="s_form_title">{title}</View>
            <View
                className={`s_form_text ${
                    direction === 'horizontal' && 'textRightArrow'
                }`}
            >
                <Textarea
                    {...props}
                    value={showValue}
                    maxlength={maxLength}
                    placeholder={placeholder}
                    onInput={e => {
                        onInput && onInput(e.target?.value);
                    }}
                    onBlur={e => {
                        const inputValue = e.target?.value;
                        onBlur && onBlur(inputValue);
                        if (rule?.require && inputValue === '') {
                            Taro.showToast({
                                title: rule?.message || `请输入${title}`,
                                icon: 'none'
                            });
                            onError && onError();
                        }
                        if (rule?.pattern) {
                            var regRule = new RegExp(rule?.pattern);
                            if (!regRule.test(inputValue)) {
                                Taro.showToast({
                                    title: `请输入正确的${title}`,
                                    icon: 'none'
                                });
                                onError && onError();
                            }
                        }
                    }}
                    name={name}
                    className={`s_form_textarea listTextEllipsis ${
                        isIOS && 'iosTextArea'
                    }`}
                ></Textarea>
            </View>
        </View>
    );
};
