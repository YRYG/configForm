<template>
    <div>
        <div class="form-label">{{ temp.SettingName }}</div>
        <el-form-item label="Include" class="margin-b-sm">
            <AudienceCustom
                :thisList="thisList"
                :otherList="otherList"
                :activeList="temp.Value.includeList"
                :existList="temp.Value.excludeList"
                :filterAdList="accountList"
                :actid="accountId"
                ref="custom1"
            ></AudienceCustom>
        </el-form-item>
        <el-form-item label="Exclude">
            <AudienceCustom
                :thisList="thisList"
                :otherList="otherList"
                :activeList="temp.Value.excludeList"
                :existList="temp.Value.includeList"
                :filterAdList="accountList"
                :actid="accountId"
                ref="custom2"
            ></AudienceCustom>
        </el-form-item>
    </div>
</template>

<script>
import AudienceCustom from "../AudienceCustom";
import { Account } from "../../core/api";
import { mapState } from "vuex";

export default {
    components: {
        AudienceCustom,
    },
    data() {
        return {
            // This Account
            thisList: [],
            // Other Account
            otherList: [],
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
        // 获取CustomAudience
        getCustomAudience(actid) {
            Account.getCustomAudience(actid).then((data) => {
                this.thisList = data.self || [];
                this.otherList = data.other || [];
            });
        },
    },
    watch: {
        accountId(data) {
            if (data) {
                this.getCustomAudience(data);
            }
        },
    },
    computed: {
        ...mapState(["accountList", "accountId"]),
    },
};
</script>

<style lang="less" scoped>
.item-title {
    font-weight: bold;
}
</style>