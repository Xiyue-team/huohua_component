<template>
  <div v-bind:id="id"  class="button-switch" v-bind:class="{'vertical':vertical}">
    <div v-if="!images" class="switch-item" v-bind:style="{width: width}"
         v-bind:class="{ 'switch-padding': ready, 'active': index == activeIndex}"
         v-for="(item,index) in datas" @click="activeIndex = index">{{item}}</div>
    <div v-if="images" class="switch-item" v-bind:style="{width: item.w}"
         v-bind:class="{ 'switch-padding': ready, 'active': index == activeIndex}"
         v-for="(item,index) in images" @click="activeIndex = index">
      <img :src="item.src" class="switch2_item_img">
    </div>
    <div class="switch-sign" v-bind:style="{width: width,left:left,top:top}" v-bind:class="{ 'switch-padding': ready}"></div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../assets/css/ui.css';
import '../../assets/css/switch.css';
import {CommonUtil} from '../../util/CommonUtil';

export default Vue.extend({
    name: 'switch2',
    model: {
        prop: 'value',
        event: 'input'
    },
    data() {
      return {
          id: CommonUtil.uuid(8, 16),
          activeIndex : 0,
          width: 'auto',
          ready: false,
          itemPosition: [
          ],
          left: '3px',
          top: '3px'
      };
  },
  props: {
      datas: [String, Array, Function],
      value: String,
      images: [Array],
      vertical: {
          type: [Boolean, String],
          default: false
      }

  },
  computed: {
      currentValue () {
          return this.value;
      }
  },
  mounted: function()  {

      const maxWidth  = this.getMaxWidthItem();
      this.ready = true;
      this.width = maxWidth + 'px';
      this.datas.indexOf(this.value);
      setTimeout( () => {
          this.loadItemPosition();
          this.activeIndex = this.datas.indexOf(this.value);
      }, 200);
  },
  watch : {
      activeIndex(newVal, oldVal) {
          const dataVal = this.datas[newVal];
          //this.value = this.datas[newVal];

          this.left   =  this.itemPosition[newVal] ? this.itemPosition[newVal].left + 'px'  : '3px';
          this.top    =  this.itemPosition[newVal] ? this.itemPosition[newVal].top   + 'px'  : '3px';
          this.$emit('input' , dataVal);
      },
      value(newVal) {
          this.activeIndex = this.datas.indexOf(newVal);
          if (this.width === '0px' ) {
              this.width = this.getMaxWidthItem() + 'px';
          }
      }
  },
  methods: {
      getMaxWidthItem() {

          const items = document.getElementById(this.id).querySelectorAll('.switch-item');
          let maxWidth = 0;
          for ( const i of items ) {
              const iWidth = (i as HTMLDivElement).clientWidth;
              maxWidth = maxWidth > iWidth ? maxWidth : iWidth;
          }
          return maxWidth + 1;
      },

      loadItemPosition() {
          const items = document.getElementById(this.id).querySelectorAll('.switch-item');
          for ( const i of items) {
              const left = (i as HTMLDivElement).offsetLeft;
              const top = (i as HTMLDivElement).offsetTop;
              this.itemPosition.push({
                  left: left,
                  top: top
              });
          }
      }
  }
});
</script>

<style>
  .switch-item img{
    height: 40px;
    width: 100%;
  }

</style>
