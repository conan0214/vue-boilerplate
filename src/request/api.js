import request from "./index";

// 农资类型枚举值
const materialsTypeListApi = function (params) {
    return request.post("/api/v1/adam/farm/getAgriculturalCategory", params);
};

// 重量单位枚举值
const weightUnitListApi = function (params) {
    return request.post("/api/v1/adam/farm/getWeightUnit", params);
};

// 数量量单位枚举值
const unitMeasurementListApi = function (params) {
    return request.post("/api/v1/adam/farm/getUnitMeasurement", params);
};

// 采购订单列表
const purchaseOrderListApi = function (params) {
    return request.post("/api/v1/adam/adminOrder/list", params);
};

// 平台农资列表
const platformMaterialsListApi = function (params) {
    return request.post("/api/v1/adam/adminOrder/platform-list", params);
};

// 更新采购订单状态
const updateOrderStatusApi = function (params) {
    return request.post("/api/v1/adam/adminOrder/updateOrder", params);
};

// 保存跟进记录
const saveOrderFollowApi = function (params) {
    return request.post("/api/v1/adam/adminOrder/saveOrderFollowText", params);
};

// 保存农资
const saveMaterialsApi = function (params) {
    return request.post("/api/v1/adam/adminOrder/savePlatform", params);
};

// 获取平台农资详情
const materialsDetailApi = function (params) {
    return request.post("/api/v1/adam/adminOrder/getAgriculturalDetail", params);
};

// 获取平台农资详情
const updateMaterialsStatusApi = function (params) {
    return request.post("/api/v1/adam/adminOrder/updateAgricultural", params);
};

// 种植模型列表
const plantModelListApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/list", params);
};

export {
    materialsTypeListApi,
    weightUnitListApi,
    unitMeasurementListApi,
    purchaseOrderListApi,
    platformMaterialsListApi,
    updateOrderStatusApi,
    saveOrderFollowApi,
    saveMaterialsApi,
    materialsDetailApi,
    updateMaterialsStatusApi,
    plantModelListApi,
};
