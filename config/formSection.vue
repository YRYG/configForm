<template>
    <el-form-item
        :label="temp.SettingName"
        :class="temp.Class"
        :style="temp.Style"
    >
        <el-row>
            <el-col :span="11">
                <el-form-item
                    :prop="prop + 'Value.min'"
                    :rules="[
                        {
                            validator: (rule, value, callback) => {
                                let max = temp.Value.max;

                                if (!value) {
                                    callback(temp.Rule.Msg);
                                } else {
                                    if (
                                        !Regexp(temp.Rule.Regexp, value) ||
                                        (max && max != 0 && value > max)
                                    ) {
                                        callback(temp.Rule.Msg);
                                    } else if (
                                        value > ruleMax ||
                                        value < ruleMin
                                    ) {
                                        callback(temp.Rule.Msg);
                                    } else {
                                        callback();
                                    }
                                }
                            },
                            trigger: 'blur',
                        },
                    ]"
                >
                    <el-input v-model.number="temp.Value.min" type="number" v-bind="temp.Attr">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="2" class="tc"> - </el-col>
            <el-col :span="11">
                <el-form-item
                    :prop="prop + 'Value.max'"
                    :rules="[
                        {
                            validator: (rule, value, callback) => {
                                let min = temp.Value.min;

                                if (!value) {
                                    callback(temp.Rule.Msg);
                                } else {
                                    if (
                                        !Regexp(temp.Rule.Regexp, value) ||
                                        (min && min != 0 && value < min)
                                    ) {
                                        callback(temp.Rule.Msg);
                                    } else if (
                                        value > ruleMax ||
                                        value < ruleMin
                                    ) {
                                        callback(temp.Rule.Msg);
                                    } else {
                                        callback();
                                    }
                                }
                            },
                            trigger: 'blur',
                        },
                    ]"
                >
                    <el-input v-model.number="temp.Value.max" type="number" v-bind="temp.Attr">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form-item>
</template>

<script>
import formRule from "../../core/formRules";

export default {
    components: {},
    data() {
        return {
            formRule: formRule,

            ruleMin: this.temp.Rule.Min,
            ruleMax: this.temp.Rule.Max,
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
    methods: {
        Regexp(reg, value) {
            if (!reg) return true;
            return eval(reg).test(value);
        },
        cl(v){
            console.log(v);
        }
    },
    watch: {
        "temp.Value": {
            deep: true,
            handler(data) {
                if (this.temp.ChangeEvent) {
                    this.$emit(
                        this.temp.ChangeEvent,
                        data,
                        this.temp,
                        this.$parent.temp
                    );
                }
            },
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ label {
    // line-height: 22px;
    // margin-bottom: 5px !important;
}
/deep/ .el-form-item__label{
    float: none;
}
</style>