/** @format */

import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducer';

const store = configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware => {
    //     if (
    //         process.env.NODE_ENV === 'development' &&
    //         process.env.TARO_ENV !== 'quickapp'
    //     ) {
    //         return getDefaultMiddleware().concat(logger);
    //     } else {
    //         return getDefaultMiddleware();
    //     }
    // },
    devTools: process.env.NODE_ENV !== 'production'
});

const hotDev = module => {
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./reducer', () => {
            // eslint-disable-next-line global-require
            const newRootReducer = require('./reducer').default;
            store.replaceReducer(newRootReducer);
        });
    }
};

hotDev(module);

// state 的type
export type RootState = ReturnType<typeof rootReducer>;

// dispatch 的type
export type AppDispatch = typeof store.dispatch;

// thunk 的type
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
