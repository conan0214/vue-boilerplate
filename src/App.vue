<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { getQueryString } from "./utils/index.js";
export default {
    name: "App",
    props: [],
    components: {},
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {
        // const tokenKey = '__token'
        // let token = null
        // if (getQueryString(tokenKey)) {
        //     token = getQueryString(tokenKey)
        // }
        // if (this.$route.query[tokenKey]) {
        //     token = this.$route.query[tokenKey]
        // }
    },
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
html,
body,
#app {
    height: 100%;
}
body {
    background: #f2f4f7;
}
/* 富文本菜单 */
.tox-tinymce-aux {
    z-index: 9999 !important;
}
</style>
