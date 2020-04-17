import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
// import fullScreensLayout from '@/component/layout/fullScreens_layout.vue';
import { LineTestViewHandler } from './services/LineTestViewHandler';
import { Watch } from 'vue-property-decorator';
import seletIos from '../../../../src/component/ui/select.vue';
import { ViewOption } from '../../../../src/core/CoreInterface';
@Component
export class MainVueComponent extends Vue {
  icon = false;

  // 滑条
  value1 = 3;
  width = 10 + '%';
  sliderOption1 = {
    width: 300, height: 2, min: 0, max: 5, tooltip: 'always',
    dotSize: [24, 24], process: true, speed: 0.01, interval: 0.1
  };
  title = window.env.browserInfo.lang.title;
  btn1 = window.env.browserInfo.lang.btn1;
  btn2 = window.env.browserInfo.lang.btn2;
  btn3 = window.env.browserInfo.lang.btn3;
  buttonBox = window.env.browserInfo.lang.buttonBox;
  textBox = window.env.browserInfo.lang.textBox;
  listData = Array.from({ length: 19 }, (value, index) => -9 + index);
  listData1 = Array.from({ length: 10 }, (value, index) => index);
  r = 3;
  a = -1;
  b = -1;
  text = 1.6;
  selectParameter: {
    parameter1: 2
  };
  initEquation = true;
  timer: any;
  showEquation = true;
  dis = 0;
  pos = this.btn3;
  count = 2;
  computed: {};
  created() {

    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 <= 1280) {
      this.sliderOption1.width = window.innerWidth * 0.16;
    }
    // else if (W1 <= 818) {
    //    this.sliderOption1.width =window.innerWidth * 0.19;

    // } 

    // document.addEventListener(
    //   'touchmove',
    //   function (e) {
    //     e.preventDefault();
    //   },
    //   false
    // );
    setTimeout(() => {
      const box = document.getElementsByClassName('vueSlider');
      (box[0] as any).style.padding = '26px 30px';
    }, 100);
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new LineTestViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }
  mounted() {
    (document.getElementsByClassName('control-panel_div_floatRight')[0] as any).style.display = 'none';
    ViewController.getInstance().domReady();
    setTimeout(() => {
      this.initEquation = false;
    }, 2000);
  }
  
  handerClick(){
    this.icon = !this.icon
    if( this.icon ){
      document.getElementById('jsBox').style.opacity = '1';
      setTimeout(() => {
        const el = document.getElementById('boxes');
        el.scrollTop = el.scrollHeight - el.clientHeight;
      });
    } else{
      const el = document.getElementById('boxes');
        el.scrollTop =0;
        document.getElementById('jsBox').style.opacity = '0';
    }
  }





  // 半径绑定滑条
  @Watch('value1')
  onChildChanged1(val: number) {
    (ViewController.getInstance().viewHandler as LineTestViewHandler).chengvalue(val);

  }
  reset() :void{
    const el = document.getElementById('boxes');
    el.scrollTop =0;
    document.getElementById('jsBox').style.opacity = '0';
    this.value1 = 3;
    this.icon = false;
    // (ViewController.getInstance().viewHandler as LineTestViewHandler).reset();
  }
  resize1(): void {
    (ViewController.getInstance().viewHandler as LineTestViewHandler).resize();
  }
}
