<template>
    <div>
        <input
            id="fileInput"
            class="upload-input hide"
            type="file"
            ref="fileInput"
            multiple
            accept="image/png, image/jpeg, image/gif, video/mp4"
            @change="fileInputChange(true, 'fileImage', 'imgUpload')"
        />

        <formRadio :temp="temp" :prop="prop"></formRadio>

        <div class="media-group">
            <el-form-item
                v-if="temp.Value == 'video'"
                :prop="prop + 'Children.0.Value'"
                :rules="[formRule.default('请选择一个视频！', 'change')]"
                class="media-item"
                v-loading="videoLoading"
            >
                <div class="video-bg">
                    <Preview :matType="'video'" :matPath="videoPath">
                        <video
                            style="width: 200px; height: 200px"
                            :src="viewCut(videoPath)"
                            @canplay="loadVideo"
                        ></video>
                    </Preview>
                </div>
                <el-link
                    type="primary"
                    @click="selectMaterial('video')"
                    v-bind="temp.Attr"
                >
                    Select Video
                </el-link>
            </el-form-item>
            <el-form-item
                :prop="prop + 'Children.1.Value'"
                :rules="[formRule.default('请选择一张图片！', 'change')]"
                class="media-item"
                v-loading="imageLoading"
            >
                <div class="img-bg">
                    <Preview :matType="'image'" :matPath="imagePath">
                        <el-image
                            fit="fit"
                            v-if="imagePath"
                            style="width: 200px; height: 200px"
                            :src="viewCut(imagePath)"
                            @load="loadImage"
                        ></el-image>
                    </Preview>
                </div>
                <el-link
                    type="primary"
                    @click="selectMaterial('image')"
                    v-bind="temp.Attr"
                >
                    Select Thumbnail
                </el-link>
            </el-form-item>
            <div class="media-item">
                <configComponent
                    :temp="temp"
                    :prop="prop + 'Children.'"
                    v-on="$listeners"
                ></configComponent>
            </div>
        </div>

        <el-dialog
            title="Select Image or Video"
            :visible.sync="materialVisible"
            width="50%"
            center
            append-to-body
        >
            <div>
                <el-radio
                    v-for="item in materialData"
                    :key="item.ID"
                    v-model="materialSelect"
                    :label="item.ID"
                >
                    <div style="width: 100px; height: 14px">
                        <el-image
                            style="width: 100px; height: 100px"
                            fit="fit"
                            :src="viewCut(item.CutPath)"
                        ></el-image>
                        <div
                            style="
                                width: 100px;
                                height: 20px;
                                margin-top: 5px;
                                line-height: 20px;
                                text-align: center;
                            "
                        >
                            {{ item.Width }} * {{ item.High }}
                        </div>
                    </div>
                </el-radio>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="materialVisible = false">取 消</el-button>
                <el-button type="primary" @click="onClickUpload">
                    上 传
                </el-button>
                <el-button type="primary" @click="onClickSelect">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { BASE_URL } from "../../core/request";
import { Material } from "../../core/api";
import formRule from "../../core/formRules";
import Preview from "../Preview";
import { mapState, mapActions } from "vuex";

