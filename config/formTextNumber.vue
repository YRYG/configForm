<template>
    <div :class="temp.Class"  :style="temp.Style" class="text14">
        <span>{{temp.SettingName}}</span><span>{{Value}}:</span>
    </div>
</template>

<script>
export default {
    components: {
        configFormItem: (_) => import("../configFormItem"),
    },
    data() {
        return {
            Value:''
        };
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
    created(){
        this.Value=this.temp.Value++;
    }
};
</script>
<style lang="less" scoped>

</style>