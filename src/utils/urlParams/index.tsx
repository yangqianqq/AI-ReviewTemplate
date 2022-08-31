// 参数序列化生成链接
export const URL_Params_Stringify = (params, path?: string) => {
    const paramsStr = Object.entries(params || {})
        .map(item => `${item[0]}=${item[1]}`)
        .join('&');
    return path ? path + paramsStr : paramsStr;
};

// 从链接获取参
export const URL_Params_Parse = (url, key?: string) => {
    let result;
    const search = url.includes('?') ? `?${url.split('?')[1]}` : `?${url}`;
    if (key) {
        const keyReg = new RegExp(`(\\?|&)${key}=([^&]*)(&|$)`, 'i');
        const MATCH_WITH_KEY = search.match(keyReg);
        if (MATCH_WITH_KEY !== null) result = unescape(MATCH_WITH_KEY[2]);
        else result = '';
    } else {
        const Reg = new RegExp(`[?&]+([^=&]+)=([^&#]*)`, 'gi');
        const params = {};
        search.replace(Reg, function (m, pkey, value) {
            params[pkey] = value;
            return m;
        });
        result = params;
    }
    return result;
};

export const URL = {
    stringfiy: URL_Params_Stringify,
    parse: URL_Params_Parse
};
