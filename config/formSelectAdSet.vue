<template>
    <div :class="temp.Class" :style="temp.Style" class="">
        <el-radio-group v-model="addType" size="mini" class="margin-b-sm">
            <el-radio-button :label="1"> 已投放 </el-radio-button>
            <el-radio-button :label="0"> 未投放 </el-radio-button>
        </el-radio-group>
        <el-input
            placeholder="请输入模板名搜索"
            v-model="searchName"
            prefix-icon="el-icon-search"
            class="margin-b-sm"
        ></el-input>

        <!-- todo: 用el-row 重构下面代码 限制高度 -->

        <div class="content overAuto">
            <div
                class="select-item"
                v-for="(item, index) in selectList"
                :key="index"
                :class="{
                    active: temp.Value == item.ID,
                }"
                @click="clickToActive(item)"
            >
                <h4 class="ellipsis-2">
                    {{ isAdset ? item.AdsetName : item.AdName }}
                </h4>
                <p>Create at:{{ item.CreatedAt }}</p>
                <p>Create by:{{ item.CreatedBy }}</p>
                <el-row>
                    <el-col :span="6">ROAS:{{ item.Roas }}</el-col>
                    <el-col :span="6">Result:{{ item.Result }}</el-col>
                    <el-col :span="6">CPC:${{ item.Cost }}</el-col>
                    <el-col :span="6">CPATC:${{ item.Cost }}</el-col>
                    <el-col :span="6">CPR:${{ item.Cost }}</el-col>
                </el-row>
            </div>
        </div>

        <configComponent
            v-on="$listeners"
            :temp="temp"
            :prop="prop + 'Children.'"
        ></configComponent>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { AddConfigParams, GetConfig } from "../config";
import { Config } from "../../core/api";

export default {
    components: {
        configComponent: (_) => import("../configComponent"),
    },
    data() {
        return {
            // 搜索模板名
            searchName: "",
            // 投放类型 (1: 已投放； 0: 未投放)
            addType: 1,
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
    created() {
        if (this.productID != 0) {
            if (this.isAdset) {
                this.getAdSetTempList();
            } else {
                this.getAdTempList();
                this.getMaterial();
            }
        }
    },
    computed: {
        isAdset() {
            return this.temp.Attr && this.temp.Attr.type == "adset";
        },
        selectList() {
            return this.isAdset ? this.adSetTempList : this.adTempList;
        },
        ...mapState([
            "productID",
            "adSetTempList",
            "adTempList",
            "materialAllData",
        ]),
    },
    methods: {
        ...mapActions(["getAdSetTempList", "getAdTempList", "getMaterial"]),
        // 选择模板
        clickToActive(item) {
            this.setTemp(this.isAdset ? "adset" : "ad", item);
        },
        // 设置模板内容
        setTemp(type, data) {
            let c_Key = type == "adset" ? "SetAdSetTemp" : "SetAdTemp";
            let c_Name = type == "adset" ? "AdSetName" : "AdName";
            let c_SetAdSetTemp = GetConfig(this.temp.Children, c_Key);

            let s_Config = AddConfigParams(data.Config, { Class: "hide" }, [
                c_Name,
                "Product",
            ]);

            // 禁用
            let a_Config = AddConfigParams(s_Config, {
                Attr: { disabled: true },
            });

            this.temp.Value = data.ID;
            c_SetAdSetTemp.Children = a_Config;
        },
    },
    watch: {},
};
</script>

<style lang="less" scoped>
.content {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    max-height: 170px;
}
.select-item {
    display: inline-block;
    min-height: 32px;
    max-width: 340px;
    padding: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: rgb(242, 242, 242);
    cursor: pointer;

    &.active,
    &:hover {
        background-color: rgb(202, 249, 130);
    }

    * {
        margin: 0;
    }

    p {
        margin-top: 5px;

        span {
            &:last-of-type {
                margin-left: 10px;
            }
        }
    }
}
</style>
