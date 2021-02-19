<template>
    <div class="edit">
        <div class="edit-header clearfix" v-if="$scopedSlots.header">
            <slot name="header"></slot>
        </div>
        <div
            class="edit-content"
            :style="{
                top: $scopedSlots.header ? top : '0',
                bottom: $scopedSlots.footer ? bottom : '0',
            }"
        >
            <slot name="content"></slot>
        </div>
        <div class="edit-footer clearfix" v-if="$scopedSlots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        top: {
            type: String,
            default: () => {
                return "42px";
            },
        },
        bottom: {
            type: String,
            default: () => {
                return "42px";
            },
        },
    },
    mounted() {},
};
</script>

<style lang='less' scoped>
.edit {
    height: 100%;
    position: relative;

    .edit-header,
    .edit-footer {
        padding: 5px 10px;
        background-color: rgb(215, 215, 215);
        color: white;
        border-radius: 5px;
        position: absolute;
        width: 100%;
    }

    .edit-header {
        top: 0;
    }

    .edit-footer {
        bottom: 0;
    }

    .edit-content {
        width: 100%;
        position: absolute;
        top: 42px;
        bottom: 42px;
        left: 0;
        right: 0;
        overflow: auto;
    }
}
</style>