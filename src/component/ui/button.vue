<template>
  <button type='button' class='button'>
    {{title}}
  </button>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../assets/css/ui.css';

//Returned expression type   is not assignable to type Data
export default Vue.extend({
  props: {
      title: String
  }
});
</script>

<style>

</style>
