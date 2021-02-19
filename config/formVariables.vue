<template>
    <div>
        <p class="form-label">{{ temp.SettingName }}</p>
        <div
            v-for="(item, index) in temp.Value"
            :key="index"
            class="padding-b-lg"
        >
            <span>变量名</span>
            <el-input v-model="item.Key" class="wd200"> </el-input>
            <span>值</span>
            <el-input v-model="item.Value" class="wd200"> </el-input>
            <i
                class="el-icon-delete padding-l-sm condition-del"
                @click="del(index)"
            ></i>
        </div>
        <el-button type="text" @click="addItem()">添加变量</el-button>
    </div>
</template>

<script>
import formRule from "../../core/formRules";

export default {
    components: {},

    data() {
        return {
            formRule: formRule,
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
    methods: {
        //   删除
        del(index) {
            this.temp.Value.splice(index, 1);
        },
        // 添加
        addItem() {
            this.temp.Value.push({
                Key: null,
                Value: null,
            });
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ label {
    line-height: 22px;
    margin-bottom: 5px !important;
}
.condition-del {
    font-size: 20px;
}
i {
    cursor: pointer;
}
</style>