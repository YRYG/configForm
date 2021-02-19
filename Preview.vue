<template>
    <!-- 预览素材组件 -->
    <div>
        <div v-if="matType == 'video'" @dblclick="show">
            <slot></slot>

            <!-- 预览视频弹出框 -->
            <el-dialog
                :visible.sync="videoVisible"
                @opened="videoOpen"
                @close="videoStop"
                width="50%"
                center
                append-to-body
            >
                <video
                    id="videoPlay"
                    style="width: 100%; height: 500px"
                    :src="videoPlaySrc"
                    controls
                ></video>
            </el-dialog>
        </div>

        <div v-else v-viewer="{ movable: false, zIndexInline: 2017 }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { slice } from "../core/fake";
import { BASE_URL } from "../core/request";

export default {
    data() {
        return {
            // 预览视频的弹窗是否显示
            videoVisible: false,
            // 预览的视频地址
            videoPlaySrc: "",
            // 预览的视频对象
            vObject: null,
        };
    },
    props: {
        matType: {
            type: String,
            default: () => {
                return "image";
            },
        },
        matPath: {
            type: String,
            default: () => {
                return "";
            },
        },
        matGroup: {
            type: String,
            default: () => {
                return "";
            },
        },
        matGroupIndex: {
            type: Number,
            default: () => {
                return 0;
            },
        },
    },
    methods: {
        // 预览素材
        show() {
            if (!this.matPath) return;
            if (this.matType == "image") {
                const viewer = this.matGroup
                    ? this.$parent.$el.querySelector(this.matGroup).$viewer
                    : this.$el.$viewer;
                viewer.index = this.matGroup ? this.matGroupIndex : 0;
                viewer.show();
            } else {
                this.videoPlaySrc = this.viewCut(this.matPath);
                this.videoVisible = true;
            }
        },
        // 拼接素材地址
        viewCut(str) {
            return BASE_URL + str.slice(1);
        },
        // 视频弹窗加载完成后事件
        videoOpen() {
            this.vObject = document.getElementById("videoPlay");
            this.vObject.play();
        },
        // 视频弹窗关闭事件
        videoStop() {
            this.vObject.pause();
        },
    },
};
</script>

<style lang='less' scoped>
</style>