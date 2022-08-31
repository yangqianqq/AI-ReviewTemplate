export interface categoryListType {
    searchValue: null;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    remark: null;
    params: object;
    id: number;
    categoryName: string;
    parentId: number;
    parentName: string;
    categoryAbridge: null;
    categoryType: null;
    mongoId: null;
    deleteStatus: number;
    sort: number;
    userId: number;
    productCode: string;
    productName: string;
    price: number;
    productDetail: {
        salesCount?: number;
        imagApp: string;
        vipDiscount: number;
    };
}

export interface resType<T> {
    code: number;
    rows: Array<T>;
    msg: string;
    total?: number;
    data?: any;
}
export interface offlinePay {
    payee: string;
    bankNum: string;
    openBank: string;
}
