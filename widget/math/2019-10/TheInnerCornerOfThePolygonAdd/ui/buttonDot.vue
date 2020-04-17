<template>
  <button type='button' class='button-ellipse' v-bind:class="{  'event_disabled': disableStatus, 'active' : actived}">
    {{title}}
  </button>
</template>

<script lang='ts'>
import Vue from 'vue';

//Returned expression type   is not assignable to type Data
export default Vue.extend({
  props: {
      title: String,
      type: String,
      disabled: {
          type: [Boolean, String],
          default: false
      },
      actived: {
          type: [Boolean, String],
          default: false
      }
  },
  computed: {
    disableStatus() {
        return this.disabled === true || this.disabled === 'true';
    }
  }
});
</script>

<style>

/** 椭圆按钮 **/
.button-ellipse {
    background: #FFFFFF;
    font-size: 16px;
    color: #525252;
    text-align: center;
    line-height: 26px;
    font-weight: 500;
    height: 24px;
    width: 24px;
    border-radius: 12px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    transition: background-color 0.3s,border-color 0.3s,color 0.3s;
    cursor: pointer;
}

.button-ellipse:hover {
    background-color: #FAFAFA;
}

.button-ellipse:active {
    background: #0199FF;
    color: #FFFFFF;
    border-color: #0199FF;
}

.button-ellipse.active {
    background: #0199FF;
    color: #FFFFFF;
    border-color: #0199FF;
}

@media screen and (min-height: 600px) and (max-height: 800px) {

}

@media screen and (min-height: 450px) and (max-height: 599px) {

}

@media screen and (max-height: 449px), screen and (max-width: 849px) {
    .button-ellipse {
        font-size: 14px;
        height: 20px;
        line-height: 21px;
        border-radius: 10px;
    }
}

</style>
