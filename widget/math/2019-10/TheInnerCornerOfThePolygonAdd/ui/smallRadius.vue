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
// import '../../../../src/assets/css/ui.css';
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
  background: #ffffff;
  border: 0 solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
  border-radius: 4px;
  font-size: 14px;
  color: #000000;
  line-height: 100%;
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
@media screen and (max-height: 449px) {
    .smallbutton {
        font-size: 14px;
        height: 100%;
        line-height: 14px;
    }
}
</style>