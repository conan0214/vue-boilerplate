<template>
    <div class="index-wrapper">
        <div class="search-wrapper">
            <el-input v-model="plantModelForm.keyWords" class="search-input" placeholder="请输入作物种类/作物品种" />
            <div class="search-item">
                <div class="search-item-lable">模型状态</div>
                <el-select v-model="plantModelForm.status" class="search-select" placeholder="请选择">
                    <el-option v-for="item in statusList" :label="item.label" :value="item.value" :key="item.value" />
                </el-select>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" icon="CirclePlus" @click="addPlantModel">创建模型</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="植物模型列表" name="plantModelTab">
                <el-table :data="plantModelList" style="width: 100%">
                    <el-table-column type="index" fixed="left"></el-table-column>
                    <el-table-column label="植物种类" prop="categoryTitle" width="120" fixed="left"></el-table-column>
                    <el-table-column label="植物品种" prop="varietyTitle" width="150"></el-table-column>
                    <el-table-column label="栽培方式" width="120">
                        <template #default="scope">
                            {{ scope.row.growthName }}
                        </template>
                    </el-table-column>
                    <el-table-column label="模型状态" prop="stateText" width="120">
                        <template #default="scope">
                            <span :class="getStatusClassName(scope.row.state)">{{ scope.row.stateText }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createName" width="180"></el-table-column>
                    <el-table-column label="操作时间" prop="updateTime" width="180"></el-table-column>
                    <el-table-column label="操作" width="200" fixed="right">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="openDetailDialog(scope.row)"
                                >查看详情</el-button
                            >
                            <el-button
                                v-if="scope.row.state === 0"
                                link
                                type="primary"
                                size="small"
                                @click="openStopAndStartDialog(scope.row)"
                                >停用</el-button
                            >
                            <el-button
                                v-if="scope.row.state === 1"
                                link
                                type="primary"
                                size="small"
                                @click="openStopAndStartDialog(scope.row)"
                                >启用</el-button
                            >
                            <el-button link type="primary" size="small" @click="editPlantModel(scope.row)"
                                >编辑</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-div">
                    <el-pagination
                        class="pagination"
                        v-model:currentPage="plantModelForm.currentPage"
                        v-model:page-size="plantModelForm.pageSize"
                        :page-sizes="[10, 20, 30, 40]"
                        background
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="plantModelForm.total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            v-model="visibleForStopAndStart"
            :title="selectedPlantModel && selectedPlantModel.state === 0 ? '停用' : '启用'"
            width="40%"
        >
            <div class="dialog-content">
                <div class="left-view">
                    <el-icon><WarningFilled /></el-icon>
                </div>
                <div class="right-view">
                    <div class="title">
                        <span class="title-item"
                            >植物种类：{{ selectedPlantModel && selectedPlantModel.categoryTitle }}</span
                        >
                        <span class="title-item"
                            >植物品种：{{ selectedPlantModel && selectedPlantModel.varietyTitle }}</span
                        >
                        <span class="title-item"
                            >栽培方式：{{ selectedPlantModel && selectedPlantModel.growthName }}</span
                        >
                    </div>
                    <div class="desc">
                        确定{{ selectedPlantModel && selectedPlantModel.state === 0 ? "停用" : "启用" }}此模型吗？
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeStopAndStartDialog">取消</el-button>
                    <el-button type="primary" @click="stopAndStartPlantModel">确认</el-button>
                </span>
            </template>
        </el-dialog>
        <PlantModelDetail
            :isShow="isShowDetailDialog"
            :plantModelId="selectedPlantModel && selectedPlantModel.id"
            @close="closeDetailDialog"
        ></PlantModelDetail>
    </div>
</template>

<script>
import dayjs from "dayjs";
import { plantModelListApi, stopPlantModelApi } from "../../request/api.js";
import PlantModelDetail from "./components/detail.vue";
export default {
    name: "PlantModel",
    components: {
        PlantModelDetail,
    },
    data() {
        return {
            activeName: "plantModelTab",
            loading: false,
            // 模型状态 0正常 1 停用 -1 全部
            statusList: [
                {
                    label: "全部",
                    value: -1,
                },
                {
                    label: "正常",
                    value: 0,
                },
                {
                    label: "已停用",
                    value: 1,
                },
            ],
            plantModelList: [],
            plantModelForm: {
                keyWords: "",
                status: -1,
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            visibleForStopAndStart: false, // 是否展示停用弹框
            selectedPlantModel: null, // 已选择的种植模型
            isShowDetailDialog: false, // 是否展示详情弹框
        };
    },
    mounted() {
        this.getPlantModelList();
    },
    methods: {
        // 获取种植模型列表
        getPlantModelList() {
            const params = {
                pageNum: this.plantModelForm.currentPage,
                pageSize: this.plantModelForm.pageSize,
                param: {
                    id: 0,
                    keyWord: this.plantModelForm.keyWords,
                    state: this.plantModelForm.status,
                },
            };
            this.loading = true;
            return plantModelListApi(params).then((res) => {
                this.loading = false;
                this.plantModelForm.total = res.total || 0;
                if (res && res.data) {
                    this.plantModelList = res.data.map((item) => {
                        const element = this.statusList.find((child) => child.value === item.state);
                        item.stateText = element && element.label;
                        return item;
                    });
                } else {
                    this.plantModelList = [];
                }
            });
        },
        // 停用种植模型
        stopAndStartPlantModel() {
            const params = {
                categoryTitle: this.selectedPlantModel.categoryTitle,
                createName: this.selectedPlantModel.createName,
                growthId: this.selectedPlantModel.growthId,
                growthName: this.selectedPlantModel.growthName,
                id: this.selectedPlantModel.id,
                state: this.selectedPlantModel.state === 0 ? 1 : 0,
                updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                varietyTitle: this.selectedPlantModel.varietyTitle,
            };
            return stopPlantModelApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("操作成功");
                    this.closeStopAndStartDialog();
                    this.getPlantModelList();
                } else {
                    this.$message.error(res.message || "操作失败");
                }
            });
        },
        handleSizeChange() {
            this.plantModelForm.currentPage = 1;
            this.getPlantModelList();
        },
        handleCurrentChange() {
            this.getPlantModelList();
        },
        // 打开停用弹框
        openStopAndStartDialog(row) {
            this.selectedPlantModel = row;
            this.visibleForStopAndStart = true;
        },
        // 关闭停用弹框
        closeStopAndStartDialog() {
            this.visibleForStopAndStart = false;
            this.selectedPlantModel = null;
        },
        // 创建种植模型
        addPlantModel() {
            this.$router.push("/add");
        },
        // 搜索
        search() {
            this.getPlantModelList();
        },
        // 编辑种植模型
        editPlantModel(row) {
            this.$router.push({
                path: "/add",
                query: {
                    id: row.id,
                },
            });
        },
        // 打开详情弹框
        openDetailDialog(row) {
            this.selectedPlantModel = row;
            this.isShowDetailDialog = true;
        },
        // 关闭详情弹框
        closeDetailDialog() {
            this.isShowDetailDialog = false;
            this.selectedPlantModel = null;
        },
        // 获取当前状态类名
        getStatusClassName(status) {
            // 状态 0正常，1已停用
            const obj = {
                0: "status-start",
                1: "status-stop",
            };
            return obj[status] || "";
        },
    },
};
</script>

