<template>
    <div>
        <el-dialog
            :title="temp.SettingName"
            :visible.sync="dialogVisible"
            width="60%"
            top="5vh"
            append-to-body
        >
            <!-- <div class="padding-sm"> -->
                <configComponent
                    v-on="$listeners"
                    :temp="temp"
                    :prop="prop + 'Children.'"
                ></configComponent>
        
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {
        configComponent: (_) => import("../configComponent"),
    },
    data() {
        return {};
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
    computed: {
        dialogVisible: {
            get() {
                return this.temp.Value;
            },
            set() {
                return (this.temp.Value = false);
            },
        },
    },
};
</script>
<style lang="less" scoped>
</style>