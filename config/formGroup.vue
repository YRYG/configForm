<template>
    <div class="position-rel margin-t-sm" :class="temp.Class">
        <h4 class="group-title">{{ temp.SettingName }}</h4>
        <div class="padding-sm border-d br5 bg-color-white">
            <configComponent
                v-on="$listeners"
                :temp="temp"
                :prop="prop + 'Children.'"
            ></configComponent>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        configComponent: (_) => import("../configComponent"),
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

<style lang='less' scoped>
.group-title {
    font-size: 16px;
}
</style>