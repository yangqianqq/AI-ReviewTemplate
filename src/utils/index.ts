/* eslint-disable no-restricted-globals */
/*
 * @Author: 姜通
 * @Date: 2021-09-01 15:37:31
 * @LastEditTime: 2021-11-23 09:52:06
 * @Description:
 * @FilePath: /kechuanyun/src/utils/index.ts
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

export const getType = file => {
    const filename = file;
    const index1 = filename?.lastIndexOf('.');
    const index2 = filename?.length ?? 0;
    const type = filename?.substring(index1, index2);
    return type.toLowerCase();
};

export const other = `${IMG_COMMON_URL}/other_img.png`;

export const fileTypes = {
    '.xls': `${IMG_COMMON_URL}/excel_img.png`,
    '.xlsx': `${IMG_COMMON_URL}/excel_img.png`,
    '.pdf': `${IMG_COMMON_URL}/pdf_img.png`,
    '.ppt': `${IMG_COMMON_URL}/ppt_img.png`,
    '.pptx': `${IMG_COMMON_URL}/ppt_img.png`,
    '.doc': `${IMG_COMMON_URL}/word_img.png`,
    '.docx': `${IMG_COMMON_URL}/word_img.png`,
    '.zip': `${IMG_COMMON_URL}/zip_img.png`,
    '.7z': `${IMG_COMMON_URL}/zip_img.png`,
    '.rar': `${IMG_COMMON_URL}/zip_img.png`
};

export const imgTypes = ['.png', '.jpeg', '.jpg', '.webp', '.bmp', '.gif'];

export const exactType = url => {
    return (
        getType(url) !== '.zip' &&
        getType(url) !== '.7z' &&
        getType(url) !== '.rar' &&
        getType(url) !== '.xls' &&
        getType(url) !== '.xlsx'
    );
};

export const breakStr = (str, step, receiver) => {
    // str 需要截取的字符串
    // step 步长
    // receiver 接收器，可以是字符串，也可以是数组
    const remainder = str.length % step;
    const n = (str.length - remainder) / step;
    const type = typeof receiver.toLowerCase();
    for (let i = 0; i < n; i++) {
        if (type === 'string') {
            receiver += `${str.slice(i * step, (i + 1) * step)}\n`;
        } else {
            receiver.push(str.slice(i * step, (i + 1) * step));
        }
    }
    return receiver;
};

/**
 * 深拷贝
 *
 * @export
 * @param {*} target
 * @return {*}
 */
export function deepCopy(target) {
    if (typeof target === 'object') {
        const result = Array.isArray(target) ? [] : {};
        for (const key in target) {
            if (typeof target[key] === 'object') {
                result[key] = deepCopy(target[key]);
            } else {
                result[key] = target[key];
            }
        }

        return result;
    }

    return target;
}

export function appBackLoginAndroid() {
    try {
        // @ts-ignore
        window.JSInterface.appBackLogin();
    } catch (error) {
        // Toast.fail('需要登录');
        // history.goBack();
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
        // Toast.fail('需要登录');
        // history.goBack();
        window.console.log(error);
    }
}

export function backLogin(url) {
    if (process.env.NODE_ENV === 'development') {
        localStorage.setItem(
            'token',
            JSON.stringify('22e038eb-8c45-4753-a957-ec47a5756cd8')
        );
        history.push(url);
    } else if (process.env.NODE_ENV === 'production') {
        if (!localStorage.getItem('uniqueToken')) {
            if (detect() === 'ios') {
                appBackLoginIOS();
            } else if (detect() === 'android') {
                appBackLoginAndroid();
            }
        } else {
            history.push(url);
        }
    }
}

export function backLoginWithPer(url, per) {
    if (process.env.NODE_ENV === 'development') {
        localStorage.setItem(
            'token',
            JSON.stringify('22e038eb-8c45-4753-a957-ec47a5756cd8')
        );
        history.push(url);
    } else if (process.env.NODE_ENV === 'production') {
        if (!localStorage.getItem('uniqueToken')) {
            if (detect() === 'ios') {
                appBackLoginIOS();
            } else if (detect() === 'android') {
                appBackLoginAndroid();
            }
        } else if (per) {
            history.push(url);
        } else {
            appGoMemberCenter();
        }
    }
    // history.push(url);
}

export function appGoMemberCenterAndriod() {
    try {
        // @ts-ignore
        window.JSInterface.appGoMemberCenter();
    } catch (error) {
        window.console.log(error);
    }
}

export function appGoMemberCenterIos() {
    try {
        // @ts-ignore
        window.webkit.messageHandlers.mheimaqfios.postMessage({
            fuctionName: 'appGoMemberCenter'
        });
    } catch (error) {
        window.console.log(error);
    }
}

export function appGoMemberCenter() {
    if (detect() === 'ios') {
        appGoMemberCenterIos();
    } else if (detect() === 'android') {
        appGoMemberCenterAndriod();
    }
}
