/*
 * @Author: 姜通
 * @Date: 2021-08-24 10:44:03
 * @LastEditTime: 2021-11-25 10:47:36
 * @Description:
 * @FilePath: /kechuanyun/src/pages/index/common/api/index.ts
 */
import BaseSubJsonRequest from '@/utils/request/BaseSubJsonRequest';

export default class Request extends BaseSubJsonRequest {
  //  获取首页数据
  static getHomePageInfo<T>() {
    return this.post<T>('/api/homePage/index');
  }
}
