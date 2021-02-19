<template>
    <div :class="temp.Class">
        <el-tabs
            type="card"
            v-model="temp.Value"
            v-bind="temp.Attr"
            @tab-remove="removeTab"
        >
            <el-tab-pane
                v-for="(item, index) in temp.Children"
                :key="index"
                :label="temp.SettingName + (index + 1)"
                :name="'' + index"
            >
                <configComponent
                    v-on="$listeners"
                    :temp="item"
                    :prop="prop + 'Children.' + index + '.Children.'"
                ></configComponent>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    components: {
        configFormItem: (_) => import("../configFormItem"),
        configComponent: (_) => import("../configComponent"),
    },
    data() {
        return {
            editableTabsValue: "1",
            tabIndex: 1,
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
    created() {},
    methods: {
        addTab(targetName) {
            let newTabName = ++this.tabIndex + "";
            this.temp.Value.push({
                title: this.tabIndex,
                name: newTabName,
            });
            this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {
            let tabs = this.temp.Value;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }

            this.editableTabsValue = activeName;
            this.temp.Value = tabs.filter((tab) => tab.name !== targetName);
        },
    },
};
</script>
<style lang="less" scoped>
</style>