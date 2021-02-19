<template>
    <el-popover placement="bottom" width="600" trigger="click">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="This Account" name="this">
                <ul class="custom-ul">
                    <li
                        v-for="(item, index) in checkList"
                        :key="index"
                        :class="{
                            active:
                                item.check ||
                                activeList.some((m) => m.id == item.id),
                        }"
                    >
                        <div
                            class="custom-content"
                            @click="audienctActive(item)"
                        >
                            <div class="custom-title">
                                {{ item.name }}
                                <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="hover"
                                >
                                    <div
                                        class="custom-info"
                                        style="
                                            max-height: 300px;
                                            overflow: auto;
                                        "
                                    >
                                        <template
                                            v-if="item.subtype == 'LOOKALIKE'"
                                        >
                                            <p class="bold no-margin-b">
                                                Source:
                                                {{
                                                    item.lookalike_spec
                                                        .origin[0].name
                                                }}
                                            </p>
                                            <p class="no-margin-b">
                                                Rule:
                                                {{ convertRule(item) }}
                                            </p>
                                        </template>
                                        <template v-else>
                                            <!-- inclusions -->
                                            <div class="bold">Rules</div>
                                            <p class="color-default">
                                                <span class="bold">
                                                    Include
                                                </span>
                                                people who meet
                                                <span class="color-b">
                                                    {{
                                                        item.AudienceRule
                                                            .inclusions
                                                            .operator == "or"
                                                            ? "any"
                                                            : "all"
                                                    }}
                                                </span>
                                                of the following crit
                                            </p>
                                            <div
                                                v-for="(rule, ruindex) in item
                                                    .AudienceRule.inclusions
                                                    .rules"
                                                :key="ruindex"
                                            >
                                                <div
                                                    class="bold margin-tb-sm"
                                                    v-if="ruindex != 0"
                                                >
                                                    Or
                                                </div>

                                                <div class="padding-l-sm">
                                                    <div class="bold">
                                                        {{
                                                            rule.filter
                                                                .filters[0]
                                                                .value
                                                        }}
                                                    </div>
                                                    <div class="padding-l-sm">
                                                        <div>
                                                            <span>Pixel</span>:
                                                            {{
                                                                rule
                                                                    .event_sources[0]
                                                                    .id
                                                            }}
                                                        </div>
                                                        <div>
                                                            Frame: In the past
                                                            {{
                                                                rule.retention_seconds /
                                                                86400
                                                            }}
                                                            days
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- 如果有 exclusions -->
                                            <template
                                                v-if="
                                                    item.AudienceRule.exclusions
                                                "
                                            >
                                                <p
                                                    class="color-default margin-t-lg"
                                                >
                                                    <span class="bold">
                                                        Exclude
                                                    </span>
                                                    people who meet
                                                    <span class="color-b">
                                                        any
                                                    </span>
                                                    of the following crit
                                                </p>
                                                <div
                                                    v-for="(
                                                        rule, ruindex
                                                    ) in item.AudienceRule
                                                        .exclusions.rules"
                                                    :key="
                                                        rule.event_sources[0]
                                                            .id + ruindex
                                                    "
                                                >
                                                    <div
                                                        class="bold margin-tb-sm"
                                                        v-if="ruindex != 0"
                                                    >
                                                        Or
                                                    </div>

                                                    <div class="padding-l-sm">
                                                        <div class="bold">
                                                            {{
                                                                rule.filter
                                                                    .filters[0]
                                                                    .value
                                                            }}
                                                        </div>
                                                        <div
                                                            class="padding-l-sm"
                                                        >
                                                            <div>
                                                                <span>Id</span>:
                                                                {{
                                                                    rule
                                                                        .event_sources[0]
                                                                        .id
                                                                }}
                                                            </div>
                                                            <div>
                                                                Frame: In the
                                                                past
                                                                {{
                                                                    rule.retention_seconds /
                                                                    86400
                                                                }}
                                                                days
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </template>
                                    </div>

                                    <i
                                        class="el-icon-warning-outline"
                                        slot="reference"
                                    ></i>
                                </el-popover>
                            </div>
                            <div>
                                <span class="custom-type">
                                    {{ item.subtype }}
                                </span>
                                <span class="custom-people">
                                    {{ item.approximate_count }} people
                                </span>
                            </div>
                        </div>
                        <div class="custom-button">
                            <!-- <el-button type="primary" size="small">
                                    分享
                                </el-button> -->
                            <el-checkbox
                                v-model="item.check"
                                @change="audienctActive(item)"
                            ></el-checkbox>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="Other Account" name="other">
                <el-input
                    placeholder="请输入内容"
                    v-model="search"
                    class="input-with-select"
                    size="small"
                >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="Account:"
                            label-width="75px"
                            class="margin-b-sm"
                        >
                            <el-select
                                v-model="Account"
                                placeholder="请选择"
                                size="small"
                                class="select-fill"
                                @change="otherSearch"
                            >
                                <el-option label="All" :value="0"> </el-option>
                                <el-option
                                    v-for="item in filterAdList"
                                    :key="item.ID"
                                    :label="item.Act_Name"
                                    :value="item.ID"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="Type:"
                            label-width="55px"
                            class="margin-b-sm"
                        >
                            <el-select
                                v-model="Type"
                                placeholder="请选择"
                                size="small"
                                class="select-fill"
                                @change="otherSearch"
                            >
                                <el-option label="All" :value="0"> </el-option>
                                <el-option label="APP" value="APP"> </el-option>
                                <el-option label="WEBSITE" value="WEBSITE">
                                </el-option>
                                <el-option label="LOOKALIKE" value="LOOKALIKE">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <ul class="custom-ul mh-200">
                    <li v-for="(item, index) in searchList" :key="index">
                        <div class="custom-content">
                            <div class="custom-title">
                                {{ item.name }}
                                <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="hover"
                                >
                                    <div
                                        class="custom-info"
                                        style="
                                            max-height: 300px;
                                            overflow: auto;
                                        "
                                    >
                                        <template
                                            v-if="item.subtype == 'LOOKALIKE'"
                                        >
                                            <p class="bold no-margin-b">
                                                Source:
                                                {{
                                                    item.lookalike_spec
                                                        .origin[0].name
                                                }}
                                            </p>
                                            <p class="no-margin-b">
                                                Rule:
                                                {{ convertRule(item) }}
                                            </p>
                                        </template>
                                        <template v-else>
                                            <!-- inclusions -->
                                            <div class="bold">Rules</div>
                                            <p class="color-default">
                                                <span class="bold">
                                                    Include
                                                </span>
                                                people who meet
                                                <span class="color-b">
                                                    {{
                                                        item.AudienceRule
                                                            .inclusions
                                                            .operator == "or"
                                                            ? "any"
                                                            : "all"
                                                    }}
                                                </span>
                                                of the following crit
                                            </p>
                                            <div
                                                v-for="(rule, ruindex) in item
                                                    .AudienceRule.inclusions
                                                    .rules"
                                                :key="ruindex"
                                            >
                                                <div
                                                    class="bold margin-tb-sm"
                                                    v-if="ruindex != 0"
                                                >
                                                    Or
                                                </div>

                                                <div class="padding-l-sm">
                                                    <div class="bold">
                                                        {{
                                                            rule.filter
                                                                .filters[0]
                                                                .value
                                                        }}
                                                    </div>
                                                    <div class="padding-l-sm">
                                                        <div>
                                                            <span>Id</span>:
                                                            {{
                                                                rule
                                                                    .event_sources[0]
                                                                    .id
                                                            }}
                                                        </div>
                                                        <div>
                                                            Frame: In the past
                                                            {{
                                                                rule.retention_seconds /
                                                                86400
                                                            }}
                                                            days
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- 如果有 exclusions -->
                                            <template
                                                v-if="
                                                    item.AudienceRule.exclusions
                                                "
                                            >
                                                <p
                                                    class="color-default margin-t-lg"
                                                >
                                                    <span class="bold">
                                                        Exclude
                                                    </span>
                                                    people who meet
                                                    <span class="color-b">
                                                        any
                                                    </span>
                                                    of the following crit
                                                </p>
                                                <div
                                                    v-for="(
                                                        rule, ruindex
                                                    ) in item.AudienceRule
                                                        .exclusions.rules"
                                                    :key="
                                                        rule.event_sources[0]
                                                            .id + ruindex
                                                    "
                                                >
                                                    <div
                                                        class="bold margin-tb-sm"
                                                        v-if="ruindex != 0"
                                                    >
                                                        Or
                                                    </div>

                                                    <div class="padding-l-sm">
                                                        <div class="bold">
                                                            {{
                                                                rule.filter
                                                                    .filters[0]
                                                                    .value
                                                            }}
                                                        </div>
                                                        <div
                                                            class="padding-l-sm"
                                                        >
                                                            <div>
                                                                <span>Id</span>:
                                                                {{
                                                                    rule
                                                                        .event_sources[0]
                                                                        .id
                                                                }}
                                                            </div>
                                                            <div>
                                                                Frame: In the
                                                                past
                                                                {{
                                                                    rule.retention_seconds /
                                                                    86400
                                                                }}
                                                                days
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </template>
                                    </div>

                                    <i
                                        class="el-icon-warning-outline"
                                        slot="reference"
                                    ></i>
                                </el-popover>
                            </div>
                            <div>
                                <span class="custom-type">
                                    {{ item.subtype }}
                                </span>
                                <span class="custom-people">
                                    {{ item.approximate_count }} people
                                </span>
                            </div>
                        </div>
                        <div class="custom-button">
                            <el-button
                                type="primary"
                                size="small"
                                @click="shareAccount(item)"
                            >
                                分享
                            </el-button>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>

        <div class="custom-List" slot="reference">
            <el-tag
                closable
                size="medium"
                v-for="(item, index) in activeList"
                :key="index"
                class="margin-r-xs"
                @close="activeDel(item)"
                >{{ item.name }}</el-tag
            >
            <span class="custom-tips" v-if="activeList.length == 0"
                >请选择</span
            >
        </div>
    </el-popover>
