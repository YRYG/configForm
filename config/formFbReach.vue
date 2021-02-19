<template>
    <div class="targeting-desc">
        <h4>Audience Definition</h4>
        <h5>Potential Reach：{{ temp.Value.definition }}</h5>
        <h4>Estimated Daily Results</h4>
        <h5>Reach：{{ temp.Value.results }}</h5>
        <h5>Conversion：{{ temp.Value.conversion }}</h5>
    </div>
</template>

<script>
export default {
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
};
</script>

<style lang="less" scoped>
.targeting-desc {
    position: absolute;
    top: 40px;
    right: 10px;
    width: 240px;
    background-color: #d7d7d7;
    padding: 20px;
    border-radius: 5px;

    h4 + h5 {
        margin-bottom: 20px;
    }
}
</style>