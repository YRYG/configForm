<template>
    <el-row :gutter="10">
        <el-col :span="8" v-for="(item, index) in temp.Options" :key="index">
            <div
                @click="clickToActive(item.Pageid)"
                class="post-item"
                :class="{ active: temp.Value == item.Pageid }"
            >
                <i class="el-icon-success post-check"></i>
                <div class="ellipsis-2">
                    {{ item.Message }}
                </div>
                <div class="color-warning">Cost:${{ item.Cost }}</div>
                <el-row>
                    <el-col :span="8" class="color-success">
                        ROAS:{{ item.Roas }}
                    </el-col>
                    <el-col :span="8" class="color-success">
                        Result:{{ item.Result }}
                    </el-col>
                    <el-col :span="8" class="color-success">
                        ATC:{{ item.ATC }}
                    </el-col>
                    <el-col :span="8" class="color-danger">
                        CPC:${{ item.CPC }}
                    </el-col>
                    <el-col :span="8" class="color-danger">
                        CPATC:${{ item.CPATC }}
                    </el-col>
                    <el-col :span="8" class="color-danger">
                        CPR:${{ item.CPR }}
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    components: {
        configFormItem: (_) => import("../configFormItem"),
    },
    data() {
        return {
            postList: [
                {
                    Message: "purchase-45-65-male-Wireless Headset - Copy 3",
                    Pageid: 1,
                    Cost: "float64",
                    Roas: "float64",
                    Result: "int64",
                    ATC: "int64",
                    CPC: "float64",
                    CPATC: "float64",
                    CPR: "float64",
                },
                {
                    Message: "purchase-45-65-male-Wireless Headset - Copy 3",
                    Pageid: 2,
                    Cost: "float64",
                    Roas: "float64",
                    Result: "int64",
                    ATC: "int64",
                    CPC: "float64",
                    CPATC: "float64",
                    CPR: "float64",
                },
                {
                    Message: "purchase-45-65-male-Wireless Headset - Copy 3",
                    Pageid: 3,
                    Cost: "float64",
                    Roas: "float64",
                    Result: "int64",
                    ATC: "int64",
                    CPC: "float64",
                    CPATC: "float64",
                    CPR: "float64",
                },
            ],
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
        clickToActive(id) {
            this.temp.Value = id;
        },
    },
};
</script>

<style lang="less" scoped>
.post-item {
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(242, 242, 242);
    border-radius: 5px;
    padding: 10px;
    padding-right: 40px;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
        border: 1px solid #67c23a;

        .el-icon-success {
            opacity: 1;
        }
    }

    .el-icon-success {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 18px;
        opacity: 0;
        color: #67c23a;
    }
}
</style>