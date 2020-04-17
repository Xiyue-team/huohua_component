<!--下拉框组件-->
<template>

  <div class="selectStyle">

    <div id="select_math_div" class="select_math_div" v-show="!showOption" @click="showOption = !showOption">
      <div style="width: 100%; height: 100%; position: absolute; text-align: center;">
        <span class="middle">
          {{selectName}}
        </span>
      </div>
      <img class="select_arrow_img" src="../../../static/images/arrow.png" />
    </div>

    <div class="option_math_div" v-show="showOption" >
      <div class="optionDiv1" v-for="(item, index) in datas" @click="activeIndex = index; showOption = !showOption; selectName = item" >
        <div class="select_one_text">{{item}}</div>
      </div>
    </div>
  </div>


</template>

<script lang='ts'>
import Vue from 'vue';

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    name: 'switch4',
    model: {
      prop: 'value',
      event: 'input'
    },
     props: {
      datas: [String, Array, Function],
      value: String,
    },

    data() {
        return{
          showOption: false,
          activeIndex: 0,
          selectName: '',
        };
    },

    methods: {

      resetSwitch4() {
        this.showOption = false;
      }

    },

    mounted: function() {


      setTimeout(() => {
        this.activeIndex = this.datas.indexOf(this.value);
        this.selectName = this.value;

      }, 200);



    },

    created: () => {
      // this.lineHeight = document.getElementById('select_math_div').clientHeight + 'px';
      // console.log('height', this.lineHeight);
    },

    watch : {
      activeIndex(newVal) {
        const dataVal = this.datas[newVal];
        this.$emit('input' , dataVal);
      },
      value(newVal) {
        this.activeIndex = this.datas.indexOf(newVal);
        this.selectName = this.datas[this.activeIndex];
      }
    },
});
</script>

<style scoped="scoped">

  .selectStyle {
    width: 146px;
    height: 42px;
    position:absolute;
  }

  .select_math_div{
    position: absolute;
    top:0px;
    background: #EBEBEB;
    border-radius: 21px;
    width: 100%;
    height: 100%;
    display: table;
  }
  .select_math_div:hover{
    cursor: pointer;
  }
  .select_math_div div {
    width: 100%;
    height: 100%;
    background: #EBEBEB;
    border-radius: 21px;
    border-radius: 21px;
  }

  .select_arrow_img{
    width: 16px;
    position:absolute;
    top: 0;
    bottom: 0;
    right: 11px;
    margin: auto;
  }

  .select_one_text {
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: #525252;
    /*position: absolute;*/
    text-align: center;
    line-height: 42px;
    display: table-cell;
    vertical-align: middle;
  }

  .option_math_div{
    position: absolute;
    top: 0px;
    background: #EBEBEB;
    border-radius: 21px;
    width: 100%;
    /*height: 252px;*/
    /*display: none;*/
  }

  .option_math_div div {
    width: 100%;
    height: 42px;
    border-radius: 21px;
    position: relative;
    display: table;
    /*border: 1px red solid;*/
  }

  .option_math_div div:hover{
    cursor: pointer;
    background-color: #0199FF;
  }

  .middle {
    display: inline-block;
    position: relative;
    font-size: 16px;
    line-height: 16px;
    top: 50%;
    margin-top: -6px;
    vertical-align: top;
  }
</style>
