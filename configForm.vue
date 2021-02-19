<template>
    <el-form
        :model="temp"
        ref="configForm"
        class="configForm"
        :label-position="'top'"
    >
        <configComponent
            :temp="temp"
            :prop="'Config.'"
            v-on="$listeners"
        ></configComponent>
    </el-form>
</template>

<script>
export default {
    components: {
        configComponent: (_) => import("./configComponent.vue"),
    },
    data() {
        return {
            configForm: {},
        };
    },
    props: {
        temp: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    created() {},
    methods: {
        save() {
            this.$refs["configForm"].validate((valid) => {
                if (valid) {
                    console.log("success", this.temp);
                }
            });
        },

        // 验证表单
        validateForm() {
            let check = false;
            this.$refs["configForm"].validate((valid) => {
                check = valid;
            });
            return check;
        },
    },
    watch: {},
};
</script>

<style lang='less' scoped>
.configForm {
    height: 100%;

    .el-form-item {
        margin-bottom: 20px;
    }
}
</style>