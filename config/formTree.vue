<template>
    <MenuTree :class="temp.Class"  :style="temp.Style">
        <template v-slot:left>
            <div class="menu-tree height-fill" :class="temp.Class" :style="temp.Style">
                <configComponent
                    v-on="$listeners"
                    :temp="temp.Children[0]"
                    :prop="prop + 'Children.0.Children.'"
                ></configComponent>
            </div>
        </template>
        <template v-slot:right>
            <configComponent
                v-on="$listeners"
                :temp="temp.Children[1]"
                :prop="prop + 'Children.1.Children.'"
            ></configComponent>
        </template>
    </MenuTree>
</template>

<script>
export default {
    components: {
        MenuTree: (_) => import("../MenuTree"),
        configComponent: (_) => import("../configComponent"),
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
};
</script>