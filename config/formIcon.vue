<template>
    <i class="color-default" :class="temp.Class" :style="temp.Style" @click="click">
        {{ temp.SettingName }}
    </i>
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
                this.$emit(this.temp.ClickEvent, this.temp, this.$parent.temp);
            }
        },
    },
};
</script>

<style lang="less" scoped>
    .color-default{
        font-size: 20px;
    }
</style>