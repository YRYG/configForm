import { reject } from "lodash";
import { Global } from "../core/api";

// ad编辑模板
export const AdTempConfig = {
    CreatedAt: "",
    CreatedBy: "",
    ID: 0,
    ProductID: 0,
    UpdatedAt: "",
    UpdatedBy: "",
    Version: 0,
    Config: [
        {
            SettingName: "Ad Setup",
            Key: "Ad_Setup",
            Component: "form-Group",
            Children: [
                {
                    SettingName: "Format",
                    Key: "Format",
                    Value: true,
                    DataType: "bool",
                    Component: "form-Radio",
                    Options: [{ Name: "SingleImageOrVideo", Value: true }],
                },
                {
                    SettingName: "Media",
                    Key: "Media",
                    Value: "video",
                    Options: [
                        { Name: "Video", Value: "video" },
                        { Name: "Image", Value: "image" },
                    ],
                    Component: "form-Media",
                    Class: "no-margin-b",
                    Children: [
                        {
                            Key: "VideoId",
                            Value: null,
                            DataType: "number",
                        },
                        {
                            Key: "PicId",
                            Value: null,
                            DataType: "number",
                        },
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
                        },
                        {
                            SettingName: "Website URL",
                            Key: "Website_URL",
                            Component: "form-Text",
                            Placeholder: "将在选择账号时配置",
                        },
                    ],
                },
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
                    Class: "wdp50 inline-block",
                },
                {
                    Component: "form-Text",
                    Placeholder: "请勿填写短链",
                    Class: "wdp50 inline-block padding-l-sm",
                },
                {
                    SettingName: "Call to Action",
                    Key: "CalltoAction",
                    Value: "SHOP_NOW",
                    DataType: "string",
                    Component: "form-Select",
                    Options: [{ Name: "Shop Now", Value: "SHOP_NOW" }],
                },
                {
                    SettingName: "Website URL后缀",
                    Key: "Website_URLAppend",
                    Attr: { disabled: true },
                    Class: "hide",
                    Value: ["Account_ID", "Campaign_ID", "AdSet_ID", "Ad_ID"],
                    DataType: "array",
                    Component: "form-Checkbox",
                    Options: [
                        { Name: "Account ID", Value: "Account_ID" },
                        { Name: "Campaign ID", Value: "Campaign_ID" },
                        { Name: "Ad Set ID", Value: "AdSet_ID" },
                        { Name: "Ad ID", Value: "Ad_ID" },
                    ],
                },
            ],
        },
    ],
};

// ad创建模板
export const AdCreateTempConfig = {
    CreatedAt: "",
    CreatedBy: "",
    ID: 0,
    ProductID: 0,
    UpdatedAt: "",
    UpdatedBy: "",
    Version: 0,
    Config: [
        {
            SettingName: "Ad模板名",
            Key: "AdName",
            Component: "form-Input",
            Value: "",
            DataType: "string",
            Rule: {
                Required: true,
            },
        },
        {
            SettingName: "Ad模板应用的产品",
            Key: "Product",
            Component: "form-Select",
            Value: null,
            DataType: "number",
            Options: [],
            Attr: {
                filterable: true,
            },
        },
        ...AdTempConfig.Config,
    ],
};

