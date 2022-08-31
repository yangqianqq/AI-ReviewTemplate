/*
 * @Author: 姜通
 * @Date: 2021-08-18 11:59:40
 * @LastEditTime: 2021-12-14 14:06:33
 * @Description:
 * @FilePath: /kechuanyun/src/store/reducer.ts
 */
// @ts-nocheck

import { combineReducers } from '@reduxjs/toolkit';

import userinfo from './userInfo';
// const files = require.context('./', true, /\.ts$/);

// const modules = {};

// files
//     .keys()
//     .filter(item => item !== './index.ts' && item !== './reducer.ts')
//     .forEach(key => {
//         modules[key.replace('./', '').replace('.ts', '')] =
//             files(key).__esModule && files(key).default;
//     });

const reducer = combineReducers({
  userinfo,
});

export default reducer;
