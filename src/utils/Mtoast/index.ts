import { showToast } from '@tarojs/taro';

export default class MyToast {
    static show = config => {
        const initConfig = {
            duration: 1000,
            title: '请设置提示信息',
            icon: 'none',
            ...config
        };
        showToast(initConfig);
    };
}
