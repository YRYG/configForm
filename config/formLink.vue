<template>
    <el-link type="primary" :class="temp.Class" :style="temp.Style" v-bind="temp.Attr" @click="click">{{ temp.SettingName }}</el-link>
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
     methods: {
        click() {
            if (this.temp.ClickEvent) {
                this.$emit(this.temp.ClickEvent, this.temp, this.$parent.temp);
            }
        },
    },
};
</script>