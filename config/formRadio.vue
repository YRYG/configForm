<template>
    <span>
        <configFormItem :temp="temp" :prop="prop" v-on="$listeners">
            <el-radio-group v-model="temp.Value" v-bind="temp.Attr">
                <component
                    v-bind:is="
                        temp.Type == 'button' ? 'el-radio-button' : 'el-radio'
                    "
                    v-for="(item, index) in optionsList"
                    :key="index"
                    :label="item.Value"
                    :disabled="item.Disabled"
                >
                    {{ item.Name }}
                </component>
            </el-radio-group>
        </configFormItem>
        <template v-if="temp.OptionGroup">
            <template v-for="(item, index) in temp.OptionGroup">
                <configComponent
                    v-if="item.Value == temp.Value"
                    :key="index"
                    :temp="item"
                    :prop="prop + 'OptionGroup.' + index + '.Children.'"
                ></configComponent>
            </template>
        </template>
    </span>
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
    inject: ["provideData"],
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
        optionsList() {
            if (this.temp.Options instanceof Array) {
                return this.temp.Options;
            }

            if (this.temp.Options instanceof String) {
                return this.provideData[this.temp.Options] || [];
            }

            return [];
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