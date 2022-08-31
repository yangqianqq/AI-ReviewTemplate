import React from 'react';
import { View } from '@tarojs/components';
// @ts-ignore
import LogIn from './components/login';

function LoginIndex() {
    return (
        <View className="login_index">
            <LogIn></LogIn>
        </View>
    );
}

export default LoginIndex;
