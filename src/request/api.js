import request from "./index";

const uploadUrl = `https://erp.deepberry.cn/api/v1/adam/upload`;

// 上传图片
const uploadApi = function (params, config) {
    return request.post("/api/v1/adam/upload", params, config);
};

// 栽培方式列表
const growthTypeListApi = function (params) {
    return request.post("/api/v1/adam/garden/getGrowGrowth", params);
};

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

// 采购订单详情
const purchaseOrderDetailApi = function (params) {
    return request.post("/api/v1/adam/agricultural/orderDetail", params);
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

// 种植模型详情
const plantModelDetailApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getGrowModel", params);
};

// 停止种植模型
const stopPlantModelApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/stopModel", params);
};

// 保存生长阶段
const saveGrowthStageApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/saveGrowthStage", params);
};

// 保存种植建议
const savePlantSuggestionApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/savePlantReferenceModel", params);
};

// 保存农事指导
const saveFarmGuideApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/savePlantOperationGuidance", params);
};

// 保存防治病虫害指导
const saveCureGuideApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/savePlantPreventionGuidance", params);
};

// 生长阶段详情
const growthStageDetailApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getGrowthStageById", params);
};

// 农事指导详情
const farmGuideDetailApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getPlantOperationGuidanceById", params);
};

// 防治病虫害指导详情
const cureGuideDetailApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getPlantPreventionGuidanceById", params);
};

// 种植建议详情
const suggestionDetailApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getPlantReferenceModelById", params);
};

// 生长阶段列表
const growthStageListApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getGrowthStage", params);
};

// 种植建议列表
const suggestionListApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getPlantReferenceModelList", params);
};

// 农事指导列表
const farmGuideListApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getPlantOperationGuidanceList", params);
};

// 防治病虫害指导列表
const cureGuideListApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getPlantPreventionGuidanceList", params);
};

// 保存种植模型
const savePlantModelApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/saveGrowModel", params);
};

// 获取生长阶段的参数列表
const standardListApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getGrowPlantsParamList", params);
};

// 获取当前生长阶段的种植建议
const stageSuggestionListApi = function (params) {
    return request.post("/api/v1/adam/adminGrowModel/getGrowPlantsAdviceList", params);
};

export {
    uploadUrl,
    uploadApi,
    growthTypeListApi,
    materialsTypeListApi,
    weightUnitListApi,
    unitMeasurementListApi,
    purchaseOrderListApi,
    purchaseOrderDetailApi,
    platformMaterialsListApi,
    updateOrderStatusApi,
    saveOrderFollowApi,
    saveMaterialsApi,
    materialsDetailApi,
    updateMaterialsStatusApi,
    plantModelListApi,
    stopPlantModelApi,
    saveGrowthStageApi,
    savePlantSuggestionApi,
    saveFarmGuideApi,
    saveCureGuideApi,
    growthStageDetailApi,
    farmGuideDetailApi,
    cureGuideDetailApi,
    suggestionDetailApi,
    plantModelDetailApi,
    growthStageListApi,
    suggestionListApi,
    farmGuideListApi,
    cureGuideListApi,
    savePlantModelApi,
    standardListApi,
    stageSuggestionListApi,
};
