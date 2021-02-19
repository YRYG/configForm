<template>
<div>
    <el-table border v-bind="$attrs" v-on="$listeners" @sort-change="sortChange" size="mini" :stripe="stripe" :max-height="maxHeight" @selection-change="handleSelectionChange">
        <el-table-column v-if="check" type="selection" width="55"></el-table-column>
        <el-table-column v-for="(item,key) in columns" :key="key" v-bind="item" style="text-align:center">
            <template v-if="item.slot_name" v-slot="scope">
                <slot :name="item.slot_name" :scope="scope" />
            </template>
            <template v-else-if="item.filter" v-slot="scope">{{item.filter(scope.row)}}</template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    name: "DTable",
    props: {
        maxHeight: {
            type: Number,
            default: 720
        }, 
        columns: {
            type: Array,
            required: true
        },
        stripe: {
            type: Boolean,
            default: true
        },
        check: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        sortChange(e) {
            const { prop,order } = e;
            let asc = undefined;
            if (order) {
                asc = order === "ascending";
            }
            console.log(prop, asc);
            this.$emit("sortBy", { sort: prop,asc: asc });
        },
        //多选时
        handleSelectionChange(val){
            this.$emit("changeSelection",val)
        }
    }
};
</script>
