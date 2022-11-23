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
            <el-form ref="form" :inline="true" :model="form" :rules="rules" class="form">
                <el-form-item label="种植类型" prop="categoryTitle">
                    <el-input v-model="form.categoryTitle" placeholder="请输入种植类型" />
                </el-form-item>
                <el-form-item label="种植品种" prop="varietyTitle">
                    <el-input v-model="form.varietyTitle" placeholder="请输入种植品种" />
                </el-form-item>
                <el-form-item label="培育方式" prop="growthId">
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
                        <el-button plain type="primary" icon="CirclePlus" @click="openAddGrowthStageDialog(null)"
                            >添加</el-button
                        >
                    </div>
                </div>
                <div class="card-list">
                    <div
                        v-for="(item, index) in growthStageList"
                        class="card-item"
                        :class="{ 'card-item-active': index === selectedGrowthStageIndex }"
                        :key="index"
                        @click="selectGrowthStage(index)"
                    >
                        <div class="card-header">
                            <div class="card-header-title">
                                <div class="left-view">阶段{{ index + 1 }}：{{ item.phaseName }}</div>
                                <div class="right-view">
                                    <el-icon class="icon" @click="openAddGrowthStageDialog(item, $event)"
                                        ><Edit
                                    /></el-icon>
                                    <el-icon class="icon" @click="delGrowthStage(index, $event)"><Delete /></el-icon>
                                </div>
                            </div>
                            <div class="card-header-img">
                                <el-image class="img" :src="item.image" fit="cover" />
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
                        <el-button plain type="primary" icon="CirclePlus" @click="openPlantSuggestion(null)"
                            >添加</el-button
                        >
                    </div>
                </div>
                <el-table class="section-table" :data="tableData" max-height="500" :cell-class-name="getCellClassName">
                    <el-table-column
                        v-for="(item, index) in standardList"
                        :key="index"
                        :label="item.parameterName"
                        width="120"
                    >
                        <template #default="scope">
                            <span>{{ getStatusText(scope.row[item.parameterName]) }}</span>
                            <span v-if="scope.row[item.parameterName] === 0" class="icon-low"></span>
                            <span v-if="scope.row[item.parameterName] === 2" class="icon-high"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="种植建议" prop="text"></el-table-column>
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
                        <el-button plain type="primary" icon="CirclePlus" @click="openFarmGuideDialog(null)"
                            >添加</el-button
                        >
                    </div>
                </div>
                <div class="guide-list">
                    <div v-for="(item, index) in farmGuideList" class="guide-item" :key="index">
                        <div v-for="child in item.imgList" class="guide-item-img" :key="child.url">
                            <video v-if="isVideo(child.url)" class="video" :src="child.url" controls></video>
                            <el-image v-else class="img" :src="child.url" fit="cover" />
                            <!-- <div class="btn-play"></div> -->
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
                        <el-button plain type="primary" icon="CirclePlus" @click="openCureGuideDialog(null)"
                            >添加</el-button
                        >
                    </div>
                </div>
                <div class="guide-list">
                    <div v-for="(item, index) in cureGuideList" class="guide-item" :key="index">
                        <div v-for="child in item.imgList" class="guide-item-img" :key="child.url">
                            <video v-if="isVideo(child.url)" class="video" :src="child.url" controls></video>
                            <el-image v-else class="img" :src="child.url" fit="cover" />
                            <!-- <div class="btn-play"></div> -->
                            <div class="btns">
                                <el-icon class="icon" @click="openCureGuideDialog(item)"><Edit /></el-icon>
                                <el-icon class="icon" @click="delCureGuide(index)"><Delete /></el-icon>
                            </div>
                        </div>
                        <div class="title">{{ item.title }}</div>
                        <div class="desc-div">{{ item.text }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-button plain @click="goBack">取消</el-button>
            <el-button class="btn-save" type="primary" @click="savePlantModel">保存</el-button>
        </div>
        <el-dialog
            v-model="visibleForModel"
            :title="isEditForGrowthStage ? '编辑生长阶段' : '添加生长阶段'"
            width="50%"
            :close-on-click-modal="false"
            @close="closeAddGrowthStageDialog"
        >
            <div class="dialog-body">
                <el-form :model="modelForm" label-width="80px" label-suffix=":">
                    <el-form-item label="阶段名称">
                        <el-input
                            v-model="modelForm.phaseName"
                            clearable
                            placeholder="请输入阶段名称"
                            :maxlength="64"
                        />
                    </el-form-item>
                    <el-form-item label="参考图">
                        <el-upload
                            v-if="modelForm.imgList.length === 0"
                            v-model:file-list="modelForm.imgList"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :limit="1"
                        >
                            <div class="btn-upload">
                                <el-icon><Camera /></el-icon>
                                <div>添加参考图</div>
                            </div>
                        </el-upload>
                        <div class="img-list">
                            <div v-for="(item, index) in modelForm.imgList" class="img-item" :key="index">
                                <el-icon class="icon" @click="delImgForGrowthStage(index)"><Delete /></el-icon>
                                <el-image
                                    class="img"
                                    :src="item.response && item.response.data && item.response.data.imageUrl"
                                    fit="cover"
                                />
                            </div>
                        </div>
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
                                <el-input
                                    class="input"
                                    v-model="item.parameterName"
                                    :readonly="index === 0"
                                    placeholder="请输入名称"
                                />
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
        <el-dialog v-model="visibleForDelModel" title="删除生长阶段" width="40%" :close-on-click-modal="false">
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
        <el-dialog
            v-model="visibleForSuggestion"
            :close-on-click-modal="false"
            :title="isEditForSuggestion ? '编辑种植建议' : '添加种植建议'"
            width="30%"
        >
            <div class="dialog-body">
                <div class="card-table">
                    <div class="card-table-row">
                        <div class="left-view">参数名</div>
                        <div class="right-view">选择实际偏离</div>
                    </div>
                    <div v-for="(item, index) in standardList" class="card-table-row" :key="index">
                        <div class="left-view">{{ item.parameterName }}</div>
                        <div class="right-view">
                            <el-select class="select" v-model="item.status" placeholder="请选择">
                                <el-option class="low" label="偏低" :value="0">
                                    <span>偏低</span>
                                </el-option>
                                <el-option class="normal" label="正常" :value="1">
                                    <span>正常</span>
                                </el-option>
                                <el-option class="high" label="偏高" :value="2">
                                    <span>偏高</span>
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <el-form :model="suggestionForm" label-width="100px" label-position="top" label-suffix=":">
                    <el-form-item label="种植建议">
                        <el-input
                            v-model="suggestionForm.suggestion"
                            clearable
                            :autosize="{ minRows: 3, maxRows: 5 }"
                            placeholder="*种植建议中的关键词，可作为农事操作指导和病虫害防治的内容标签"
                            type="textarea"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closePlantSuggestion">取消</el-button>
                    <el-button type="primary" @click="savePlantSuggestion">保存</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="visibleForFarmGuide"
            :title="isEditForFarmGuide ? '编辑农事指导' : '添加农事指导'"
            width="35%"
            :close-on-click-modal="false"
            @close="closeFarmGuideDialog"
        >
            <div class="dialog-body">
                <el-form :model="farmGuideForm" label-width="100px" label-suffix=":">
                    <el-form-item label="参考视频">
                        <el-upload
                            v-if="farmGuideForm.imgList.length === 0"
                            v-model:file-list="farmGuideForm.imgList"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :limit="1"
                        >
                            <div class="btn-upload">
                                <el-icon><Camera /></el-icon>
                                点击上传视频
                            </div>
                        </el-upload>
                        <div class="img-list">
                            <div v-for="(item, index) in farmGuideForm.imgList" class="img-item" :key="index">
                                <el-icon class="icon" @click="delImgForFarmGuide(index)"><Delete /></el-icon>
                                <video
                                    class="video"
                                    :src="item.response && item.response.data && item.response.data.imageUrl"
                                    controls
                                ></video>
                            </div>
                        </div>
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
        <el-dialog
            v-model="visibleForCureGuide"
            :title="isEditForCureGuide ? '编辑病虫害防治指导' : '添加病虫害防治指导'"
            width="35%"
            :close-on-click-modal="false"
            @close="closeCureGuideDialog"
        >
            <div class="dialog-body">
                <el-form :model="cureGuideForm" label-width="100px" label-suffix=":">
                    <el-form-item label="参考视频">
                        <el-upload
                            v-if="cureGuideForm.imgList.length === 0"
                            v-model:file-list="cureGuideForm.imgList"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :limit="1"
                        >
                            <div class="btn-upload">
                                <el-icon><Camera /></el-icon>
                                点击上传视频
                            </div>
                        </el-upload>
                        <div class="img-list">
                            <div v-for="(item, index) in cureGuideForm.imgList" class="img-item" :key="index">
                                <el-icon class="icon" @click="delImgForCureGuide(index)"><Delete /></el-icon>
                                <video
                                    class="video"
                                    :src="item.response && item.response.data && item.response.data.imageUrl"
                                    controls
                                ></video>
                            </div>
                        </div>
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
    growthStageListApi,
    suggestionListApi,
    farmGuideListApi,
    cureGuideListApi,
    savePlantModelApi,
    plantModelDetailApi,
    growthTypeListApi,
    standardListApi,
} from "../../request/api.js";
export default {
    name: "Add",
    data() {
        return {
            plantModelId: "", // 种植模型ID
            uploadUrl,
            growthTypeList: [], // 栽培方式
            form: {
                categoryTitle: "",
                varietyTitle: "",
                growthId: "",
            },
            growthStageList: [], // 植物生长阶段列表
            selectedGrowthStageIndex: -1, // 已选择的生长阶段索引
            standardList: [], // 生长阶段下的参数列表
            tableList: [],
            isEditForGrowthStage: false, // 是否编辑生长阶段
            modelForm: {
                // 添加、编辑模型
                id: 0,
                phaseName: "",
                imgList: [],
                growPlantModelDetailBos: [
                    {
                        parameterName: "种植天数",
                        leastValue: undefined,
                        maxValue: undefined,
                        unit: "",
                    },
                ],
            },
            visibleForModel: false, // 是否展示添加、编辑生长阶段弹框
            visibleForDelModel: false, // 是否展示删除生长阶段弹框
            visibleForSuggestion: false, // 是否展示添加、编辑种植建议弹框
            isEditForSuggestion: false, // 是否编辑种植建议
            suggestionForm: {
                suggestion: "",
            },
            visibleForFarmGuide: false, // 是否展示添加、编辑农事指导的弹框
            isEditForFarmGuide: false, // 是否编辑农事指导
            farmGuideForm: {
                id: 0,
                imgList: [],
                title: "",
                text: "",
            },
            farmGuideList: [],
            visibleForCureGuide: false, // 是否展示添加、编辑病虫害防治指导的弹框
            isEditForCureGuide: false, // 是否编辑防治病虫害指导
            cureGuideForm: {
                id: 0,
                imgList: [],
                title: "",
                text: "",
            },
            cureGuideList: [],
            rules: {
                categoryTitle: [{ required: true, message: "请输入种植类型", trigger: "blur" }],
                varietyTitle: [{ required: true, message: "请输入种植品种", trigger: "blur" }],
                growthId: [{ required: true, message: "请选择培育方式", trigger: "change" }],
            },
        };
    },
    computed: {
        tableData() {
            let tableData = [];
            this.tableList.forEach((item) => {
                if (item.growPlantAdviseDetailBos) {
                    item.growPlantAdviseDetailBos.forEach((child) => {
                        item[child.parameterName] = child.status;
                    });
                }
                tableData.push(item);
            });
            return tableData;
        },
    },
    mounted() {
        this.plantModelId = this.$route.query.id;
        this.getGrowthTypeList();
        // 编辑
        if (this.plantModelId) {
            this.getPlantModelDetail();
            this.getGrowthStageList().then(() => {
                if (this.growthStageList.length > 0) {
                    this.selectedGrowthStageIndex = 0;
                    this.getStandardList();
                    this.getPlantSuggestionList();
                }
            });
            this.getFarmGuideList();
            this.getCureGuideList();
        }
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
        // 获取种植模型详情
        getPlantModelDetail() {
            const params = {
                id: this.plantModelId,
            };
            return plantModelDetailApi(params).then((res) => {
                if (res && res.data) {
                    this.form = {
                        categoryTitle: res.data.categoryTitle,
                        varietyTitle: res.data.varietyTitle,
                        growthId: res.data.growthId,
                    };
                }
            });
        },
        // 获取生长阶段列表
        getGrowthStageList() {
            const params = {
                id: this.plantModelId,
            };
            return growthStageListApi(params).then((res) => {
                if (res && res.data) {
                    this.growthStageList = res.data;
                }
            });
        },
        // 获取当前生长阶段的种植建议列表
        getPlantSuggestionList() {
            if (this.growthStageList.length === 0) {
                console.log("生长阶段列表为空");
                return;
            }
            if (this.selectedGrowthStageIndex === -1) {
                console.log("请先选择生长阶段");
                return;
            }
            const params = {
                id: this.plantModelId,
                growPlantId: this.growthStageList[this.selectedGrowthStageIndex].id,
            };
            return suggestionListApi(params).then((res) => {
                if (res && res.data) {
                    this.tableList = res.data;
                }
            });
        },
        // 获取农事指导列表
        getFarmGuideList() {
            const params = {
                id: this.plantModelId,
            };
            return farmGuideListApi(params).then((res) => {
                if (res && res.data) {
                    this.farmGuideList = res.data.map((item) => {
                        item.imgList = [
                            {
                                url: item.video,
                                response: {
                                    data: {
                                        imageUrl: item.video,
                                    },
                                },
                            },
                        ];
                        return item;
                    });
                }
            });
        },
        // 获取农事指导列表
        getCureGuideList() {
            const params = {
                id: this.plantModelId,
            };
            return cureGuideListApi(params).then((res) => {
                if (res && res.data) {
                    this.cureGuideList = res.data.map((item) => {
                        item.imgList = [
                            {
                                url: item.video,
                                response: {
                                    data: {
                                        imageUrl: item.video,
                                    },
                                },
                            },
                        ];
                        return item;
                    });
                }
            });
        },
        // 选择生长阶段
        selectGrowthStage(index) {
            this.tableList = [];
            this.selectedGrowthStageIndex = index;
            this.getStandardList();
            this.getPlantSuggestionList();
        },
        // 打开添加生长阶段弹框
        openAddGrowthStageDialog(row, e) {
            if (e) {
                e.stopPropagation();
            }
            if (row) {
                this.isEditForGrowthStage = true;
                this.modelForm = {
                    id: row.id,
                    phaseName: row.phaseName,
                    imgList: [
                        {
                            url: row.image,
                            response: {
                                data: {
                                    imageUrl: row.image,
                                },
                            },
                        },
                    ],
                    growPlantModelDetailBos: row.growPlantModelDetailBos.map((item) => {
                        return {
                            ...item,
                        };
                    }),
                };
            }
            this.visibleForModel = true;
        },
        // 关闭添加生长阶段弹框
        closeAddGrowthStageDialog() {
            this.visibleForModel = false;
            this.isEditForGrowthStage = false;
            this.modelForm = {
                // 添加、编辑模型
                id: 0,
                phaseName: "",
                imgList: [],
                growPlantModelDetailBos: [
                    {
                        parameterName: "种植天数",
                        leastValue: undefined,
                        maxValue: undefined,
                        unit: "",
                    },
                ],
            };
        },
        // 删除生长阶段
        delGrowthStage(index, e) {
            e.stopPropagation();
            this.$confirm("确认删除此生长阶段吗？", "删除生长阶段", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.growthStageList.splice(index, 1);
                })
                .catch(() => {
                    console.log("取消");
                });
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
        // 删除生长阶段的图片
        delImgForGrowthStage(index) {
            this.modelForm.imgList.splice(index, 1);
        },
        // 保存生长阶段
        saveGrowthStage() {
            if (
                this.modelForm.growPlantModelDetailBos.some(
                    (item) => !item.parameterName || !item.leastValue || !item.maxValue || !item.unit
                )
            ) {
                this.$message.warning("请填写完整的参考指标(参数名、最大/小值、单位)！");
                return;
            }
            const params = {
                createName: "",
                growModelId: this.plantModelId,
                growPlantModelDetailBos: this.modelForm.growPlantModelDetailBos,
                id: this.modelForm.id,
                image: "",
                phaseName: this.modelForm.phaseName,
            };
            if (this.modelForm.imgList[0]) {
                const response = this.modelForm.imgList[0].response;
                params.image = response && response.data && response.data.imageUrl;
            }
            return saveGrowthStageApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("保存成功");
                    const index = this.growthStageList.findIndex((item) => item.id === res.data.id);
                    // 编辑去重
                    if (index !== -1) {
                        this.growthStageList.splice(index, 1, res.data);
                    } else {
                        this.growthStageList.push(res.data);
                    }
                    this.closeAddGrowthStageDialog();
                } else {
                    this.$message.error(res.message || "保存失败");
                }
            });
        },
        // 获取生长阶段下的参数列表
        getStandardList() {
            if (this.growthStageList.length === 0) {
                return;
            }
            if (this.selectedGrowthStageIndex === -1) {
                console.log("请选择生长阶段");
                return;
            }
            const params = {
                growPlantId: this.growthStageList[this.selectedGrowthStageIndex].id,
            };
            return standardListApi(params).then((res) => {
                if (res && res.data) {
                    this.standardList = res.data.map((item) => {
                        return {
                            parameterName: item.title,
                            status: 1,
                        };
                    });
                } else {
                    this.$message.error(res.message || "获取参数列表失败");
                }
            });
        },
        // 打开添加种植参考建议弹框
        openPlantSuggestion(row) {
            if (this.growthStageList.length === 0) {
                this.$message.warning("请先添加生长阶段");
                return;
            }
            if (this.selectedGrowthStageIndex === -1) {
                this.$message.warning("请选择生长阶段");
                return;
            }
            this.getStandardList().then(() => {
                if (row) {
                    this.isEditForSuggestion = true;
                    this.suggestionForm = {
                        id: row.id,
                        suggestion: row.text,
                    };
                    this.standardList = row.growPlantAdviseDetailBos;
                }
                this.visibleForSuggestion = true;
            });
        },
        // 关闭种植参考建议弹框
        closePlantSuggestion() {
            this.visibleForSuggestion = false;
            this.isEditForSuggestion = false;
            this.suggestionForm = {
                suggestion: "",
            };
        },
        // 删除种植参考建议
        delPlantSuggestion(index) {
            this.$confirm("确认删除该条种植建议吗？", "删除种植建议", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.tableList.splice(index, 1);
                })
                .catch(() => {
                    console.log("取消");
                });
        },
        // 保存种植参考建议
        savePlantSuggestion() {
            const params = {
                createName: "",
                growModelId: this.plantModelId,
                growPlantModelId: this.growthStageList[this.selectedGrowthStageIndex].id,
                growPlantAdviseDetailBos: this.standardList,
                id: this.suggestionForm.id,
                text: this.suggestionForm.suggestion,
            };
            return savePlantSuggestionApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("保存成功");
                    // 去重
                    const index = this.tableList.findIndex((item) => item.id === this.suggestionForm.id);
                    if (index === -1) {
                        this.tableList.push(res.data);
                    } else {
                        this.tableList.splice(index, 1, res.data);
                    }
                    this.closePlantSuggestion();
                } else {
                    this.$message.error(res.message || "保存失败");
                }
            });
        },
        // 打开添加农事指导弹框
        openFarmGuideDialog(row) {
            if (row) {
                this.isEditForFarmGuide = true;
                this.farmGuideForm = {
                    ...row,
                };
            }
            this.visibleForFarmGuide = true;
        },
        // 关闭添加农事指导弹框
        closeFarmGuideDialog() {
            this.visibleForFarmGuide = false;
            this.isEditForFarmGuide = false;
            this.farmGuideForm = {
                id: 0,
                imgList: [],
                title: "",
                text: "",
            };
        },
        // 删除农事指导
        delFarmGuide(index) {
            this.$confirm("确认删除该农事指导吗？", "删除", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.farmGuideList.splice(index, 1);
                })
                .catch(() => {
                    console.log("取消");
                });
        },
        // 删除农事指导的视频
        delImgForFarmGuide(index) {
            this.farmGuideForm.imgList.splice(index, 1);
        },
        // 保存农事指导
        saveFarmGuide() {
            const params = {
                growModelId: this.plantModelId,
                id: this.farmGuideForm.id,
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
                    const index = this.farmGuideList.findIndex((item) => item.id === this.farmGuideForm.id);
                    const item = {
                        ...res.data,
                        imgList: [
                            {
                                url: res.data.video,
                                response: {
                                    data: {
                                        imageUrl: res.data.video,
                                    },
                                },
                            },
                        ],
                    };
                    if (index === -1) {
                        this.farmGuideList.push(item);
                    } else {
                        this.farmGuideList.splice(index, 1, item);
                    }
                    this.closeFarmGuideDialog();
                } else {
                    this.$message.error(res.message || "保存失败");
                }
            });
        },
        // 打开添加农事指导弹框
        openCureGuideDialog(row) {
            if (row) {
                this.isEditForCureGuide = true;
                this.cureGuideForm = {
                    ...row,
                };
            }
            this.visibleForCureGuide = true;
        },
        // 关闭添加农事指导弹框
        closeCureGuideDialog() {
            this.visibleForCureGuide = false;
            this.isEditForCureGuide = false;
            this.cureGuideForm = {
                id: 0,
                imgList: [],
                title: "",
                text: "",
            };
        },
        // 保存防治病虫害指导
        saveCureGuide() {
            const params = {
                growModelId: this.plantModelId,
                id: this.cureGuideForm.id,
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
                    const index = this.cureGuideList.findIndex((item) => item.id === this.cureGuideForm.id);
                    const item = {
                        ...res.data,
                        imgList: [
                            {
                                url: res.data.video,
                                response: {
                                    data: {
                                        imageUrl: res.data.video,
                                    },
                                },
                            },
                        ],
                    };
                    if (index === -1) {
                        this.cureGuideList.push(item);
                    } else {
                        this.cureGuideList.splice(index, 1, item);
                    }
                    this.closeCureGuideDialog();
                } else {
                    this.$message.error(res.message || "保存失败");
                }
            });
        },
        // 删除防治病虫害指导
        delCureGuide(index) {
            this.$confirm("确认删除该防治病虫害指导吗？", "删除", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.cureGuideList.splice(index, 1);
                })
                .catch(() => {
                    console.log("取消");
                });
        },
        // 删除防治病虫害的视频
        delImgForCureGuide(index) {
            this.cureGuideForm.imgList.splice(index, 1);
        },
        // 保存种植模型
        savePlantModel() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const params = {
                        categoryTitle: this.form.categoryTitle,
                        growAdviseIds: "",
                        growModelIds: "",
                        growOperationGuideIds: "",
                        growPreventionGuideIds: "",
                        growthId: this.form.growthId,
                        growthName: "",
                        id: this.plantModelId,
                        varietyTitle: this.form.varietyTitle,
                    };
                    const growthTypeItem = this.growthTypeList.find((item) => item.id === this.form.growthId);
                    params.growthName = growthTypeItem && growthTypeItem.title;
                    // 生长阶段
                    if (this.growthStageList.length > 0) {
                        params.growModelIds = this.growthStageList.map((item) => item.id).join(",");
                    }
                    // 农事指导
                    if (this.farmGuideList.length > 0) {
                        params.growOperationGuideIds = this.farmGuideList.map((item) => item.id).join(",");
                    }
                    // 防治病虫害
                    if (this.cureGuideList.length > 0) {
                        params.growPreventionGuideIds = this.cureGuideList.map((item) => item.id).join(",");
                    }
                    return savePlantModelApi(params).then((res) => {
                        if (res && res.code === "200") {
                            this.$message.success("保存成功");
                            this.$router.back();
                        } else {
                            this.$message.error(res.message || "保存失败");
                        }
                    });
                }
            });
        },
        // 获取状态文案
        getStatusText(status) {
            const list = [
                {
                    label: "偏低",
                    value: 0,
                },
                {
                    label: "正常",
                    value: 1,
                },
                {
                    label: "偏高",
                    value: 2,
                },
            ];
            const item = list.find((item) => item.value === status);
            return item ? item.label : status;
        },
        // 设置单元格的样式
        getCellClassName({ row, column }) {
            const key = column.label;
            const state = row[key];
            const stateObj = {
                0: "cell-low",
                1: "cell-normal",
                2: "cell-high",
            };
            return stateObj[state] || "";
        },
        // 是否为视频
        isVideo(url) {
            const videoReg = /.(mp4|MP4|3gp|3GP)$/;
            return videoReg.test(url);
        },
    },
};
</script>

