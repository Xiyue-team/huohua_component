import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import { DogSplicingPage } from './dogSplicingPage/DogSplicingPage';
import { DogHybridizationPage } from './dogHybridizationPage/DogHybridizationPage';
import { Record, Replay, ReplayModel } from '@huohua/rrwidget';
const questions = require('./questions.json');

@Component
export class ViewModel extends Vue {

  option = {
      id: 'jestId',
      name: 'PBL录制微件',
      limitTime: 100000,
  };
  record = new Record(this.option);

  popupPage = {
    questionText: questions.questions1.questionsText,
    optionValue: ['A', 'B', 'C', 'D'],
    optionContent: [
      questions.questions1.answers[0],
      questions.questions1.answers[1],
      questions.questions1.answers[2],
      questions.questions1.answers[3],
    ],
  };



  dogSplicingPage = new DogSplicingPage(this.record);
  dogHybridizationPage = new DogHybridizationPage(this.dogSplicingPage, this.record);

  created() {
    const viewOption = new ViewOption();
    viewOption.showReset = false;
    viewOption.showMobileResetIco = false;
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    // this.dogSplicingPage = new DogSplicingPage();
    // this.dogHybridizationPage = new DogHybridizationPage(this.dogSplicingPage);
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  // 为返回初始界面按钮绑定事件
  homeButtonClickEvent() {
    console.log('返回初始界面');
    // this.dogHybridizationPage.reset();
    location.reload();
  }

}