// adset编辑模板
export const AdSetTempConfig = {
    CreatedAt: "",
    CreatedBy: "",
    ID: 0,
    ProductID: 0,
    UpdatedAt: "",
    UpdatedBy: "",
    Version: 0,
    Config: [
        {
            SettingName: "Budget",
            Component: "form-Text",
            Class: "text-16",
        },
        {
            Key: "BudgetType",
            Value: "Daily_Budget",
            DataType: "string",
            Component: "form-Select",
            Options: [
                {
                    Name: "Daily Budget",
                    Value: "Daily_Budget",
                },
                {
                    Name: "Lifetime Budget",
                    Value: "Lifetime_Budget",
                },
            ],
            Class: "wd200 inline-block margin-r-sm",
        },
        {
            Key: "BudgetPrice",
            Value: 500,
            DataType: "number",
            Component: "form-Input",
            Class: "wd200 inline-block",
            Attr: {
                "prefix-icon": "fas fa-usd",
            },
            Rule: {
                Regexp: '/^(-?\\d+)(\\.\\d+)?$/',
                Required: true,
                Trigger: "blur",
            },
            ChangeEvent: "BudgetPriceChange",
        },
        {
            SettingName: "Targeting",
            Key: "Targeting",
            Component: "form-Group",
            Class: "no-margin-t",
            Children: [
                {
                    SettingName: "Country",
                    Key: "Country",
                    Value: [],
                    DataType: "stringArray",
                    Component: "form-Select",
                    Options: "CountryList",
                    OptionLabel: "Value",
                    Attr: {
                        multiple: true,
                        clearable: true,
                        filterable: true,
                    },
                    Class: "wd300",
                    Rule: {
                        Msg: "请选择国家",
                        Required: true,
                        Trigger: "change",
                    },
                    ChangeEvent: "ReachPeople",
                },
                {
                    SettingName: "Age",
                    Key: "Age",
                    Value: { min: 13, max: 65 },
                    DataType: "object",
                    Component: "form-Section",
                    Class: "wd300",
                    Rule: {
                        Msg: "输入正确的年龄(13-65)",
                        Regexp: '/^(\\d+)(\\.\\d+)?$/',
                        Required: true,
                        Min: 13,
                        Max: 65,
                    },
                    ChangeEvent: "ReachPeople",
                },
                {
                    SettingName: "Gender",
                    Key: "Gender",
                    Value: 0,
                    DataType: "number",
                    Component: "form-Select",
                    Class: "wd300",
                    Options: [
                        {
                            Name: "All",
                            Value: 0,
                        },
                        {
                            Name: "Men",
                            Value: 1,
                        },
                        {
                            Name: "Women",
                            Value: 2,
                        },
                    ],
                    ChangeEvent: "ReachPeople",
                },
                {
                    SettingName: "Language",
                    Key: "Language",
                    Value: [],
                    DataType: "string",
                    Component: "form-Select",
                    Class: "wd300",
                    Options: [],
                    OptionLabel: "name",
                    OptionValue: "key",
                    RemoteMethod: "searchLangRemoteMethod",
                    Attr: {
                        multiple: true,
                        clearable: true,
                        filterable: true,
                        remote: true,
                        "reserve-keyword": true,
                    },
                    Rule: {
                        Msg: "请选择语言",
                        Required: true,
                        Trigger: "change",
                    },
                    ChangeEvent: "ReachPeople",
                },
                {
                    Component: "form-Text",
                    SettingName: "Custom_Audience",
                    Key: "Custom_Audience",
                    Placeholder: "将在选择账号时配置",
                    Class: "margin-b-sm",
                },
                {
                    Component: "form-FbTargeting",
                    SettingName: "Interesting & Behavior",
                    Key: "Interesting",
                    Value: {
                        narrow: false,
                        includeList: [],
                        narrowList: [],
                        furtherList: [],
                        excludeList: [],
                    },
                    ChangeEvent: "ReachPeople",
                },
                {
                    Component: "form-FbReach",
                    Key: "FbReach",
                    Value: {
                        definition: 0,
                        results: 0,
                        conversion: 0
                    }
                },
            ],
        },
        {
            SettingName: "Conversion",
            Key: "Conversion",
            Component: "form-Group",
            Children: [
                {
                    SettingName: "Destination Type",
                    Key: "DestinationType",
                    Component: "form-Radio",
                    Value: true,
                    Options: [
                        {
                            Name: "Website",
                            Value: true,
                        },
                    ],
                    Class: "no-margin-b",
                },
                {
                    SettingName: "Pixel",
                    Key: "Pixel",
                    Component: "form-Text",
                    Placeholder: "将在选择账号时配置",
                },
                {
                    SettingName: "Conversion Event",
                    Key: "Conversion_Event",
                    Value: "purchase",
                    DataType: "string",
                    Component: "form-Select",
                    Options: [
                        {
                            Name: "Purchase",
                            Value: "purchase",
                        },
                        {
                            Name: "Add to cart",
                            Value: "add_to_cart",
                        },
                    ],
                    Class: "no-margin-b",
                },
            ],
        },
        {
            SettingName: "Schedule",
            Key: "Schedule",
            Component: "form-Group",
            Children: [
                {
                    SettingName: "Start Time",
                    Key: "Start_Time",
                    Component: "form-SelectTime",
                    Value: "00:00",
                    Class: "wd200",
                    Attr: {
                        "picker-options": {
                            start: "00:00",
                            step: "01:00",
                            end: "24:00",
                        },
                        clearable: false,
                    },
                },
                {
                    SettingName: "End Time",
                    Key: "End_Time",
                    Component: "form-SelectTime",
                    Value: "24:00",
                    Class: "wd200",

                    Attr: {
                        "picker-options": {
                            start: "00:00",
                            step: "01:00",
                            end: "24:00",
                        },
                        clearable: false,
                    },
                },
            ],
        },
        {
            SettingName: "Placements",
            Key: "Placements",
            Component: "form-Group",
            Children: [
                {
                    Component: "form-Checkbox",
                    Key: "Facebook_News_Feed",
                    Value: true,
                    DataType: "boolean",
                    Options: [
                        {
                            Name: "Facebook News Feed",
                            Value: true,
                        },
                    ],
                    Class: "no-margin-b",
                },
            ],
        },
        {
            SettingName: "Optimization & Delivery",
            Key: "Optimization_Delivery",
            Component: "form-Group",
            Children: [
                {
                    SettingName: "Optimization for Ad Delivery",
                    Key: "Ad_Delivery",
                    Component: "form-Select",
                    Value: "OFFSITE_CONVERSIONS",
                    DataType: "string",
                    Options: [
                        {
                            Name: "Conversions",
                            Value: "OFFSITE_CONVERSIONS",
                        },
                        {
                            Name: "Landing Page Views",
                            Value: "LANDING_PAGE_VIEWS",
                        },
                        {
                            Name: "Link Clicks",
                            Value: "LINK_CLICKS",
                        },
                        {
                            Name: "Impressions",
                            Value: "IMPRESSIONS",
                        },
                    ],
                },
                {
                    SettingName: "Bid Strategy",
                    Key: "Bid_Strategy",
                    Component: "form-Select",
                    Value: "Cost_cap",
                    DataType: "string",
                    Options: [
                        {
                            Name: "Cost cap",
                            Value: "Cost_cap",
                        },
                    ],
                },
                {
                    SettingName: "Cost Control",
                    Key: "Cost_Control",
                    Component: "form-Input",
                    Value: 200,
                    DataType: "number",
                    Attr: {
                        "prefix-icon": "fas fa-usd",
                    },
                },
            ],
        },
    ],
};

// adset创建模板
export const AdSetCreateTempConfig = {
    CreatedAt: "",
    CreatedBy: "",
    ID: 0,
    ProductID: 0,
    UpdatedAt: "",
    UpdatedBy: "",
    Version: 0,
    Config: [
        {
            SettingName: "Ad Set模板名",
            Key: "AdSetName",
            Component: "form-Input",
            Value: "",
            DataType: "string",
            Rule: {
                Required: true,
            },
        },
        {
            SettingName: "Ad Set模板应用的产品",
            Key: "Product",
            Component: "form-Select",
            Value: null,
            DataType: "number",
            Options: [],
            Attr: {
                filterable: true,
            },
        },
        ...AdSetTempConfig.Config,
    ],
};

