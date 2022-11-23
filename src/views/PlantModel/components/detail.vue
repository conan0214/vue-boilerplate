<template>
    <div class="plant-model-detail-wrapper">
        <el-dialog
            v-model="visible"
            title="种植模型详情"
            width="50%"
            :close-on-click-modal="false"
            @close="closeDialog"
        >
            <div class="content">
                <el-form ref="form" :inline="true" label-suffix="：" class="form">
                    <el-form-item label="种植类型">
                        {{ detailInfo.categoryTitle }}
                    </el-form-item>
                    <el-form-item label="种植品种">
                        {{ detailInfo.varietyTitle }}
                    </el-form-item>
                    <el-form-item label="培育方式">
                        {{ detailInfo.growthName }}
                    </el-form-item>
                </el-form>
                <div class="section">
                    <div class="section-title">
                        <div class="left-view">植物生长模型</div>
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
                        <div class="left-view">种植参考建议</div>
                    </div>
                    <el-table
                        class="section-table"
                        :data="tableData"
                        max-height="500"
                        :cell-class-name="getCellClassName"
                    >
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
                    </el-table>
                </div>
                <div class="section">
                    <div class="section-title">
                        <div class="left-view">农事操作指导</div>
                    </div>
                    <div class="guide-list">
                        <div v-for="(item, index) in farmGuideList" class="guide-item" :key="index">
                            <div v-for="child in item.imgList" class="guide-item-img" :key="child.url">
                                <video v-if="isVideo(child.url)" class="video" :src="child.url" controls></video>
                                <el-image v-else class="img" :src="child.url" fit="cover" />
                                <!-- <div class="btn-play"></div> -->
                            </div>
                            <div class="title">{{ item.title }}</div>
                            <div class="desc-div">{{ item.text }}</div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="section-title">
                        <div class="left-view">病虫害防治</div>
                    </div>
                    <div class="guide-list">
                        <div v-for="(item, index) in cureGuideList" class="guide-item" :key="index">
                            <div v-for="child in item.imgList" class="guide-item-img" :key="child.url">
                                <video v-if="isVideo(child.url)" class="video" :src="child.url" controls></video>
                                <el-image v-else class="img" :src="child.url" fit="cover" />
                                <!-- <div class="btn-play"></div> -->
                            </div>
                            <div class="title">{{ item.title }}</div>
                            <div class="desc-div">{{ item.text }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">关闭</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {
    growthStageListApi,
    suggestionListApi,
    farmGuideListApi,
    cureGuideListApi,
    plantModelDetailApi,
    standardListApi,
} from "../../../request/api.js";
export default {
    name: "PlantModelDetail",
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
        plantModelId: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            visible: false,
            detailInfo: {}, // 种植模型详情
            selectedGrowthStageIndex: -1, // 已选择的生长阶段索引
            growthStageList: [], // 植物生长阶段列表
            standardList: [], // 生长阶段下的参数列表
            tableList: [],
            farmGuideList: [],
            cureGuideList: [],
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
    watch: {
        isShow(newVal) {
            this.visible = newVal;
            if (newVal) {
                // 详情
                if (this.plantModelId) {
                    this.getPlantModelDetail();
                    this.getGrowthStageList().then(() => {
                        if (this.growthStageList.length > 0) {
                            this.selectedGrowthStageIndex = 0;
                            this.getStandardList();
                            this.getPlantSuggestionList();
                        }
                    });
                    this.getPlantSuggestionList();
                    this.getFarmGuideList();
                    this.getCureGuideList();
                }
            }
        },
    },
    methods: {
        // 获取种植模型详情
        getPlantModelDetail() {
            const params = {
                id: this.plantModelId,
            };
            return plantModelDetailApi(params).then((res) => {
                if (res && res.data) {
                    this.detailInfo = res.data;
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
        // 获取种植建议列表
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
        // 选择生长阶段
        selectGrowthStage(index) {
            this.tableList = [];
            this.selectedGrowthStageIndex = index;
            this.getStandardList();
            this.getPlantSuggestionList();
        },
        closeDialog() {
            this.$emit("close");
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
    background: url("../../../assets/img/img-xia.png") center no-repeat;
    background-size: contain;
    vertical-align: middle;
}
.icon-high {
    display: inline-block;
    width: 9px;
    height: 13px;
    background: url("../../../assets/img/img-shang.png") center no-repeat;
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
.plant-model-detail-wrapper {
    padding: 10px 30px;
    background: #fff;
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
                            background: url("../../../assets/img/icon-bofang.png") center no-repeat;
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
}
</style>
