<template>
  <div :value="value">
    <ui-btn v-for="(item,index) in groups" :key="item.name" :value="item.name === value" @click.native="clickEvent(item)" :style="{marginBottom:index === groups.length-1?0: (margin || 10) +'px',display:'block'}" :type="type"> {{item.txt}} </ui-btn>
  </div>
</template>
<script>
import UiBtn from '@/components/UI/uiBtn';
export default {
  props: {
    value: [String, Number],
    groups: Array,
    type: [String, Number],
    margin: Number
  },
  components: {
    UiBtn
  },
  data() {
    return {}
  },
  watch: {},
  created() {},
  methods: {
    clickEvent(item) {
      this.$emit('input', item.name)
    }
  }
}

</script>
<style>
div {}

</style>
