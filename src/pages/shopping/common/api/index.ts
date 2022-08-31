import BaseSubJsonRequest from '@/utils/request/BaseSubJsonRequest';

export default class Request extends BaseSubJsonRequest {
  // 商品分类列表
  static categoryList<T>(params) {
    return this.post<T>('/api/v1/product/category/list', params);
  }

  // 商品列表
  static productList<T>(params) {
    return this.post<T>('/api/v1/product/list', params);
  }
  // 体检-搜索
  static examineSearch(params = {}) {
    return this.post('/api/examine/search', params);
  }
}
