import React from 'react';
import { View, Image } from '@tarojs/components';

import './assets/style/index.scss';

const Tel = '400-1118-333';

function Index() {
    return (
        <View className="aboutUs">
            <Image
                src={IMG_COMMON_URL + 'logo.png'}
                className="aboutUsLogo"
            ></Image>
            <View className="aboutUsText">
                黑马企服主要通过知识产权基础业务+SAAS+AI大数据的服务优势，为企业、科研院所、高校提供全链路一站式知产服务与科创服务。通过黑马研究院为客户创造、运用、维护知识产权并解决过程中的各种问题，实现线上线下融合的全方位科创服务云平台。
            </View>

            <View className="phoneContent">
                {process.env.TARO_ENV === 'weapp' ? (
                    <View
                        className="phoneNum"
                        onClick={() => {
                            // @ts-ignore
                            wx.makePhoneCall({
                                phoneNumber: Tel
                            });
                        }}
                    >
                        <Image
                            className="phoneNumImg"
                            src={IMG_COMMON_URL + 'dh.png'}
                        ></Image>
                        <View className="phoneNumText">{Tel}</View>
                    </View>
                ) : (
                    // eslint-disable-next-line react/forbid-elements
                    <a href={`tel:${Tel}`} className="phoneNum">
                        <Image
                            className="phoneNumImg"
                            src={IMG_COMMON_URL + 'dh.png'}
                        ></Image>
                        <View className="phoneNumText">{Tel}</View>
                    </a>
                )}

                <View className="phoneNumTextBtn">拨打电话</View>
                <View className="phoneNumTextBtn">黑马企服科创云1.0.3版</View>
            </View>
        </View>
    );
}

export default Index;
