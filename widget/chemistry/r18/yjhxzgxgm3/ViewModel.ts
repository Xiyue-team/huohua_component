import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {DmViewHandler} from './services/DmViewHandler';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  animateFrame1 = 0;
  animateFrame2 = 0;
  animateFrame3 = 0;
  animateFrame4 = 0;
  animateFrame5 = 0;

  isEnd1 = false;
  isEnd2 = false;
  isEnd3 = false;
  isEnd4 = false;
  isEnd5 = false;

  animationOption1 = {
    //关键帧组件所用到的参数
      zipUrl: require('./sub_static/modelAnimation1/animation1.zip'),
      imageNum: 7,
      animationName: 'animation1',
      //是否显示滑动条
      showSlider: false,
      width: 610,
      height: 397.64
  };

  animationOption2 = {
    //关键帧组件所用到的参数
    zipUrl: require('./sub_static/modelAnimation1/animation2.zip'),
    imageNum: 12,
    animationName: 'animation2',
    //是否显示滑动条
    showSlider: false,
    width: 610,
    height: 397.64
  };

  animationOption3 = {
    //关键帧组件所用到的参数
    zipUrl: require('./sub_static/modelAnimation1/animation3.zip'),
    imageNum: 12,
    animationName: 'animation3',
    //是否显示滑动条
    showSlider: false,
    width: 610,
    height: 397.64
  };

  animationOption4 = {
    //关键帧组件所用到的参数
    zipUrl: require('./sub_static/modelAnimation1/animation4.zip'),
    imageNum: 12,
    animationName: 'animation4',
    //是否显示滑动条
    showSlider: false,
    width: 610,
    height: 397.64
  };

  animationOption5 = {
    //关键帧组件所用到的参数
    zipUrl: require('./sub_static/modelAnimation1/animation5.zip'),
    imageNum: 12,
    animationName: 'animation5',
    //是否显示滑动条
    showSlider: false,
    width: 610,
    height: 397.64
  };

  isActive1 = false;
  isActive2 = false;
  isActive3 = false;

  clickNumber1 = true;
  clickNumber2 = true;
  clickNumber3 = true;

  showBigModel = 1;

  // 具体模型场景
  specificModelStage1 = true;
  // 封面模型场景
  coverModelStage = false;

  // 旋转箭头
  showRotateImage1 = false;
  showRotateImage2 = false;
  showRotateImage3 = false;
  showRotateImage4 = false;
  showRotateImage5 = false;

  // 置灰左侧小图片
  disableSmallModel1 = false;
  disableSmallModel2 = true;
  disableSmallModel3 = true;

  // 置灰右侧按钮
  disableCoplanarAtom = true;
  disableCollinearAtom = true;
  disableRotatableKey = true;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    viewOption.showReset = false;
    viewOption.showMobileResetIco = false;
    ViewController.getInstance(new DmViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {

  }

  modelImage1() {
    this.specificModelStage1 = true;
    this.coverModelStage = false;
  }

  smallModelStage11() {

    if (this.showBigModel === 1) {
      this.showBigModel = 2;
    } else if (this.showBigModel >= 2 && this.showBigModel < 5) {
      this.showBigModel = 5;
    } else if (this.showBigModel >= 8 && this.showBigModel < 11) {
      this.showBigModel = 11;
    } else if (this.showBigModel >= 11 && this.showBigModel < 14) {
      this.showBigModel = 14;
    }


    this.isActive1 = false;
    this.isActive2 = false;
    this.clickNumber1 = true;
    this.clickNumber2 = true;

    if (this.showBigModel === 5) {
      // 置灰图片
      this.disableSmallModel1 = true;
      this.disableSmallModel2 = false;
      this.disableSmallModel3 = false;
    }

    if (this.showBigModel === 14) {
      // 置灰图片
      this.disableSmallModel1 = true;

      // 置灰按钮
      this.disableRotatableKey = false;
    }

    // 置灰按钮
    this.disableCoplanarAtom = false;
    this.disableCollinearAtom = false;
  }
  smallModelStage12() {
    this.showBigModel = 5;
    this.isActive1 = false;
    this.isActive2 = false;
    this.clickNumber1 = true;
    this.clickNumber2 = true;

    // 置灰
    this.disableSmallModel2 = true;
    this.disableSmallModel3 = false;
  }
  smallModelStage13() {
    this.showBigModel = 8;
    this.isActive1 = false;
    this.isActive2 = false;
    this.clickNumber1 = true;
    this.clickNumber2 = true;

    // 置灰
    this.disableSmallModel1 = false;
    this.disableSmallModel3 = true;
  }

  coplanarAtom() {
    if (this.isActive1) {
      // 显示共面原子
      if (this.showBigModel === 2 || this.showBigModel === 4) {
        this.showBigModel = 3;
      }

      if (this.showBigModel === 5 || this.showBigModel === 7) {
        this.showBigModel = 6;
      }

      if (this.showBigModel === 8 || this.showBigModel === 10) {
        this.showBigModel = 9;
      }

      if (this.showBigModel === 11 || this.showBigModel === 13) {
        this.showBigModel = 12;
      }

      if (this.showBigModel === 14 || this.showBigModel === 16) {
        this.showBigModel = 15;
      }

      this.isActive1 = true;
    } else {
      // 显示原原子
      if (this.showBigModel === 3) {
        this.showBigModel = 2;
      }

      if (this.showBigModel === 6) {
        this.showBigModel = 5;
      }

      if (this.showBigModel === 9) {
        this.showBigModel = 8;
      }

      if (this.showBigModel === 12) {
        this.showBigModel = 11;
      }

      if (this.showBigModel === 15) {
        this.showBigModel = 14;
      }

      this.isActive1 = false;
    }

    this.clickNumber2 = true;
    this.isActive2 = false;

  }

  collinearAtom() {
    if (this.isActive2) {
      // 显示共线原子
      if (this.showBigModel === 2 || this.showBigModel === 3) {
        this.showBigModel = 4;
      }

      if (this.showBigModel === 5 || this.showBigModel === 6) {
        this.showBigModel = 7;
      }

      if (this.showBigModel === 8 || this.showBigModel === 9) {
        this.showBigModel = 10;
      }

      if (this.showBigModel === 11 || this.showBigModel === 12) {
        this.showBigModel = 13;
      }

      if (this.showBigModel === 14 || this.showBigModel === 15) {
        this.showBigModel = 16;
      }

      this.isActive2 = true;
    } else {
      // 显示原原子
      if (this.showBigModel === 4) {
        this.showBigModel = 2;
      }

      if (this.showBigModel === 7) {
        this.showBigModel = 5;
      }

      if (this.showBigModel === 10) {
        this.showBigModel = 8;
      }

      if (this.showBigModel === 13) {
        this.showBigModel = 11;
      }

      if (this.showBigModel === 16) {
        this.showBigModel = 14;
      }
      this.isActive2 = false;
    }

    this.clickNumber1 = true;
    this.isActive1 = false;
  }

  rotatableKey() {
    this.showRotateImage1 = true;
    this.showBigModel = 14;
    this.isActive3 = true;
    this.isActive2 = false;
    this.isActive3 = false;
    this.clickNumber1 = true;
    this.clickNumber2 = true;

    // 置灰右侧按钮
    this.disableCoplanarAtom = true;
    this.disableCollinearAtom = true;
    this.disableRotatableKey = true;
  }

  rotateImage1() {
    this.showBigModel = 17;
    this.showRotateImage1 = false;
    (this.$refs.animate1 as any).play();
  }

  rotateImage2() {
    this.showBigModel = 18;
    this.showRotateImage2 = false;
    (this.$refs.animate2 as any).play();
  }

  rotateImage3() {
    this.showBigModel = 19;
    this.showRotateImage3 = false;
    (this.$refs.animate3 as any).play();
  }

  rotateImage4() {
    this.showBigModel = 20;
    this.showRotateImage4 = false;
    (this.$refs.animate4 as any).play();
  }

  rotateImage5() {
    this.showBigModel = 21;
    this.showRotateImage5 = false;
    (this.$refs.animate5 as any).play();
  }

  @Watch('isEnd1')
  getIsEnd1() {
    if (this.isEnd1) {
      this.showRotateImage2 = true;
    }
  }

  @Watch('isEnd2')
  getIsEnd2() {
    if (this.isEnd2) {
      this.showRotateImage3 = true;
    }
  }

  @Watch('isEnd3')
  getIsEnd3() {
    if (this.isEnd3) {
      this.showRotateImage4 = true;
    }
  }

  @Watch('isEnd4')
  getIsEnd4() {
    if (this.isEnd4) {
      this.showRotateImage5 = true;
    }
  }

  @Watch('isEnd5')
  getIsEnd5() {
  }

  @Watch('animateFrame1')
  getAnimateFrame1() {
  }

  @Watch('animateFrame2')
  getAnimateFrame2() {
  }

  @Watch('animateFrame3')
  getAnimateFrame3() {
  }

  @Watch('animateFrame4')
  getAnimateFrame4() {
  }

  @Watch('animateFrame5')
  getAnimateFrame5() {
  }
}
