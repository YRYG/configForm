<template>
    <el-button
        @click="click"
        v-bind="temp.Attr"
        v-on="$listeners"
        type="primary"
        :class="temp.Class"
        :style="temp.Style"
    >
        {{ temp.SettingName }}</el-button
    >
</template>

<script>
export default {
    components: {},
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
                this.$emit(
                    this.temp.ClickEvent,
                    this.temp,
                    this.$parent.temp,
                );
            }
        },
    },
};
</script>
<style lang="less" scoped>
</style>