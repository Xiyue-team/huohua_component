<template>
  <button
    type="button"
    class="smallbutton"
    v-html="title"
    v-bind:class="{ 'event_disabled': disableStatus, 'active' : actived}"
  ></button>
</template>

<script lang='ts'>
import Vue from 'vue';

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
    disableStatus(): any {
      return this.disabled === true || this.disabled === 'true';
    }
  }
});
</script>

<style>
/*基础按钮*/
.smallbutton {
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: #525252;
  text-align: center;
  line-height: 18px;
  padding-left: 6px;
  padding-right: 6px;
  background: #EBEBEB;
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
}
.smallbutton:hover {
  cursor: pointer;
}
.smallbutton:active {
  background: #5caefd;
  color: #ffffff;
}
.smallbutton.active {
  background: #5caefd;
  color: #ffffff;
}

</style>