<template>
    <div :class="temp.Class" :style="temp.Style">
        <p v-if="temp.SettingName" class="title">{{ temp.SettingName }}</p>
        <p v-if="temp.Placeholder" class="content margin-b-sm">
            {{ temp.Placeholder }}
        </p>
    </div>
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
};
</script>
<style lang="less" scoped>
p {
    margin-bottom: 0;
}

.title {
    color: #606266;
    font-weight: 700;
    margin-bottom: 5px;
}

.content {
    color: #bbb;
}
</style>