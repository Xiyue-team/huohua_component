<template>
  <button type='button' class='button-primary' v-bind:class="{ 'button-ellipse': type == 'ellipse', 'event_disabled': disableStatus, 'active' : actived}">
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
.button-primary {
    background: #FFFFFF;
    padding-left: 20px;
    padding-right: 20px;
    font-weight: bold;
    font-size: 16px;
    color: #525252;
    line-height: 22px;
    text-align: center;
    height: 100%;
    line-height: 38px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    transition: background-color 0.3s,border-color 0.3s,color 0.3s;
}

.button-ellipse {
    border-radius: 21px;
    color: #525252;
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

@media screen and (min-height: 300px) and (max-height: 449px) {
    .button-primary {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 14px;
        height: 100%;
        line-height: 24px;
    }
    .button-ellipse {
        border-radius: 14px;
        color: #525252;
    }
}

</style>
