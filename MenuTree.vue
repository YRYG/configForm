<template>
    <el-row
        :gutter="10"
        :class="className"
        :style="{ height: 'calc(100% - ' + top + ')' }"
    >
        <el-col :xs="6" :sm="6" :md="spanLeft" class="height-fill">
            <slot name="left"></slot>
        </el-col>
        <el-col :xs="18" :sm="18" :md="24 - spanLeft" class="height-fill">
            <slot name="right"></slot>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    props: {
        top: {
            type: String,
            default: () => {
                return "0px";
            },
        },
        spanLeft: {
            type: Number,
            default: () => {
                return 4;
            },
        },
        spanRight: {
            type: Number,
            default: () => {
                return 20;
            },
        },
        className: {
            type: String,
            default: () => {
                return "";
            },
        },
    },
};
</script>

<style lang='less' scoped>
</style>