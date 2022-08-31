/*
 * @Version:
 * @Author: 杨倩
 * @Date: 2021-12-07 10:28:21
 * @LastEditors: 杨倩
 * @LastEditTime: 2021-12-09 15:48:17
 */
// 上传佐证组件代码
import React, { useState, useEffect, useRef } from 'react';
import { useDidHide } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
// import useDebounce from '@/src/hooks/useDebounce';

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
    const inputCurrent: any = useRef();
    const {
        value = '',
        name,
        title,
        type = 'text',
        direction = 'horizontal',
        maxLength = false,
        style = {},
        placeholder,
        rule,
        onInput,
        onClick,
        onError
    }: InterfaceProps = props;

    const [showValue, setShowValue] = useState(value);

    useDidHide(() => {
        setShowValue('');
    });

    useEffect(() => {
        setShowValue(value);
    }, [value]);

    const onInputFun = e => {
        if (type === 'number' || type === 'phone') {
            var val = e.target?.value?.replace(/[^0-9]/gi, '');
            onInput && onInput(val);
        }
        onInput && onInput(e.target?.value);
    };

    console.log('showValue', showValue);

    return (
        <View className={`formInput  ${direction}Form`} style={style}>
            <View className="s_form_title">{title}</View>
            <Input
                {...props}
                type={type === 'phone' ? 'text' : type}
                value={showValue}
                ref={inputCurrent}
                maxlength={maxLength}
                placeholder={placeholder || `请输入${title}`}
                onInput={onInputFun}
                onBlur={e => {
                    const inputValue = e.detail?.value;

                    if (rule?.require && inputValue === '') {
                        Taro.showToast({
                            title: rule?.message || `请输入${title}`,
                            icon: 'none'
                        });
                        onError && onError();
                    }
                    if (rule?.pattern) {
                        var regRule = new RegExp(rule?.pattern);
                        if (!regRule.test(inputValue.trim())) {
                            Taro.showToast({
                                title: `请输入正确的${title}`,
                                icon: 'none'
                            });
                            onError && onError();
                        }
                    }
                }}
                name={name}
                className={`s_form_input ${
                    direction === 'horizontal' && 'textRightArrow'
                }`}
            ></Input>
        </View>
    );
};
