/*
 * @Version:
 * @Author: 杨倩
 * @Date: 2021-12-08 17:57:38
 * @LastEditors: 杨倩
 * @LastEditTime: 2021-12-28 16:37:45
 */
import React, { useState } from 'react';

import { WebView } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';

import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro';

function Index() {
    const [loading, setLoading] = useState(true);
    const [route, setRoute] = useState('');

    useDidShow(() => {
        const { path, linkparams } = getCurrentInstance().router?.params || {
            path: null,
            linkparams: ''
        };

        !!path &&
            setRoute(
                `${path}${
                    linkparams ? `?${linkParamsToUrlSearch(linkparams)}` : ''
                }`
            );
    });

    /**
     * @function
     * @description 自定义外部链接参数规则转换
     * @param {string} linkParams 接受到的外部链接参数的字符串
     * @return {string} 正常的外部链接参数字符串
     */
    function linkParamsToUrlSearch(linkParams) {
        let initUrl = linkParams.replace(/-@-/gi, '=').replace(/-#-/gi, '&');
        const token = Taro.getStorageSync('uniqueToken');
        if (initUrl.indexOf('token') < 0) {
            initUrl = `${initUrl}&token=${token}`;
        }
        return initUrl;
    }

    return (
        <WebView
            src={route}
            onLoad={() => {
                setLoading(false);
            }}
            onError={() => {
                setLoading(false);
            }}
        >
            <AtActivityIndicator
                mode="center"
                isOpened={loading}
            ></AtActivityIndicator>
        </WebView>
    );
}

export default Index;
