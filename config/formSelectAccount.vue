<template>
    <span>
        <configFormItem
            :temp="temp"
            :prop="prop"
            :class="temp.Class"
            :style="temp.Style"
            v-on="$listeners"
        >
            <el-select
                v-bind="temp.Attr"
                v-model="temp.Value"
                :placeholder="temp.Placeholder"
                :remote-method="remoteMethod"
                class="width-fill"
            >
                <el-option
                    v-for="(item, index) in optionsList"
                    :key="index"
                    :label="item.Act_Name + '（' + item.ID + '）'"
                    :value="item.ID"
                >
                </el-option>
            </el-select>
        </configFormItem>
    </span>
</template>

<script>
import { Accound } from "../../core/api";
export default {
    components: {
        configFormItem: (_) => import("../configFormItem"),
    },
    data() {
        return {};
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
        remoteMethod(q) {
            if (this.temp.RemoteMethod) {
                let fun = this.$listeners[this.temp.RemoteMethod];

                if (fun) {
                    fun(q).then((data) => {
                        this.temp.Options = data;
                    });
                }
            }
        },
    },
    watch: {
        "temp.Value"(ndata, odata) {
            if (this.temp.ChangeEvent) {
                this.$emit(
                    this.temp.ChangeEvent,
                    ndata,
                    this.temp,
                    this.$parent.temp
                );
            }
        },
    },
    computed: {
        optionsList() {
            if (_.isArray(this.temp.Options)) {
                return this.temp.Options;
            }

            if (_.isString(this.temp.Options)) {
                return this.provideData[this.temp.Options] || [];
            }

            return [];
        },
    },
};
</script>
<style lang="less" scoped>
.my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .addr {
            font-size: 12px;
            color: #b4b4b4;
        }

        .highlighted .addr {
            color: #ddd;
        }
    }
}
</style>