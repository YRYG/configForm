<template>
    <div
        class="message"
        v-show="visiable"
        :style="{ 'border-left-color': borderColor }"
    >
        <i class="message-icon el-icon-warning" :class="typeColor"></i>
        <div>{{ msg || '-' }}</div>
        <i
            class="message-close el-icon-close"
            v-if="close"
            @click="visiable = false"
        ></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visiable: true,
        };
    },
    props: {
        type: {
            type: String,
            default: () => {
                return "danger";
            },
        },
        msg: {
            type: String,
            default: () => {
                return "";
            },
        },
        close: {
            type: Boolean,
            default: () => {
                return false;
            },
        },
    },
    computed: {
        typeColor() {
            return "color-" + this.type;
        },
        borderColor() {
            switch (this.type) {
                case "primary":
                    return "#409EFF";
                case "danger":
                    return "#F56C6C";
                case "success":
                    return "#67C23A";
                    break;
                case "warning":
                    return "#E6A23C";
                    break;
                case "info":
                    return "#bbb";
                    break;
            }

            // return
        },
    },
};
</script>

<style lang='less' scoped>
.message {
    position: relative;
    background-color: #fff;
    border-radius: 6px;
    padding: 10px 20px 10px 40px;
    border: 1px solid #eee;
    border-left: 4px solid #f56c6c;

    .message-icon {
        position: absolute;
        top: 12px;
        left: 10px;
        font-size: 18px;
        color: #f56c6c;
    }

    .message-close {
        position: absolute;
        top: 13px;
        right: 10px;
        font-size: 18px;
        cursor: pointer;
    }
}
</style>