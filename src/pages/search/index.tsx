/*
 * @Author: 姜通
 * @Date: 2021-11-03 18:09:37
 * @LastEditTime: 2021-11-25 17:02:54
 * @Description:
 * @FilePath: /kechuanyun/src/pages/itools/specialization/search.tsx
 */
import React from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
// import LoginPerModule from '@/common/js/LoginPerModule';
import request from './common/api';
import Search from './components/Search';
import './index.scss';
export default () => {
  const query: any = getCurrentInstance().router?.params;

  return (
    <Search
      placeholder="输入您要搜索的模版"
      clickItem={(item) => {
        Taro.redirectTo({
          url: `/pages/shopping/index`,
        });

        // );
      }}
      requestAction={(params) => {
        return request.examineSearch(params);
      }}
    ></Search>
  );
};
