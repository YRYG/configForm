<template>
    <div class="text-item">
        <label :style="{ width: labelWidth }" class="form-label">{{
            label
        }}</label>
        <span :class="className">{{ text }}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        label: {
            type: String,
            default: "-",
        },
        text: {
            type: String,
            default: "",
        },
        labelWidth: {
            type: String,
            default: "100px",
        },
        className: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang='less' scoped>
.text-item {
    position: relative;
}
</style>