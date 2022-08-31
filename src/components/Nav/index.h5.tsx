/* eslint-disable react/forbid-elements */
/*
 * @Author: 姜通
 * @Date: 2021-09-01 17:24:14
 * @LastEditTime: 2021-12-31 14:56:25
 * @Description:
 * @FilePath: /kechuanyun/src/components/Nav/index.h5.tsx
 */
import React, { useEffect, useState } from 'react';
import Taro, {
    setStorageSync,
    removeStorageSync,
    getCurrentInstance,
    getStorageSync
} from '@tarojs/taro';

import { View, Image } from '@tarojs/components';
import { AsyncGetUserInfo } from '@/store/userInfo';
import { useDispatch } from 'react-redux';
import store from '@/store/index';
import { Helmet } from 'react-helmet';

import './index.scss';

export default function Nav({ child }) {
    const { router } = getCurrentInstance();

    const [title, setTitle] = useState('');
    const [hash, setHash] = useState(window.location.hash);

    const dispatch = useDispatch();

    // app中这些不需要
    const exactRouterWithApp = () => {
        return (
            hash.indexOf('pages/serveDeatils') < 0 ||
            hash.indexOf('pages/collect') < 0
        );
    };

    // app内嵌h5，不需要h5导航Nav的页面
    const appWithOuterNavLinkList = [
        'pages/shoppingCart/subpages/confirmOrder/index',
        'pages/info/mainBody/index',
        'pages/info/mainBody/AddOrEdit',
        'pages/info/mainBody/subpages/entSearch/index',
        'pages/knowledgeEquityPavilion/checkFile/index'
    ];

    // 判断当前app内嵌页面是否需要导航
    function hasNavInApp() {
        if (window.webkit?.messageHandlers || window.JSInterface)
            return !appWithOuterNavLinkList.some(it => hash.includes(it));
        return true;
    }

    useEffect(() => {
        setHash(window.location.hash);
        let useHash = window.location.hash;
        if (useHash.indexOf('?') > 0) {
            let hashArr = useHash.split('?');
            const searchParams = new URLSearchParams(hashArr[1]);

            // 主要是为了商品详情的事情
            if (exactRouterWithApp()) {
                if (
                    searchParams.get('token') &&
                    (searchParams.get('system') === '1' ||
                        searchParams.get('system') === 'app')
                ) {
                    if (searchParams.get('token') !== 'null') {
                        setStorageSync(
                            'uniqueToken',
                            searchParams.get('token')
                        );
                    } else {
                        removeStorageSync('uniqueToken');
                    }
                }
            }
        }
    }, [window.location.hash]);

    useEffect(() => {
        // 主要是为了商品详情的事情

        // if (
        //     process.env.TARO_ENV === 'h5' &&
        //     (window.location.href?.indexOf('laissezPasser') > -1 ||
        //         getStorageSync('laissezPasser') !== undefined)
        // ) {
        //     let zjtx = {
        //         title: '黑马企服专精特新评测',
        //         content:
        //             '黑马企服专精特新评测是一款面向中小微企业的智能评测工具，助力企业快速定位申请“专精特新”的条件。',
        //         icon: 'https://static-files.heimaqf.cn/zjtx_share.png'
        //     };
        //     let gqcp = {
        //         title: '黑马企服高新技术认定评测',
        //         content:
        //             '黑马企服高新技术认定评测，可快速定位、分析和了解成为高新技术所满足和欠缺的条件。',
        //         icon: 'https://static-files.heimaqf.cn/gaoqipingce_share.png'
        //     };
        //     // @ts-ignore
        //     window?.h5sdk?.biz?.util?.share({
        //         url: window.location.href,
        //         title: hash.indexOf('companyEvaluating')
        //             ? gqcp.title
        //             : zjtx.title,
        //         image: hash.indexOf('companyEvaluating')
        //             ? gqcp.icon
        //             : zjtx.icon,
        //         content: hash.indexOf('companyEvaluating')
        //             ? gqcp.content
        //             : zjtx.content,
        //         onSuccess: function (result) {
        //             console.log(result);
        //         }
        //     });
        // }

        if (exactRouterWithApp()) {
            // app内嵌的情况下
            const linkToken = window.location.href.includes('token=null');

            // 如果登录过就获取下信息 权限等
            if (getStorageSync('uniqueToken') && !linkToken) {
                const permissions = store.getState()?.permissions?.data ?? null;
                const vipCount: any =
                    store.getState()?.vipDisplay?.data ?? null;

                if (!(permissions && vipCount)) {
                    dispatch(AsyncGetUserInfo());
                }
            }
        }
    }, []);

    // useEffect(() => {
    //     setTitle(document.title);
    // }, [document.title]);

    // 修复title不能准确更新
    useEffect(() => {
        document
            .querySelector('title')
            ?.addEventListener('DOMNodeInserted', e => {
                const target: any = e.target;
                setTitle(target.data);
            });
    }, []);

    const getMate = () => {
        let hashArr = hash.split('?');
        const searchParams = new URLSearchParams(hashArr[1]);

        // @ts-ignore
        let zjtx = {
            url: `${WEB_URL}/#/pages/itools/specialization/reports?recordId=${searchParams.get(
                'recordId'
            )}`,
            title: '黑马企服专精特新评测',
            content:
                '黑马企服专精特新评测是一款面向中小微企业的智能评测工具，助力企业快速定位申请“专精特新”的条件。',
            icon: 'https://static-files.heimaqf.cn/zjtx_share.png?q=baesasdf'
        };
        let gqcp = {
            url: `${WEB_URL}/#/pages/companyEvaluating/reports/index?recordId=${searchParams.get(
                'recordId'
            )}`,
            title: '黑马企服高新技术认定评测',
            content:
                '黑马企服高新技术认定评测，可快速定位、分析和了解成为高新技术所满足和欠缺的条件。',
            icon: 'https://static-files.heimaqf.cn/gaoqipingce_share.png?q=baesasdf'
        };

        let normal = {
            title: document?.title,
            content: '',
            icon: 'https://test.kechuangyun.com/ico.ico'
        };
        return hash.indexOf('laissezPasser=1') > -1 ? (
            <Helmet>
                <title>
                    {hash.indexOf('companyEvaluating') > -1
                        ? gqcp.title
                        : zjtx.title}
                </title>
                <meta
                    name="description"
                    charSet="utf-8"
                    content={
                        hash.indexOf('companyEvaluating') > -1
                            ? gqcp.content
                            : zjtx.content
                    }
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={
                        hash.indexOf('companyEvaluating') > -1
                            ? gqcp.icon
                            : zjtx.icon
                    }
                />
            </Helmet>
        ) : (
            <Helmet>
                <title>{normal.title}</title>
                <meta
                    name="description"
                    charSet="utf-8"
                    content={normal.content}
                />
                <link rel="icon" href={normal.icon} />
            </Helmet>
        );
    };
    console.log('hash', hash);
    return (
        <View>
            {getMate()}
            {!(
                Taro.getStorageSync('laissezPasser') === '1' ||
                hash.indexOf('laissezPasser=1') > -1 ||
                hash.indexOf('pages/personInfo/index') > -1 ||
                hash.indexOf('pages/shopping/index') > -1 ||
                hash.indexOf('pages/externalPage/index') > -1 ||
                hash.indexOf('pages/search/index') > -1 ||
                hash.indexOf('activity/index') > -1 ||
                hash.indexOf('subpages/batchRenewal/index') > -1 ||
                hash.indexOf('pages/typeSearch/index') > -1 ||
                hash.indexOf('pages/serveDeatils/index') > -1 ||
                hash.indexOf('pages/officialdoc/filePreview') > -1 ||
                hash.indexOf('pages/index/index') > -1 ||
                hash.indexOf('pages/activepage') > -1 ||
                hash.indexOf('system=1') > -1 ||
                hash.indexOf('pages/knowledge/index') > -1 ||
                hash.indexOf('pages/collect') > -1 ||
                hash.indexOf('pages/collect/detail') > -1 ||
                hash.indexOf('pages/intellectualProperty') > -1 ||
                hash.indexOf('noNav') > -1 ||
                hash.indexOf('activity/index') > -1 ||
                (hash.indexOf('/policyMatching/matchDetail') > -1 &&
                    hash.indexOf('system') > -1) ||
                (hash.indexOf('/itools/specializationnew/reports') > -1 &&
                    hash.indexOf('system=1') > -1) || //ios
                (hash.indexOf('/itools/specializationnew') > -1 &&
                    hash.indexOf('system=weapp') > -1) || //ios
                hash.indexOf('empUserId') > -1 ||
                hash.indexOf('/pages/shoppingCartTab/index') > -1
            ) &&
                hasNavInApp() &&
                !window.WeixinJSBridge && (
                    <View className="nav_wrapper">
                        <View className="item_wrap">
                            <Image
                                onClick={() => {
                                    Taro.navigateBack({});
                                }}
                                className="back_img_wrapper"
                                src={IMG_COMMON_URL + 'back.svg'}
                            ></Image>
                        </View>
                        <View className="item_wrap" style={{ flex: 'auto' }}>
                            <View className="nav_title">{title}</View>
                        </View>
                        <View className="item_wrap"></View>
                    </View>
                )}
            {child}
        </View>
    );
}