<style>
.icon-low {
    display: inline-block;
    width: 9px;
    height: 13px;
    background: url("../../assets/img/img-xia.png") center no-repeat;
    background-size: contain;
    vertical-align: middle;
}
.icon-high {
    display: inline-block;
    width: 9px;
    height: 13px;
    background: url("../../assets/img/img-shang.png") center no-repeat;
    background-size: contain;
    vertical-align: middle;
}
.cell-low {
    background: #ff7373;
}
.cell-high {
    background: #caf982;
}
</style>

<style lang="less">
.add-plant-model-wrapper {
    padding: 10px 30px;
    background: #fff;
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
                font-weight: 600;
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
                flex-wrap: wrap;
                .guide-item {
                    flex-shrink: 0;
                    margin-top: 15px;
                    margin-right: 20px;
                    width: 200px;
                    &-img {
                        position: relative;
                        width: 100%;
                        height: 140px;
                        border-radius: 6px;
                        background-color: #f0f0f0;
                        .img {
                            width: 100%;
                            height: 100%;
                        }
                        .video {
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
                            font-size: 18px;
                            color: #1890ff;
                            .icon {
                                margin-left: 5px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                &:hover {
                                    transform: scale(1.2);
                                }
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
                        font-size: 12px;
                        background: #caf982;
                    }
                }
            }
        }
        .card-list {
            display: flex;
            flex-wrap: nowrap;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
            overflow: auto;
            .card-item {
                margin-right: 20px;
                width: 192px;
                border-radius: 4px;
                border: 1px solid #e2e2e2;
                font-size: 12px;
                color: #333;
                &-active {
                    box-shadow: 0px 0px 10px 0px rgba(83, 141, 255, 0.26);
                    border: 1px solid #538dff;
                }
                .card-header {
                    &-title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        .right-view {
                            flex-shrink: 0;
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
    .footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
        padding: 15px;
        border-top: 1px solid #eee;
        .btn-save {
            margin-left: 20px;
        }
    }
    .dialog-body {
        .btn-upload {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 148px;
            height: 148px;
            border: 1px dashed #ccc;
            border-radius: 6px;
            background: #fafafa;
        }
        .img-list {
            display: flex;
            flex-wrap: wrap;
            .img-item {
                position: relative;
                flex-shrink: 0;
                margin-right: 15px;
                margin-bottom: 15px;
                width: 150px;
                height: 150px;
                border-radius: 6px;
                .img {
                    width: 100%;
                    height: 100%;
                }
                .video {
                    width: 100%;
                    height: 100%;
                }
                .icon {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 18px;
                    color: #999;
                    cursor: pointer;
                    z-index: 2;
                }
            }
        }
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
