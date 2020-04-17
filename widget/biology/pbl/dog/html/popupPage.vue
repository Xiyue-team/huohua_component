<template>
  <div style="width: 100%; height: 100%; position: absolute;">
    <div style="position: absolute; width: 100%; height: 49px; background-color: #FFFFFF; box-shadow: 0 1px 0 0 rgba(0,0,0,0.10);">
      <!--返回初始界面按钮-->
      <div class="home_utton">
        <img style="width: 100%" src="../sub_static/head/homeButton.png"/>
      </div>
    </div>

    <div style="position: absolute; width: 100%; height: calc(100% - 49px); top: 49px;">
      <!--题干-->
      <div class="question">
        <div class="question_text">{{questionText}}</div>
      </div>

      <!--选择题-->
      <div class="answer">
        <div class="answer_option_content">
          <div class="answer_option" v-for="(item, index) in optionContent">
            <label class="container">
              <input type="radio" name="radio" :value="optionValue[index]">
              {{item}}
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>

      <!--确定按钮-->
      <div class="yes_button" @click="yesButtonClickEvent">
        <h_button title="确定"></h_button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import './popupPage.css';
import h_button from './buttonEllipse.vue';

export default Vue.extend({
    name: 'buttonEllipse',
    props: {
      questionText: String,
      optionValue: {
        default: [],
        type: Array,
      },
      optionContent: {
        default: [],
        type: Array,
      },
    },

    components: {
      h_button
    },
    data() {
        return{

        };
    },

    methods: {
      yesButtonClickEvent() {
        const radio = document.getElementsByName("radio");
        for (let i = 0; i < radio.length; i++) {
          if ((radio[i] as any).checked) {
            console.log('获取选项', (radio[i] as any).value);
          }
        }
      }
    }
});
</script>

<style scoped="scoped">
  .home_utton {
    width: 22px;
    height: 20px;
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
  }

  .question {
    padding: 20px 46px;
    box-sizing: border-box;
    width: 100%;
    min-height: 26px;
    display: flex
  }

  .question_text {
    margin: auto;
    font-size: 18px;
  }

  .answer {
    padding: 15px 30px 15px 30px;
    min-height: 56px;
  }

  @media screen and (min-width: 1900px) {
    .answer {
      padding: 15px 100px 15px 100px;
      min-height: 56px;
    }
  }

  .answer_option_content {
    min-height: 56px;
    opacity: 0.85;
    border: 1px solid rgba(151,151,151,0.20);
    border-radius: 12px;
  }

  .answer_option {
    background: #FFFFFF;
    min-height: 26px;
    padding: 15px;

    font-family: SourceHanSansSC-Regular;
    font-size: 18px;
    color: #000000;
    line-height: 26px;
  }

  .answer_option label {
    margin: 0 auto;
  }

  .yes_button {
    width: 170px;
    height: 42px;
    position: absolute;
    right: 20px;
    bottom: 24px;
  }
</style>
