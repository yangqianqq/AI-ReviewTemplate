import React from 'react';
import { View, Image, Button } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { AtActionSheet } from 'taro-ui';
import MyToast from '@/src/utils/Mtoast';
import './index.scss';

function ShareDialog(props) {
    // 复制链接
    function copyLink(url) {
        Taro.setClipboardData({
            data: `${WEB_URL}/#${url}`
        });
        MyToast.show({
            title: '链接已复制！'
        });
    }

    useShareAppMessage(res => {
        if (res.from === 'button') {
            console.log(res.target);
        }

        props.onClose();
        return {
            title: props.title,
            path: props.url,
            imageUrl: props.imgUrl
        };
    });

    return (
        <View className="share-dialog">
            <AtActionSheet isOpened={props.isOpened} onClose={props.onClose}>
                <View className="botton-box">
                    {process.env.TARO_ENV === 'weapp' && (
                        <Button className="btn-item" openType="share">
                            <Image
                                className="btn-icon"
                                src={`${IMG_COMMON_URL}kechuangyun/activity/boosting/share-wx.png`}
                            ></Image>
                            <View className="btn-text">微信好友</View>
                        </Button>
                    )}
                    <View
                        className="btn-item"
                        onClick={() => {
                            copyLink(props.url);
                            props.onClose();
                        }}
                    >
                        <Image
                            className="btn-icon"
                            src={`${IMG_COMMON_URL}kechuangyun/activity/boosting/share-link.png`}
                        ></Image>
                        <View className="btn-text">复制链接</View>
                    </View>
                </View>
                <View className="share-tips">
                    点击页面右上角···可快速分享给微信朋友
                </View>
                <View className="cancel-btn" onClick={props.onClose}>
                    取消
                </View>
            </AtActionSheet>
        </View>
    );
}

export default ShareDialog;
