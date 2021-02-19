<template>
    <div
        class="select-item"
        :class="{ active: isActive }"
        @click="clickToActive"
    >
        <!-- <input type="checkbox" class="hide" v-model="$parent.model" /> -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            isActive: false,
        };
    },
    props: {
        value: {},
    },
    methods: {
        clickToActive() {
            this.isActive = !this.isActive;
            // this.$parent.setModel && this.$parent.setModel([123]);
            console.log("this.par",this);
            // this.$emit('input', val);
        },
    },
};
</script>
<style lang="less" scoped>
.select-item {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    padding: 0 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: rgb(242, 242, 242);
    cursor: pointer;

    &.active,
    &:hover {
        background-color: rgb(202, 249, 130);
    }
}
</style>