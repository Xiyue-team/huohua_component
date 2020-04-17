<template>
  <button class="select" :class="{'is-open': open}">
    <div class="title" :tabindex="1" @focusout="mouseOut()">
      {{currentItem.src}}
     <img class="downImg" :src="dropIcon" />
    </div>
    <ul v-show="open" :style="`bottom:${height}px`">
      <li
        v-for="(item, index) in listLast"
        @click="() => listChange(index)"
        @touchstart="hoverIndex = index"
        @touchend="hoverIndex = ''"
        @mouseover="hoverIndex = index"
        @mouseout="hoverIndex = ''"
        :class="{bgLi: hoverIndex === index}"
         :style="`color:${hoverIndex === index?'#ffffff':'#000000'}`"
      >
        {{item.src}}
      </li>
    </ul>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

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
    dropIcon: {
      type: String,
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
export default class BaseSelectTop extends Vue {
  list = this.picList;
  height = 42;
  lessList: any[];
  currentI = this.list[0];
  hoverIndex = '';
  open = this.isOpen;
  get currentItem() {
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

  mouseOut() {
    setTimeout(() => {
      this.$emit('close');
    }, 500);
  }
  listChange(type: number) {
    this.open = false;
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
  background: #5caefd;
  border-radius: 21px;
  text-align: left;
  position: relative;
  cursor: pointer;
}
.select.is-open {
  border-radius: 0 0 21px 21px;
}
.title {
  color: #ffffff;
  padding-left: 21px;
  font-size: 16px;
  outline: 0px;
}
.downImg {
  height: 10px;
  position: absolute;
  top: 16px;
  right: 6px;
}
.select ul {
  width: 100%;
  position: absolute;
  right: 0;
  text-align: center;
  border-radius: 21px 21px 0 0;
  cursor: pointer;
}
.select ul li {
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  height: 42px;
  padding: 6px;
  background: #d9d9d9;
  border-bottom: 1px solid #ccc;
}
.select ul li.bgLi {
  background: #5caefd;
}
.select ul li:first-child {
  border-bottom: 0;
  border-radius: 21px 21px 0 0;
}
img {
  height: 24px;
  width: auto;
}
</style>