// 创建投放的Adset模板
export const CreateLaunchAdSet = {
    Children: [
        {
            Component: "form-button",
            SettingName: "选择AdSet模板",
            ClickEvent: "chooseAdSet",
            Class: "inline-block fr ",
        },
        {
            SettingName: "Budget",
            Component: "form-Text",
            Class: "text-16",
        },
        {
            Key: "BudgetType",
            Value: "Daily_Budget",
            DataType: "string",
            Component: "form-Select",
            Options: [
                {
                    Name: "Daily Budget",
                    Value: "Daily_Budget",
                },
                {
                    Name: "Lifetime Budget",
                    Value: "Lifetime_Budget",
                },
            ],
            Class: "wd200 inline-block margin-r-sm",
        },
        {
            Key: "BudgetPrice",
            Value: 500,
            DataType: "number",
            Component: "form-Input",
            Class: "wd200 inline-block",
            Attr: {
                "prefix-icon": "fas fa-usd",
            },
            Rule: {
                Regexp: '/^(-?\\d+)(\\.\\d+)?$/',
                Required: true,
                Trigger: "blur",
            },
            ChangeEvent: "BudgetPriceChange",
        },
        {
            SettingName: "Targeting",
            Key: "Targeting",
            Component: "form-Group",
            Class: "no-margin-t",
            Children: [
                {
                    SettingName: "Country",
                    Key: "Country",
                    Value: [],
                    DataType: "stringArray",
                    Component: "form-Select",
                    Options: "CountryList",
                    OptionLabel: "Value",
                    Attr: {
                        multiple: true,
                        clearable: true,
                        filterable: true,
                    },
                    Class: "wd300",
                    Rule: {
                        Msg: "请选择国家",
                        Required: true,
                        Trigger: "change",
                    },
                    ChangeEvent: "ReachPeople",
                },
                {
                    SettingName: "Age",
                    Key: "Age",
                    Value: { min: 13, max: 65 },
                    DataType: "object",
                    Component: "form-Section",
                    Class: "wd300",
                    Rule: {
                        Msg: "输入正确的年龄(13-65)",
                        Regexp: '/^(\\d+)(\\.\\d+)?$/',
                        Required: true,
                        Min: 13,
                        Max: 65,
                    },
                    ChangeEvent: "ReachPeople",
                },
                {
                    SettingName: "Gender",
                    Key: "Gender",
                    Value: 0,
                    DataType: "number",
                    Component: "form-Select",
                    Class: "wd300",
                    Options: [
                        {
                            Name: "All",
                            Value: 0,
                        },
                        {
                            Name: "Men",
                            Value: 1,
                        },
                        {
                            Name: "Women",
                            Value: 2,
                        },
                    ],
                    ChangeEvent: "ReachPeople",
                },
                {
                    SettingName: "Language",
                    Key: "Language",
                    Value: [],
                    DataType: "string",
                    Component: "form-Select",
                    Class: "wd300",
                    Options: [],
                    OptionLabel: "name",
                    OptionValue: "key",
                    RemoteMethod: "searchLangRemoteMethod",
                    Attr: {
                        multiple: true,
                        clearable: true,
                        filterable: true,
                        remote: true,
                        "reserve-keyword": true,
                    },
                    Rule: {
                        Msg: "请选择语言",
                        Required: true,
                        Trigger: "change",
                    },
                    ChangeEvent: "ReachPeople",
                },
                {
                    Component: "form-Audience",
                    SettingName: "Custom Audience",
                    Key: 'Custom_Audience',
                    Value: {
                        includeList: [],
                        excludeList: [],
                    },
                },
                {
                    Component: "form-FbTargeting",
                    SettingName: "Interesting & Behavior",
                    Key: "Interesting",
                    Value: {
                        narrow: false,
                        includeList: [],
                        narrowList: [],
                        furtherList: [],
                        excludeList: [],
                    },
                    ChangeEvent: "ReachPeople",
                },
                {
                    Component: "form-FbReach",
                    Key: "FbReach",
                    Value: {
                        definition: 0,
                        results: 0,
                        conversion: 0
                    }
                },
            ],
        },
        {
            SettingName: "Conversion",
            Key: "Conversion",
            Component: "form-Group",
            Children: [
                {
                    SettingName: "Destination Type",
                    Key: "DestinationType",
                    Component: "form-Radio",
                    Value: true,
                    Options: [
                        {
                            Name: "Website",
                            Value: true,
                        },
                    ],
                    Class: "no-margin-b",
                },
                {
                    SettingName: "Pixel",
                    Key: "Pixel",
                    Component: "form-Text",
                    Placeholder: "将在选择账号时配置",
                },
                {
                    SettingName: "Conversion Event",
                    Key: "Conversion_Event",
                    Value: "purchase",
                    DataType: "string",
                    Component: "form-Select",
                    Options: [
                        {
                            Name: "Purchase",
                            Value: "purchase",
                        },
                        {
                            Name: "Add to cart",
                            Value: "add_to_cart",
                        },
                    ],
                    Class: "no-margin-b",
                },
            ],
        },
        {
            SettingName: "Schedule",
            Key: "Schedule",
            Component: "form-Group",
            Children: [
                {
                    SettingName: "Start Time",
                    Key: "Start_Time",
                    Component: "form-SelectTime",
                    Value: "00:00",
                    Class: "wd200",
                    Attr: {
                        "picker-options": {
                            start: "00:00",
                            step: "01:00",
                            end: "24:00",
                        },
                        clearable: false,
                    },
                },
                {
                    SettingName: "End Time",
                    Key: "End_Time",
                    Component: "form-SelectTime",
                    Value: "24:00",
                    Class: "wd200",

                    Attr: {
                        "picker-options": {
                            start: "00:00",
                            step: "01:00",
                            end: "24:00",
                        },
                        clearable: false,
                    },
                },
            ],
        },
        {
            SettingName: "Placements",
            Key: "Placements",
            Component: "form-Group",
            Children: [
                {
                    Component: "form-Checkbox",
                    Key: "Facebook_News_Feed",
                    Value: true,
                    DataType: "boolean",
                    Options: [
                        {
                            Name: "Facebook News Feed",
                            Value: true,
                        },
                    ],
                    Class: "no-margin-b",
                },
            ],
        },
        {
            SettingName: "Optimization & Delivery",
            Key: "Optimization_Delivery",
            Component: "form-Group",
            Children: [
                {
                    SettingName: "Optimization for Ad Delivery",
                    Key: "Ad_Delivery",
                    Component: "form-Select",
                    Value: "Conversions",
                    DataType: "string",
                    Options: [
                        {
                            Name: "Conversions",
                            Value: "Conversions",
                        },
                        {
                            Name: "Landing Page Views",
                            Value: "Landing_Page_Views",
                        },
                        {
                            Name: "Link Clicks",
                            Value: "Link_Clicks",
                        },
                        {
                            Name: "Impressions",
                            Value: "Impressions",
                        },
                    ],
                },
                {
                    SettingName: "Bid Strategy",
                    Key: "Bid_Strategy",
                    Component: "form-Select",
                    Value: "Cost_cap",
                    DataType: "string",
                    Options: [
                        {
                            Name: "Cost cap",
                            Value: "Cost_cap",
                        },
                    ],
                },
                {
                    SettingName: "Cost Control",
                    Key: "Cost_Control",
                    Component: "form-Input",
                    Value: 200,
                    DataType: "number",
                    Attr: {
                        "prefix-icon": "fas fa-usd",
                    },
                },
            ],
        },
    ]
}

