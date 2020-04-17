import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {DmViewHandler} from './services/DmViewHandler';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  animateFrame = 0;
  isEnd1 = false;
  isEnd2 = false;

  animationOption1 = {
    //关键帧组件所用到的参数
      zipUrl: require('./sub_static/modelAnimation1/animation1.zip'),
      imageNum: 9,
      animationName: 'animation1',
      //是否显示滑动条
      showSlider: false,
      width: 610,
      height: 576
  };

  animationOption2 = {
    //关键帧组件所用到的参数
    zipUrl: require('./sub_static/modelAnimation1/animation2.zip'),
    imageNum: 22,
    animationName: 'animation2',
    //是否显示滑动条
    showSlider: false,
    width: 610,
    height: 576
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
    this.showBigModel = 2;
    this.isActive1 = false;
    this.isActive2 = false;
    this.clickNumber1 = true;
    this.clickNumber2 = true;

    // 置灰图片
    this.disableSmallModel1 = true;
    this.disableSmallModel2 = false;

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
    this.disableSmallModel3 = true;

    // 置灰按钮
    this.disableRotatableKey = false;
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

      this.isActive1 = false;
    }

    console.log(this.clickNumber1);
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
      this.isActive2 = false;
    }

    this.clickNumber1 = true;
    this.isActive1 = false;
  }

  rotatableKey() {
    this.showRotateImage1 = true;
    this.showBigModel = 8;
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
    this.showBigModel = 11;
    this.showRotateImage1 = false;
    (this.$refs.animate1 as any).play();
  }

  rotateImage2() {
    this.showBigModel = 12;
    this.showRotateImage2 = false;
    (this.$refs.animate2 as any).play();
  }

  @Watch('isEnd1')
  getIsEnd1() {
    console.log('isend1', this.isEnd1);
    if (this.isEnd1) {
      this.showRotateImage2 = true;
    }

  }

  @Watch('isEnd2')
  getIsEnd2() {
    console.log('isend2', this.isEnd1);
  }

  @Watch('animateFrame')
  getAnimateFrame() {
    console.log('animateFrame', this.animateFrame);
    if (this.animateFrame === 7 || this.animateFrame === 14) {
      (this.$refs.animate2 as any).pause();
      this.showRotateImage2 = true;
    }
  }
}
