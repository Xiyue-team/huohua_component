<template>
  <div class="aDog">
    <div class="aDogPart" v-for="(item, index) in aDog">
      <img style="width: 100%" :src="item.src" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    name: 'adog',
    props: {
      aDog: [String, Array, Function, Object],
    },
    data() {
        return{

        };
    },
    mounted() {
      // setInterval(() => {
      //   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.aDog);
      // }, 2000)
    },
    methods: {

    }
});
</script>

<style scoped="scoped">

  .aDog{
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .aDogPart {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
