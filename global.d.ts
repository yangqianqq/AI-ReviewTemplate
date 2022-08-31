declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// 图片公共路径
declare const IMG_COMMON_URL: string;
declare const WEB_URL: string;
declare const EncryptedStatus: Boolean;

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        TARO_ENV:
            | 'weapp'
            | 'swan'
            | 'alipay'
            | 'h5'
            | 'rn'
            | 'tt'
            | 'quickapp'
            | 'qq'
            | 'jd';
    }
}

interface Window {
    WeixinJSBridge: any;
    webkit: any; //ios
    JSInterface: any; //andriod
    Tiff: any; //tiff.js挂载
}
