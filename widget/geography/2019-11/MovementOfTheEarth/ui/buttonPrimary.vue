<template>
  <button type='button' class='button-ellipse' v-bind:class="{ 'event_disabled': disableStatus, 'active' : actived}">
    {{title}}
  </button>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  props: {
      title: String,
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
    padding-left: 15px;
    padding-right: 15px;
    min-width: 100px;
    font-size: 16px;
    text-align: center;
    font-weight: 500;
    height: 100%;
    line-height: 38px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    transition: background-color 0.3s,border-color 0.3s,color 0.3s;
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
@media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px)  {
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px)  {
    .button-ellipse {
        min-width: 90px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 14px;
        height: 100%;
        line-height: 24px;
        border-radius: 18px;
    }
}

@media screen and (max-height: 449px), screen and (max-width: 699px) {
    .button-ellipse {
        min-width: 80px;
        padding-left: 6px;
        padding-right: 6px;
        font-size: 14px;
        height: 100%;
        line-height: 24px;
        border-radius: 14px;
    }
}

</style>
