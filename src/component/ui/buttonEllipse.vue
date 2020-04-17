<template>
  <button type='button' class='button' id="button" @click="clickEvent" v-bind:class="{ active: isActive }">
    {{title}}
  </button>
</template>

<script lang='ts'>
import Vue from 'vue';

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    name: 'buttonEllipse',
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
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    border-radius: 24px;
    padding: 12px 16px;
    font-size: 16px;
    color: #000000;
    line-height: 16px;
  }
  .button:hover{
    cursor: pointer;
  }

  /*.button:active{*/
    /*background: #5CAEFD;*/
    /*color: #FFFFFF;*/
  /*}*/


  .button.active{
    background: #5CAEFD;
    color: #FFFFFF;
  }

</style>
