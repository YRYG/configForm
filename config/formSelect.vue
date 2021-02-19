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
                    :label="
                        temp.OptionLabel ? item[temp.OptionLabel] : item.Name
                    "
                    :value="
                        temp.OptionValue ? item[temp.OptionValue] : item.Value
                    "
                >
                </el-option>
            </el-select>
        </configFormItem>
        <template v-if="temp.OptionGroup">
            <template v-for="(item, index) in temp.OptionGroup">
                <configComponent
                    v-on="$listeners"
                    v-if="item.Value == temp.Value"
                    :key="index"
                    :temp="item"
                    :prop="prop + 'OptionGroup.' + index + '.Children.'"
                ></configComponent>
            </template>
        </template>
    </span>
</template>

<script>
export default {
    components: {
        configFormItem: (_) => import("../configFormItem"),
        configComponent: (_) => import("../configComponent"),
    },
    inject: ["provideData"],
    data() {
        return {};
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