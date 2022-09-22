import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Image,
    ScrollView,
    Swiper,
    SwiperItem
} from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import classnames from 'classnames';
import Taro, {
    useReady,
    useDidShow,
    getCurrentInstance,
    pageScrollTo,
    navigateTo
} from '@tarojs/taro';

import './index.scss';

let empty = 'https://static-files.heimaqf.cn/empty.png';
const init = {
    type: 0,
    price: 1,
    title: '个人检讨',
    desc: '这是一段介绍',
    author: '杨倩',
    recommend: Math.round(Math.random() * 3) === 0
};
const newArr0 = new Array(10).fill(init);
const newArr1 = new Array(20).fill(init);
function Index() {
    const [height, setHeight] = useState(543);
    const [activeTab, setActiveTab] = useState(0);
    //type:0官方1个人，price:"价格",title:"",desc,author:""
    const [productList, setProductList] = useState({
        0: newArr0,
        1: newArr1
    });

    let [status, setStatus] = useState<'more' | 'loading' | 'noMore'>('more'); //加载条

    // 对应 onShow
    useDidShow(() => {
        Taro.getSystemInfo({
            success: (res: any) => {
                setHeight(res.windowHeight);
            }
        });
    });

    // 下拉刷新
    const handleMore = () => {
        setStatus('loading');

        setTimeout(() => {
            const newArr = new Array(10).fill(init);
            setStatus('more');
            setProductList({
                ...productList,
                [activeTab]: [...productList[activeTab], ...newArr]
            });
        }, 2000);
    };

    return (
        <ScrollView
            className="shopping"
            scrollY
            style={`height:${height}px`}
            scrollTop={0}
            lowerThreshold={200}
            onScrollToLower={() => {
                handleMore();
            }}
        >
            <Swiper
                className="shoppingAD"
                indicatorColor="#fff"
                indicatorActiveColor="#e02021"
                circular
                indicatorDots
                autoplay
            >
                <SwiperItem>
                    <Image
                        src="https://storage.heimaqf.cn/kechuangyun/image/2022/1/h5_%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%A4%B4%E5%9B%BE@2x_05c544a28f33476e9cacba9952a61ed5.png"
                        className="imgSwiper"
                    ></Image>
                </SwiperItem>
                <SwiperItem>
                    <Image
                        className="imgSwiper"
                        src="https://storage.heimaqf.cn/kechuangyun/image/2022/1/h5_%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%A4%B4%E5%9B%BE@2x_05c544a28f33476e9cacba9952a61ed5.png"
                    ></Image>
                </SwiperItem>
                <SwiperItem>
                    <Image
                        className="imgSwiper"
                        src="https://storage.heimaqf.cn/kechuangyun/image/2022/1/h5_%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%A4%B4%E5%9B%BE@2x_05c544a28f33476e9cacba9952a61ed5.png"
                    ></Image>
                </SwiperItem>
            </Swiper>

            <View className="productListOut">
                <View className="tabList">
                    <View
                        onClick={() => {
                            setActiveTab(0);
                            pageScrollTo({
                                scrollTop: 0,
                                duration: 100
                            });
                        }}
                        className={classnames({
                            tabItem: true,
                            active: activeTab === 0
                        })}
                    >
                        免费
                    </View>
                    <View
                        onClick={() => {
                            setActiveTab(1);
                            pageScrollTo({
                                scrollTop: 0,
                                duration: 100
                            });
                        }}
                        className={classnames({
                            tabItem: true,
                            active: activeTab === 1
                        })}
                    >
                        付费
                    </View>

                    <Image
                        className="searchBtn"
                        onClick={() => {
                            navigateTo({ url: '/pages/search/index' });
                        }}
                        src="https://static-files.heimaqf.cn/search-icon.png"
                    ></Image>
                </View>
                <View className="productList">
                    {productList[activeTab].length !== 0 ? (
                        productList[activeTab].map((i, index) => {
                            return (
                                <View className="productItem">
                                    {i.recommend || index < 3 ? (
                                        <View className="productTag">
                                            <Image
                                                src="https://kechuangyun-static-1304630716.cos.ap-beijing.myqcloud.com/kechuangyun/specializationnew/condition.png"
                                                className="productTagBg"
                                            ></Image>
                                            <View className="productTagTip">
                                                HOT
                                            </View>
                                        </View>
                                    ) : (
                                        ''
                                    )}
                                    <View className="productItemTitle">
                                        {i.title}
                                    </View>
                                    <View className="productItemDesc">
                                        {i.desc}
                                    </View>

                                    <View className="productItemBottom">
                                        <View className="productBottomTip">
                                            <View className="productBottomTitle">
                                                来源:
                                            </View>
                                            {i.author}
                                        </View>
                                        <View className="productBottomTip">
                                            <View className="productBottomTitle">
                                                价格:
                                            </View>
                                            {i.price > 0
                                                ? `${i.price}币`
                                                : '免费'}
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <View className="empty">
                            <Image className="img" src={empty} />
                            <View>抱歉，暂时没有相关的商品</View>
                        </View>
                    )}
                    {/* 列表状态 */}
                    {productList && (
                        <AtLoadMore className="loadTip" status={status} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

export default Index;
