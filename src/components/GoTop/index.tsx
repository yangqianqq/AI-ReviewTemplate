import React, { useState } from 'react';
import { View, Image } from '@tarojs/components';
import { pageScrollTo, usePageScroll } from '@tarojs/taro';
import './index.scss';

function GoTop(props) {
    const [visible, setVisible] = useState(props?.show ? true : false);

    usePageScroll(res => {
        // @ts-ignore

        if (props?.show) {
            return;
        }
        if (res.scrollTop - props.over > 0) setVisible(true);
        else setVisible(false);
    });

    return (
        <View
            className={`go-top ${visible ? '' : 'hidden'}`}
            onClick={() => {
                if (props?.show) {
                    props.goTop();
                    return;
                }
                pageScrollTo({ scrollTop: 0.00001, duration: 300 });
            }}
        >
            <Image
                className="go-top-img"
                src={`${IMG_COMMON_URL}kechuangyun/activity/boosting/go-top.png`}
            ></Image>
        </View>
    );
}

GoTop.defaultProps = {
    over: 200
};

export default GoTop;
