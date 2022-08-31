/*
 * @Author: 姜通
 * @Date: 2021-08-18 11:59:40
 * @LastEditTime: 2021-11-15 14:01:14
 * @Description:
 * @FilePath: /kechuanyun/src/common/api/index.ts
 */
import BaseSubJsonRequest from '@/utils/request/BaseSubJsonRequest';

export default class Request extends BaseSubJsonRequest {
  static uploadImg(params) {
    return this.upload(
      '/api/v1/upload/image',
      params.filePath,
      params.name,
      {},
    );
  }

  // 根据用户id查询权限列表
  static getMenuListByUserId() {
    return this.post('/api/v1/menu/getMenuListByUserId');
  }

  // 是否开启会员显示
  static display() {
    return this.post('/api/v1/vip/display');
  }

  // 获取用户信息
  static getUserInfo<T>() {
    return this.post<T>('/api/v1/user/uInfo', {});
  }

  // 获取用户信息
  static checkContractRecord<T>(params) {
    return this.post<T>('/api/contract/checklist', params);
  }

  // h5获取微信用户openid
  static getWxOpenId<T>(params) {
    return this.post<T>('/api/v1/user/getWxOpenId', params);
  }
}
