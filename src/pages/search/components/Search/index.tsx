/* eslint-disable react/forbid-elements */
/*
 * @Author: 姜通
 * @Date: 2021-11-09 10:31:34
 * @LastEditTime: 2021-12-08 16:19:23
 * @Description:
 * @FilePath: /kechuanyun/src/pages/itools/components/Search/index.tsx
 */
import React, { useState, useRef } from 'react';
import { View, Image } from '@tarojs/components';
import Trao from '@tarojs/taro';
import { AtSearchBar } from 'taro-ui';
import './index.scss';

/**
 * @description:
 * clickIntoDetail 是否需要更多搜索的
 * @param {*} true
 * @return {*}
 */
export default ({ requestAction, clickItem, placeholder = '' }) => {
  const [value, setValue] = useState('');
  const searchRef = useRef('');
  const [data, setData] = useState([]);

  const searchAction = async (v) => {
    setValue(v);
    searchRef.current = '';

    const res = await requestAction({
      searchText: v,
      pageNum: 1,
      pageSize: 10,
    });

    setData(res?.rows ?? []);
  };

  const clickAction = (item) => {
    clickItem(item);
  };

  return (
    <View className="search_wrapper">
      <input autoFocus style={{ display: 'none' }} type="text" />
      <AtSearchBar
        actionName="返回"
        placeholder={placeholder}
        focus
        value={value}
        onChange={searchAction}
        onActionClick={() => {
          Trao.navigateBack();
        }}
      />

      <View className="search_content_wrapper">
        <View className="search_recommended_wrapper">
          {data.map((i: any, index) => {
            return (
              <View
                className="productItem"
                onClick={() => {
                  clickAction(i);
                }}
              >
                {i.recommend || index < 3 ? (
                  <View className={'productTag'}>
                    <Image
                      src={
                        'https://kechuangyun-static-1304630716.cos.ap-beijing.myqcloud.com/kechuangyun/specializationnew/condition.png'
                      }
                      className={'productTagBg'}
                    ></Image>
                    <View className={'productTagTip'}>HOT</View>
                  </View>
                ) : (
                  ''
                )}
                <View className="productItemTitle">
                  {i?.title || '模版名称'}
                </View>
                <View className="productItemDesc">
                  {i?.desc || '这是一段描述'}
                </View>

                <View className="productItemBottom">
                  <View className="productBottomTip">
                    <View className="productBottomTitle">来源:</View>
                    {i?.author || '杨倩'}
                  </View>
                  <View className="productBottomTip">
                    <View className="productBottomTitle">价格:</View>
                    {i?.price > 0 ? `${i.price}币` : '免费'}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        {value && data.length === 0 && (
          <View className="nodata_wrapper">
            没有找到相关信息，请换个关键词试试
          </View>
        )}
      </View>
    </View>
  );
};
