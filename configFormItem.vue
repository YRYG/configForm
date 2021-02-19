<template>
    <el-form-item
        :class="temp.Class"
        :label="temp.SettingName"
        :prop="temp.Rule ? prop + 'Value' : ''"
        :rules="[
            temp.Rule
                ? {
                      validator: (rule, value, callback) => {
                          let Msg = temp.Rule.Msg || '必填项';

                          if (!temp.Rule.Required) {
                              if (isEmpty(value)) {
                                  callback();
                              } else {
                                  if (Regexp(temp.Rule.Regexp, value)) {
                                      callback();
                                  } else {
                                      callback(Msg);
                                  }
                              }
                          } else {
                              if (temp.Rule.Func) {
                                  $emit(temp.Rule.Func, value, (res) => {
                                      if (res.no == 0) {
                                          callback();
                                      } else {
                                          callback(res.msg);
                                      }
                                  });
                              } else {
                                  if (isEmpty(value)) {
                                      callback(Msg);
                                  } else {
                                      if (Regexp(temp.Rule.Regexp, value)) {
                                          callback();
                                      } else {
                                          callback(Msg);
                                      }
                                  }
                              }
                          }
                      },
                      trigger: temp.Rule.Trigger || 'blur',
                  }
                : '',
        ]"
    >
        <slot></slot>
    </el-form-item>
</template>

<script>
export default {
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
    created() {},
    methods: {
        isEmpty(data) {
            return (_.isArray(data) && data.length == 0) || !data;
        },
        Regexp(reg, value) {
            if (!reg) return true;
            return eval(reg).test(value);
        },
        cl(data) {
            console.log(data);
        },
    },
};
</script>

<style lang="less" scoped>
</style>