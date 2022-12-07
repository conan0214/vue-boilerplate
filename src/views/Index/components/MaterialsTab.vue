<template>
    <div class="materials-tab-wrapper">
        <el-table :data="materialsList" style="width: 100%">
            <el-table-column type="index" fixed="left"></el-table-column>
            <el-table-column label="农资ID" prop="agriculturalNo" width="120" fixed="left"></el-table-column>
            <el-table-column label="农资名称" prop="title" width="150"></el-table-column>
            <el-table-column label="农资类型" width="120">
                <template #default="scope">
                    {{ scope.row.agriculturalCategory }}
                </template>
            </el-table-column>
            <el-table-column label="参考单价（元）" prop="agriculturalPrice" width="150">
                <template #default="scope">
                    {{ scope.row.agriculturalPrice ? scope.row.agriculturalPrice.toFixed(2) : 0 }}
                </template>
            </el-table-column>
            <el-table-column label="规格" width="180">
                <template #default="scope">
                    {{ scope.row.agriculturalCount }}{{ scope.row.unitweight }}/{{ scope.row.unitmeasurement }}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="statusText" width="180">
                <template #default="scope">
                    <span :class="getStatusClassName(scope.row.status)">{{ scope.row.statusText }}</span>
                </template>
            </el-table-column>
            <el-table-column label="厂家" prop="manufacturers" width="180"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="viewDetail(scope.row)">查看详情</el-button>
                    <el-button
                        v-if="scope.row.status === 1"
                        link
                        type="primary"
                        size="small"
                        @click="openOperateMaterialsDialog(scope.row)"
                        >上架</el-button
                    >
                    <el-button
                        v-if="scope.row.status === 0"
                        link
                        type="primary"
                        size="small"
                        @click="openOperateMaterialsDialog(scope.row)"
                        >下架</el-button
                    >
                    <el-button link type="primary" size="small" @click="editMaterials(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-div">
            <el-pagination
                class="pagination"
                v-model:currentPage="materialsForm.currentPage"
                v-model:page-size="materialsForm.pageSize"
                :page-sizes="[10, 20, 30, 40]"
                background
                layout="total, prev, pager, next, sizes, jumper"
                :total="materialsForm.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
        <el-dialog
            v-model="visibleForAdd"
            :title="isEdit ? '编辑农资' : '新建农资'"
            width="50%"
            :close-on-click-modal="false"
        >
            <div class="dialog-body">
                <el-form :model="addForm" label-width="120px" label-suffix=":">
                    <el-form-item label="农资名称">
                        <el-input
                            v-model="addForm.title"
                            clearable
                            placeholder="请输入农资名称"
                            :maxlength="64"
                            show-word-limit
                        />
                    </el-form-item>
                    <el-form-item label="农资类型">
                        <div class="agricultural-category-div">
                            <div class="left-view">
                                <el-select
                                    v-model="addForm.agriculturalCategoryId"
                                    class="form-select"
                                    placeholder="选择农资类型"
                                    @change="selectAgriculturalCategory"
                                >
                                    <el-option
                                        v-for="item in materialsTypeListAfterProcess"
                                        :label="item.title"
                                        :value="item.id"
                                        :key="item.id"
                                    />
                                </el-select>
                            </div>
                            <div v-if="agriculturalCategoryText === '自定义'" class="right-view">
                                <el-input v-model="addForm.customAgriculturalCategory" placeholder="请输入农资类型" />
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="参考单价">
                        <el-input-number
                            v-model="addForm.agriculturalPrice"
                            class="form-input-number"
                            :min="0"
                            :precision="2"
                            :controls="false"
                        />元
                    </el-form-item>
                    <el-form-item label="规格">
                        <div class="form-content">
                            <el-input-number
                                v-model="addForm.agriculturalCount"
                                :min="0"
                                :precision="2"
                                :controls="false"
                            />
                            <el-select v-model="addForm.unitweightid" placeholder="请选择">
                                <el-option
                                    v-for="item in unitTypeList"
                                    :label="item.title"
                                    :value="item.id"
                                    :key="item.id"
                                />
                            </el-select>
                            <span class="line">/</span>
                            <el-select v-model="addForm.unitmeasurementid" placeholder="请选择">
                                <el-option
                                    v-for="item in unitmeasurementList"
                                    :label="item.title"
                                    :value="item.id"
                                    :key="item.id"
                                />
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="厂家">
                        <el-input
                            v-model="addForm.manufacturers"
                            placeholder="请输入厂家"
                            :maxlength="64"
                            show-word-limit
                        />
                    </el-form-item>
                    <el-form-item label="农资banner图">
                        <el-upload
                            v-model:file-list="addForm.bannerList"
                            list-type="picture-card"
                            :http-request="uploadFile"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <el-icon><Camera /></el-icon>
                            添加样图
                            <template #tip>
                                <div class="tips">*仅支持jpg和png格式图片上传</div>
                            </template>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="农资图文介绍">
                        <Tinymce v-model="addForm.richContent" @change="handleEditorChange" width="100%" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelAdd">取消</el-button>
                    <el-button type="primary" @click="confirmAdd">确认</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForCancel" title="提示" width="40%" :close-on-click-modal="false">
            <div class="dialog-content">
                <div class="left-view">
                    <el-icon><WarningFilled /></el-icon>
                </div>
                <div class="right-view">
                    <div class="desc">确定取消{{ isEdit ? "编辑" : "新建" }}农资吗？</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visibleForCancel = false">取消</el-button>
                    <el-button type="primary" @click="confirm">确认</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="visibleForDetail"
            title="农资详情"
            width="50%"
            :close-on-click-modal="false"
            @close="closeDetailDialog"
        >
            <div v-if="selectedMaterials && selectedMaterials.agriculturalBo" class="dialog-body">
                <el-form :model="addForm" label-width="120px" label-suffix=":">
                    <el-form-item label="农资名称">
                        {{ selectedMaterials && selectedMaterials.agriculturalBo.title }}
                    </el-form-item>
                    <el-form-item label="农资类型">
                        {{ selectedMaterials && selectedMaterials.agriculturalBo.agriculturalCategory }}
                    </el-form-item>
                    <el-form-item label="参考单价">
                        {{ selectedMaterials && selectedMaterials.agriculturalBo.agriculturalPrice }}元
                    </el-form-item>
                    <el-form-item label="规格">
                        {{ selectedMaterials && selectedMaterials.agriculturalBo.agriculturalCount
                        }}{{ selectedMaterials && selectedMaterials.agriculturalBo.unitweight }}/{{
                            selectedMaterials && selectedMaterials.agriculturalBo.unitmeasurement
                        }}
                    </el-form-item>
                    <el-form-item label="厂家">
                        {{ selectedMaterials && selectedMaterials.agriculturalBo.manufacturers }}
                    </el-form-item>
                    <el-form-item label="农资banner图">
                        <el-image
                            v-for="item in selectedMaterials.imgList"
                            class="banner"
                            :src="item"
                            fit="cover"
                            :key="item"
                        />
                    </el-form-item>
                    <el-form-item label="农资图文介绍">
                        <div v-html="selectedMaterials.richContent"></div>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDetailDialog">关闭</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="visibleForOperate"
            :title="selectedMaterials && selectedMaterials.status === 0 ? '农资下架' : '农资上架'"
            width="40%"
            :close-on-click-modal="false"
            @close="closeOperateMaterialsDialog"
        >
            <div class="dialog-body">
                <el-form label-width="120px" label-suffix=":">
                    <el-form-item label="农资ID">
                        {{ selectedMaterials && selectedMaterials.agriculturalNo }}
                    </el-form-item>
                    <el-form-item label="农资名称">
                        {{ selectedMaterials && selectedMaterials.title }}
                    </el-form-item>
                    <el-form-item label="参考单价">
                        {{ selectedMaterials && selectedMaterials.agriculturalPrice }}元
                    </el-form-item>
                    <el-form-item label="规格">
                        {{ selectedMaterials && selectedMaterials.agriculturalCount
                        }}{{ selectedMaterials && selectedMaterials.unitweight }}/{{
                            selectedMaterials && selectedMaterials.unitmeasurement
                        }}
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeOperateMaterialsDialog">取消</el-button>
                    <el-button type="primary" @click="updateMaterialsStatus">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {
    materialsTypeListApi,
    weightUnitListApi,
    unitMeasurementListApi,
    platformMaterialsListApi,
    materialsDetailApi,
    saveMaterialsApi,
    updateMaterialsStatusApi,
} from "../../../request/api.js";
import Tinymce from "../../../components/Tinymce/Tinymce.vue";
import { uploadToOss } from "../../../utils/index.js";
export default {
    name: "MaterialsTab",
    components: {
        Tinymce,
    },
    props: {
        searchForm: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            materialsTypeList: [],
            unitTypeList: [],
            unitmeasurementList: [],
            materialsList: [],
            // 状态 -1 全部 0正常 1下架
            statusList: [
                {
                    label: "全部",
                    value: -1,
                },
                {
                    label: "已上架",
                    value: 0,
                },
                {
                    label: "已下架",
                    value: 1,
                },
            ],
            materialsForm: {
                keyWords: "",
                status: -1,
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            visibleForAdd: false, // 是否展示新建农资弹框
            addForm: {
                id: 0,
                agriculturalId: 0, // 农资ID
                title: "",
                agriculturalCategoryId: "",
                customAgriculturalCategory: "", // 自定义农资类型
                agriculturalPrice: undefined,
                agriculturalCount: undefined,
                unitweightid: "",
                unitmeasurementid: "",
                manufacturers: "",
                bannerList: "",
                richContent: "",
            },
            visibleForCancel: false, // 是否展示取消新建确认弹框
            visibleForDetail: false, // 是否展示农资详情弹框
            visibleForOperate: false, // 是否展示农资上下架弹框
            selectedMaterials: null, // 已选择的农资
            isEdit: false, // 是否编辑
        };
    },
    computed: {
        // 处理后的农资类型列表（编辑的时候自定义ID改变）
        materialsTypeListAfterProcess() {
            if (this.isEdit && this.selectedMaterials && this.selectedMaterials.agriculturalBo) {
                const list = this.materialsTypeList.map((item) => {
                    return {
                        ...item,
                    };
                });
                const item = list.find(
                    (item) => item.id === this.selectedMaterials.agriculturalBo.agriculturalCategoryId
                );
                if (!item) {
                    const index = list.findIndex((item) => item.title === "自定义");
                    list[index].id = this.selectedMaterials.agriculturalBo.agriculturalCategoryId;
                }
                return list;
            }
            return this.materialsTypeList;
        },
        // 农资类型文案
        agriculturalCategoryText() {
            const typeItem = this.materialsTypeListAfterProcess.find(
                (item) => item.id === this.addForm.agriculturalCategoryId
            );
            return typeItem ? typeItem.title : "";
        },
    },
    watch: {
        searchForm: {
            handler(newVal) {
                this.materialsForm.keyWords = newVal.keyWords;
                this.materialsForm.status = newVal.status;
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        this.getMaterialTypeList();
        this.getUnitTypeList();
        this.getUnitmeasurementList();
        this.getMaterialsList();
    },
    methods: {
        // 获取农资类型枚举值
        getMaterialTypeList() {
            const params = {};
            return materialsTypeListApi(params).then((res) => {
                if (res && res.data) {
                    this.materialsTypeList = res.data;
                }
            });
        },
        // 获取农资类型枚举值
        getUnitTypeList() {
            const params = {};
            return weightUnitListApi(params).then((res) => {
                if (res && res.data) {
                    this.unitTypeList = res.data;
                }
            });
        },
        // 获取数量单位枚举值
        getUnitmeasurementList() {
            const params = {};
            unitMeasurementListApi(params).then((res) => {
                if (res && res.data) {
                    this.unitmeasurementList = res.data;
                }
            });
        },
        // 获取平台农资列表
        getMaterialsList() {
            const params = {
                pageNum: this.materialsForm.currentPage,
                pageSize: this.materialsForm.pageSize,
                param: {
                    id: 0,
                    keyWord: this.materialsForm.keyWords,
                    status: this.materialsForm.status,
                },
            };
            return platformMaterialsListApi(params).then((res) => {
                this.materialsForm.total = res.total || 0;
                if (res && res.data) {
                    this.materialsList = res.data.map((item) => {
                        const element = this.statusList.find((child) => child.value === item.status);
                        item.statusText = element && element.label;
                        return item;
                    });
                } else {
                    this.materialsList = [];
                }
            });
        },
        // 获取农资详情
        getMaterialsDetail(id) {
            const params = {
                id,
            };
            return materialsDetailApi(params).then((res) => {
                if (res && res.data) {
                    this.selectedMaterials = res.data;
                    if (this.selectedMaterials.bannerList) {
                        this.selectedMaterials.imgList = this.selectedMaterials.bannerList.split(",");
                    }
                } else {
                    this.selectedMaterials = null;
                }
            });
        },
        // 保存农资
        saveMaterials() {
            const params = {
                id: this.addForm.id,
                agriculturalBo: {
                    agriculturalCategory: "",
                    agriculturalCategoryId: this.addForm.agriculturalCategoryId,
                    agriculturalCount: this.addForm.agriculturalCount,
                    agriculturalNo: "",
                    agriculturalPrice: this.addForm.agriculturalPrice,
                    definition: 0,
                    id: this.addForm.agriculturalId,
                    manufacturers: this.addForm.manufacturers,
                    title: this.addForm.title,
                    unitmeasurement: "",
                    unitmeasurementid: this.addForm.unitmeasurementid,
                    unitweight: "",
                    unitweightid: this.addForm.unitweightid,
                    weight: 0,
                },
                bannerList: "",
                richContent: this.addForm.richContent,
            };
            const typeItem = this.materialsTypeListAfterProcess.find(
                (item) => item.id === this.addForm.agriculturalCategoryId
            );
            const unitItem = this.unitTypeList.find((item) => item.id === this.addForm.unitweightid);
            const unitmeasurementItem = this.unitmeasurementList.find(
                (item) => item.id === this.addForm.unitmeasurementid
            );
            params.agriculturalBo.agriculturalCategory = typeItem && typeItem.title;
            if (this.agriculturalCategoryText === "自定义") {
                params.agriculturalBo.agriculturalCategory = this.addForm.customAgriculturalCategory;
            }
            params.agriculturalBo.unitmeasurement = unitmeasurementItem && unitmeasurementItem.title;
            params.agriculturalBo.unitweight = unitItem && unitItem.title;
            if (this.addForm.bannerList && this.addForm.bannerList.length > 0) {
                const bannerList = [];
                this.addForm.bannerList.forEach((item) => {
                    if (item.response && item.response.data) {
                        bannerList.push(item.response.data.imageUrl);
                    }
                });
                params.bannerList = bannerList.join(",");
            }
            return saveMaterialsApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("操作成功");
                    this.getMaterialsList();
                } else {
                    this.$message.error(res.message || "操作失败");
                }
            });
        },
        // 农资上下架
        updateMaterialsStatus() {
            const params = {
                id: this.selectedMaterials.id,
                keyWord: "",
                status: this.selectedMaterials.status === 0 ? 1 : 0,
            };
            return updateMaterialsStatusApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("操作成功");
                    this.getMaterialsList();
                    this.closeOperateMaterialsDialog();
                } else {
                    this.$message.error(res.message || "操作失败");
                }
            });
        },
        handleSizeChange() {
            this.materialsForm.currentPage = 1;
            this.getMaterialsList();
        },
        handleCurrentChange() {
            this.getMaterialsList();
        },
        handlePictureCardPreview() {},
        handleRemove() {},
        // 取消添加
        cancelAdd() {
            this.visibleForCancel = true;
        },
        // 确定添加
        confirmAdd() {
            this.saveMaterials();
            this.visibleForCancel = false;
            this.visibleForAdd = false;
            this.addForm = {
                id: 0,
                agriculturalId: 0,
                title: "",
                agriculturalCategoryId: "",
                customAgriculturalCategory: "",
                agriculturalPrice: undefined,
                agriculturalCount: undefined,
                unitweightid: "",
                unitmeasurementid: "",
                manufacturers: "",
                bannerList: "",
                richContent: "",
            };
        },
        // 确定取消新建
        confirm() {
            this.visibleForCancel = false;
            this.visibleForAdd = false;
            this.addForm = {
                id: 0,
                agriculturalId: 0,
                title: "",
                agriculturalCategoryId: "",
                customAgriculturalCategory: "",
                agriculturalPrice: undefined,
                agriculturalCount: undefined,
                unitweightid: "",
                unitmeasurementid: "",
                manufacturers: "",
                bannerList: "",
                richContent: "",
            };
        },
        // 新建农资
        addMaterials() {
            this.addForm = {
                id: 0,
                agriculturalId: 0,
                title: "",
                agriculturalCategoryId: "",
                customAgriculturalCategory: "",
                agriculturalPrice: undefined,
                agriculturalCount: undefined,
                unitweightid: "",
                unitmeasurementid: "",
                manufacturers: "",
                bannerList: "",
                richContent: "",
            };
            this.visibleForAdd = true;
            this.isEdit = false;
        },
        // 编辑农资
        editMaterials(row) {
            this.isEdit = true;
            this.getMaterialsDetail(row.id).then(() => {
                this.addForm = {
                    id: row.id,
                    agriculturalId: this.selectedMaterials.agriculturalBo.id,
                    title: this.selectedMaterials.agriculturalBo.title,
                    agriculturalCategoryId: this.selectedMaterials.agriculturalBo.agriculturalCategoryId,
                    customAgriculturalCategory: this.selectedMaterials.agriculturalBo.agriculturalCategory,
                    agriculturalPrice: this.selectedMaterials.agriculturalBo.agriculturalPrice,
                    agriculturalCount: this.selectedMaterials.agriculturalBo.agriculturalCount,
                    unitweightid: this.selectedMaterials.agriculturalBo.unitweightid,
                    unitmeasurementid: this.selectedMaterials.agriculturalBo.unitmeasurementid,
                    manufacturers: this.selectedMaterials.agriculturalBo.manufacturers,
                    bannerList: "",
                    richContent: this.selectedMaterials.richContent,
                };
                if (this.selectedMaterials.bannerList) {
                    this.addForm.bannerList = this.selectedMaterials.bannerList.split(",").map((item) => {
                        return {
                            url: item,
                            response: {
                                data: {
                                    imageUrl: item,
                                },
                            },
                        };
                    });
                }
                this.visibleForAdd = true;
            });
        },
        // 打开农资上下架弹框
        openOperateMaterialsDialog(row) {
            this.selectedMaterials = row;
            this.visibleForOperate = true;
        },
        // 关闭上下架弹框
        closeOperateMaterialsDialog() {
            this.visibleForOperate = false;
            this.selectedMaterials = null;
        },
        // 查看农资详情
        viewDetail(row) {
            this.getMaterialsDetail(row.id).then(() => {
                this.visibleForDetail = true;
            });
        },
        // 关闭详情弹框
        closeDetailDialog() {
            this.visibleForDetail = false;
        },
        // 富文本编辑器内容改变
        handleEditorChange() {},
        // 获取当前状态类名
        getStatusClassName(status) {
            // 状态 0已上架，1已下架
            const obj = {
                0: "status-start",
                1: "status-stop",
            };
            return obj[status] || "";
        },
        // 选择农资类型
        selectAgriculturalCategory() {
            this.addForm.customAgriculturalCategory = "";
        },
        // 上传文件
        uploadFile(data) {
            const file = data.file;
            uploadToOss(file).then((res) => {
                const filePath = `https://cdn.deepberry.cn/${res.name}`;
                const index = this.addForm.bannerList.length - 1;
                this.addForm.bannerList[index].response = {
                    data: {
                        imageUrl: filePath,
                    },
                };
            });
        },
    },
};
</script>

<style>
.materials-tab-wrapper .el-input-number .el-input__inner {
    text-align: left;
}
</style>
<style lang="less">
.materials-tab-wrapper {
    .form-select {
        width: 100%;
    }
    .form-input-number {
        width: 90%;
        text-align: left;
    }
    .form-content {
        display: flex;
        align-items: center;
        .line {
            margin: 0 10px;
        }
    }
    .tips {
        color: #c4c4c4;
    }
    .status-start {
        color: #16b74e;
    }
    .status-stop {
        color: #ec6a6a;
    }
    .dialog-body {
        .banner {
            margin-right: 10px;
            margin-bottom: 10px;
            width: 80px;
            height: 80px;
            border-radius: 12px;
        }
        .agricultural-category-div {
            display: flex;
            align-items: center;
            width: 100%;
            .left-view {
                flex-grow: 1;
            }
            .right-view {
                padding-left: 10px;
                flex-basis: 50%;
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
    .pagination-div {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
}
</style>
