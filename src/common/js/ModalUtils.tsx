/*
 * @Author: 姜通
 * @Date: 2021-11-15 14:36:00
 * @LastEditTime: 2021-11-15 15:09:26
 * @Description:
 * @FilePath: /kechuanyun/src/common/js/ModalUtils.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Taro from '@tarojs/taro';

import { AtModalHeader, AtModal, AtModalContent } from 'taro-ui';
import '../style/suremodal.scss';

class LoginUtils {
    public div: HTMLElement;

    public modalRef: React.RefObject<any>;

    // 构造函数接收一个组件
    constructor() {
        this.div = document.createElement('div');
        this.modalRef = React.createRef();
    }

    onOk = action => {
        this.close();
        action();
    };

    show = (props?: any) => {
        // document.body.appendChild(this.div);
        // ReactDOM.render(
        //     <AtModal
        //         className="sure_modal"
        //         cancelText="取消"
        //         // okText="现在开通"
        //         title="提示"
        //         content={props.text}
        //         confirmText="现在开通"
        //         onCancel={this.close}
        //         onConfirm={() => {}}
        //         isOpened
        //     >
        //         {/* <AtModalHeader>提示</AtModalHeader>
        //         <AtModalContent>{props.text}</AtModalContent> */}
        //     </AtModal>,
        //     this.div
        // );

        return this;
    };

    close = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(this.div);
        if (unmountResult && this.div.parentNode) {
            this.div.parentNode.removeChild(this.div);
        }
    };
}

export default new LoginUtils();
