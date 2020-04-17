<template>
  <div class="button-arrow-content">
    <div class='button-arrow left' v-bind:class="{'event_disabled': currentIndex == 0 }" @click="prev">
      <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 51 (57462) - http://www.bohemiancoding.com/sketch -->
        <g id="公用" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="控件尺寸907" transform="translate(-676.000000, -176.000000)" fill="#6B6B6B" fill-rule="nonzero">
            <g id="左翻页" transform="translate(666.000000, 166.000000)">
              <g id="Group-4" transform="translate(6.000000, 6.000000)">
                <g id="Group-3" transform="translate(4.000000, 4.000000)">
                  <path d="M12.5857864,9 L2,9 C1.44771525,9 1,8.55228475 1,8 L1,8 C1,7.44771525 1.44771525,7 2,7 L12.5857864,7 L8.10050506,2.51471863 C7.70998077,2.12419433 7.70998077,1.49102936 8.10050506,1.10050506 L8.10050506,1.10050506 C8.49102936,0.709980772 9.12419433,0.709980772 9.51471863,1.10050506 L15.7071068,7.29289322 C15.8880712,7.47385763 16,7.72385763 16,8 C16,8.27614237 15.8880712,8.52614237 15.7071068,8.70710678 L9.51471863,14.8994949 C9.12419433,15.2900192 8.49102936,15.2900192 8.10050506,14.8994949 L8.10050506,14.8994949 C7.70998077,14.5089706 7.70998077,13.8758057 8.10050506,13.4852814 L12.5857864,9 Z" id="Combined-Shape" transform="translate(8.500000, 8.000000) scale(-1, 1) translate(-8.500000, -8.000000) "></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>

    <div class='button-arrow right' v-bind:class="{'event_disabled': steps.length == currentIndex+1 }"  @click="next">
      <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 51 (57462) - http://www.bohemiancoding.com/sketch -->
        <g id="公用" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="控件尺寸907" transform="translate(-729.000000, -172.000000)" fill="#6B6B6B" fill-rule="nonzero">
            <g id="右翻页按钮" transform="translate(714.000000, 157.000000)">
              <g id="Group-2">
                <g transform="translate(15.000000, 15.000000)">
                  <path d="M19.5857864,13 L3,13 C2.44771525,13 2,12.5522847 2,12 L2,12 C2,11.4477153 2.44771525,11 3,11 L19.5857864,11 L12.1005051,3.51471863 C11.7099808,3.12419433 11.7099808,2.49102936 12.1005051,2.10050506 L12.1005051,2.10050506 C12.4910294,1.70998077 13.1241943,1.70998077 13.5147186,2.10050506 L22.7071068,11.2928932 C22.8880712,11.4738576 23,11.7238576 23,12 C23,12.2761424 22.8880712,12.5261424 22.7071068,12.7071068 L13.5147186,21.8994949 C13.1241943,22.2900192 12.4910294,22.2900192 12.1005051,21.8994949 L12.1005051,21.8994949 C11.7099808,21.5089706 11.7099808,20.8758057 12.1005051,20.4852814 L19.5857864,13 Z" id="Combined-Shape"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../assets/css/ui.css';
import '../../assets/css/button.css';
//Returned expression type   is not assignable to type Data
export default Vue.extend({
  model: {
        prop: 'value',
        event: 'input'
  },
  props: {
      steps: {
          type:  [Object, Array, Function],
          default: () => []
      },
      value: {
          type: [Number, String],
          default: 0
      }
  },
  data() {
      return{
         currentIndex: 0
      };
  },
   methods: {
       prev() {
           -- this.currentIndex ;
       },
       next() {
           ++ this.currentIndex ;
       }
   },
   watch: {
       currentIndex(dataVal) {
           this.steps[this.currentIndex]();
           this.$emit('input' , dataVal);
       },
       value(valIndex) {
         this.currentIndex = valIndex;

       }
   },
   computed: {
   }
});
</script>

<style>

</style>
