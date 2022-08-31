/*
 * @Author: 姜通
 * @Date: 2021-11-02 14:35:47
 * @LastEditTime: 2021-11-02 14:37:15
 * @Description:
 * @FilePath: /kechuanyun/src/components/LazyLoading/index.tsx
 */
//@ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { View } from '@tarojs/components';
import 'intersection-observer'; // 兼容处理
import './index.scss';

export default React.memo((props: any) => {
    const [current, setCurrent] = useState<number>(0);
    const [cls, setCls] = useState<string>('lazy-loading');

    const IO = useRef<IntersectionObserver>();
    const prvDom = useRef<Element>();

    useEffect(() => {
        // 创建监听器
        IO.current = new IntersectionObserver(
            (e: IntersectionObserverEntry[]) => {
                if (e[e.length - 1].isIntersecting) {
                    setCurrent(v => v + 1);
                }
            },
            { rootMargin: '0px 0px 0px 0px' }
        );
        // 修改组件className
        const { className } = props;
        !!className && setCls(`lazy-loading ${className}`);
    }, []);

    useEffect(() => {
        // 监听目标元素，解除对前一元素的监听
        const target = document.querySelector(
            `.lazy-loading-child-${current}`
        ) as HTMLElement;
        if (target) IO.current.observe(target);
        if (prvDom.current) IO.current.unobserve(prvDom.current);
        // prvDom.current = target;
        // if (target && target.getBoundingClientRect().top < 0)
        //     setTimeout(() => {
        //     setCurrent(current + 1);
        //     window.console.log('timeout');
        // }, 500);
    }, [current]);

    // 页面卸载时，停止监听器并清空ref
    useEffect(
        () => () => {
            IO.current.disconnect();
            IO.current = null;
            prvDom.current = null;
        },
        []
    );

    return (
        <View className={cls}>
            {React.Children.map(
                props.children.slice(0, current + 1),
                (child, index) => (
                    <View className={`lazy-loading-child-${index}`}>
                        {child}
                    </View>
                )
            )}
            {/* {props.children.slice(current + 1).map((_, index) => (
                <div key={`wait_loading_${index}`} className="loading3">
                    <div className="circle circle1">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="circle circle2">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="circle circle3">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            ))} */}
        </View>
    );
});
