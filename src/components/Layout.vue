<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="side-bar" width="210px">
                <div class="logo-div">
                    <img class="logo" src="../assets/img/img-logo.png" alt="logo" />
                </div>
                <el-menu
                    active-text-color="#3A7BFF"
                    background-color="#001529"
                    class="el-menu-vertical"
                    :default-active="defaultIndex"
                    text-color="#fff"
                    @select="selectMenu"
                >
                    <el-menu-item index="1">
                        <img class="icon" src="../assets/img/icon-dingdan.png" alt="农资" />
                        <span>农资订单</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <img class="icon" src="../assets/img/icon-moxing.png" alt="模型" />
                        <span>种植模型</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="header-wrapper">
                    <div class="header">
                        <div class="header-item">
                            <el-icon><QuestionFilled /></el-icon>
                            帮助
                        </div>
                        <div class="header-item">
                            <img class="avatar" src="../assets/img/icon-moxing.png" alt="avatar" />
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    管理员
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>Action 1</el-dropdown-item>
                                        <el-dropdown-item>Action 2</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div class="header-item">退出</div>
                    </div>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>{{ pageName }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Layout",
    data() {
        return {
            pageName: "",
            defaultIndex: "1",
        };
    },
    watch: {
        $route(to) {
            this.pageName = to.meta.pageName;
        },
    },
    mounted() {
        this.pageName = this.$route.meta.pageName;
        if (this.pageName === "农资订单") {
            this.defaultIndex = "1";
        } else {
            this.defaultIndex = "2";
        }
    },
    methods: {
        selectMenu(index) {
            if (index === "1") {
                this.$router.push("/index");
            } else if (index === "2") {
                this.$router.push("/plantModel");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.common-layout {
    height: 100%;
    .el-container {
        height: 100%;
    }
    .side-bar {
        position: relative;
    }
    .el-menu-vertical {
        padding-top: 72px;
        height: 100%;
        box-sizing: border-box;
        .icon {
            margin-right: 15px;
            width: 24px;
            height: 24px;
        }
    }
    .logo-div {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 72px;
        z-index: 9;
        .logo {
            width: 152px;
            height: 33px;
        }
    }
    .header-wrapper {
        background: #fff;
        .header {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 14px;
            color: #4c4c4c;
            &-item {
                display: flex;
                align-items: center;
                padding-right: 30px;
                cursor: pointer;
                .avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>
