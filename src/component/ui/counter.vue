<template>
    <div>
        <span v-for="n in totalCount" class="counter-item" :class="[ n <= countDisabled ? 'counter-item_disabled' : 'counter-item']" v-bind:style="{}" :key="n"></span>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import '../../assets/css/ui.css';
export default Vue.extend({
  name: 'counter',
  props: {
      title: String,
      //计数器的个数
      counterNum: {
          default: 4,
          type: Number
      },
      //计数器的初始数量
      countDisabled: {
          default: 0,
          type: Number
      },
  },
  data(): any {
      return{
          totalCount: this.counterNum,
      } as any;
  },
  mounted() {
  },
  methods: {
      //重置计数器的方法
      reset() {
        this.$emit('update:countDisabled', 0);
      }
  },
    watch: {
    }
});
</script>

<style>

</style>
