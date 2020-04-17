import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {LsViewHandler} from './services/LsViewHandler';
import { Watch } from 'vue-property-decorator';
const language = require('./language.json');
import buttonUnclickedImage1 from './sub_static/buttonUnclickedImage1.png';
import buttonclickedImage1 from './sub_static/buttonClickedImage1.png';
import buttonUnclickedImage2 from './sub_static/buttonUnclickedImage2.png';
import buttonclickedImage2 from './sub_static/buttonClickedImage2.png';
import buttonUnclickedImage3 from './sub_static/buttonUnclickedImage3.png';
import buttonclickedImage3 from './sub_static/buttonClickedImage3.png';
import buttonUnclickedImage4 from './sub_static/buttonUnclickedImage4.png';
import buttonclickedImage4 from './sub_static/buttonClickedImage4.png';
import buttonUnclickedImage5 from './sub_static/buttonUnclickedImage5.png';
import buttonclickedImage5 from './sub_static/buttonClickedImage5.png';
import buttonUnclickedImage6 from './sub_static/buttonUnclickedImage6.png';
import buttonclickedImage6 from './sub_static/buttonClickedImage6.png';
import buttonUnclickedImage7 from './sub_static/buttonUnclickedImage7.png';
import buttonclickedImage7 from './sub_static/buttonClickedImage7.png';
import buttonUnclickedImage8 from './sub_static/buttonUnclickedImage8.png';
import buttonclickedImage8 from './sub_static/buttonClickedImage8.png';


@Component
export class ViewModel extends Vue {
  // 定义滑条的样式
  sliderNumTop = 100;

  sliderNumBottom = 100;
  sliderOption = {
    lazy: false,
    width: 180,
    height: 2,
    min: 0,
    max: Math.floor(100 * (0.667 / 0.296) * 0.9),
    reverse: false,
    tooltip: 'none',
    piecewise: false,
    dotSize: [24, 24],
    process: false,
    railStyle: {
      backgroundColor: '#737373',
    }
  };

  clickNumber = true;
  clickNumber2 = true;
  clickNumber3 = true;
  clickNumber4 = true;
  clickNumber5 = true;
  clickNumber6 = true;
  clickNumber7 = true;
  clickNumber8 = true;

  buttonOption = {
    buttonUnclickedImage: buttonUnclickedImage1,
    buttonclickedImage: buttonclickedImage1,
  };

  buttonOption2 = {
    buttonUnclickedImage: buttonUnclickedImage2,
    buttonclickedImage: buttonclickedImage2,
  };

  buttonOption3 = {
    buttonUnclickedImage: buttonUnclickedImage3,
    buttonclickedImage: buttonclickedImage3,
  };

  buttonOption4 = {
    buttonUnclickedImage: buttonUnclickedImage4,
    buttonclickedImage: buttonclickedImage4,
  };

  buttonOption5 = {
    buttonUnclickedImage: buttonUnclickedImage5,
    buttonclickedImage: buttonclickedImage5,
  };

  buttonOption6 = {
    buttonUnclickedImage: buttonUnclickedImage6,
    buttonclickedImage: buttonclickedImage6,
  };

  buttonOption7 = {
    buttonUnclickedImage: buttonUnclickedImage7,
    buttonclickedImage: buttonclickedImage7,
  };

  buttonOption8 = {
    buttonUnclickedImage: buttonUnclickedImage8,
    buttonclickedImage: buttonclickedImage8,
  };

  // 判断是否是手机
  isPhone = false;

  title: string;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new LsViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
      this.sliderOption.width = window.innerWidth * 0.15;
      this.sliderOption.dotSize = [16, 16];
    } else if ((window as any)['env'].browserInfo.isIpad) {
      this.sliderOption.width = window.innerWidth * 0.14;
    }

    this.title = language[(window as any)['env'].browserInfo.language].title;
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.resetButton(0);
    this.sliderNumTop = 100;
    this.sliderNumBottom = 100;
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent1(!this.clickNumber);
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  @Watch('sliderNumTop')
  getSliderNumTop() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.scaleEllipse1(this.sliderNumTop / 100);
  }

  @Watch('sliderNumBottom')
  getSliderNumBottom() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.scaleEllipse2(this.sliderNumBottom / 100);
  }

  // 左1按钮点击
  buttonClickEvent1() {
    this.resetButton(1);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent1(!this.clickNumber);
  }
  // 左2按钮点击
  buttonClickEvent2() {
    this.resetButton(2);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent2(!this.clickNumber2);
  }
  // 左3按钮点击
  buttonClickEvent3() {
    this.resetButton(3);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent3(!this.clickNumber3);
  }
  // 左4按钮点击
  buttonClickEvent4() {
    this.resetButton(4);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent4(!this.clickNumber4);
  }
  // 右1按钮点击
  buttonClickEvent5() {
    this.resetButton(5);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent5(!this.clickNumber5);
  }
  // 右2按钮点击
  buttonClickEvent6() {
    this.resetButton(6);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent6(!this.clickNumber6);
  }
  // 右3按钮点击
  buttonClickEvent7() {
    this.resetButton(7);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent7();
  }
  // 右4按钮点击
  buttonClickEvent8() {
    this.resetButton(8);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent8(!this.clickNumber8);
  }

  resetButton(value: number) {
    if (value !== 1) {
      this.clickNumber = true;
    }

    if (value !== 2) {
      this.clickNumber2 = true;
    }

    if (value !== 3) {
      this.clickNumber3 = true;
    }

    if (value !== 4) {
      this.clickNumber4 = true;
    }

    if (value !== 5) {
      this.clickNumber5 = true;
    }

    if (value !== 6) {
      this.clickNumber6 = true;
    }

    if (value !== 7) {
      this.clickNumber7 = true;
    }

    if (value !== 8) {
      this.clickNumber8 = true;
    }
  }
}
