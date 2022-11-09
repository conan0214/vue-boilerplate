<template>
    <div class="add-plant-model-wrapper">
        <el-page-header @back="goBack">
            <template #title>
                <span class="btn-back">返回</span>
            </template>
            <template #content>
                <span class="title">创建植物模型</span>
            </template>
        </el-page-header>
        <div class="content">
            <el-form :inline="true" :model="form" class="form">
                <el-form-item label="种植类型">
                    <el-input v-model="form.categoryTitle" placeholder="请输入种植类型" />
                </el-form-item>
                <el-form-item label="种植品种">
                    <el-input v-model="form.varietyTitle" placeholder="请输入种植品种" />
                </el-form-item>
                <el-form-item label="培育方式">
                    <el-select v-model="form.growthId" placeholder="请选择培育方式">
                        <el-option v-for="item in growthTypeList" :label="item.title" :value="item.id" :key="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="section">
                <div class="section-title">
                    <div class="left-view">
                        植物生长模型
                        <span class="tips">模型支持左右移动</span>
                    </div>
                    <div class="right-view">
                        <el-button plain type="primary" icon="CirclePlus" @click="openAddGrowthStageDialog"
                            >添加</el-button
                        >
                    </div>
                </div>
                <div class="card-list">
                    <div v-for="(item, index) in growthStageList" class="card-item" :key="index">
                        <div class="card-header">
                            <div class="card-header-title">
                                <div class="left-view">阶段{{ index + 1 }}：{{ item.phaseName }}</div>
                                <div class="right-view">
                                    <el-icon class="icon" @click="openAddGrowthStageDialog(item)"><Edit /></el-icon>
                                    <el-icon class="icon" @click="delGrowthStage(index)"><Delete /></el-icon>
                                </div>
                            </div>
                            <div class="card-header-img">
                                <el-image
                                    v-for="child in item.imgList"
                                    class="img"
                                    :src="child"
                                    :key="child"
                                    fit="cover"
                                />
                            </div>
                        </div>
                        <div class="card-table">
                            <div class="card-table-row">
                                <div class="left-view">参数名</div>
                                <div class="right-view">参数值</div>
                            </div>
                            <div
                                v-for="(child, index) in item.growPlantModelDetailBos"
                                class="card-table-row"
                                :key="index"
                            >
                                <div class="left-view">{{ child.parameterName }}</div>
                                <div class="right-view">
                                    {{ child.leastValue }}-{{ child.maxValue }}{{ child.unit }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-title">
                    <div class="left-view">
                        种植参考建议
                        <span class="tips">模型支持上下移动</span>
                    </div>
                    <div class="right-view">
                        <el-button plain type="primary" icon="CirclePlus" @click="openPlantSuggestion">添加</el-button>
                    </div>
                </div>
                <el-table class="section-table" :data="tableData">
                    <el-table-column label="光合作用" width="120">
                        <template #default="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="积温" width="120">
                        <template #default="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单株灌溉量" width="120">
                        <template #default="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="株高" width="120">
                        <template #default="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="叶面积" width="120">
                        <template #default="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单株重量" width="120">
                        <template #default="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单株重量" width="120">
                        <template #default="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="种植建议" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <div class="btn">
                                <el-icon class="icon" @click="openPlantSuggestion(scope.row)"><Edit /></el-icon>
                                <el-icon class="icon" @click="delPlantSuggestion(scope.$index)"><Delete /></el-icon>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="section">
                <div class="section-title">
                    <div class="left-view">农事操作指导</div>
                    <div class="right-view">
                        <el-button plain type="primary" icon="CirclePlus" @click="openFarmGuideDialog">添加</el-button>
                    </div>
                </div>
                <div class="guide-list">
                    <div v-for="(item, index) in farmGuideList" class="guide-item" :key="index">
                        <div v-for="child in item.imgList" class="guide-item-img" :key="child.url">
                            <el-image class="img" :src="child.url" fit="cover" />
                            <div class="btn-play"></div>
                            <div class="btns">
                                <el-icon class="icon" @click="openFarmGuideDialog(item)"><Edit /></el-icon>
                                <el-icon class="icon" @click="delFarmGuide(index)"><Delete /></el-icon>
                            </div>
                        </div>
                        <div class="title">{{ item.title }}</div>
                        <div class="desc-div">{{ item.text }}</div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-title">
                    <div class="left-view">病虫害防治</div>
                    <div class="right-view">
                        <el-button plain type="primary" icon="CirclePlus" @click="openCureGuideDialog">添加</el-button>
                    </div>
                </div>
                <div class="guide-list">
                    <div v-for="(item, index) in cureGuideList" class="guide-item" :key="index">
                        <div class="guide-item-img">
                            <el-image
                                v-for="child in item.imgList"
                                class="img"
                                :src="child.url"
                                fit="cover"
                                :key="child.url"
                            />
                            <div class="btn-play"></div>
                            <div class="btns">
                                <el-icon class="icon" @click="openCureGuideDialog(item)"><Edit /></el-icon>
                                <el-icon class="icon" @click="delCureGuide(index)"><Delete /></el-icon>
                            </div>
                        </div>
                        <div class="title">通风降温</div>
                        <div class="desc-div"></div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="visibleForModel" title="添加生长阶段" width="50%" @close="closeAddGrowthStageDialog">
            <div class="dialog-body">
                <el-form :model="modelForm" label-width="80px" label-suffix=":">
                    <el-form-item label="阶段名称">
                        <el-input v-model="modelForm.phaseName" clearable placeholder="请输入阶段名称" />
                    </el-form-item>
                    <el-form-item label="参考图">
                        <el-upload
                            v-model:file-list="modelForm.imgList"
                            :action="uploadUrl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <el-icon><Camera /></el-icon>
                            添加参考图
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="参考指标"> </el-form-item>
                    <div class="standard-list">
                        <div
                            v-for="(item, index) in modelForm.growPlantModelDetailBos"
                            class="standard-item"
                            :key="index"
                        >
                            <div class="standard-item-content">
                                <div class="label">参数名：</div>
                                <el-input class="input" v-model="item.parameterName" placeholder="请输入名称" />
                            </div>
                            <div class="standard-item-content">
                                <div class="label">参考值：</div>
                                <el-input-number
                                    class="input-number"
                                    v-model="item.leastValue"
                                    :min="0"
                                    :controls="false"
                                    placeholder="最小值"
                                />
                                <span class="line">-</span>
                                <el-input-number
                                    class="input-number"
                                    v-model="item.maxValue"
                                    :min="0"
                                    :controls="false"
                                    placeholder="最大值"
                                />
                                <el-input class="input-unit" v-model="item.unit" placeholder="输入单位" />
                            </div>
                            <div class="standard-item-content">
                                <el-icon v-if="index === 0" class="icon" @click="addStandard"><Plus /></el-icon>
                                <el-icon v-if="index !== 0" class="icon" @click="delStandard(index)"><Minus /></el-icon>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeAddGrowthStageDialog">取消</el-button>
                    <el-button type="primary" @click="saveGrowthStage">保存</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForDelModel" title="删除生长阶段" width="40%">
            <div class="dialog-content">
                <div class="left-view">
                    <el-icon><WarningFilled /></el-icon>
                </div>
                <div class="right-view">
                    <div class="title">
                        <span class="title-item">阶段一：播种到萌芽</span>
                    </div>
                    <div class="desc">确定删除此生长阶段吗？</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visibleForDelModel = false">取消</el-button>
                    <el-button type="primary" @click="confirm">确认</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForSuggestion" title="添加种植建议" width="50%">
            <div class="dialog-body">
                <div class="card-table">
                    <div class="card-table-row">
                        <div class="left-view">参数名</div>
                        <div class="right-view">选择实际偏离</div>
                    </div>
                    <div class="card-table-row">
                        <div class="left-view">光合积分</div>
                        <div class="right-view">
                            <el-select class="select" v-model="selectValue" placeholder="请选择">
                                <el-option class="low" label="偏低" value="0">
                                    <span>偏低</span>
                                    <span class="icon-low"></span>
                                </el-option>
                                <el-option class="normal" label="正常" value="1">
                                    <span>正常</span>
                                    <span class="icon-normal"></span>
                                </el-option>
                                <el-option class="high" label="偏高" value="2">
                                    <span>偏高</span>
                                    <span class="icon-high"></span>
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="card-table-row">
                        <div class="left-view">积温</div>
                        <div class="right-view">0-150 °C</div>
                    </div>
                    <div class="card-table-row">
                        <div class="left-view">单株灌溉量</div>
                        <div class="right-view">0-50ml</div>
                    </div>
                    <div class="card-table-row">
                        <div class="left-view">株高</div>
                        <div class="right-view">0-2cm</div>
                    </div>
                    <div class="card-table-row">
                        <div class="left-view">叶面积</div>
                        <div class="right-view">0-1 cm²</div>
                    </div>
                    <div class="card-table-row">
                        <div class="left-view">单株重量</div>
                        <div class="right-view">0-50 g</div>
                    </div>
                    <div class="card-table-row">
                        <div class="left-view">种植时间</div>
                        <div class="right-view">0-5 day</div>
                    </div>
                </div>
                <el-form :model="suggestionForm" label-width="100px" label-position="top" label-suffix=":">
                    <el-form-item label="种植建议">
                        <el-input
                            v-model="suggestionForm.suggestion"
                            clearable
                            :autosize="{ minRows: 3, maxRows: 5 }"
                            placeholder="增加光照，降低温度…"
                            type="textarea"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button>取消</el-button>
                    <el-button type="primary">保存</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForFarmGuide" title="添加种植建议" width="50%" @close="closeFarmGuideDialog">
            <div class="dialog-body">
                <el-form :model="farmGuideForm" label-width="100px" label-suffix=":">
                    <el-form-item label="参考视频">
                        <el-upload
                            v-model:file-list="farmGuideForm.imgList"
                            :action="uploadUrl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <el-icon><Camera /></el-icon>
                            点击上传视频
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="farmGuideForm.title" clearable placeholder="请输入指导标题" />
                    </el-form-item>
                    <el-form-item label="内容标签">
                        <el-input
                            v-model="farmGuideForm.text"
                            clearable
                            :autosize="{ minRows: 3, maxRows: 5 }"
                            placeholder="如：#增加光照"
                            type="textarea"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeFarmGuideDialog">取消</el-button>
                    <el-button type="primary" @click="saveFarmGuide">保存</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForCureGuide" title="添加病虫害防治知道" width="50%" @close="closeCureGuideDialog">
            <div class="dialog-body">
                <el-form :model="cureGuideForm" label-width="100px" label-suffix=":">
                    <el-form-item label="参考视频">
                        <el-upload
                            v-model:file-list="cureGuideForm.imgList"
                            :action="uploadUrl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <el-icon><Camera /></el-icon>
                            点击上传视频
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="cureGuideForm.title" clearable placeholder="请输入指导标题" />
                    </el-form-item>
                    <el-form-item label="内容标签">
                        <el-input
                            v-model="cureGuideForm.text"
                            clearable
                            :autosize="{ minRows: 3, maxRows: 5 }"
                            placeholder="如：#增加光照"
                            type="textarea"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeCureGuideDialog">取消</el-button>
                    <el-button type="primary" @click="saveCureGuide">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {
    uploadUrl,
    saveGrowthStageApi,
    savePlantSuggestionApi,
    saveFarmGuideApi,
    saveCureGuideApi,
    growthStageList,
    suggestionListApi,
    farmGuideListApi,
    cureGuideListApi,
    savePlantModelApi,
    growthStageDetailApi,
    farmGuideDetailApi,
    cureGuideDetailApi,
    suggestionDetailApi,
    plantModelDetailApi,
    growthTypeListApi,
} from "../../request/api.js";
export default {
    name: "Add",
    data() {
        return {
            uploadUrl,
            growthTypeList: [], // 栽培方式
            form: {
                categoryTitle: "",
                varietyTitle: "",
                growthId: "",
            },
            growthStageList: [], // 植物生长阶段列表
            selectedGrowthStage: null, // 已选择的生长阶段
            tableData: [],
            modelForm: {
                // 添加、编辑模型
                phaseName: "",
                imgList: [],
                growPlantModelDetailBos: [
                    {
                        parameterName: "",
                        leastValue: undefined,
                        maxValue: undefined,
                        unit: "",
                    },
                ],
            },
            visibleForModel: false, // 是否展示添加、编辑生长阶段弹框
            visibleForDelModel: false, // 是否展示删除生长阶段弹框
            visibleForSuggestion: false, // 是否展示添加、编辑种植建议弹框
            selectValue: "",
            suggestionForm: {
                suggestion: "",
            },
            visibleForFarmGuide: false, // 是否展示添加、编辑农事指导的弹框
            farmGuideForm: {
                imgList: [],
                title: "",
                text: "",
            },
            farmGuideList: [],
            selectedFarmGuide: null, // 已选的农事指导
            visibleForCureGuide: false, // 是否展示添加、编辑病虫害防治指导的弹框
            cureGuideForm: {
                imgList: [],
                title: "",
                text: "",
            },
            cureGuideList: [],
            selectedCureGuide: null, // 已选的防治病虫害指导
        };
    },
    mounted() {
        this.getGrowthTypeList();
    },
    methods: {
        // 栽培方式列表
        getGrowthTypeList() {
            const params = {};
            growthTypeListApi(params).then((res) => {
                if (res && res.data) {
                    this.growthTypeList = res.data;
                }
            });
        },
        goBack() {
            this.$router.back();
        },
        // 打开添加生长阶段弹框
        openAddGrowthStageDialog(row) {
            if (row) {
                this.selectedGrowthStage = row;
            }
            this.visibleForModel = true;
        },
        // 关闭添加生长阶段弹框
        closeAddGrowthStageDialog() {
            this.visibleForModel = false;
            this.modelForm = {
                // 添加、编辑模型
                phaseName: "",
                imgList: [],
                growPlantModelDetailBos: [
                    {
                        parameterName: "",
                        leastValue: undefined,
                        maxValue: undefined,
                        unit: "",
                    },
                ],
            };
            this.selectedGrowthStage = null;
        },
        // 删除生长阶段
        delGrowthStage(index) {
            this.growthStageList.splice(index, 1);
        },
        // 添加参考指标
        addStandard() {
            this.modelForm.growPlantModelDetailBos.push({
                name: "",
                min: undefined,
                max: undefined,
                unit: "",
            });
        },
        // 删除参考指标
        delStandard(index) {
            this.modelForm.growPlantModelDetailBos.splice(index, 1);
        },
        // 保存生长阶段
        saveGrowthStage() {
            const params = {
                createName: "",
                growModelId: "",
                growPlantModelDetailBos: this.modelForm.growPlantModelDetailBos,
                id: 0,
                image: "",
                phaseName: this.modelForm.phaseName,
            };
            if (this.modelForm.imgList[0]) {
                const response = this.modelForm.imgList[0].response;
                params.video = response && response.data && response.data.imageUrl;
            }
            return saveGrowthStageApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("保存成功");
                    this.growthStageList.push({
                        ...this.modelForm,
                    });
                    this.closeAddGrowthStageDialog();
                } else {
                    this.$message.error(res.message || "保存失败");
                }
            });
        },
        // 打开添加种植参考建议弹框
        openPlantSuggestion(row) {
            console.log(row);
        },
        // 删除种植参考建议
        delPlantSuggestion(index) {
            console.log(index);
        },
        // 打开添加农事指导弹框
        openFarmGuideDialog(row) {
            this.selectedFarmGuide = row;
            this.visibleForFarmGuide = true;
        },
        // 关闭添加农事指导弹框
        closeFarmGuideDialog() {
            this.visibleForFarmGuide = false;
            this.selectedFarmGuide = null;
        },
        // 删除农事指导
        delFarmGuide(index) {
            this.farmGuideList.splice(index, 1);
        },
        // 保存农事指导
        saveFarmGuide() {
            const params = {
                growModelId: "",
                id: 0,
                text: this.farmGuideForm.text,
                title: this.farmGuideForm.title,
                video: "",
            };
            if (this.farmGuideForm.imgList[0]) {
                const response = this.farmGuideForm.imgList[0].response;
                params.video = response && response.data && response.data.imageUrl;
            }
            return saveFarmGuideApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("保存成功");
                    this.farmGuideList.push({
                        ...this.farmGuideForm,
                    });
                    this.closeFarmGuideDialog();
                } else {
                    this.$message.error(res.message || "保存失败");
                }
            });
        },
        // 打开添加农事指导弹框
        openCureGuideDialog(row) {
            this.selectedCureGuide = row;
            this.visibleForCureGuide = true;
        },
        // 关闭添加农事指导弹框
        closeCureGuideDialog() {
            this.visibleForCureGuide = false;
            this.selectedCureGuide = null;
        },
        // 保存防治病虫害指导
        saveCureGuide() {
            const params = {
                growModelId: "",
                id: 0,
                text: this.cureGuideForm.text,
                title: this.cureGuideForm.title,
                video: "",
            };
            if (this.cureGuideForm.imgList[0]) {
                const response = this.cureGuideForm.imgList[0].response;
                params.video = response && response.data && response.data.imageUrl;
            }
            return saveCureGuideApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("保存成功");
                    this.cureGuideList.push({
                        ...this.cureGuideForm,
                    });
                    this.closeCureGuideDialog();
                } else {
                    this.$message.error(res.message || "保存失败");
                }
            });
        },
        // 删除防治病虫害指导
        delCureGuide(index) {
            this.cureGuideList.splice(index, 1);
        },
        // 保存种植模型
        savePlantMode() {
            const params = {
                categoryTitle: this.form.categoryTitle,
                growAdviseIds: "",
                growModelIds: "",
                growOperationGuideIds: "",
                growPreventionGuideIds: "",
                growthId: this.form.growthId,
                growthName: "",
                id: 0,
                varietyTitle: this.form.varietyTitle,
            };
            return savePlantModelApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("保存成功");
                    this.$router.back();
                } else {
                    this.$message.error(res.message || "保存失败");
                }
            });
        },
    },
};
</script>

