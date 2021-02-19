<template>
    <configFormItem :temp="temp" :prop="prop" v-on="$listeners">
        <el-input
            v-model="temp.Value"
            :placeholder="temp.Placeholder"
            v-bind="temp.Attr"
        ></el-input>
    </configFormItem>
</template>

<script>
export default {
    components: {
        configFormItem: (_) => import("../configFormItem"),
    },
    data() {
        return {};
    },
    created() {},
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