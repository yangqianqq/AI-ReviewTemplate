/*
 * @Version:
 * @Author: 杨倩
 * @Date: 2021-12-23 15:13:01
 * @LastEditors: 杨倩
 * @LastEditTime: 2021-12-23 15:26:12
 */
import React from 'react';
import { View, Navigator } from '@tarojs/components';

export default function AgreementBar(props) {
    return (
        <View className="agreement_at_bottom at_bottom">
            {props.currentEnter}代表同意黑马企服
            <View className="agreement_enter">
                <Navigator
                    className="agreement_enter"
                    url="/pages/externalPage/index?path=https://static-files.heimaqf.cn/index.html"
                >
                    《用户服务协议》
                </Navigator>
                <Navigator
                    className="agreement_enter"
                    url="/pages/externalPage/index?path=https://static-files.heimaqf.cn/kechuangyunPrivacyAgreement.html"
                >
                    《隐私保护政策》
                </Navigator>
            </View>
        </View>
    );
}
