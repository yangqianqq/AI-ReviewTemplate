/*
 * @Author: 姜通
 * @Date: 2021-08-24 10:44:03
 * @LastEditTime: 2021-12-16 17:29:20
 * @Description:
 * @FilePath: /kechuanyun/src/utils/loginBack/index.ts
 */
import {
    getStorageSync,
    getCurrentInstance,
    navigateTo,
    switchTab,
    redirectTo
} from '@tarojs/taro';
import { URL } from '@/utils/urlParams';

// HasToken函数的参数类型
interface HasTokenProps extends ReadyForBackProps {
    tkCallback?: Function; // 回调函数， 接受返回token的值
}

// ReadyForBack函数的参数类型
interface ReadyForBackProps {
    toLogin?: string; // token失效的情况下，跳转的地址（默认快捷登录页面）
    key?: string; // 登录页面请求地址
    durition?: number; // 延迟跳转的时间（默认0ms）
    backPath?: string; // 登录成功后返回的地址
}

/**
 * @class
 * @desc 处理需要登录模块及成功操作后跳转路径的问题
 */
export default class NoTokenNeedLogin {
    static path: string | undefined;
    static requestKey: string | undefined;
    static backPath: string | undefined;
    // tab链接
    static tabLink = [
        '/pages/index/index',
        '/pages/shopping/index',
        '/pages/shoppingCartTab/index',
        '/pages/personInfo/index'
    ];

    // 判断storage是否含有token
    static HasToken(props?: HasTokenProps) {
        const { toLogin, tkCallback, key, durition, backPath } = props || {};
        let token: string;
        try {
            token = getStorageSync('uniqueToken');
        } catch (err) {
            token = '';
        }
        if (tkCallback) tkCallback(token);
        if (!token && !tkCallback)
            NoTokenNeedLogin.ReadyForBack({ toLogin, key, durition, backPath });
    }

    // 无效token
    static InvalidToken(props?: ReadyForBackProps) {
        NoTokenNeedLogin.ReadyForBack(props);
    }

    // 准备返回数据
    static ReadyForBack(props?: ReadyForBackProps) {
        const { toLogin, key, durition, backPath } = props || {};
        const router = getCurrentInstance().router;
        const pathParams = URL.stringfiy(router?.params);
        NoTokenNeedLogin.path = router?.path?.includes('?')
            ? router.path
            : `${router?.path}?${pathParams}`;
        NoTokenNeedLogin.requestKey = key;
        NoTokenNeedLogin.backPath = backPath;
        setTimeout(() => {
            navigateTo({ url: toLogin || '/pages/login/quickLogin/index' });
        }, durition || 0);
    }

    // 数据初始化
    static initData() {
        NoTokenNeedLogin.path = undefined;
        NoTokenNeedLogin.requestKey &&
            (NoTokenNeedLogin.requestKey = undefined);
        NoTokenNeedLogin.backPath && (NoTokenNeedLogin.backPath = undefined);
    }

    /**
     * @des 跳转页面的处理
     * @param loginBack 设置默认登录成功后返回的地址
     */
    static LoginBackTo(loginBack: string) {
        const Link: any =
            NoTokenNeedLogin.backPath || loginBack || NoTokenNeedLogin.path;
        const LinkTo = NoTokenNeedLogin.tabLink.some(it => Link.includes(it))
            ? switchTab
            : navigateTo;
        LinkTo({
            url: Link,
            success() {
                NoTokenNeedLogin.initData();
            }
        });
    }
}
