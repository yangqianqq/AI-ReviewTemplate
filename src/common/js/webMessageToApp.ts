/*
 * @Author: 姜通
 * @Date: 2021-11-17 17:39:24
 * @LastEditTime: 2021-11-18 11:06:03
 * @Description:
 * @FilePath: /kechuanyun/src/common/js/webMessageToapp.ts
 */

export function detect() {
    let equipmentType = '';
    const agent = navigator.userAgent.toLowerCase();
    const android = agent.indexOf('android');
    const iphone = agent.indexOf('iphone');
    const ipad = agent.indexOf('ipad');
    if (android !== -1) {
        equipmentType = 'android';
    }
    if (iphone !== -1 || ipad !== -1) {
        equipmentType = 'ios';
    }
    return equipmentType;
}

export function appBackLoginAndroid() {
    try {
        // @ts-ignore
        window.JSInterface.appBackLogin();
    } catch (error) {
        window.console.log(error);
    }
}

export function appBackLoginIOS() {
    try {
        // @ts-ignore
        window.webkit.messageHandlers.mheimaqfios.postMessage({
            fuctionName: 'appBackLogin'
        });
    } catch (error) {
        window.console.log(error);
    }
}

export const appBackLogin = () => {
    if (detect() === 'ios') {
        appBackLoginIOS();
    } else if (detect() === 'android') {
        appBackLoginAndroid();
    }
};

export const shoppingCartChange = () => {
    if (detect() === 'ios') {
        // @ts-ignore
        try {
            // @ts-ignore
            window.webkit.messageHandlers.mheimaqfios.postMessage({
                fuctionName: 'appGoShoppingCart'
            });
        } catch (error) {
            window.console.log(error);
        }
    } else if (detect() === 'android') {
        try {
            // @ts-ignore
            window.JSInterface.appGoShoppingCart();
        } catch (error) {
            window.console.log(error);
        }
    }
};

export function appUniversalJumpIOS(data) {
    try {
        // @ts-ignore
        window.webkit.messageHandlers.mheimaqfios.postMessage({
            fuctionName: 'appUniversalJump',
            ...data
        });
    } catch (error) {
        window.console.log(error);
    }
}
export function appUniversalJumpAndroid(data) {
    try {
        // @ts-ignore
        window.JSInterface.appUniversalJump(JSON.stringify(data));
    } catch (error) {
        window.console.log(error);
    }
}

export const appUniversalJump = data => {
    if (detect() === 'ios') {
        appUniversalJumpIOS(data);
    } else if (detect() === 'android') {
        appUniversalJumpAndroid(data);
    }
};

export function appLoginCallBackIOS(data) {
    try {
        // @ts-ignore
        window.webkit.messageHandlers.mheimaqfios.postMessage({
            fuctionName: 'appLoginCallBack',
            ...data
        });
    } catch (error) {
        window.console.log(error);
    }
}
export function appLoginCallBackAndroid(data) {
    try {
        // @ts-ignore
        window.JSInterface.appLoginCallBack(JSON.stringify(data));
    } catch (error) {
        window.console.log(error);
    }
}

export const appLoginCallBack = data => {
    if (detect() === 'ios') {
        appLoginCallBackIOS(data);
    } else if (detect() === 'android') {
        appLoginCallBackAndroid(data);
    }
};
