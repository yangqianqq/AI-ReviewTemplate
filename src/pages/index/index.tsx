//@ts-ignore
import React, { useState, useRef, useEffect } from 'react';
import { View, Input, Button } from '@tarojs/components';
import classnames from 'classnames';

import './index.scss';

function Index() {
  const [templateList, setTemplateList] = useState<any>([
    '学生检讨',
    '女友道歉',
    '工作总结',
  ]);
  const [active, setActive] = useState('');

  useEffect(() => {}, []);

  return (
    <View className="home_page">
      <View className="cardItem">
        <View className="cardTile">选择模版</View>
        <View className="templateList">
          {templateList.map((i, index) => (
            <View
              key={index}
              className={classnames({
                templateItem: true,
                active: active === index,
              })}
              onClick={() => {
                setActive(index);
              }}
            >
              {i}
            </View>
          ))}
        </View>
      </View>
      <View className="cardItem">
        <View className="cardTile">主题</View>
        <View>
          <Input className="formInput"></Input>
        </View>
      </View>
      <View className="cardItem">
        <View className="cardTile">字数</View>
        <View>
          <Input className="formInput"></Input>
        </View>
      </View>
      <View className="cardItem">
        <Button className="goGenerate">立即生成文章</Button>
      </View>
    </View>
  );
}

export default Index;
