<template>
    <div class="setting clearfix" :class="temp.Class">
        <el-checkbox
            v-model="temp.Value"
            :disabled="temp.Attr && temp.Attr.disabled"
            class="setting-label"
        >
            {{ temp.SettingName }}
        </el-checkbox>
        <div
            v-if="!temp.Value && temp.Children && temp.Children.length > 0"
            class="setting-input"
        >
            <div class="title">默认值</div>
            <configComponent
                v-on="$listeners"
                :temp="temp"
                :prop="prop + 'Children.'"
                class="setting-comp"
            ></configComponent>
        </div>
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
};
</script>

<style lang="less" scoped>
.setting {
    line-height: 40px;

    .setting-label {
        float: left;
        line-height: 40px;
    }

    .setting-input {
        position: absolute;
        left: 400px;
        max-height: 62px;
        padding-left: 50px;

        .title {
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    /deep/ .el-form-item {
        margin-bottom: 20px;
    }

    /deep/ .el-checkbox-group {
        line-height: 50px;
    }
}
</style>