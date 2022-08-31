// 登录类接口
export interface LoginCommonResult {
    code: number;
    msg: string;
    data: LoginResultData;
}

// 登录类接口data
export interface LoginResultData {
    token: string;
    expires: number;
}
