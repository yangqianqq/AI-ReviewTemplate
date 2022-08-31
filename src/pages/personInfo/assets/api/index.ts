import BaseSubJsonRequest from '@/src/utils/request/BaseSubJsonRequest';

export default class Request extends BaseSubJsonRequest {
    // 获取登录信息
    static getInfo<T>(params) {
        return this.post<T>('/api/v1/user/uInfo', params);
    }
    // 退出登录
    static logout<T>(params) {
        return this.post<T>('/api/v1/user/logout', params);
    }
    // 切换主体
    static checkContractRecord<T>(params) {
        return this.post<T>('/api/contract/checklist', params);
    }
    //获取待付款角标数量
    // 订单列表
    static orderList<T>(params) {
        return this.post<T>('/api/v1/order/list', params);
    }
}
