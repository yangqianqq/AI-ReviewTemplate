/* eslint-disable no-useless-return */
import { useMemo, useCallback, useEffect, useReducer, useRef } from 'react';

class ListViewProps {
    pageNum = 1;

    pageSize = 10;

    total = 0;

    rows: Array<any> = [];

    count = 0;

    refreshing = true;

    isLoading = true;

    formData = {};
}

const initData = new ListViewProps();

const reducer = (state: typeof initData, action: any) => {
    switch (action.type) {
        case 'updateState':
            return { ...state, ...action.payload };
        default:
            throw new Error();
    }
};

/**
 * immediately 马上请求
 * requestAction 请求方法
 * initDataSource new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })   [] 这个玩意
 *
 * @param {*} { initDataSource, requestAction, immediately = true }
 * @return {*}
 */
export default ({ initDataSource, requestAction, immediately = true }) => {
    const initState = useMemo(() => initData, []);
    const requestRef = useRef(immediately);

    const rData = useRef<any[]>([]);

    const [state, dispatch] = useReducer(reducer, {
        ...initState,
        dataSource: initDataSource
    });

    const run = useCallback(() => {
        dispatch({
            type: 'updateState',
            payload: { refreshing: true, isLoading: true }
        });

        const params = {
            ...state.formData
        };

        params.pageNum = state.pageNum;
        params.pageSize = state.pageSize;
        const func = async () => {
            const res = await requestAction(params);
            const datas = res?.rows ?? [];

            if (params.pageNum > 1) {
                rData.current = [...rData.current, ...datas];
            } else {
                rData.current = datas;
            }
            dispatch({
                type: 'updateState',
                payload: {
                    dataSource: Array.isArray(state.dataSource)
                        ? rData.current
                        : state.dataSource.cloneWithRows(rData.current),
                    refreshing: false,
                    isLoading: false,
                    total: res?.total ?? 0,
                    hasMore: res?.total > rData.current?.length
                }
            });
        };

        func();
    }, [state.count]);

    // 依赖变化的事件
    useEffect(() => {
        if (requestRef.current) {
            run();
            requestRef.current = true;
        }
    }, [state.count]);

    // 重新搜索
    const reload = useCallback(async () => {
        dispatch({
            type: 'updateState',
            payload: {
                count: state.count + 1,
                pageNum: 1
            }
        });
    }, [state.count]);

    const search = async (params = {}) => {
        await dispatch({
            type: 'updateState',
            payload: {
                formData: params
            }
        });

        await reload();
    };

    const onRefresh = async () => {
        await reload();
    };

    const onEndReached = useCallback(() => {
        if (state.isLoading || !state.hasMore) return;
        dispatch({
            type: 'updateState',
            payload: {
                pageNum: state.pageNum + 1,
                count: state.count + 1
            }
        });
    }, [state.hasMore, state.isLoading]);

    return {
        onRefresh, // 刷新
        onEndReached, // 上拉加载更多
        search, // 搜索
        total: state.total,
        refreshing: state.refreshing,
        isLoading: state.isLoading,
        dataSource: state.dataSource,
        rData: rData.current
    };
};
