<template>
    <el-collapse v-model="activeCollapse">
        <el-collapse-item
            v-for="(item, index) in temp.Children"
            :key="index"
            :title="item.SettingName"
            :name="item.SettingName"
        >
            <div class="padding-lr-sm">
                <configComponent
                    v-on="$listeners"
                    :temp="item"
                    :prop="prop + 'Children.' + index + '.Children.'"
                ></configComponent>
            </div>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
export default {
    components: {
        configComponent: (_) => import("../configComponent"),
    },
    data() {
        return {
            activeCollapse: [],
        };
    },
    created() {
        const Value = this.temp.Value || "";
        this.activeCollapse = Value instanceof Array ? Value : [Value];
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
};
</script>

<style lang="less" scoped>
/deep/ .el-collapse-item__header {
    font-size: 18px;
    padding: 0 10px;
}
</style>