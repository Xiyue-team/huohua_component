<template>
  <button
    type="button"
    class="buttonRadius"
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
.buttonRadius {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 0 solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  font-size: 16px;
  color: #000000;
  line-height: 100%;
  transition: background-color 0.3s,border-color 0.3s,color 0.3s;
}
.buttonRadius:hover {
   background-color: #FAFAFA;
}
.buttonRadius:active {
  background: #5caefd;
  color: #ffffff;
}
.buttonRadius.active {
  background: #5caefd;
  color: #ffffff;
}
@media screen and (max-height: 449px) {
  .buttonRadius {
    border-radius: 4px;
    font-size: 12px;
  }
}
</style>