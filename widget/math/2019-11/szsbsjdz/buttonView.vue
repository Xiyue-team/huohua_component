<template>
    <button type='button' class='button' id="button" @click="clickEvent" v-bind:class="{ active: isActive }">
        {{title}}
    </button>
</template>

<script lang='ts'>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'buttonView',
        props: {
            title: String,
            clickNumber: {
                default: true,
                type: Boolean
            },
            isActive: {
                default: false,
                type: Boolean
            }
        },

        methods: {
            clickEvent() {
                if (this.clickNumber === true) {
                    this.$emit('update:isActive', true);
                    this.$emit('update:clickNumber', false);
                } else {
                    this.$emit('update:isActive', false);
                    this.$emit('update:clickNumber', true);
                }
            },
        }
    });
</script>
<style scoped="scoped">

    /*基础按钮*/
    .button{
        background: #FFFFFF;
        border: 0 solid rgba(242, 244, 244, 0.06);
        box-shadow: 0 1px 3px rgba(246, 246, 246, 0.12);
        border-radius: 6px;
        font-size: 16px;
        color: #525252 ;
    }
    .button:hover{
        cursor: pointer;
    }

    .button.active{
        background: #5CAEFD;
        color: #FFFFFF;
    }
</style>
