<template>
    <div>
        <p class="form-label text-18">{{ temp.SettingName }}</p>
        <p class="form-label">未关联的{{ Type }}模板</p>
        <div>
            <div
                class="select-item"
                :class="{ active: temp.Value == item.ID }"
                v-for="(item, index) in List.filter((m) => m.Type == '0')"
                :key="index"
                @click="clickToActive(item.ID)"
            >
                <h4 class="ellipsis-2">{{ item.Name }}</h4>
                <p>
                    <span>Create by：{{ item.CreatedBy }}</span>
                    <span>Create at：{{ item.CreatedAt }}</span>
                </p>
            </div>
        </div>
        <p class="form-label">已投放的{{ Type }}模板</p>
        <div>
            <div
                class="select-item"
                :class="{ active: temp.Value == item.ID }"
                v-for="(item, index) in List.filter((m) => m.Type == '1')"
                :key="index"
                @click="clickToActive(item.ID)"
            >
                <h4 class="ellipsis-2">{{ item.Name }}</h4>
                <p>
                    <span>Create by：{{ item.CreatedBy }}</span>
                    <span>Create at：{{ item.CreatedAt }}</span>
                </p>
                <el-row>
                    <el-col :span="6">ROAS:{{ item.Roas }}</el-col>
                    <el-col :span="6">ROAS:{{ item.Roas }}</el-col>
                    <el-col :span="6">ROAS:{{ item.Roas }}</el-col>
                    <el-col :span="6">ROAS:{{ item.Roas }}</el-col>
                    <el-col :span="6">ROAS:{{ item.Roas }}</el-col>
                    <el-col :span="6">ROAS:{{ item.Roas }}</el-col>
                </el-row>
            </div>
        </div>

        <configComponent
            :temp="temp"
            :prop="prop + 'Children.'"
        ></configComponent>
    </div>
</template>

<script>
import {
    AdTempConfig,
    CampaignCreateSelectAdsetTempConfig,
    AddConfigParams,
} from "../config";

export default {
    // todo: 获取ad模板列表  修改下方的 adList假数据  config 应该从获取的模板列表里拿
    components: {
        formSelectGroup: (_) => import("./formSelectGroup"),
        formSelectItem: (_) => import("./formSelectItem"),
        configComponent: (_) => import("../configComponent"),
    },
    data() {
        return {
            adList: [
                {
                    ID: 1,
                    Name:
                        "conversion-US-video-Wireless Headset-Wirelessconversion-US-video-Wireless Headset-Wirelessconversion-US-video-Wireless Headset-Wireless",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: "1",
                },
                {
                    ID: 2,
                    Name: "conversion-US-video-Wireless Headset-Wireless222",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: "0",
                },
                {
                    ID: 3,
                    Name: "conversion-US-video-Wireless Headset-Wireless222",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: "0",
                },
                {
                    ID: 4,
                    Name: "conversion-US-video-Wireless Headset-Wireless222",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: "0",
                },
            ],
            adSetList: [
                {
                    ID: 1,
                    Name:
                        "conversion-US-video-Wireless Headset-Wirelessconversion-US-video-Wireless Headset-Wirelessconversion-US-video-Wireless Headset-adsetadsetadset",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: "1",
                },
            ],
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
    methods: {
        clickToActive(ID) {
            if (this.temp.Value == ID) return;
            this.temp.Value = ID;

            let Config = {};
            if (this.Type == "AdSet") {
                Config = CampaignCreateSelectAdsetTempConfig.Config;
            } else {
                Config = AdTempConfig.Config;
            }

            // 将ad模板的所有项禁用
            const NConfig = AddConfigParams(Config, {
                Attr: { disabled: true },
            });

            this.temp.Children = NConfig;
        },
    },
    computed: {
        Type() {
            return this.temp.Attr && this.temp.Attr.type == "adset"
                ? "AdSet"
                : "Ad";
        },
        List() {
            return this.Type == "AdSet" ? this.adSetList : this.adList;
        },
    },
};
</script>

<style lang='less' scoped>
.select-item {
    display: inline-block;
    min-height: 32px;
    max-width: 400px;
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