// report 创建模板
export const CreateReportTempConfig = {
    CreatedAt: "",
    CreatedBy: "",
    ID: 0,
    ProductID: 0,
    UpdatedAt: "",
    UpdatedBy: "",
    Version: 0,
    Config: [
        {
            Component: "form-steps",
            Value: 0,
            Class: "",
            Key: "steps",
            Stepslable: ["选择产品及账号", "配置广告"],
            StepsGroup: [
                {
                    Value: 0,
                    Children: [
                        {
                            Component: "form-button",
                            SettingName: "下一步",
                            ClickEvent: "next",
                        },
                    ],
                },
                {
                    Value: 1,
                    Children: [
                        {
                            Component: "form-button",
                            SettingName: "上一步",
                            ClickEvent: "previous",
                            Class: "inline-block",
                        },
                        {
                            Component: "form-button",
                            SettingName: "创建投放",
                            ClickEvent: "CreateReport",
                            Class: "inline-block margin-l-sm",
                        },
                    ],
                },
            ],
            OptionGroup: [
                {
                    Value: 0,
                    Children: [
                        {
                            Component: "form-Collapse",
                            Value: ["Product", "Account"],
                            Children: [
                                {
                                    SettingName: "Product",
                                    Component: "form-Group",
                                    Children: [
                                        {
                                            Key: "Category",
                                            SettingName: "选择品类",
                                            Value: null,
                                            DataType: "string",
                                            Component: "form-Select",
                                            Class: "wd300",
                                            Options: [],
                                            ChangeEvent: "CategoryChange",
                                            Attr: { filterable: true }
                                        },
                                        {
                                            Key: "Product",
                                            SettingName: "选择产品",
                                            Value: null,
                                            DataType: "string",
                                            Component: "form-Select",
                                            Class: "wd300",
                                            Options: [],
                                            ChangeEvent: "ProductChange",
                                            Attr: {
                                                filterable: true,
                                                'value-key': 'Sku'
                                            }
                                        },
                                    ],
                                },
                                {
                                    SettingName: "Account",
                                    Component: "form-Group",
                                    Children: [
                                        {
                                            Key: 'AccountId',
                                            Component: "form-SelectAccount",
                                            Class: "wd300",
                                            Value: null,
                                            SettingName: "选择账号",
                                            Placeholder: "输入账号名或ID搜索",
                                            Options: [],
                                            ChangeEvent: 'AccountChange'
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    Value: 1,
                    Children: [
                        {
                            Component: "form-Collapse",
                            Value: ["Ad Set", "Ad"],
                            Children: [
                                {
                                    SettingName: "Ad Set",
                                    Component: "form-Group",
                                    Children: [
                                        {
                                            Component: "form-text",
                                            SettingName: "1.此次投放创建",
                                            Class: "inline-block",
                                        },
                                        {
                                            Key: 'CreateNum',
                                            Component: "form-Input",
                                            Class: "wd100 inline-block margin-l-sm",
                                            Value: 1,
                                            ChangeEvent: 'CreateNumChange',
                                            Rule: {
                                                Required: true,
                                                Regexp: '/1|2|3/',
                                                Msg: '只能输入1-3的数字'
                                            }
                                        },
                                        {
                                            Component: "form-text",
                                            SettingName: "个Ad Set，总预算为",
                                            Class: "inline-block margin-l-sm",
                                        },
                                        {
                                            Key: 'TotalBudget',
                                            Component: "form-Input",
                                            Class: "wd150 inline-block margin-l-sm",
                                            Value: "",
                                            Attr: {
                                                "prefix-icon": "fas fa-usd",
                                            },
                                            ChangeEvent: 'TotalBudgetChange',
                                            Rule: {
                                                Msg: "只能输入非0的数字,且最多两位小数",
                                                Regexp: "/^([1-9]+)(\\d*)(\\.\\d{0,2})?$/",
                                                Required: true,
                                            }
                                        },
                                        {
                                            Component: "form-text",
                                            SettingName: "，使用Pixel",
                                            Class: "inline-block margin-l-sm",
                                        },
                                        {
                                            Key: 'PixelId',
                                            Value: "",
                                            DataType: "string",
                                            Component: "form-Select",
                                            Class: "inline-block margin-l-sm",
                                            Options: [],
                                            OptionLabel: 'pixel_name',
                                            OptionValue: 'pixel_id',
                                            Rule: {
                                                Required: true,
                                            }
                                        },
                                        {
                                            Component: "form-tabs",
                                            SettingName: "Ad Set-",
                                            Key: 'AdSetTabs',
                                            Value: '0',
                                            Children: [
                                                CreateLaunchAdSet,
                                            ],
                                        },
                                    ],
                                },
                                {
                                    SettingName: "Ad",
                                    Component: "form-Group",
                                    Children: [
                                        {
                                            Component: "form-text",
                                            SettingName: "1.此次投放选择Page",
                                            Class: "inline-block",
                                        },
                                        {
                                            Key: 'Page',
                                            Value: null,
                                            DataType: "string",
                                            Component: "form-Select",
                                            Class: "inline-block margin-l-sm",
                                            Options: [],
                                            OptionLabel: 'page_name',
                                            OptionValue: 'Value',
                                            Rule: {
                                                Required: true,
                                            },
                                            Attr: {
                                                'value-key': 'page_id'
                                            }
                                        },
                                        {
                                            Component: "form-text",
                                            SettingName: "，并",
                                            Class: "inline-block",
                                        },
                                        {
                                            Key: 'Post',
                                            Value: "newPost",
                                            DataType: "string",
                                            Component: "form-Select",
                                            Class: "inline-block margin-l-sm",
                                            Options: [
                                                {
                                                    Name: "创建新的Post",
                                                    Value: "newPost",
                                                },
                                                {
                                                    Name: "使用已创建的Post",
                                                    Value: "oldPost",
                                                },
                                            ],
                                            OptionGroup: [
                                                {
                                                    Value: "newPost",
                                                    Children: [
                                                        {
                                                            SettingName: "Ad Setup",
                                                            Component: "form-Group",
                                                            Children: [
                                                                {
                                                                    Component: "form-button",
                                                                    SettingName: "选择Ad模板",
                                                                    ClickEvent: "chooseAd",
                                                                    Class: "inline-block fr ",
                                                                },
                                                                {
                                                                    SettingName: "Format",
                                                                    Key: "Format",
                                                                    Value: true,
                                                                    DataType: "bool",
                                                                    Component: "form-Radio",
                                                                    Options: [{ Name: "SingleImageOrVideo", Value: true }],
                                                                },
                                                                {
                                                                    SettingName: "Media",
                                                                    Key: "Media",
                                                                    Value: "video",
                                                                    Class: "blck",
                                                                    Options: [
                                                                        {
                                                                            Name: "Video",
                                                                            Value: "video",
                                                                        },
                                                                        {
                                                                            Name: "Image",
                                                                            Value: "image",
                                                                        },
                                                                    ],
                                                                    Component: "form-Media",
                                                                    Class: "no-margin-b",
                                                                    Children: [
                                                                        {
                                                                            Key: "VideoId",
                                                                            Value: null,
                                                                            DataType: "number",
                                                                        },
                                                                        {
                                                                            Key: "PicId",
                                                                            Value: null,
                                                                            DataType: "number",
                                                                        },
                                                                        {
                                                                            SettingName: "Headline",
                                                                            Key: "HeadLine",
                                                                            Value: "",
                                                                            Component: "form-Input",
                                                                            DataType: "string",
                                                                            Rule: {
                                                                                Required: true,
                                                                            },
                                                                            Attr: {
                                                                                clearable: true,
                                                                            },
                                                                        },
                                                                        {
                                                                            SettingName: "Website URL",
                                                                            Key: "WebsiteURL",
                                                                            Value: "",
                                                                            Component:
                                                                                "form-Input",
                                                                            DataType:
                                                                                "string",
                                                                            Rule: {
                                                                                Required: true,
                                                                            },
                                                                            Attr: {
                                                                                clearable: true,
                                                                            },
                                                                        },
                                                                    ],
                                                                },
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
                                                                    Class: "wdp50 inline-block",
                                                                },
                                                                {
                                                                    SettingName:
                                                                        "Call to Action",
                                                                    Key:
                                                                        "CalltoAction",
                                                                    Value:
                                                                        "SHOP_NOW",
                                                                    DataType:
                                                                        "string",
                                                                    Component:
                                                                        "form-Select",
                                                                    Options: [
                                                                        {
                                                                            Name:
                                                                                "Shop Now",
                                                                            Value:
                                                                                "SHOP_NOW",
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    SettingName: "Website URL后缀",
                                                                    Key: "Website_URLAppend",
                                                                    Attr: { disabled: true },
                                                                    Class: "hide",
                                                                    Value: ["Account_ID", "Campaign_ID", "AdSet_ID", "Ad_ID"],
                                                                    DataType: "array",
                                                                    Component: "form-Checkbox",
                                                                    Options: [
                                                                        { Name: "Account ID", Value: "Account_ID" },
                                                                        { Name: "Campaign ID", Value: "Campaign_ID" },
                                                                        { Name: "Ad Set ID", Value: "AdSet_ID" },
                                                                        { Name: "Ad ID", Value: "Ad_ID" },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    Value: "oldPost",
                                                    Children: [
                                                        {
                                                            Component: "form-SelectPost",
                                                            SettingName: "选择已创建的Post",
                                                            Key: 'PostList',
                                                            Value: null,
                                                            Options: []
                                                        },
                                                    ],
                                                },
                                            ],
                                            ChangeEvent: 'PostChange'
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    Value: 2,
                    Children: [
                        {
                            Component: "form-button",
                            SettingName: "上一步",
                            ClickEvent: "previous",
                            Class: "inline-block",
                        },
                        {
                            Component: "form-button",
                            SettingName: "创建投放",
                            ClickEvent: "CreateReport",
                            Class: "inline-block margin-l-sm",
                        },
                    ],
                },
            ],
        },
        // 选择ad set模拟的弹框
        {
            Component: "form-Dialog",
            SettingName: "选择Ad Set模板",
            Value: false,
            Key: "AdSetDialog",
            Class: "position-rel",
            Children: [
                {
                    Component: "form-SelectAdSet",
                    Key: "AdSetTempId",
                    Value: null,
                    Attr: {
                        type: "adset",
                    },
                    Children: [
                        {
                            Component: "form-text",
                            SettingName: "Ad Set模板配置",
                            Class: "margin-t-sm text-16",
                        },
                        {
                            Component: "form-group",
                            SettingName: "",
                            Class: "hei400 overAuto margin-b-lg",
                            Key: "SetAdSetTemp",
                            Children: [],
                        },
                    ],
                },
                {
                    Component: "form-button",
                    SettingName: "添加模板",
                    ClickEvent: "addAdSetTemp",
                    Attr: { size: "small" },
                    Class: "position-footer margin-t-sm",
                },
            ],
        },
        // 选择Ad模板
        {
            Component: "form-Dialog",
            SettingName: "选择Ad模板",
            Value: false,
            Key: "AdDialog",
            Class: "position-rel",
            Children: [
                {
                    Component: "form-SelectAdSet",
                    Value: null,
                    Key: "AdTempId",
                    Attr: {
                        type: "ad",
                    },
                    Children: [
                        {
                            Component: "form-text",
                            SettingName: "Ad模板配置",
                            Class: "margin-t-sm text-16",
                        },
                        {
                            Component: "form-group",
                            SettingName: "",
                            Key: "SetAdTemp",
                            Class: "hei400 overAuto margin-b-lg",
                            Children: [],
                        },
                    ],
                },
                {
                    Component: "form-button",
                    SettingName: "添加模板",
                    ClickEvent: "addAdTemp",
                    Attr: { size: "small" },
                    Class: "position-footer margin-t-sm",
                },
            ],
        },
    ],
};

// 全局的广告配置模板
export const SettingConfig = {
    Config: [
        {
            Component: "form-Collapse",
            Value: ["Ad Set", "Ad"],
            Children: [
                {
                    SettingName: "Ad Set",
                    Key: "AdSet",
                    Children: [
                        {
                            SettingName: "Targeting",
                            Component: "form-Group",
                            Children: [
                                {
                                    Component: "form-Setting",
                                    SettingName: "Country",
                                    Key: "Country",
                                    Value: true,
                                    Children: [
                                        {
                                            Key: 'geo_locations.countries',
                                            Value: [],
                                            Component: "form-Select",
                                            Options: "CountryList",
                                            OptionLabel: "Name",
                                            Attr: {
                                                multiple: true,
                                                clearable: true,
                                                filterable: true,
                                            },
                                            Class: "wd300",
                                            Rule: {
                                                Msg: "请选择国家",
                                                Required: true,
                                                Trigger: "change",
                                            },
                                        },
                                    ],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Age",
                                    Key: "Age",
                                    Value: true,
                                    Children: [
                                        {
                                            Value: { min: null, max: null },
                                            DataType: "object",
                                            Component: "form-Section",
                                            Rule: {
                                                Msg: "输入正确的年龄(13-65)",
                                                Regexp: '/^(\\d+)(\\.\\d+)?$/',
                                                Required: true,
                                                Min: 13,
                                                Max: 65,
                                            },
                                            Class: "wd300",
                                        },
                                    ],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Gender",
                                    Key: "Gender",
                                    Value: true,
                                    Children: [
                                        {
                                            Key: 'Gender',
                                            Value: 0,
                                            DataType: "number",
                                            Component: "form-Select",
                                            Class: "wd300",
                                            Options: [
                                                {
                                                    Name: "All",
                                                    Value: 0,
                                                },
                                                {
                                                    Name: "Men",
                                                    Value: 1,
                                                },
                                                {
                                                    Name: "Women",
                                                    Value: 2,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Language",
                                    Key: "Language",
                                    Value: true,
                                    Children: [
                                        {
                                            Key: 'locales',
                                            Value: [],
                                            DataType: "string",
                                            Component: "form-Select",
                                            Options: "LanguageList",
                                            OptionLabel: "name",
                                            OptionValue: "key",
                                            Class: "wd300",
                                            Attr: {
                                                multiple: true,
                                                clearable: true,
                                                filterable: true,
                                            },
                                            Rule: {
                                                Msg: "请选择语言",
                                                Required: true,
                                                Trigger: "change",
                                            },
                                        },
                                    ],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Custom Audience",
                                    Key: "Custom_Audience",
                                    Value: true,
                                    Children: [],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Interesting & Behavior",
                                    Key: "Interesting",
                                    Value: true,
                                    Children: [],
                                },
                            ],
                        },
                        {
                            SettingName: "Conversion",
                            Component: "form-Group",
                            Children: [
                                {
                                    Component: "form-Setting",
                                    SettingName: "Destination Type",
                                    Key: "DestinationType",
                                    Value: false,
                                    Children: [
                                        {
                                            Key: 'DestinationType',
                                            Component: "form-Radio",
                                            Value: "WEBSITE",
                                            Options: [
                                                {
                                                    Name: "Website",
                                                    Value: "WEBSITE",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Pixel",
                                    Key: "Pixel",
                                    Value: true,
                                    Attr: { disabled: true },
                                    Children: [],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Conversion Event",
                                    Key: "Conversion_Event",
                                    Value: false,
                                    Children: [
                                        {
                                            Key: 'promoted_object.custom_event_type',
                                            Value: "PURCHASE",
                                            DataType: "string",
                                            Component: "form-Select",
                                            Options: [
                                                {
                                                    Name: "Purchase",
                                                    Value: "PURCHASE",
                                                },
                                                {
                                                    Name: "Add to cart",
                                                    Value: "ADD_TO_CART",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            SettingName: "Budget & Schedule",
                            Component: "form-Group",
                            Children: [
                                {
                                    Component: "form-Setting",
                                    SettingName: "Budget",
                                    Key: "Budget",
                                    Value: true,
                                    Children: [
                                        {
                                            Key: 'BudgetType',
                                            Value: "Daily_Budget",
                                            DataType: "string",
                                            Component: "form-Select",
                                            Options: [
                                                {
                                                    Name: "Daily Budget",
                                                    Value: "Daily_Budget",
                                                },
                                                {
                                                    Name: "Lifetime Budget",
                                                    Value: "Lifetime_Budget",
                                                },
                                            ],
                                            Class:
                                                "wd200 inline-block",
                                        },
                                        {
                                            Key: "BudgetPrice",
                                            Value: 500,
                                            DataType: "number",
                                            Component: "form-Input",
                                            Attr: {
                                                "prefix-icon": "fas fa-usd",
                                            },
                                            Rule: {
                                                Regexp: '/^(-?\\d+)(\\.\\d+)?$/',
                                                Required: true,
                                                Trigger: "blur",
                                            },
                                            Class: "wd200 margin-l-xs inline-block",
                                        },
                                    ],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Schedule",
                                    Key: "Schedule",
                                    Value: true,
                                    Children: [
                                        {
                                            Key: 'StartTime',
                                            Component: "form-SelectTime",
                                            Class: "wd200 inline-block",
                                            Value: '',
                                            Attr: {
                                                type: 'datetime'
                                            }
                                        },
                                        {
                                            Key: 'EndTime',
                                            Component: "form-SelectTime",
                                            Class: "wd200 margin-l-sm inline-block",
                                            Value: '',
                                            Attr: {
                                                type: 'datetime'
                                            }
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            SettingName: "Optimization & Delivery",
                            Component: "form-Group",
                            Children: [
                                {
                                    Component: "form-Setting",
                                    SettingName: "Optimization for Ad Delivery",
                                    Key: "Ad_Delivery",
                                    Value: true,
                                    Children: [
                                        {
                                            Key: 'optimization_goal',
                                            Component: "form-Select",
                                            Value: "OFFSITE_CONVERSIONS",
                                            DataType: "string",
                                            Options: [
                                                {
                                                    Name: "Conversions",
                                                    Value: "OFFSITE_CONVERSIONS",
                                                },
                                                {
                                                    Name: "Landing Page Views",
                                                    Value: "Landing_Page_Views",
                                                },
                                                {
                                                    Name: "Link Clicks",
                                                    Value: "Link_Clicks",
                                                },
                                                {
                                                    Name: "Impressions",
                                                    Value: "Impressions",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Cost Control",
                                    Key: "Cost_Control",
                                    Value: true,
                                    Children: [
                                        {
                                            Key: 'bid_constraints',
                                            Component: "form-Input",
                                            Value: null,
                                            DataType: "number",
                                            Attr: {
                                                "prefix-icon": "fas fa-usd",
                                            },
                                            Class: 'inline-block',
                                            Rule: {
                                                Msg: "只能输入非0的数字或者不填",
                                                Regexp: '/^([1-9]+)(\\d*)(\\.\\d{0,2})?$/',
                                                Required: false,
                                            }
                                        },
                                        {
                                            Key: 'bid_strategy',
                                            Component: "form-Select",
                                            Value: "COST_CAP",
                                            DataType: "string",
                                            Options: [
                                                {
                                                    Name: "Cost cap",
                                                    Value: "COST_CAP",
                                                },
                                                {
                                                    Name: "TARGET_COST",
                                                    Value: "TARGET_COST",
                                                },
                                                {
                                                    Name: "LOWEST_COST_WITH_BID_CAP",
                                                    Value: "LOWEST_COST_WITH_BID_CAP",
                                                },
                                            ],
                                            Class: 'margin-l-sm inline-block',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            SettingName: "More",
                            Component: "form-Group",
                            Children: [
                                {
                                    Component: "form-Setting",
                                    SettingName: "Placements",
                                    // Key: "Placements",
                                    Value: true,
                                    Children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    SettingName: "Ad",
                    Key: "Ad",
                    Children: [
                        {
                            SettingName: "Identity",
                            Component: "form-Group",
                            Children: [
                                {
                                    Component: "form-Setting",
                                    SettingName: "Facebook Page",
                                    Key: "Facebook_Page",
                                    Value: true,
                                    Children: [],
                                    Attr: { disabled: true },
                                },
                            ],
                        },
                        {
                            SettingName: "Ad Setup",
                            Component: "form-Group",
                            Children: [
                                {
                                    Component: "form-Setting",
                                    SettingName: "Format",
                                    Key: "Format",
                                    Value: true,
                                    Children: [],
                                    Attr: { disabled: true },
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Call to Action",
                                    Key: "CalltoAction",
                                    Value: true,
                                    Children: [
                                        {
                                            Key: 'CallToAction',
                                            Value: "SHOP_NOW",
                                            DataType: "string",
                                            Component: "form-Select",
                                            Options: [
                                                {
                                                    Name: "Shop Now",
                                                    Value: "SHOP_NOW",
                                                },
                                                {
                                                    Name: "Learn More",
                                                    Value: "LEARN_MORE",
                                                },
                                                {
                                                    Name: "Get Offer",
                                                    Value: "GET_OFFER",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Primary Text",
                                    Key: "Primary_Text",
                                    Value: true,
                                    Children: [],
                                    Attr: { disabled: true },
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Media",
                                    Key: "Media",
                                    Value: true,
                                    Children: [],
                                    Attr: { disabled: true },
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "HeadLine",
                                    Key: "HeadLine",
                                    Value: true,
                                    Children: [],
                                    Attr: { disabled: true },
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Website URL",
                                    Key: "Website_URL",
                                    Value: true,
                                    Children: [],
                                    Attr: { disabled: true },
                                },
                                {
                                    Component: "form-Setting",
                                    SettingName: "Website URL后缀",
                                    Key: "Website_URLAppend",
                                    Value: false,
                                    Attr: { disabled: true },
                                    Children: [
                                        {
                                            Key: "UrlSuffix",
                                            Value: [
                                                "Account_ID",
                                                "Campaign_ID",
                                                "AdSet_ID",
                                                "Ad_ID",
                                            ],
                                            DataType: "array",
                                            Component: "form-Checkbox",
                                            Options: [
                                                {
                                                    Name: "Account ID",
                                                    Value: "Account_ID",
                                                },
                                                {
                                                    Name: "Campaign ID",
                                                    Value: "Campaign_ID",
                                                },
                                                {
                                                    Name: "Ad Set ID",
                                                    Value: "AdSet_ID",
                                                },
                                                {
                                                    Name: "Ad ID",
                                                    Value: "Ad_ID",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

// 将配置里面的所有含Value的项添加属性
export const AddConfigParams = (config, params, keys, replace) => {
    let List = _.cloneDeep(config);

    if (List instanceof Array) {
        whileConfigSetParams(List, params, keys, replace);
    } else if (List instanceof Object) {
        setParams(List, params, keys, replace);
    }
    return List;
};

// 设置属性
function setParams(m, params, keys, replace) {
    const includeKeys = keys || [];
    if (includeKeys.length > 0 && !includeKeys.includes(m.Key)) return;

    if (m.Value !== undefined) {
        // 添加的属性是对象类型
        if (params instanceof Object) {
            for (let key in params) {
                if (m[key]) {
                    if (_.isString(m[key])) {
                        if (replace) m[key] = params[key]
                        else m[key] = m[key] + ' ' + params[key]
                    }

                    if (_.isObject(m[key])) {
                        if (replace) m[key] = params[key]
                        else m[key] = Object.assign(m[key], params[key])
                    }
                } else {
                    m[key] = params[key];
                }
            }
        }
    }
}

// 获取配置里的所有项
function whileConfigSetParams(config, params, keys, replace) {
    config.forEach((m) => {
        setParams(m, params, keys, replace);

        if (m.Children || m.OptionGroup) {
            whileConfigSetParams(m.Children || m.OptionGroup, params, keys, replace);
        }
    });
}

// 根据key获取配置
export const GetConfig = (config, key) => {
    const t = whileConfig(config, key);
    return t;
};

// 循环配置里的所有项
function whileConfig(config, key) {
    let temp = {};
    for (let i = 0; i < config.length; i++) {
        if (Object.keys(temp).length != 0) break;

        if (config[i].Key && config[i].Key == key) {
            temp = config[i];
            break;
        }

        if (
            (Object.keys(temp).length == 0 && config[i].Children) ||
            config[i].OptionGroup
        ) {
            temp = whileConfig(
                config[i].Children || config[i].OptionGroup,
                key
            );
        }
    }

    return temp;
}

// 获取所有的key
export const GetAllKeys = (config) => {
    const t = whileConfigGetKeys(config);
    return t;
};

// 循环所有的key
function whileConfigGetKeys(config) {
    let keys = [];

    config.forEach((m) => {
        if (m.Key) keys.push(m);

        if (m.Children || m.OptionGroup) {
            keys.push(...whileConfigGetKeys(m.Children || m.OptionGroup));
        }
    });

    return keys;
}

// 根据全局配置显示配置
export function excludeGlobalSetting(Config) {
    return new Promise((resolve, reject) => {
        Global.getSetting().then((globalData) => {
            const Keys = GetAllKeys(globalData.Config);
            Keys.forEach((m) => {
                if (m.Value === false) {
                    let c = GetConfig(Config, m.Key);
                    c.Class = c.Class += " hide";

                    if (Object.keys(c).length > 0) {
                        if (m.Children && m.Children.length == 1) {
                            c.Value = m.Children[0].Value;
                        }

                        if (m.Children && m.Children.length > 1) {
                            m.Children.forEach((n) => {
                                let cn = GetConfig(Config, n.Key);
                                cn.Class = cn.Class += " hide";

                                if (Object.keys(cn).length > 0) {
                                    cn.Value = n.Value;
                                }
                            });
                        }

                        SpecialCalcSetting(c, m);
                    }
                }
            });

            resolve(Config);
        });
    });
}

// 计算全局配置
function SpecialCalcSetting(c, m) {
    // 特殊处理
    if (m.Key == "Custom_Audience") {
        c.Value = [];
    }

    if (m.Key == "Interesting") {
        console.log("Interesting", c);
        c.Class = " hide";
        c.Value = {
            narrow: false,
            includeList: [],
            narrowList: [],
            furtherList: [],
            excludeList: [],
        };
    }
}