<template>
    <div class="index-wrapper">
        <div class="search-wrapper">
            <template v-if="activeName === 'purchaseOrder'">
                <el-input
                    v-model="purchaseOrderForm.keyWords"
                    class="search-input"
                    placeholder="订单号/提交人/归属企业/农资名称"
                />
                <div class="search-item">
                    <div class="search-item-lable">跟进状态</div>
                    <el-select v-model="purchaseOrderForm.status" class="search-select" placeholder="请选择">
                        <el-option
                            v-for="item in orderStatusList"
                            :label="item.label"
                            :value="item.value"
                            :key="item.value"
                        />
                    </el-select>
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
            </template>
            <template v-else>
                <el-input v-model="materialsForm.keyWords" class="search-input" placeholder="农资ID/农资名称" />
                <div class="search-item">
                    <div class="search-item-lable">状态</div>
                    <el-select v-model="materialsForm.status" class="search-select" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in statusList"
                            :label="item.label"
                            :value="item.value"
                            :key="index"
                        />
                    </el-select>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary" icon="CirclePlus" @click="addMaterials">新建农资</el-button>
                </div>
            </template>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="采购订单" name="purchaseOrder">
                <el-table :data="purchaseOrderList" style="width: 100%">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="订单号" prop="orderUuid" width="180"></el-table-column>
                    <el-table-column label="订单内容" width="300">
                        <template #default="scope">
                            <div
                                class="order-content-item"
                                :key="index"
                                v-for="(item, index) in scope.row.agriculturalCartBos"
                            >
                                <div class="type">{{ item.agriculturalBo.agriculturalCategory }}</div>
                                <div class="name">{{ item.agriculturalBo.title }}</div>
                                <div class="count">
                                    {{ item.agriculturalCount }}{{ item.agriculturalBo.unitweight }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="提交时间" width="180">
                        <template #default="scope">
                            {{ scope.row.orderTime }}
                        </template>
                    </el-table-column>
                    <el-table-column label="提交人" prop="userName" width="180"></el-table-column>
                    <el-table-column label="归属企业" prop="userCompany" width="180"></el-table-column>
                    <el-table-column label="更进状态" prop="orderStatusText" width="180"></el-table-column>
                    <el-table-column label="最新更进" prop="followText" width="180"></el-table-column>
                    <el-table-column label="操作" width="300">
                        <template #default="scope">
                            <el-button type="text" size="small" @click="openOrderDetailDialog(scope.row)"
                                >查看详情</el-button
                            >
                            <el-button type="text" size="small" @click="openFollowDialog(scope.row)">跟进</el-button>
                            <el-button type="text" size="small" @click="openFinishOrderDialog(scope.row)"
                                >完成订单</el-button
                            >
                            <el-button type="text" size="small" @click="openCloseOrderDialog(scope.row)"
                                >关闭订单</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    class="pagination"
                    v-model:currentPage="purchaseOrderForm.currentPage"
                    v-model:page-size="purchaseOrderForm.pageSize"
                    :page-sizes="[10, 20, 30, 40]"
                    background
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="purchaseOrderForm.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </el-tab-pane>
            <el-tab-pane label="农资库" name="agricultureMaterials">
                <MaterialsTab ref="materialsTab"></MaterialsTab>
            </el-tab-pane>
        </el-tabs>
        <el-dialog v-model="visibleForFinishOrder" title="完成订单" width="50%">
            <div class="dialog-content">
                <div class="left-view">
                    <el-icon><WarningFilled /></el-icon>
                </div>
                <div class="right-view">
                    <div class="title">
                        <span class="title-item">提交人：{{ selectedOrder && selectedOrder.userName }}</span>
                        <span class="title-item">归属企业：{{ selectedOrder && selectedOrder.userCompany }}</span>
                    </div>
                    <div class="desc">确定完成此订单吗？</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeFinishOrderDialog">取消</el-button>
                    <el-button type="primary" @click="updateOrderStatus(1)">确认</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForCloseOrder" title="关闭订单" width="50%">
            <div class="dialog-content">
                <div class="left-view">
                    <el-icon><WarningFilled /></el-icon>
                </div>
                <div class="right-view">
                    <div class="title">
                        <span class="title-item">提交人：{{ selectedOrder && selectedOrder.userName }}</span>
                        <span class="title-item">归属企业：{{ selectedOrder && selectedOrder.userCompany }}</span>
                    </div>
                    <div class="desc">确定关闭此订单吗？</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeCloseOrderDialog">取消</el-button>
                    <el-button type="primary" @click="updateOrderStatus(2)">确认</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForOrderDetail" title="订单详情" width="50%">
            <div class="dialog-body">
                <el-descriptions :column="2">
                    <el-descriptions-item label="订单号:">ID124555454</el-descriptions-item>
                    <el-descriptions-item label="提交时间:">2022.05.25 10:45:12</el-descriptions-item>
                    <el-descriptions-item label="提交人:">13367890342</el-descriptions-item>
                    <el-descriptions-item label="归属企业：">湖南xxx农业公司</el-descriptions-item>
                </el-descriptions>
                <div class="list">
                    <div class="item">
                        <div class="item-title">农资ID：123456</div>
                        <div class="item-desc title">
                            <div class="left-view">硝酸复合肥</div>
                            <div class="right-view price">¥150.00元</div>
                        </div>
                        <div class="item-desc">
                            <div class="left-view type">化肥</div>
                            <div class="right-view count">20袋（共1000公斤）</div>
                        </div>
                        <div class="item-desc company">
                            <div class="left-view">内蒙古东升肥料有限公司</div>
                            <div class="right-view unit">（50公斤/袋）</div>
                        </div>
                    </div>
                </div>
                <div class="summary-info">
                    <div class="left-view">合计</div>
                    <div class="right-view">
                        <div class="right-view-item">
                            <div class="label">化肥</div>
                            <div class="value">50000公斤</div>
                        </div>
                        <div class="right-view-item">
                            <div class="label">有机肥</div>
                            <div class="value">90000公斤</div>
                        </div>
                        <div class="right-view-item">
                            <div class="label">参考价</div>
                            <div class="value price">¥12300.00元</div>
                        </div>
                    </div>
                </div>
                <div class="record-div">
                    <div class="record-div-title">跟进记录</div>
                    <div class="record-list">
                        <div class="record-item record-item-current">
                            <div class="record-item-status">订单完成/异常关闭</div>
                            <div class="record-item-name">张三</div>
                            <div class="record-item-time">2022.05.25 11:45:25</div>
                        </div>
                        <div class="record-item">
                            <div class="record-item-status">已经电话沟通，待付款</div>
                            <div class="record-item-name">张三</div>
                            <div class="record-item-time">2022.05.25 11:45:25</div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visibleForOrderDetail = false">取消</el-button>
                    <el-button type="primary">确认</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForFollow" title="订单跟进" width="50%">
            <div class="dialog-body">
                <el-form label-width="100px" label-suffix=":" :model="followForm">
                    <el-form-item label="订单号">
                        {{ selectedOrder && selectedOrder.orderUuid }}
                    </el-form-item>
                    <el-form-item label="提交人">
                        {{ selectedOrder && selectedOrder.userName }}
                    </el-form-item>
                    <el-form-item label="归属企业">
                        {{ selectedOrder && selectedOrder.userCompany }}
                    </el-form-item>
                    <el-form-item label="跟进记录">
                        <el-input
                            v-model="followForm.followText"
                            :autosize="{ minRows: 3, maxRows: 5 }"
                            type="textarea"
                            placeholder="请输入"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeFollowDialog">取消</el-button>
                    <el-button type="primary" @click="saveFollowText">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import dayjs from "dayjs";
import MaterialsTab from "./components/MaterialsTab.vue";
import { purchaseOrderListApi, updateOrderStatusApi, saveMaterialsApi } from "../../request/api.js";
export default {
    name: "IndexPage",
    components: {
        MaterialsTab,
    },
    data() {
        return {
            activeName: "purchaseOrder",
            purchaseOrderList: [],
            // 跟进状态 未跟进-0 1-已完成, 2-已关闭 3-已跟进 -1-全部 默认传-1
            orderStatusList: [
                {
                    label: "全部",
                    value: -1,
                },
                {
                    label: "未跟进",
                    value: 0,
                },
                {
                    label: "已完成",
                    value: 1,
                },
                {
                    label: "已关闭",
                    value: 2,
                },
                {
                    label: "已跟进",
                    value: 3,
                },
            ],
            // 状态 -1 全部 0正常 1下架
            statusList: [
                {
                    label: "全部",
                    value: -1,
                },
                {
                    label: "上架",
                    value: 0,
                },
                {
                    label: "下架",
                    value: 1,
                },
            ],
            purchaseOrderForm: {
                keyWords: "",
                status: -1,
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            selectedOrder: null, // 已选择的订单
            visibleForFinishOrder: false, // 是否展示完成订单弹框
            visibleForCloseOrder: false, // 是否展示关闭订单弹框
            visibleForOrderDetail: false, // 是否展示订单详情弹框
            visibleForFollow: false, // 是否展示订单跟进弹框
            followForm: {
                followText: "",
            },
            materialsForm: {
                keyWords: "",
                status: "",
            },
        };
    },
    mounted() {
        this.getPurchaseOrderList();
    },
    methods: {
        // 获取采购订单列表
        getPurchaseOrderList() {
            const params = {
                pageNum: this.purchaseOrderForm.currentPage,
                pageSize: this.purchaseOrderForm.pageSize,
                param: {
                    id: 0,
                    keyWord: this.purchaseOrderForm.keyWords,
                    orderState: this.purchaseOrderForm.status,
                },
            };
            return purchaseOrderListApi(params).then((res) => {
                this.purchaseOrderForm.total = res.total || 0;
                if (res && res.data) {
                    this.purchaseOrderList = res.data.map((item) => {
                        const element = this.orderStatusList.find((child) => child.value === item.orderStatus);
                        item.orderStatusText = (element && element.label) || "";
                        return item;
                    });
                } else {
                    this.purchaseOrderList = [];
                }
            });
        },
        handleSizeChange() {
            this.purchaseOrderForm.currentPage = 1;
            this.getPurchaseOrderList();
        },
        handleCurrentChange() {
            this.getPurchaseOrderList();
        },
        search() {
            this.purchaseOrderForm.currentPage = 1;
            this.getPurchaseOrderList();
        },
        // 更新订单状态
        updateOrderStatus(orderStatus) {
            const params = {
                id: this.selectedOrder.id,
                orderStatus, // 订单状态 0-已提交, 1-已完成, 2-已关闭 3 已跟进
            };
            return updateOrderStatusApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("操作成功");
                    if (orderStatus === 1) {
                        this.closeFinishOrderDialog();
                    } else if (orderStatus === 2) {
                        this.closeCloseOrderDialog();
                    }
                    this.getPurchaseOrderList();
                } else {
                    this.$message.error(res.message || "操作失败");
                }
            });
        },
        // 打开完成订单弹框
        openFinishOrderDialog(row) {
            this.selectedOrder = row;
            this.visibleForFinishOrder = true;
        },
        // 取消完成订单弹框
        closeFinishOrderDialog() {
            this.visibleForFinishOrder = false;
            this.selectedOrder = null;
        },
        // 打开关闭订单弹框
        openCloseOrderDialog(row) {
            this.selectedOrder = row;
            this.visibleForCloseOrder = true;
        },
        // 取消关闭订单弹框
        closeCloseOrderDialog() {
            this.visibleForCloseOrder = false;
            this.selectedOrder = null;
        },
        // 打开订单详情弹框
        openOrderDetailDialog(row) {
            this.selectedOrder = row;
            this.visibleForOrderDetail = true;
        },
        // 取消订单详情弹框
        closeOrderDetailDialog() {
            this.visibleForOrderDetail = false;
            this.selectedOrder = null;
        },
        // 打开跟进记录弹框
        openFollowDialog(row) {
            this.selectedOrder = row;
            this.visibleForFollow = true;
        },
        // 取消跟进记录弹框
        closeFollowDialog() {
            this.visibleForFollow = false;
            this.selectedOrder = null;
        },
        // 保存跟进记录
        saveFollowText() {
            const params = {
                createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                followText: this.followForm.followText,
                id: 0,
                orderNo: this.selectedOrder && this.selectedOrder.orderUuid,
            };
            return saveMaterialsApi(params).then((res) => {
                if (res && res.code === "200") {
                    this.$message.success("操作成功");
                    this.closeFollowDialog();
                    this.getPurchaseOrderList();
                } else {
                    this.$message.error(res.message || "操作失败");
                }
            });
        },
        // 新建农资
        addMaterials() {
            this.$refs.materialsTab.visibleForAdd = true;
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
    .pagination {
        margin-top: 30px;
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
}
</style>
