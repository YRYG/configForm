## 组件列表
#### 块级组件
* [formGroup](#formgroup)
* [formCollapse](#formcollapse)
* [formTree](#formtree)
* [formFold](#formfold)
* [formTabs](#formtabs)
* [formSteps](#formsteps)

#### 通用组件
* [formText](#formtext)
* [formLink](#formlink)
* [formIcon](#formicon)
* [formDivider](#formdivider)
* [formInput](#forminput)
* [formRadio](#formradio)
* [formCheckbox](#formcheckbox)
* [formSwitch](#formswitch)
* [formSelect](#formselect)
* [formSection](#formsection)
* [formSelectTime](#formselectTime)
* [formTextarea](#formtextarea)
* [formButton](#formbutton)


## 组件参数

##### SettingName 标题
##### Key 关键字
##### Value 值
##### DataType 数据类型
##### Component 组件名称
##### Options 选项（Array || "" 可以是数组和字符串两种类型）目前只支持下拉框
##### OptionGroup 选项组（根据选择展示不同的子集）
##### OptionLabel 选项显示的Label（默认 Name）目前只支持下拉框
##### OptionValue 选项保存的值（默认 Value）目前只支持下拉框
##### RemoteMethod 自定义搜索方法 方法需返回 Promise对象 目前只支持下拉框
##### Rule 校验规则
##### Attr 扩展属性
##### Class 
##### Style 

##### ChangeEvent  值的改变事件   返回两个参数  1：改变后的值  2：当前temp  3：父级的temp
##### ClickEvent 点击事件     返回两个参数  1：当前temp  2：父级的temp


## 校验规则

##### Rule
```
Rule: {
    Msg: "请输入 Primary Text",
    Regexp: '/^(-?\d+)(\.\d+)?$/',
    Required: true,
    Trigger: 'blur', // blur | change ? 可选
    Min: 13,    // (formSection)区间选择才有的最小值
    Max: 65,    // (formSection)区间选择才有的最大值
    Func: 'HeadlineRange',  // 自定义校验方法  格式参考下方↓
}
```

```
// 自定义校验方法参考
HeadlineRange(value, callback) {
    // value: 当前输入的值
    // callback：回调  函数的最后要调用该回调 返回指定的对象 { no：0|1, msg:'' }
    // no == 0 成功；no == 1 失败
    
    callback({ no: 0, msg: "333" });
},
```

## 组件配置参考
### 块级组件
##### formGroup
```
{
    SettingName: "Placements",
    Component: "form-Group",
    Children: [],
}
```
##### formCollapse
```
{
    Component: "form-Collapse",
    Value: ['Ad Set', 'Ad'],
    Children
    Children: [
        {
            SettingName: "Ad Set",
            Children: []
        },
        {
            SettingName: "Ad",
            Children: []
        },
    ],
}
```
##### formTree
```
{
    SettingName: "Placements",
    Component: "form-Tree",
    Children: [
        {   // 组件左边的配置
            Children:[]
        },
        {   // 组件右边的配置
            Children:[]
        },
    ],
}
```
##### formFold
```
{
    SettingName: "高级配置",
    Component: "form-Fold",
    Value: false,  // 为true 展示children的配置
    Children: [],
}
```

### 通用组件
##### formText
```
{
    Component: "form-Text",
    SettingName: "选择Ad模板",
    Placeholder: "将在选择账号时配置",
}
```
##### formDivider
```
{
    SettingName: "高级配置",
    Component: "form-Divider",
}
```
##### formIcon
```
{
    SettingName: "mdm",
    Component: "form-Icon",
    ClickEvent: "click",
}
```
##### formInput
```
{
    SettingName: "Headline",
    Key: "HeadLine",
    Value: "",
    Component: "form-Input",
    DataType: "string",
    Rule: {
        Required: true,
    },
    Attr: { clearable: true },
}
```
##### formRadio
```
{
    SettingName: "Destination Type",
    Component: "form-Radio",
    Value: true,
    DataType: "boolean",
    Type: 'button',  // button | radio  不传默认radio
    Options: [
        {
            name: "Website",
            value: 1,
        },
        {
            name: "Website",
            value: 2,
        },
    ],
    OptionGroup: [  // 可选
        {
            Value: 2,    // 当该单选框选择2时，显示该对象下的Children
            Children: [ ... ],
        },
    ]
}
```
##### formCheckbox
```
{
    Component: "form-Checkbox",
    Key: "Facebook_News_Feed",
    Value: true,
    DataType: "boolean",
    Type: 'button',  // button | radio  不传默认radio
    Options: [
        {
            name: "Facebook News Feed",
            Value: true,
        },
    ],
    OptionGroup: [  // 可选
        {
            Value: true,    // 当该复选框选择true时，显示该对象下的Children  如果多个选择  则按顺序排列
            Children: [ ... ],
        },
    ]
}
```
##### formSwitch
```
{
    Component: 'form-Switch',
    Value: true,
    Attr: {
        "active-text": "按月付费"
        "inactive-text": "按年付费"
    }
}
```
##### formSelect
```
{
    SettingName: "Call to Action",
    Key: "CalltoAction",
    Value: "SHOP_NOW",
    DataType: "string",
    Component: "form-Select",
    Options: [
        { name: "Shop Now", value: "SHOP_NOW" },
    ],
}
```
##### formSection
```
{
    SettingName: "Age",
    Key: "Age",
    Value: { min: null, max: null },
    DataType: "object",
    Component: "form-Section",
    Rule: {
        Msg: "输入正确的年龄(13-65)",
        Regexp: /^(\d+)(\.\d+)?$/,
        Required: true,
        Min: 13,
        Max: 65,
    },
}
```
##### formSelectTime
```
{
    SettingName: "Start Time",
    Key: "Start_Time",
    Component: "form-SelectTime",
    Value: "00:00",
    Attr: {        
        "picker-options": {  // elementui里的 TimePicker 时间选择器 的 "picker-options"
            start: "00:00",
            step: "01:00",
            end: "24:00",
        },
        clearable: false,
    },
}
```
##### formTextarea
```
{
    SettingName: "Primary Text",
    Key: "PrimaryText",
    Value: "",
    DataType: "string",
    Component: "form-Textarea",
    Rule: {
        Required: true,
    },
    Attr: {
        rows: 5,
    },
}
```
##### formButton
```
{
    SettingName: '上一步',
    Component: 'form-button',
    ClickEvent: 'previous',
}
```