</template>

<script>
export default {
    data() {
        return {
            activeName: "this",
            // (筛选)类型
            search: "",
            // (筛选)账号
            Account: 0,
            // (筛选)类型
            Type: 0,
            // 显示的this account列表
            checkList: [],
            // 显示的other account列表
            searchList: [],
        };
    },
    props: {
        thisList: {
            type: Array,
            default: [],
        },
        otherList: {
            type: Array,
            default: [],
        },
        activeList: {
            type: Array,
            default: [],
        },
        existList: {
            type: Array,
            default: [],
        },
        filterAdList: {
            type: Array,
            default: [],
        },
        actid: {
            type: Number,
            default: 0,
        },
    },
    created() {
        this.checkList = this.thisList.filter(
            (m) => !this.existList.some((v) => v.id == m.id)
        );

        this.searchList = this.otherList;
    },
    methods: {
        // 选中audience
        audienctActive(item) {
            let audience = this.activeList.find((m) => m.id == item.id);
            let check = false;

            // 如果已经选中 就移除 || 没选中  就添加
            if (audience) {
                this.activeList.splice(this.activeList.indexOf(audience), 1);
                check = false;
            } else {
                this.activeList.push({ id: item.id, name: item.name });
                check = true;
            }

            // 修改列表的选中状态
            this.checkList.find((m) => m.id == item.id).check = check;
        },
        // 删除标签
        activeDel(item) {
            this.activeList.splice(this.activeList.indexOf(item), 1);
            this.checkList.find((m) => m.id == item.id).check = false;
        },
        // 转换选中audience的Rule
        convertRule(item) {
            let str = "";
            str += item.lookalike_spec.starting_ratio
                ? Number(item.lookalike_spec.starting_ratio) * 100 + "% to "
                : "";

            str +=
                Number(item.lookalike_spec.ratio) * 100 +
                "% of the population in Thailand";

            return str;
        },
        // 筛选other account
        otherSearch() {
            this.searchList = this.otherList;

            this.searchList = this.otherList.filter((m) => {
                let accountCheck = true;
                let typeCheck = true;
                let nameCheck = true;

                if (this.Account) accountCheck = m.account_id == this.Account;

                if (this.Type) typeCheck = m.subtype == this.Type;

                if (this.search) {
                    nameCheck = m.name.indexOf(this.search) >= 0;
                }

                return accountCheck && typeCheck && nameCheck;
            });
        },
        // 分享 other account
        shareAccount(item) {
            console.log(item);
            JsonFetch(
                "get",
                API.shareOtherAccount +
                    `${item.account_id}&audienceid=${item.id}&targetActid=${this.actid}`
            ).then((res) => {
                this.$notify.success({
                    message: res.data,
                });
                this.$emit("getAccountList", this.actid);
            });
        },
        // 清空筛选
        clearSearchOther() {
            this.search = "";
            this.Account = 0;
            this.Type = 0;
        },
    },
    watch: {
        thisList(val) {
            const List = JSON.parse(JSON.stringify(val));
            List.forEach((m) => {
                m.check = this.activeList.some((a) => a.id == m.id);
            });

            this.checkList = List;
        },
        otherList(val) {
            this.searchList = this.otherList;
        },
        search(val) {
            this.otherSearch();
        },
        existList(val) {
            this.checkList = this.checkList.filter(
                (m) => !val.some((v) => v.id == m.id)
            );
        },
    },
    computed: {},
};
</script>

<style lang="less" scoped>
.custom-ul {
    padding: 0;
    margin: 0;
    max-height: 250px;
    overflow: auto;

    li {
        padding: 5px 10px;
        // background-color: #eee;
        display: flex;
        margin-bottom: 5px;
        border: 1px solid #ddd;
        cursor: pointer;
        transition: color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);

        &.active {
            color: #409eff;

            .custom-content .custom-title {
                color: #409eff;
            }
        }

        i {
            // color: #989898;
        }

        &:last-of-type {
            margin-bottom: 0;
        }

        .custom-content {
            width: 100%;

            .custom-title {
                font-size: 16px;
                font-weight: bold;
                color: black;
                margin-bottom: 5px;
                transition: color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
            }

            .custom-people {
                margin-left: 20px;
            }
        }

        .custom-button {
            margin-left: 20px;

            button,
            label {
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .custom-info {
            color: rgba(0, 0, 0, 0.6);

            p {
                margin-bottom: 0 !important;
            }

            span {
                color: rgba(0, 0, 0, 1);
            }
        }
    }
}

.custom-List {
    width: 100%;
    min-height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
    padding: 3px 5px;
    line-height: 32px;

    .custom-tips {
        color: #bbb;
        padding: 0px 10px;
    }
}
</style>