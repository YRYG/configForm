<template>
    <configFormItem :temp="temp" :prop="prop" v-on="$listeners">
        <el-date-picker
            v-model="temp.Value"
            v-bind="temp.Attr"
            class="width-fill"
        >
        </el-date-picker>
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