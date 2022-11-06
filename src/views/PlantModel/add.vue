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
                    <el-input v-model="form.type" placeholder="请输入种植类型" />
                </el-form-item>
                <el-form-item label="种植品种">
                    <el-input v-model="form.variety" placeholder="请输入种植品种" />
                </el-form-item>
                <el-form-item label="培育方式">
                    <el-select v-model="form.region" placeholder="请选择培育方式">
                        <el-option label="有土栽培" value="shanghai" />
                        <el-option label="无土栽培" value="beijing" />
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
                        <el-button plain type="primary" icon="CirclePlus">添加</el-button>
                    </div>
                </div>
                <div class="card-list">
                    <div class="card-item">
                        <div class="card-header">
                            <div class="card-header-title">
                                <div class="left-view">阶段一：播种到萌芽</div>
                                <div class="right-view">
                                    <el-icon class="icon"><Edit /></el-icon>
                                    <el-icon class="icon"><Delete /></el-icon>
                                </div>
                            </div>
                            <div class="card-header-img">
                                <el-image class="img" src="" fit="cover" />
                            </div>
                        </div>
                        <div class="card-table">
                            <div class="card-table-row">
                                <div class="left-view">参数名</div>
                                <div class="right-view">参数名</div>
                            </div>
                            <div class="card-table-row">
                                <div class="left-view">光合积分</div>
                                <div class="right-view">0-50μmol</div>
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
                        <el-button plain type="primary" icon="CirclePlus">添加</el-button>
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
                        <template>
                            <div class="btn">
                                <el-icon class="icon"><Edit /></el-icon>
                                <el-icon class="icon"><Delete /></el-icon>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="section">
                <div class="section-title">
                    <div class="left-view">农事操作指导</div>
                    <div class="right-view">
                        <el-button plain type="primary" icon="CirclePlus">添加</el-button>
                    </div>
                </div>
                <div class="guide-list">
                    <div class="guide-item">
                        <div class="guide-item-img">
                            <el-image class="img" src="" fit="cover" />
                            <div class="btn-play"></div>
                            <div class="btns">
                                <el-icon class="icon"><Edit /></el-icon>
                                <el-icon class="icon"><Delete /></el-icon>
                            </div>
                        </div>
                        <div class="title">通风降温</div>
                        <div class="desc-div"></div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-title">
                    <div class="left-view">病虫害防治</div>
                    <div class="right-view">
                        <el-button plain type="primary" icon="CirclePlus">添加</el-button>
                    </div>
                </div>
                <div class="guide-list">
                    <div class="guide-item">
                        <div class="guide-item-img">
                            <el-image class="img" src="" fit="cover" />
                            <div class="btn-play"></div>
                            <div class="btns">
                                <el-icon class="icon"><Edit /></el-icon>
                                <el-icon class="icon"><Delete /></el-icon>
                            </div>
                        </div>
                        <div class="title">通风降温</div>
                        <div class="desc-div"></div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="visibleForModel" title="添加生长阶段" width="50%" @close="cancelAddModel">
            <div class="dialog-body">
                <el-form :model="modelForm" label-width="80px" label-suffix=":">
                    <el-form-item label="阶段名称">
                        <el-input v-model="modelForm.name" clearable placeholder="请输入农资名称" />
                    </el-form-item>
                    <el-form-item label="参考图">
                        <el-upload
                            v-model:file-list="modelForm.imgList"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
                        <div v-for="(item, index) in modelForm.standardList" class="standard-item" :key="index">
                            <div class="standard-item-content">
                                <div class="label">参数名：</div>
                                <el-input class="input" v-model="item.name" placeholder="请输入名称" />
                            </div>
                            <div class="standard-item-content">
                                <div class="label">参考值：</div>
                                <el-input-number
                                    class="input-number"
                                    v-model="item.min"
                                    :min="0"
                                    :controls="false"
                                    placeholder="最小值"
                                />
                                <span class="line">-</span>
                                <el-input-number
                                    class="input-number"
                                    v-model="item.max"
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
                    <el-button @click="cancelAddModel">取消</el-button>
                    <el-button type="primary">保存</el-button>
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
        <el-dialog v-model="visibleForSuggestion" title="添加种植建议" width="50%" @close="cancelAddSuggestion">
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
                    <el-button @click="cancelAddModel">取消</el-button>
                    <el-button type="primary">保存</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForFarmGuide" title="添加种植建议" width="50%" @close="cancelAddFarmGuide">
            <div class="dialog-body">
                <el-form :model="farmGuideForm" label-width="100px" label-suffix=":">
                    <el-form-item label="参考视频">
                        <el-upload
                            v-model:file-list="farmGuideForm.imgList"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
                            v-model="suggestionForm.tag"
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
                    <el-button @click="cancelAddModel">取消</el-button>
                    <el-button type="primary">保存</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="visibleForCureGuide" title="添加病虫害防治知道" width="50%" @close="cancelAddCureGuide">
            <div class="dialog-body">
                <el-form :model="cureGuideForm" label-width="100px" label-suffix=":">
                    <el-form-item label="参考视频">
                        <el-upload
                            v-model:file-list="cureGuideForm.imgList"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
                            v-model="cureGuideForm.tag"
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
                    <el-button @click="cancelAddModel">取消</el-button>
                    <el-button type="primary">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Add",
    data() {
        return {
            form: {
                type: "",
                variety: "",
            },
            tableData: [],
            modelForm: {
                // 添加、编辑模型
                name: "",
                imgList: [],
                standardList: [
                    {
                        name: "",
                        min: undefined,
                        max: undefined,
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
                tag: "",
            },
            visibleForCureGuide: false, // 是否展示添加、编辑病虫害防治指导的弹框
            cureGuideForm: {
                imgList: [],
                title: "",
                tag: "",
            },
        };
    },
    methods: {
        // 添加参考指标
        addStandard() {
            this.modelForm.standardList.push({
                name: "",
                min: undefined,
                max: undefined,
                unit: "",
            });
        },
        // 删除参考指标
        delStandard(index) {
            this.modelForm.standardList.splice(index, 1);
        },
        // 取消添加
        cancelAddModel() {
            this.visibleForModel = false;
            this.modelForm = {
                // 添加、编辑模型
                name: "",
                imgList: [],
                standardList: [
                    {
                        name: "",
                        min: undefined,
                        max: undefined,
                        unit: "",
                    },
                ],
            };
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
