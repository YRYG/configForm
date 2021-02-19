<template>
    <el-divider :class="temp.Class" v-bind="temp.Attr" :style="temp.Style">
        {{ temp.SettingName }}
    </el-divider>
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
};
</script>