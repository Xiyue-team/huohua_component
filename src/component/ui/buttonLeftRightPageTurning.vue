<template>
  <div style="width: 144px; height: 44px; font-size: 18px">
    <div class="buttonEllipse centerDiv" >
      <div class="leftPageTurning" @click="leftPageTurning" v-bind:class="{ event_disabled: disableLeftPageTurning }">
        <div class="arrow centerDiv">
          <span class="arrowLeft"></span>
        </div>
      </div>

      <div class="text centerDiv">
        {{title}}
      </div>

      <div class="rightPageTurning" @click="rightPageTurning" v-bind:class="{ event_disabled: disableRightPageTurning }">
        <div class="arrow centerDiv">
          <span class="arrowRight"></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang='ts'>
  import Vue from 'vue';

  export default Vue.extend({
    name: 'buttonLeftRightPageTurning',
    props: {
      titleValue: {
        default: 0,
        type: Number
      },
      titleArray: Array,
      pageTurning: {
        type: [Function]
      },
    },

    data() {
      return{
        value: this.titleValue,
        title: this.titleArray[this.titleValue],
        disableLeftPageTurning: true,
        disableRightPageTurning: false
      };
    },

    created() {
      if (this.value === 0) {
        this.disableLeftPageTurning = true;
      } else if (this.value === this.titleArray.length) {
        this.disableRightPageTurning = true;
      }
    },

    methods: {
      leftPageTurning() {
        this.value-- ;
        if (this.value < 0) {
          this.value = 0;
        }
        this.title = this.titleArray[this.value];
      },

      rightPageTurning() {
        this.value++;
        this.title = this.titleArray[this.value];
      }
    },

    watch: {
      titleValue() {
        this.value = this.titleValue;
        this.title = this.titleArray[this.value];
        this.pageTurning();
      },

      value() {
        this.$emit('update:titleValue', this.value);
        if (this.value > 0) {
          this.disableLeftPageTurning = false;
        } else {
          this.disableLeftPageTurning = true;
        }
        if (this.value < this.titleArray.length - 1) {
          this.disableRightPageTurning = false;
        } else {
          this.disableRightPageTurning = true;
        }
      }
    }
  });
</script>

<style scoped="scoped">

  .centerDiv {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .buttonEllipse {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    border-radius: 22px;
    color: #000000;
  }

  .leftPageTurning {
    width: 44px;
    height: 100%;
    position: absolute;
    left: 0;
  }

  .rightPageTurning {
    width: 44px;
    height: 100%;
    position: absolute;
    right: 0;
  }

  .text {
    width: 56px;
    height: 100%;
    font-size: 18px;
    text-align: center;
    line-height: 44px;
  }

  .arrow {
    width: 20px;
    height: 20px;
    background-color: #000000;
    border-radius: 10px;
  }

  .arrowLeft {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-top: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: rotate(225deg);
    position: absolute;
    top: 0;
    left: 7px;
    bottom: 0;
    margin: auto;
  }

  .arrowRight:after {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-top: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: rotate(45deg);
    position: absolute;
    top: 0;
    left: 4.5px;
    bottom: 0;
    margin: auto;
  }

  .leftPageTurning:active {
    opacity: 0.6;
  }

  .rightPageTurning:active {
    opacity: 0.6;
  }
</style>
