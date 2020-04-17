<template>
  <button type='button' class='button-primary' v-bind:class="{ 'button-ellipse': type == 'ellipse', 'event_disabled': disableStatus, 'active' : actived}">
    {{title}}
  </button>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../assets/css/ui.css';
import '../../assets/css/button.css';

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

</style>
