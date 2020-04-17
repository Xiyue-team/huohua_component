<template>
  <div class="select" :class="{'is-open': open}">
    <div class="title">
      {{currentItem.text}}
      <img class="downImg" :src="downImg" />
    </div>
    <ul v-show="open" class="downli">
      <li
        v-for="(item, index) in listLast"
        @click="() => listChange(index)"
        @touchstart="hoverIndex = index"
        @touchend="hoverIndex = ''"
        @mouseover="hoverIndex = index"
        @mouseout="hoverIndex = ''"
        :class="{bgLi: hoverIndex === index}"
      >{{item.text}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import downImg from '../sub_static/image/down.png';

@Component({
  props: {
    picList: {
      type: Array,
      default: null
    },
    currentShow: {
      type: Object,
      default: null
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isOpen: {
      deep: true,
      handler(nv, ov) {
        this.open = nv;
      }
    }
  }
})
export default class BaseSelect extends Vue {
  isMob: any = /iPad|iPhone|Android/g.test(navigator.userAgent);
  open = this.isOpen;
  list = this.picList;
  lessList: any[];
  currentI = this.list[0];
  downImg = downImg;
  hoverIndex = '';

  get currentItem() {
    this.open = false;
    this.currentI =
      this.currentShow.type === this.list[0].type
        ? this.currentShow
        : this.currentI;
    return this.currentI;
  }

  get listLast() {
    const lessList = JSON.parse(JSON.stringify(this.list));
    this.lessList = lessList.filter(item => item.type !== this.currentI.type);
    return this.lessList;
  }

  listChange(type: number) {
    for (let i = 0; i < this.lessList.length; i++) {
      if (i === type) {
        this.currentI = this.lessList[i];
        break;
      }
    }
    this.$emit('change', this.currentI.type);
  }
}
</script>

<style scoped="scoped">
.select {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  color: #ffffff;
  background: #0091ff;
  border-radius: 12px;
  padding: 6px;
  padding-right: 42px;
  position: relative;
  cursor: pointer;
}
.select.is-open {
  border-radius: 8px 8px 0 0;
}
.downImg {
  height: 14px;
  position: absolute;
  top: 14px;
  right: 4px;
}
.title {
  text-align: center;
  font-size: 24px;
  line-height: 28px;
}

.select ul {
  width: 100%;
  position: absolute;
  right: 0;
  font-size: 24px;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
}
.select ul li {
  width: auto;
  min-width: 100%;
  display: table;
  font-size: 24px;
  color: #333333;
  box-sizing: border-box;
  height: 42px;
  padding: 6px;
  background: #d9d9d9;
  border-bottom: 1px solid #ccc;
}
.select ul li.bgLi {
  background: #0091ff;
}
.select ul li:last-child {
  border-bottom: 0;
  border-radius: 0 0 10px 10px;
}
.downli{
  top: 42px;
}
@media screen and (min-width: 813px) and (max-width: 1024px) {
  .select.is-open {
    border-radius: 5px 5px 0 0;
  }
  .downli{
    top: 30px;
  }
  .select {
    border: 1px;
    height: 30px;
    border-radius: 5px;
    padding: 6px;
  }
  .title {
    font-size: 16px;
    line-height: 20px;
  }
  .downImg {
    height: 10px;
    position: absolute;
    top: 10px;
    right: 4px;
  }
  .select ul li {
    font-size: 16px;
    height: 30px;
    padding: 1px;
  }
}
@media screen and (min-width: 480px) and (max-width: 812px) {
  .select.is-open {
    border-radius: 5px 5px 0 0;
  }
  .downli{
    top: 21px;
  }
  .select {
    border: 1px;
    height: 21px;
    border-radius: 5px;
    padding: 6px;
  }
  .title {
    font-size: 14px;
    line-height: 8px;
  }
  .downImg {
    height: 7px;
    position: absolute;
    top: 7px;
    right: 4px;
  }
  .select ul li {
    font-size: 14px;
    height: 21px;
    padding: 1px;
  }
}
</style>
