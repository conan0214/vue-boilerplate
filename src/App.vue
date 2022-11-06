<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
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
    mounted: function () {},
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
</style>
