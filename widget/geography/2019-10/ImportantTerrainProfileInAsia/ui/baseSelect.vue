<template>
  <div class="select" :class="{'is-open': isActive}">
    <div class="title" @click="dropDown()" :tabindex="1" @focusout="mouseOut()">{{title}}</div>
    <ul v-show="open">
      <li v-for="(item, index) in listLast" @click="listChange(index)">
        <div class="dot" :style="`border: 2px solid ${item.isShow===true?'#0199FF':'#525252'}`"></div>
        <div
          class="htmlText"
          :style="`color:${item.isShow===true?'#0199FF':'#525252'}`"
          v-html="item.html"
        ></div>
      </li>
    </ul>
  </div>
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
    title: {
      type: String,
      default: null
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    isActive: {
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
  list = this.picList;
  height = 42;
  open = this.isOpen;

  get listLast() {
    return this.list;
  }

  listChange(type: number) {
    this.open = true;
    this.$emit('change', type);
  }

  mouseOut() {
    setTimeout(() => {
      this.$emit('close');
    }, 500);
  }

  dropDown() {
    this.$emit('clickchange', !this.open);
  }
}
</script>

<style scoped="scoped">
.select {
  background: #ffffff;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  height: 100%;
  line-height: 42px;
  box-sizing: border-box;
  border-radius: 21px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  transition: background-color 0.3s,border-color 0.3s,color 0.3s;
  position: relative;
  cursor: pointer;
  color: #525252;
  z-index: 998;
}
.select:hover {
    background-color: #FAFAFA;
}

.title {
  outline: 0px;
}
.select.is-open {
  background: #0199ff;
  color: #ffffff;
  border-color: #0199ff;
}

.select ul {
  width: 100%;
  height: 84px;
  position: absolute;
  border-radius: 10px;
  cursor: pointer;
  bottom: 54px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}

.select ul li {
  float: left;
  width: 100%;
  height: 42px;
}

.dot {
  float: left;
  width: 14px;
  height: 14px;
  margin-left: 12px;
  margin-top: 12px;
  border-radius: 9px;
}

.htmlText {
  float: left;
  height: 100%;
  font-size: 16px;
  line-height: 42px;
  box-sizing: border-box;
  text-align: left;
  margin-left: 12px;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  .dot {
    width: 12px;
    height: 12px;
    margin-left: 8px;
    margin-top: 14px;
    border-radius: 8px;
  }

  .htmlText {
    height: 100%;
    font-size: 14px;
    line-height: 42px;
    box-sizing: border-box;
    text-align: left;
    margin-left: 8px;
  }
}
@media screen and (min-height: 450px) and (max-height: 599px) {
  .dot {
    width: 12px;
    height: 12px;
    margin-left: 8px;
    margin-top: 14px;
    border-radius: 8px;
  }

  .htmlText {
    height: 100%;
    font-size: 14px;
    line-height: 42px;
    box-sizing: border-box;
    text-align: left;
    margin-left: 8px;
  }
}
@media screen and (min-height: 300px) and (max-height: 449px) {
  .select {
    font-size: 14px;
    line-height: 28px;
    border-radius: 14px;
  }

  .select ul {
    height: 56px;
    border-radius: 6px;
    bottom: 40px;
  }

  .select ul li {
    height: 28px;
  }

  .dot {
    float: left;
    width: 10px;
    height: 10px;
    margin-left: 6px;
    margin-top: 7px;
    border-radius: 7px;
  }

  .htmlText {
    font-size: 12px;
    line-height: 28px;
    margin-left: 6px;
  }
}
</style>
