<template>
    <div :class="temp.Class" :style="temp.Style">
        <el-switch
            v-model="temp.Value"
            v-on="$listeners"
            v-bind="temp.Attr"
            active-color="#13ce66"
            inactive-color="#aaaaaa"
        >
        </el-switch>
    </div>
</template>

<script>
export default {
    components: {
        configComponent: (_) => import("../configComponent"),
    },
    props: {
        temp: {
            type: Object,
            default: () => {
                return {};
            },
        },
        prop: {
            type: String,
            default: () => {
                return "";
            },
        },
    },
    created() {},
};
</script>

<style lang='less' scoped>
.group-title {
    font-size: 16px;
    margin-top: 5px;
}
</style>