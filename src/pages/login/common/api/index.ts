import BaseSubJsonRequest from '@/utils/request/BaseSubJsonRequest';
import { ToEncryption } from '@/utils/encryption/index';

export default class Request extends BaseSubJsonRequest {
    //  获取验证码
    static getVerifyCode<T>(data) {
        return this.post<T>('/api/v1/user/verifyCode', data);
    }
    //  注册送会员
    static getFreeMemberList<T>(data) {
        return this.post<T>('/api/v1/housekeeper/getFreeMemberList', data);
    }
    //  客户和商务绑定
    static addEmployeeClient<T>(data) {
        return this.post<T>('/api/v1/employeeClient/addEmployeeClient', data);
    }
    // 快捷登录
    static toQuickLogin<T>(data) {
        return this.post<T>('/api/v1/user/phoneLogin', data);
    }
    // 账号密码登录
    static toPasswordLogin<T>(data) {
        const EncryptedData = ToEncryption(data);
        return this.post<T>(
            '/api/v1/user/login',
            EncryptedStatus ? EncryptedData : data
        );
    }
    // 注册账号
    static toRegister<T>(data) {
        const EncryptedData = ToEncryption(data);
        return this.post<T>(
            '/api/v1/user/register',
            EncryptedStatus ? EncryptedData : data
        );
    }
    // 修改密码
    static toModifyPassword<T>(data) {
        const EncryptedData = ToEncryption(data);
        return this.post<T>(
            '/api/v1/user/changePw',
            EncryptedStatus ? EncryptedData : data
        );
    }
    // 忘记密码
    static toForgetPassword<T>(data) {
        const EncryptedData = ToEncryption(data);
        return this.post<T>(
            '/api/v1/user/forgetPw',
            EncryptedStatus ? EncryptedData : data
        );
    }

    // 微信小程序登录
    static toWXLogin<T>(data) {
        const EncryptedData = ToEncryption(data);
        return this.post<T>(
            '/api/v1/user/wxLogin',
            EncryptedStatus ? EncryptedData : data
        );
    }

    // 查询中台主体名称+工单数量
    static getMiddlePlatformSubject<T>(data) {
        return this.post<T>('/api/v1/user/getMiddlePlatformSubject', data);
    }

    // 查询中台主体名称+工单数量
    static contractUpgrade<T>(data) {
        return this.post<T>('/api/v1/user/contractUpgrade', data);
    }
}
