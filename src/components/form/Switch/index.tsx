/*
 * @Version:
 * @Author: 杨倩
 * @Date: 2021-05-14 14:19:06
 * @LastEditors: 杨倩
 * @LastEditTime: 2021-12-09 16:24:51
 */
// 上传佐证组件代码
import React, { useState } from 'react';
import { useDidShow } from '@tarojs/taro';
import { View, Switch } from '@tarojs/components';

import './index.scss';

export default ({
    value = false,
    name,
    style = {},
    title,
    direction = 'horizontal'
}) => {
    const [showKey, setShowKey] = useState(Math.random());

    useDidShow(() => {
        setShowKey(Math.random());
    });

    return (
        <View
            className={`formSwitch  ${direction}Form`}
            key={showKey}
            style={style}
        >
            <View className="s_form_title">{title}</View>
            <View className="s_form_text">
                <Switch
                    checked={value}
                    name={name}
                    className="s_form_switch"
                ></Switch>
            </View>
        </View>
    );
};
