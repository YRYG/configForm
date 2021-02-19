<template>
    <span>
        <component
            v-on="$listeners"
            v-bind:is="item.Component"
            v-for="(item, index) in temp.Config || temp.Children"
            :key="index"
            :index="index"
            :temp="item"
            :prop="prop + index + '.'"
            :parent="temp"
        ></component>
    </span>
</template>

<script>
import { components } from "./components";

export default {
    components: components,
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

<style lang='less' scoped>
</style>