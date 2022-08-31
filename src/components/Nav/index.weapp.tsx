/*
 * @Author: 姜通
 * @Date: 2021-08-18 11:59:40
 * @LastEditTime: 2021-11-15 16:27:20
 * @Description:
 * @FilePath: /kechuanyun/src/components/Nav/index.weapp.tsx
 */
import React, { useState, useEffect } from 'react';
import Taro, {
    getStorageSync,
    getCurrentInstance,
    setStorageSync,
    onAppShow,
    onAppHide
} from '@tarojs/taro';
import { AsyncGetUserInfo } from '@/store/userInfo';
import { useDispatch } from 'react-redux';
import store from '@/store/index';
import { doWithLogin } from '@/common/js/LoginPerModule';

import './index.scss';

export default function Nav({ child }) {
    const dispatch = useDispatch();
    const [pageShow, setPageShow] = useState(false);

    useEffect(() => {
        if (pageShow) {
            // 如果登录过就获取下信息 权限等
            const permissions = store.getState()?.permissions?.data ?? null;
            const vipCount: any = store.getState()?.vipDisplay?.data ?? null;
            const query: any = getCurrentInstance().router?.params;

            const getAllUrl = () => {
                let useUrl = getCurrentInstance().router?.path;
                Object.keys(query).forEach((i, index) => {
                    useUrl =
                        i !== '$taroTimestamp'
                            ? `${useUrl}${index === 0 ? '?' : '&'}${i}=${
                                  query[i]
                              }`
                            : useUrl;
                });
                return useUrl;
            };

            if (query?.empUserId) {
                Taro.clearStorage();
                setStorageSync('loginBack', getAllUrl());
                setStorageSync('empUserId', query?.empUserId);
                doWithLogin(() => {}, getAllUrl() || '');
            }
            if (getStorageSync('uniqueToken')) {
                if (!(permissions && vipCount)) {
                    dispatch(AsyncGetUserInfo());
                }
            }
        }
    }, [pageShow]);

    onAppHide(() => {
        setPageShow(false);
    });
    onAppShow(() => {
        setTimeout(() => {
            setPageShow(true);
        }, 100);
    });
    return child;
}
