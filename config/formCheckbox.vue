<template>
    <div>
        <configFormItem :temp="temp" :prop="prop" v-on="$listeners">
            <el-checkbox-group v-model="temp.Value" v-bind="temp.Attr">
                <component
                    v-bind:is="
                        temp.Type == 'button' ? 'el-checkbox-button' : 'el-checkbox'
                    "
                    v-for="(item, index) in temp.Options"
                    :key="index"
                    :label="item.Value"
                    :disabled="item.Disabled"
                >
                    {{ item.Name }}
                </component>
            </el-checkbox-group>
        </configFormItem>
        <template v-if="temp.OptionGroup">
            <div v-for="(item, index) in temp.OptionGroup" :key="index">
                <template v-if="item.Value == temp.Value">
                    <configComponent
                        :temp="item"
                        :prop="prop + 'OptionGroup.' + index + '.Children.'"
                    ></configComponent>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    components: {
        configFormItem: (_) => import("../configFormItem"),
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
    watch: {
        "temp.Value"(ndata, odata) {
            if (this.temp.ChangeEvent) {
                this.$emit(
                    this.temp.ChangeEvent,
                    ndata,
                    this.temp,
                    this.$parent.temp
                );
            }
        },
    },
};
</script>