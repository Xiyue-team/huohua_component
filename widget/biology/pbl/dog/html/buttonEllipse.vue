<template>
  <button type='button' class='button' id="button" v-bind:class="{ buttonGray: isActive }">
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

    }
});
</script>

<style scoped="scoped">

  /*基础按钮*/
  .button{
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #EBEBEB;
    border-radius: 21px;
    background-color: #6B92F2;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
  }
  .button:hover{
    cursor: pointer;
  }

  .button:active{
    background: #597BCE;
  }

  .buttonGray {
    pointer-events: none;
    opacity: 0.3;
  }

</style>
