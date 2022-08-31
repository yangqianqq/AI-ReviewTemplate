import * as React from 'react';
import { View, Image, Button } from '@tarojs/components';
import './index.scss';

export default ({
    src,
    text = '',
    showBtn = false,
    showBtnText = '',
    onClick = () => {},
    style = {},
    className = ''
}: any) => {
    return (
        <View className={`noData ${className || ''}`} style={style}>
            <Image src={src} className="noDataImg"></Image>
            <View className="noDataText">{text}</View>
            {showBtn && (
                <Button className="noDataBtn" onClick={onClick}>
                    {showBtnText}
                </Button>
            )}
        </View>
    );
};
