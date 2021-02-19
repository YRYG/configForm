<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    components: {
        configFormItem: (_) => import("../configFormItem"),
        formSelectItem: (_) => import("./formSelectItem"),
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
        model: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    methods:{
        setModel(data){
            // this.
            this.model = data;
            console.log('setmodel',data);
        }
    }
};
</script>