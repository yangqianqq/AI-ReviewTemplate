/*
 * @Author: 姜通
 * @Date: 2021-08-24 10:44:03
 * @LastEditTime: 2021-11-15 14:02:54
 * @Description:
 * @FilePath: /kechuanyun/src/store/userInfo.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CommonRequest from '@/common/api/index';
import { setStorageSync } from '@tarojs/taro';
import { AppThunk } from './index';

// 用户数据类型
interface UserInfo {
  user: {
    phoneNumber?: string;
    userName?: string;
    nickName?: string;
    headPortraitUrl?: string;
    email?: string;
    sex?: string;
  };
}

// 获取用户数据结果类型
interface GetUserInfoResult {
  code: number;
  msg: string;
  data: UserInfo;
}

// 初始用户数据
const UserInfo: UserInfo = {
  user: {
    phoneNumber: '',
    userName: '',
    nickName: '',
    headPortraitUrl: '',
    email: '',
    sex: '',
  },
};

const UserInfoSlice = createSlice({
  name: 'userinfo',
  initialState: { userinfo: UserInfo },
  reducers: {
    getUserInfo: (state, { payload }: PayloadAction<UserInfo>) => {
      state.userinfo = payload || UserInfo;
    },
  },
});

export default UserInfoSlice.reducer;
export const { getUserInfo } = UserInfoSlice.actions;

// 异步获取用户信息
export const AsyncGetUserInfo = (): AppThunk => (dispatch) => {
  CommonRequest.getUserInfo<GetUserInfoResult>()
    .then((res) => {
      const { code, msg, data } = res;
      if (code === 200) {
        setStorageSync('phone', data?.user?.phoneNumber);
        dispatch(getUserInfo(data));
      } else {
        console.log('redux_userinfo', msg);
      }
    })
    .catch((err) => console.log(err));
};

export const selectUserInfo = (state) => state.userinfo.userinfo;
