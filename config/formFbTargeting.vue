<template>
    <div
        v-loading="!fbSucces"
        class="targeting"
        :class="temp.Class"
        :style="temp.Style"
    >
        <p class="form-label">{{ temp.SettingName }}</p>
        <!-- 受众 -->
        <el-form-item label="Include" label-width="80px" class="margin-b-sm">
            <treeselect
                v-if="fbSucces"
                v-model="temp.Value.includeList"
                :multiple="true"
                :flatten-search-results="true"
                :options="filterData"
                :normalizer="normalizer"
                :defaultOptions="filterData"
                :async="true"
                :load-options="loadOptions"
                :value-consists-of="'LEAF_PRIORITY'"
                :disabled="temp.Attr && temp.Attr.disabled"
                placeholder="请选择"
                class="lh-18"
            />
        </el-form-item>
        <template v-if="temp.Value.includeList.length != 0">
            <el-form-item label-width="80px" class="no-margin-b">
                <el-checkbox
                    v-model="temp.Value.narrow"
                    v-bind="temp.Attr"
                    @change="narrowChange"
                    >Narrow Audience</el-checkbox
                >
                <treeselect
                    v-if="fbSucces"
                    v-model="temp.Value.narrowList"
                    :disabled="
                        !temp.Value.narrow || (temp.Attr && temp.Attr.disabled)
                    "
                    :multiple="true"
                    :flatten-search-results="true"
                    :options="filterData"
                    :normalizer="normalizer"
                    :defaultOptions="filterData"
                    :async="true"
                    :load-options="loadOptions"
                    :value-consists-of="'LEAF_PRIORITY'"
                    placeholder="请选择"
                    class="lh-18"
                />
            </el-form-item>

            <template v-if="temp.Value.narrow">
                <div
                    class="further-item"
                    v-for="(item, index) in temp.Value.furtherList"
                    :key="index"
                >
                    <label>and must also match</label>
                    <i
                        class="el-icon-close further-del"
                        @click="delFurther(item)"
                    ></i>
                    <treeselect
                        v-if="fbSucces"
                        v-model="item.Value"
                        :multiple="true"
                        :flatten-search-results="true"
                        :value-consists-of="'LEAF_PRIORITY'"
                        :options="filterData"
                        :normalizer="normalizer"
                        :defaultOptions="filterData"
                        :async="true"
                        :load-options="loadOptions"
                        :disabled="temp.Attr && temp.Attr.disabled"
                        placeholder="请选择"
                        class="lh-18 margin-tb-sm"
                    />
                </div>

                <el-form-item
                    label-width="80px"
                    v-show="temp.Value.narrowList.length != 0"
                    class="no-margin-b"
                >
                    <el-link
                        :underline="false"
                        type="primary"
                        icon="el-icon-plus"
                        @click="addFurther"
                        >Narrow Further</el-link
                    >
                </el-form-item>
            </template>
        </template>
        <!-- 排除 浏览所有受众人群 -->
        <el-form-item label="Exclude" label-width="80px" class="margin-tb-sm">
            <treeselect
                v-if="fbSucces"
                v-model="temp.Value.excludeList"
                :multiple="true"
                :flatten-search-results="true"
                :value-consists-of="'LEAF_PRIORITY'"
                :options="filterData"
                :normalizer="normalizer"
                :defaultOptions="filterData"
                :async="true"
                :load-options="loadOptions"
                :disabled="temp.Attr && temp.Attr.disabled"
                placeholder="请选择"
                class="lh-18"
            />
        </el-form-item>
    </div>
</template>

