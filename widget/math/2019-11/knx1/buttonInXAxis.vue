<template>
    <button type='button' class='button' @click="clickEvent" v-bind:class="{ active: isActive }">
        {{title}}
    </button>
</template>

<script lang='ts'>
    import Vue from 'vue';
    // import '../../../../src/assets/css/core.css';
    // import '../../../../src/assets/css/layout.css';
    //Returned expression type   is not assignable to type Data
    export default Vue.extend({
        name: 'buttonInXAxis',
        props: {
            title: String,
            clickNumber: {
                default: true,
                type: Boolean
            },
            //控制按钮
            isActive: {
                default: false,
                type: Boolean
            }
        },

        data() {
            return{
                // clickNumber: true,
                // isActive: false
            };
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
        font-family: SourceHanSansSC-Medium;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.06);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        color: #525252;
    }
    /*鼠标覆盖的时候 会有小手效果*/
    .button:hover {
        cursor: pointer;
    }

    /*当鼠标点击不松开的时候的样式*/
    /*.button:active{*/
    /*    background: #179DF5;*/
    /*    color: #FFFFFF;*/
    /*}*/

    /*当鼠标点击松开之后的样式*/
    /*.button:focus {*/
    /*    background: #179DF5;*/
    /*}*/

    .button.event_disabled {
        cursor: not-allowed;
    }
</style>

