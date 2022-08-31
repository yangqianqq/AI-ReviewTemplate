import React, { useState, useRef, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro, { usePageScroll, pageScrollTo, pxTransform } from '@tarojs/taro';
import './index.scss';

interface fixedConfig {
    fixedMode: 'top' | 'bottom' | 'topBelow'; //top直接固定在顶部 bottom固定在底部 topBelow顶部已经有固定的需要固定在他下边
    fixedTop?: number; //当topBelow 设置固定的top值
    children?: any;
    style?: any;
    current?: number;
    tabList: any[];
    onTabClick: (index: any) => void;
}

interface elInfo {
    bottom: number;
    dataset: {};
    height: number;
    id: '';
    left: number;
    right: number;
    top: number;
    width: number;
}

// fixed方式  1直接固定在顶部 2顶部已经有固定的需要固定在他下边 3.固定在底部

const selectorQueryClientRect = (selector: string) =>
    new Promise(resolve => {
        const query = Taro.createSelectorQuery();
        query
            .select(selector)
            .boundingClientRect(res => {
                resolve(res);
            })
            .exec();
    });

function Index(props: fixedConfig) {
    const {
        fixedMode,
        fixedTop = 0,
        tabList,
        current,
        onTabClick,
        style = {}
    } = props;

    const swichTab = useRef();
    const [fixed, setfixed] = useState(false);
    const [scrollTabEl, setScrollTabEl] = useState<elInfo>({} as elInfo);
    const [clientHeight, setClientHeight] = useState(0);

    useEffect(() => {
        setClientHeight(document.documentElement.clientHeight);

        Taro.nextTick(async () => {
            const res: any = await selectorQueryClientRect('.scrollTab');
            setScrollTabEl(res);
        });
    }, []);

    usePageScroll(e => {
        let topPx =
            fixedMode === 'topBelow'
                ? scrollTabEl.top - fixedTop
                : scrollTabEl.top; //当topBelow 应减去固定的top值
        if ((!fixed && e.scrollTop > topPx) || (fixed && e.scrollTop < topPx)) {
            setfixed(!fixed);
        }
    });

    console.log(current);
    return (
        <View className="topFixed">
            <View
                className={`normalTab ${fixed && 'fixedTab'}`}
                style={{
                    top: fixedMode === 'topBelow' ? `${fixedTop}px` : '0px'
                }}
            >
                <View className="scrollTab" style={{ ...style }}>
                    {tabList.map((i, index) => (
                        <View
                            key={index}
                            onClick={() => {
                                fixed &&
                                    pageScrollTo({
                                        scrollTop: scrollTabEl.top,
                                        duration: 0
                                    });
                                onTabClick(index);
                            }}
                            className={`nameList ${
                                current === index && 'activeTabItem'
                            }`}
                        >
                            {i}
                            <View className="bottomLine"></View>
                        </View>
                    ))}
                </View>
            </View>

            <View ref={swichTab}>
                {/* 当scrollTab 设置为fixed时用来占位的 */}
                {fixed && (
                    <View
                        className="fixedAfter"
                        style={{ height: scrollTabEl.height }}
                    ></View>
                )}

                <View
                    className="tabContent"
                    style={{
                        minHeight: `${
                            fixedMode === 'topBelow'
                                ? clientHeight - scrollTabEl.height
                                : clientHeight - scrollTabEl.height - fixedTop
                        }px`
                    }}
                >
                    {props.children}
                </View>
            </View>
        </View>
    );
}

export default Index;
