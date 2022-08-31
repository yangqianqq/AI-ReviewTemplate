import React from 'react';
import { View } from '@tarojs/components';
import { AtModal } from 'taro-ui';
import './index.scss';

function EasyDialog(props) {
    return (
        <View className="easy-dialog">
            <AtModal
                isOpened={props.isOpen}
                className="modal"
                onClose={props.noFn}
            >
                {props.title && <View className="title">{props.title}</View>}
                <View className="text">{props.children || props.text}</View>
                <View className="btns">
                    {props.first === 'yes' && (
                        <View className="btn" onClick={props.yesFn}>
                            {props.yesText}
                        </View>
                    )}
                    <View className="btn btn-continue" onClick={props.noFn}>
                        {props.noText}
                    </View>
                    {props.first === 'no' && (
                        <View className="btn" onClick={props.yesFn}>
                            {props.yesText}
                        </View>
                    )}
                </View>
            </AtModal>
        </View>
    );
}

EasyDialog.defaultProps = {
    title: '',
    text: 'EASY DIALOG',
    yesText: '是',
    noText: '否',
    first: 'no',
    yesFn: () => console.log('YES'),
    noFn: () => console.log('No'),
    isOpen: true
};

export default EasyDialog;