export default {
    components: {
        configComponent: (_) => import("../configComponent"),
        formRadio: (_) => import("./formRadio"),
        Preview,
    },
    data() {
        return {
            formRule: formRule,
            // 加载视频loading
            videoLoading: false,
            // 加载图片loading
            imageLoading: false,

            // 素材类型
            materialType: "image",
            // 选择图片的弹窗是否显示
            materialVisible: false,
            // 素材列表
            materialData: [],
            // 选择的素材列表
            materialSelect: "",
        };
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
    methods: {
        ...mapActions(["getMaterial"]),

        // 图片加载完成
        loadImage() {
            this.imageLoading = false;
        },
        // 视频加载完成
        loadVideo() {
            this.videoLoading = false;
        },
        // 转换资源文件的路径
        viewCut(str) {
            return BASE_URL + str.slice(1);
        },

        // 上传图片触发的事件
        fileInputChange() {
            const fileList = Array.from(this.$refs["fileInput"].files);

            fileList.forEach((file, index) => {
                let that = this;
                this.uploadMark = false;
                let mark = file.type === "video/mp4" ? true : false;
                if (mark) {
                    let video = document.createElement("video");
                    video.preload = "metadata";
                    video.src = URL.createObjectURL(file);
                    video.onloadedmetadata = () => {
                        window.URL.revokeObjectURL(video.src);
                        let data = {
                            Type: "video",
                            Width: video.videoWidth,
                            Height: video.videoHeight,
                        };
                        let formData = new FormData();
                        formData.append("videofile", file);
                        // formData.append("Width", video.videoWidth);
                        // formData.append("Height", video.videoHeight);
                        // formData.append("productid", proId);
                        Material.addVideo(
                            {
                                productid: that.productID,
                                Width: video.videoWidth,
                                Height: video.videoHeight,
                            },
                            formData
                        ).then((res) => {
                            that.getMaterial();
                            that.$notify.success(res.data);
                        });
                    };
                } else {
                    let reader = new FileReader();
                    let data = new Object();
                    data.Type = "image";
                    reader.readAsDataURL(file);
                    reader.onload = function (theFile) {
                        let image = new Image();
                        image.src = theFile.target.result;
                        image.onload = function () {
                            if (this.width < 100 || this.height < 100) {
                                return that.$notify.error(
                                    "图片尺寸至少大于100 * 100"
                                );
                            }

                            let data = {
                                Type: "image",
                                Width: this.width,
                                Height: this.height,
                            };
                            let formData = new FormData();
                            formData.append("imagefile", file);
                            // formData.append("Width", this.width);
                            // formData.append("Height", this.height);
                            // formData.append("productid", proId);
                            Material.addImage(that.productID, formData).then(
                                (res) => {
                                    that.getMaterial();
                                    that.$notify.success(res.data);
                                }
                            );
                        };
                    };
                }
            });

            this.$refs["fileInput"].value = "";
        },
        // 选择图片获取视频
        selectMaterial(type) {
            this.materialType = type;
            this.materialData =
                type == "image" ? this.imageData : this.videoData;

            this.materialVisible = true;
        },
        // 点击上传图片
        onClickUpload() {
            this.$el.querySelector("#fileInput").click();
        },
        // 点击确认图片
        onClickSelect() {
            if (this.materialSelect === "") {
                return this.$notify.info({
                    message: "请选择一张图片",
                });
            }

            if (this.materialType == "image") {
                this.imageLoading = true;
                this.temp.Children[1].Value = this.materialSelect;
            } else {
                this.videoLoading = true;
                this.temp.Children[0].Value = this.materialSelect;
            }

            this.materialVisible = false;
        },
    },
    watch: {
        imageData(data) {
            this.materialData = data;
        },
        videoData(data) {
            this.materialData = data;
        },
    },
    computed: {
        imagePath() {
            const i = this.imageData.find(
                (m) => m.ID == this.temp.Children[1].Value
            );

            return i ? i.Path : "";
        },
        videoPath() {
            const v = this.videoData.find(
                (m) => m.ID == this.temp.Children[0].Value
            );

            return v ? v.Path : "";
        },
        ...mapState(["imageData", "videoData", "productID"]),
    },
};
</script>

<style lang="less" scoped>
.media-group {
    display: flex;

    .media-item {
        height: 240px;
        text-align: center;
        margin-right: 20px;

        &:last-of-type {
            width: 100%;
            text-align: left;
        }
    }

    .video-bg,
    .img-bg {
        width: 200px;
        height: 200px;
        cursor: pointer;
    }

    .video-bg {
        background: rgba(246, 246, 246) url(../../../public/img/video.png)
            no-repeat center;
    }

    .img-bg {
        background: rgba(246, 246, 246) url(../../../public/img/img.png)
            no-repeat center;
    }
}
</style>