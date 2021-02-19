<template>
    <div :class="temp.Class" :style="temp.Style">
        <div class="fold-content" :class="{ active: temp.Value }">
            <configComponent
                v-on="$listeners"
                :temp="temp"
                :prop="prop + 'Children.'"
            ></configComponent>
        </div>
        <!-- <el-link type="primary" @click="isShow = !isShow">
            {{ (isShow ? "隐藏" : "显示") + temp.SettingName }}
        </el-link> -->
    </div>
</template>

<script>
export default {
    components: {
        configComponent: (_) => import("../configComponent"),
    },
    data() {
        return {
            // isShow: this.temp.Value,
        };
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

<style lang="less" scoped>
.fold-content {
    height: 0px;
    overflow: hidden;
    transition: height 0.3s ease;
    -webkit-transition: height 0.3s ease;
    -moz-transition: height 0.3s ease;
    -ms-transition: height 0.3s ease;

    &.active {
        height: auto;
    }
}
</style>