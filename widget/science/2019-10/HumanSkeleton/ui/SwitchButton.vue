<template>
  <div class="UI-btn btn-switch">
    <p>
      <slot></slot>
    </p>
    <span :class="{'checked': valueV}">
      <em></em>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  props: {
    valueV: { 
      type: Boolean,
      default: false
    },
  },

})
export default class SwitchButton extends Vue {

  }
</script>

<style>
.UI-btn {
  cursor: pointer;
  display: inline-block;
}
/*switch*/

.btn-switch {
  width: 100%;
  height: 26px;
  text-align: left;
  padding: 8px 10px 8px 10px;
}

.btn-switch p {
  line-height: 26px;
  float: left;
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  color: #ffffff;
}

.btn-switch span {
  width: 44px;
  height: 26px;
  border-radius: 26px;
  background-color: #E6E6E6;
  float: right;
  transition: all 0.3s;
}

.btn-switch span em {
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border: solid 0.5px rgba(0, 0, 0, 0.06);
  display: block;
  border-radius: 50%;
  margin-top: 3px;
  margin-left: 3px;
  transition: all 0.4s 0.1s;
}

  .btn-switch span.checked {
    background-color: #3AC8FF;
  }

  .btn-switch span.checked em {
    float: right;
    margin-top: 3px;
    margin-left: 0;
    margin-right: 3px;
  }
  

</style>
