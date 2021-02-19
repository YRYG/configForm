<template>
    <div class="height-fill" :class="temp.Class" :style="temp.Style">
        <MenuTree :spanLeft="5" class="margin-t-sm">
            <template v-slot:left>
                <div class="menu-tree menu-tree-light">
                    <div class="padding-lr-xs">
                        <h4 class="">
                            {{ titleName }}
                        </h4>
                        <el-link
                            type="primary"
                            class="margin-b-sm"
                            @click="isAdd = !isAdd"
                        >
                            {{ linkName }}
                        </el-link>

                        <el-radio-group
                            v-if="isAdd"
                            v-model="addType"
                            size="mini"
                            class="margin-b-sm"
                        >
                            <el-radio-button :label="1">
                                已投放
                            </el-radio-button>
                            <el-radio-button :label="0">
                                未投放
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                    <ul>
                        <li
                            v-for="(item, index) in tempList"
                            :key="index"
                            :class="{
                                active: activeAdsetTemp == item.ID,
                            }"
                            @click="clickToActiveAdset(item)"
                        >
                            <div class="ellipsis-2 bold padding-r-lg">
                                {{ item.Name }}
                            </div>
                            <el-link
                                type="primary"
                                class="menu-tree-extend"
                                @click.stop="clickToAdsetExtent(item)"
                            >
                                {{ isAdd ? "添加" : "移除" }}
                            </el-link>

                            <div class="adTemp">
                                <p class="color-warning">
                                    Cost:${{ item.Cost }}
                                </p>
                                <p class="color-success">
                                    <span>ROAS:{{ item.Roas }}</span>
                                    <span>Result:{{ item.Result }}</span>
                                    <span>ATC:{{ item.Cost }}</span>
                                </p>
                                <p class="color-danger">
                                    <span>CPC:${{ item.Cost }}</span>
                                    <span>CPATC:${{ item.Cost }}</span>
                                    <span>CPR:${{ item.Cost }}</span>
                                </p>
                                <p>Create at:{{ item.CreatedAt }}</p>
                                <p>Create by:{{ item.CreatedBy }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </template>
            <template v-slot:right>
                <div class="height-fill overAuto">
                    <configComponent
                        v-on="$listeners"
                        :temp="temp"
                        :prop="prop + 'Children.'"
                    ></configComponent>
                </div>
            </template>
        </MenuTree>
    </div>
</template>

<script>
import { AdTempConfig, AdSetTempConfig, AddConfigParams } from "../config";
export default {
    components: {
        MenuTree: (_) => import("../MenuTree"),
        configComponent: (_) => import("../configComponent"),
    },
    data() {
        return {
            // 已选择的campaign模板id
            activeAdsetTemp: 0,

            // campaign下是否添加新的adset模板
            isAdd: false,
            // campaign下添加新的adset模板的类型 （0：未投放  1: 已投放）
            addType: 1,

            // 当前campaign下的adset列表
            adSetList: [
                {
                    ID: 1,
                    Name: "conversion-US-video-Wireless Headset-Wireless",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: 1, // 0：未投放  1: 已投放
                },
                {
                    ID: 2,
                    Name: "conversion-US-video-Wireless Headset-Wireless",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: 0, // 0：未投放  1: 已投放
                },
                {
                    ID: 3,
                    Name: "conversion-US-video-Wireless Headset-Wireless3",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: 1, // 0：未投放  1: 已投放
                },
                {
                    ID: 4,
                    Name: "conversion-US-video-Wireless Headset-Wireless4",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: 1, // 0：未投放  1: 已投放
                },
            ],
            adList: [
                {
                    ID: 30,
                    Name: "conversion-US-video-Wireless Headset-30",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: 1, // 0：未投放  1: 已投放
                },
                {
                    ID: 34,
                    Name: "conversion-US-video-Wireless Headset-34",
                    Cost: 2.1,
                    Roas: 1.7,
                    Result: 5,
                    AtC: 10,
                    Cpc: 1.2,
                    Cpatc: 1.2,
                    Cpr: 1.2,
                    CreatedAt: "2020-11-27T06:51:01.795996Z",
                    CreatedBy: "刘念",
                    Type: 0, // 0：未投放  1: 已投放
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
        // 选中adset 获取adset的配置 获取ad的数据
        clickToActiveAdset(item) {
            this.activeAdsetTemp = item.ID;

            const Config =
                this.type == "Adset"
                    ? AdSetTempConfig.Config
                    : AdTempConfig.Config;
            const NConfig = AddConfigParams(Config, {
                Attr: { disabled: true },
            });

            let Children = [];
            if (this.type == "Adset") {
                Children.push({
                    SettingName: "Ad Set数量",
                    Component: "form-Input",
                    Key: "AdSetNum",
                    Value: 5,
                    DataType: "number",
                    Rule: {
                        Msg: "请输入 正确的Ad Set数量",
                        Regexp: /^(-?\d+)(\.\d+)?$/,
                        Required: true,
                    },
                });
            }

            Children.push(...NConfig);
            this.temp.Children = Children;
        },
        // 点击adset列表右上角的移除和添加
        clickToAdsetExtent(item) {
            if (this.isAdd) {
                this.temp.Value.push(item.ID);
            } else {
                this.temp.Value = this.temp.Value.filter((m) => m != item.ID);
            }
        },
    },
    computed: {
        type() {
            return this.temp.Type == "Adset" ? "Adset" : "Ad";
        },
        titleName() {
            let title = this.isAdd
                ? `添加新的${this.type}模板`
                : `已添加的${this.type}模板`;
            return title;
        },
        linkName() {
            let name = this.isAdd
                ? `查看已添加的${this.type}模板`
                : `添加新的${this.type}模板`;
            return name;
        },
        tempList() {
            const List = this.type == "Adset" ? this.adSetList : this.adList;
            return List.filter((m) => {
                const index = this.temp.Value.indexOf(m.ID);

                if (this.isAdd) {
                    return index == -1 && m.Type == this.addType;
                } else {
                    return index != -1;
                }
            });
        },
    },
};
</script>