export interface InstanceUserInfo {
    user: {
        phoneNumber: string;
        userName: string;
        nickName: string;
        headPortraitUrl: string;
        email: string;
        sex: string;
    };
}
export interface Params {}
export interface InstanceRequestRes<T> {
    code: number;
    data: T;
    msg: string;
}

//订单列表
export interface InterfaceList {
    total: number;
    rows: InterfaceRow[];
    code: number;
    msg: string;
}

export interface InterfaceRow {
    searchValue?: any;
    createBy: string;
    createTime: any;
    updateBy: string;
    updateTime: any;
    remark?: any;
    params: Params;
    id: number;
    orderNum: string;
    userId: number;
    orderSource: number;
    payAccount?: any;
    payTime?: any;
    payType: number;
    orderStatus: number;
    offlinePayImag: string;
    offlinePayRemark: string;
    offlinePayApprovalRemark?: any;
    buyNum: number;
    totalAmount: number;
    payAmount?: number;
    contractIsChange: number;
    contractApprovalStatus: number;
    contractNo: string;
    orderSyncType: number;
    businessName: string;
    businessPhone: string;
    businessNo: string;
    subjectId: number;
    subjectType: number;
    subjectName: string;
    subjectPhone: string;
    subjectCards: string;
    subjectEntName: string;
    subjectIdentityNumber: string;
    subjectOpenBank: string;
    subjectBankNum: string;
    subjectBusCert: string;
    subjectUserCardFront: string;
    subjectUserCardBack: string;
    subjectAddress: string;
    deleteStatus: number;
    payMentType?: any;
    goodsOrderDetailList: GoodsOrderDetailList[];
    latestOrderContract?: LatestOrderContract;
    latestOrderPaperContract?: any;
    orderInvoiceStatus: number;
    invoice?: any;
}

export interface GoodsOrderDetailList {
    searchValue?: any;
    createBy: string;
    createTime: string;
    updateBy?: string;
    updateTime?: string;
    remark?: any;
    params: Params;
    id?: any;
    orderNum: string;
    orderDetailNum: string;
    userId?: any;
    orderStatus?: any;
    productCode: string;
    productName: string;
    price: number;
    imagPc: string;
    imagApp: string;
    productCategoryIdLevelOne?: any;
    productCategoryIdLevelTwo?: any;
    productLevelOneName?: any;
    productLevelTwoName?: any;
    workOrderNum?: any;
    workProgress?: any;
    workStatus?: any;
    buyNum: number;
}

export interface LatestOrderContract {
    searchValue?: any;
    createBy: string;
    createTime: number;
    updateBy?: any;
    updateTime?: any;
    remark?: any;
    params: Params;
    id: number;
    userId: number;
    orderNum: string;
    isChange: number;
    changeType: number;
    oldImg: string;
    oldText: string;
    newText: string;
    originalContractFile?: any;
    contractFile?: any;
    approvalStatus: number;
    approvalComments?: any;
}
