<template>
    <div :class="temp.Class" :style="temp.Style" class="steps">
        <div class="flex">
            <el-steps
                class="steps-group"
                :active="temp.Value"
                finish-status="success"
                v-bind="temp.Attr"
            >
                <el-step
                    v-for="(item, index) in temp.Stepslable"
                    :key="index"
                    :title="item"
                ></el-step>
            </el-steps>

            <div class="steps-btns">
                <template v-for="(item, index) in temp.StepsGroup">
                    <configComponent
                        :temp="item"
                        :key="'group' + index"
                        :prop="prop + 'StepsGroup.' + index + '.Children.'"
                        v-on="$listeners"
                        v-if="temp.Value == item.Value"
                    ></configComponent>
                </template>
            </div>
        </div>

        <div style="height: calc(100% - 67px)" class="overAuto">
            <div
                v-for="(item, index) in temp.OptionGroup"
                class="margin-t-lg"
                :key="index"
            >
                <span v-show="temp.Value == item.Value">
                    <configComponent
                        :temp="item"
                        v-on="$listeners"
                        :prop="prop + 'OptionGroup.' + index + '.Children.'"
                    ></configComponent>
                </span>
            </div>
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
    created() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.steps {
    height: 100%;
    position: relative;
}

.steps-group {
    width: 100%;
    padding-right: 50px;
    padding-bottom: 10px;
}

.steps-btns {
    width: 100%;
    text-align: right;
}
</style>
