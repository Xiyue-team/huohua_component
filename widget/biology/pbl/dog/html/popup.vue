<template>
  <div class="popup_bg" v-show="isShowPopup">

    <div class="popup_div" >
      <!--背景-->
      <div class="popup_div_bg">
        <img src="../sub_static/popupDivBgImage.png"/>
      </div>

      <!--跳过按钮-->
      <div class="skip_button" @click="skipButtonClickEvent">
        跳过
      </div>

      <!--答题按钮-->
      <div class="answer_button" @click="answerButtonClickEvent">
        答题
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
// import h_button from './html/buttonEllipse.vue';
//Returned expression type   is not assignable to type Data
export default Vue.extend({
    name: 'popup',
    props: {
      isShowPopup: {
        default: false,
        type: Boolean
      },
      skipButtonEvent: Function,
      answerButtonEvent: Function
    },

    data() {
        return{

        };
    },

    methods: {
      skipButtonClickEvent() {
        this.skipButtonEvent();
      },

      answerButtonClickEvent() {
        this.answerButtonEvent();
      },
    }

});
</script>

<style scoped="scoped">

  .popup_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.50);
  }

  .popup_div {
    width: 400px;
    height: 251px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .popup_div_bg {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .popup_div_bg img {
    width: 100%;
  }

  .skip_button {
    width: 142px;
    height: 42px;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    border-radius: 21px;

    ont-family: SourceHanSansSC-Medium;
    font-size: 16px;
    color: #6B92F2;
    text-align: center;
    line-height: 42px;

    position: absolute;
    left: 50px;
    bottom: 28px;
  }

  .answer_button {
    width: 142px;
    height: 42px;
    background: #6B92F2;
    border: 1px solid #EBEBEB;
    border-radius: 21px;

    ont-family: SourceHanSansSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 42px;

    position: absolute;
    right: 50px;
    bottom: 28px;
  }
</style>