<style lang="less">
.add-plant-model-wrapper {
    padding: 10px 30px;
    background: #fff;
    .btn-back {
        // color: #1890FF;
    }
    .title {
        font-size: 16px;
        font-weight: 500;
    }
    .content {
        margin-top: 20px;
        .section {
            &-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0;
                font-size: 14px;
                color: #333;
                font-weight: 500;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                .tips {
                    font-size: 12px;
                    color: #c8c8c8;
                }
            }
            &-table {
                .btn {
                    font-size: 18px;
                    color: #1890ff;
                    .icon {
                        margin-left: 5px;
                        cursor: pointer;
                    }
                }
            }
            .guide-list {
                display: flex;
                .guide-item {
                    margin-top: 10px;
                    margin-right: 20px;
                    &-img {
                        position: relative;
                        width: 200px;
                        height: 140px;
                        border-radius: 6px;
                        .img {
                            width: 100%;
                            height: 100%;
                        }
                        .btn-play {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 36px;
                            height: 36px;
                            background: url("../../assets/img/icon-bofang.png") center no-repeat;
                            background-size: contain;
                            transform: translate(-50%, -50%);
                            z-index: 9;
                        }
                        .btns {
                            position: absolute;
                            top: 10px;
                            right: 12px;
                            z-index: 9;
                            font-size: 14px;
                            color: #1890ff;
                            .icon {
                                margin-left: 5px;
                                cursor: pointer;
                            }
                        }
                    }
                    .title {
                        margin-top: 5px;
                        font-size: 14px;
                    }
                    .desc-div {
                        margin-top: 10px;
                        padding: 5px 15px;
                        background: #caf982;
                    }
                }
            }
        }
        .card-list {
            display: flex;
            padding: 10px;
            .card-item {
                width: 192px;
                border-radius: 4px;
                border: 1px solid #e2e2e2;
                font-size: 12px;
                color: #333;
                .card-header {
                    &-title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        .left-view {
                        }
                        .right-view {
                            font-size: 18px;
                            color: #1890ff;
                            .icon {
                                margin-left: 5px;
                                cursor: pointer;
                            }
                        }
                    }
                    &-img {
                        padding: 10px 20px;
                        .img {
                            width: 144px;
                            height: 108px;
                        }
                    }
                }
                .card-table {
                    &-row {
                        display: flex;
                        height: 30px;
                        border-top: 1px solid #e2e2e2;
                        .left-view {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-basis: 50%;
                            box-sizing: border-box;
                            border-right: 1px solid #e2e2e2;
                        }
                        .right-view {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-basis: 50%;
                        }
                    }
                }
            }
        }
    }
    .dialog-body {
        .standard-list {
            .standard-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                &-content {
                    display: flex;
                    align-items: center;
                    margin-left: 15px;
                    .label {
                        flex-shrink: 0;
                    }
                    .input {
                        width: 140px;
                    }
                    .line {
                        margin: 0 5px;
                    }
                    .input-number {
                        width: 80px;
                    }
                    .input-unit {
                        margin-left: 5px;
                        width: 80px;
                    }
                    .icon {
                        font-size: 18px;
                        color: #6b91f2;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }
            }
        }
        .card-table {
            margin-bottom: 10px;
            border-left: 1px solid #e2e2e2;
            border-right: 1px solid #e2e2e2;
            border-bottom: 1px solid #e2e2e2;
            &-row {
                display: flex;
                height: 30px;
                border-top: 1px solid #e2e2e2;
                .left-view {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-basis: 50%;
                    box-sizing: border-box;
                    border-right: 1px solid #e2e2e2;
                }
                .right-view {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-basis: 50%;
                    .select {
                        width: 100%;
                    }
                }
            }
        }
    }
    .dialog-content {
        display: flex;
        align-items: center;
        .left-view {
            font-size: 40px;
            color: #f59103;
        }
        .right-view {
            margin-left: 20px;
            .title {
                font-size: 14px;
                color: #f59103;
                &-item {
                    margin-right: 20px;
                }
            }
            .desc {
                margin-top: 5px;
            }
        }
    }
}
</style>