<script>
import { Treeselect, ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { API } from "../../core/request";

export default {
    components: {
        Treeselect,
    },
    data() {
        return {
            // 获取成功fb数据是否成功
            fbSucces: false,
            // 所有受众列表
            allMenu: [],
            // 解析browse数据之后的列表
            filterData: [],
            furtherList: [],
            // 搜索之后的缓存数据
            fbSearchCacheList: [],
            // 将解析browse数据之后的列表转换成树形控件需要的结构
            normalizer(node) {
                return {
                    id: node.name + "&&" + node.id + "&&" + node.type,
                    label: node.name,
                    children: node.children,
                };
            },
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
        const that = this;
        let GetFB = null;
        let GetAccount = 0;
        GetFB = setInterval(function () {
            if (GetAccount++ > 10) clearInterval(GetFB);
            if (FB) {
                clearInterval(GetFB);
                that.getDetailTargeting();
            }
        }, 1000);
        // this.fbSucces = true;
    },
    methods: {
        // narrow change
        narrowChange() {
            this.temp.Value.narrowList = [];
            this.temp.Value.furtherList = [];
        },
        // 新增一个受众
        addFurther() {
            this.temp.Value.furtherList.push({
                Value: [],
            });
        },
        // 删除对应的受众
        delFurther(item) {
            const index = this.temp.Value.furtherList.indexOf(item);
            this.temp.Value.furtherList.splice(index, 1);
        },
        // 处理 DetailTargeting
        parseBrowseDetail(item, length) {
            let oneObj = {};
            let twoObj = {};
            let threeObj = {};
            let fourObj = {};
            switch (length) {
                case 2:
                    // 判断第一层有没有这个属性
                    oneObj = this.filterData.find(
                        (k) => k.name === item.path[0]
                    );
                    if (oneObj) {
                        // 判断第二层有没有这个属性
                        twoObj = oneObj.children.find(
                            (k) => k.name === item.path[1]
                        );
                        if (twoObj) {
                            twoObj.children.push(item);
                        } else {
                            oneObj.children.push({
                                id: item.id,
                                type: item.type,
                                name: item.path[1],
                                value: item.path[1],
                                children: [item],
                            });
                        }
                    } else {
                        this.filterData.push({
                            id: item.id,
                            type: item.type,
                            name: item.path[0],
                            value: item.path[0],
                            children: [
                                {
                                    id: item.id,
                                    type: item.type,
                                    name: item.path[1],
                                    value: item.path[1],
                                    children: [item],
                                },
                            ],
                        });
                    }
                    break;
                case 3:
                    // 判断第一层有没有这个属性
                    oneObj = this.filterData.find(
                        (k) => k.name === item.path[0]
                    );
                    if (oneObj) {
                        // 判断第二层有没有这个属性
                        twoObj = oneObj.children.find(
                            (k) => k.name === item.path[1]
                        );
                        if (twoObj) {
                            // 判断第三层有没有这个属性
                            threeObj = twoObj.children.find(
                                (k) => k.name === item.path[2]
                            );
                            if (threeObj) {
                                threeObj.children.push(item);
                            } else {
                                twoObj.children.push({
                                    id: item.id,
                                    type: item.type,
                                    name: item.path[2],
                                    value: item.path[2],
                                    children: [item],
                                });
                            }
                        } else {
                            oneObj.children.push({
                                id: item.id,
                                type: item.type,
                                name: item.path[1],
                                value: item.path[1],
                                children: [
                                    {
                                        id: item.id,
                                        type: item.type,
                                        name: item.path[2],
                                        value: item.path[2],
                                        children: [item],
                                    },
                                ],
                            });
                        }
                    } else {
                        this.filterData.push({
                            id: item.id,
                            type: item.type,
                            name: item.path[0],
                            value: item.path[0],
                            children: [
                                {
                                    id: item.id,
                                    type: item.type,
                                    name: item.path[1],
                                    value: item.path[1],
                                    children: [
                                        {
                                            id: item.id,
                                            type: item.type,
                                            name: item.path[2],
                                            value: item.path[2],
                                            children: [item],
                                        },
                                    ],
                                },
                            ],
                        });
                    }
                    break;
                case 4:
                    // 判断第一层有没有这个属性
                    oneObj = this.filterData.find(
                        (k) => k.name === item.path[0]
                    );
                    if (oneObj) {
                        // 判断第二层有没有这个属性
                        twoObj = oneObj.children.find(
                            (k) => k.name === item.path[1]
                        );
                        if (twoObj) {
                            // 判断第三层有没有这个属性
                            threeObj = twoObj.children.find(
                                (k) => k.name === item.path[2]
                            );
                            if (threeObj) {
                                // 判断第四层有没有这个属性
                                fourObj = threeObj.children.find(
                                    (k) => k.name === item.path[3]
                                );
                                if (fourObj) {
                                    fourObj.children.push(item);
                                } else {
                                    threeObj.children.push({
                                        id: item.id,
                                        type: item.type,
                                        name: item.path[3],
                                        value: item.path[3],
                                        children: [item],
                                    });
                                }
                            } else {
                                twoObj.children.push({
                                    id: item.id,
                                    type: item.type,
                                    name: item.path[2],
                                    value: item.path[2],
                                    children: [
                                        {
                                            id: item.id,
                                            type: item.type,
                                            name: item.path[3],
                                            value: item.path[3],
                                            children: [item],
                                        },
                                    ],
                                });
                            }
                        } else {
                            oneObj.children.push({
                                id: item.id,
                                type: item.type,
                                name: item.path[1],
                                value: item.path[1],
                                children: [
                                    {
                                        id: item.id,
                                        type: item.type,
                                        name: item.path[2],
                                        value: item.path[2],
                                        children: [
                                            {
                                                id: item.id,
                                                type: item.type,
                                                name: item.path[3],
                                                value: item.path[3],
                                                children: [item],
                                            },
                                        ],
                                    },
                                ],
                            });
                        }
                    } else {
                        this.filterData.push({
                            id: item.id,
                            type: item.type,
                            name: item.path[0],
                            value: item.path[0],
                            children: [
                                {
                                    id: item.id,
                                    type: item.type,
                                    name: item.path[1],
                                    value: item.path[1],
                                    children: [
                                        {
                                            id: item.id,
                                            type: item.type,
                                            name: item.path[2],
                                            value: item.path[2],
                                            children: [
                                                {
                                                    id: item.id,
                                                    type: item.type,
                                                    name: item.path[3],
                                                    value: item.path[3],
                                                    children: [item],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        });
                    }
                    break;
                default:
                    break;
            }
        },
        // 获取 DetailTargeting
        getDetailTargeting() {
            const that = this;

            this.$nextTick(() => {
                FB.api(
                    API.browse,
                    "get",
                    {
                        access_token: API.token,
                        locale: "en_US",
                    },
                    (response) => {
                        if (!response || response.error) {
                            that.$notify.info(
                                "详细定位输出问题 Search failed, please re-enter"
                            );
                            console.warn("Browse", JSON.stringify(response));
                        } else {
                            const Data = response.data;
                            that.allMenu = response.data;
                            that.allMenu.forEach((p) => {
                                const length = p.path.length;
                                that.parseBrowseDetail(p, length);
                            });

                            that.fbSucces = true;

                            // 解析fb behavior数据
                            that.parseEditInclude(that.temp.Value.includeList);
                            that.parseEditInclude(that.temp.Value.narrowList);
                            that.parseEditInclude(that.temp.Value.excludeList);

                            that.temp.Value.furtherList.forEach((m) => {
                                that.parseEditInclude(m.Value);
                            });
                        }
                    }
                );
            });
        },
        // 下拉框自定义搜索事件
        loadOptions({ action, searchQuery, callback }) {
            if (action === ASYNC_SEARCH) {
                this.searchFB(searchQuery).then(
                    (data) => {
                        callback(null, data);
                    },
                    (err) => {
                        callback(null, []);
                    }
                );
            }
        },
        // FB搜索
        searchFB(q) {
            return new Promise((resolve, reject) => {
                FB.api(
                    API.search,
                    "get",
                    {
                        q: q,
                        access_token: API.token,
                        locale: "en_US",
                    },
                    (response) => {
                        if (!response || response.error) {
                            reject();
                        } else {
                            const Data = response.data;
                            Data.forEach((m) => {
                                if (
                                    this.fbSearchCacheList.length == 0 ||
                                    this.fbSearchCacheList.some(
                                        (i) => i.id != m.id
                                    )
                                ) {
                                    this.fbSearchCacheList.push(m);
                                }
                            });
                            resolve(Data);
                        }
                    }
                );
            });
        },

        // 解析编辑预览的targeting
        parseEditInclude(include) {
            if (this.allMenu.length == 0) return [];

            include.forEach((m) => {
                const m_name = m.split("&&")[0];
                const m_id = m.split("&&")[1];
                const m_type = m.split("&&")[2];

                // 当前的列表里是否包含当前的值
                const hasInclude = this.allMenu.some(
                    (me) => me.id == m_id && me.type == m_type
                );

                // 不包含 就去调用搜索接口
                if (!hasInclude) {
                    this.fbSucces = false;

                    if (this.filterData.length == 3) {
                        this.filterData.push({
                            id: 0,
                            type: "Search",
                            name: "Search",
                            value: "Search",
                            children: [],
                        });
                    }

                    let CacheData = this.fbSearchCacheList.find(
                        (f) => f.name == m_name && f.id == m_id
                    );

                    if (CacheData) {
                        this.filterData[3].children.push(CacheData);
                        setTimeout(() => {
                            if (!this.fbSucces) {
                                this.fbSucces = true;
                            }
                        }, 1000);
                    } else {
                        this.searchFB(m_name).then((data) => {
                            let searchData = data.find(
                                (f) => f.name == m_name && f.id == m_id
                            );

                            this.filterData[3].children.push(searchData);
                            setTimeout(() => {
                                if (!this.fbSucces) {
                                    this.fbSucces = true;
                                }
                            }, 1000);
                        });
                    }
                }
            });
        },
    },
    watch: {
        furtherList(data) {
            this.temp.Value.furtherList = data;
        },
        "temp.Value": {
            deep: true,
            handler(data) {
                if (this.temp.ChangeEvent) {
                    this.$emit(
                        this.temp.ChangeEvent,
                        data,
                        this.temp,
                        this.$parent.temp
                    );
                }
            },
        },
    },
};
</script>

<style lang="less" scoped>
.further-del {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 16px;
    cursor: pointer;
}

.further-item {
    margin-top: 10px;
    position: relative;
    border: 1px solid #ddd;
    padding: 0 10px;
}
</style>