<style scoped lang="less">
@import "@/assets/css/index.less";
.index-wrapper {
    position: relative;
    padding: 10px 30px;
    font-size: 14px;
    color: #333;
    background: #fff;
    .search-wrapper {
        position: absolute;
        top: 10px;
        right: 30px;
        display: flex;
        align-items: center;
        z-index: 9;
        .search-input {
            margin-right: 30px;
            width: 240px;
        }
        .search-select {
            margin: 0 5px;
            width: 140px;
        }
        .search-item {
            display: flex;
            align-items: center;
        }
    }
    .order-content-item {
        display: flex;
        align-items: center;
        .type {
            margin-right: 10px;
            color: #0fab27;
        }
        .name {
            margin-right: 10px;
        }
    }
    .status-start {
        color: #16b74e;
    }
    .status-stop {
        color: #ec6a6a;
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
    .dialog-body {
        .list {
            .item {
                padding: 10px 15px;
                box-shadow: 0px 0px 21px 0px #e5ecf2;
                border-radius: 8px;
                color: #383838;
                &-title {
                }
                &-desc {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;
                    &.title {
                        font-weight: 500;
                    }
                    &.company {
                        margin-top: 15px;
                    }
                    .left-view {
                        &.type {
                            padding: 2px 10px;
                            background: rgba(42, 155, 21, 0.15);
                            font-size: 12px;
                            color: #0cbe0d;
                        }
                    }
                    .right-view {
                        &.price {
                            font-size: 16px;
                            color: #ec2626;
                        }
                        &.count {
                            color: #4273f2;
                        }
                        &.unit {
                            color: #7f7f7f;
                        }
                    }
                }
            }
        }
        .summary-info {
            display: flex;
            margin-top: 15px;
            .right-view {
                margin-left: 20px;
                &-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    min-width: 200px;
                    .label {
                        color: #9c9c9c;
                    }
                    .value {
                        &.price {
                            color: #ec2b2b;
                        }
                    }
                }
            }
        }
        .record-div {
            margin-top: 30px;
            &-title {
                font-size: 14px;
                font-weight: 500;
            }
            .record-list {
                .record-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                    color: #979797;
                    &-status {
                        min-width: 40%;
                    }
                    &-name {
                        min-width: 30%;
                    }
                    &-current {
                        color: #1f1f1f;
                    }
                }
            }
        }
    }
    .pagination-div {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
}
</style>
