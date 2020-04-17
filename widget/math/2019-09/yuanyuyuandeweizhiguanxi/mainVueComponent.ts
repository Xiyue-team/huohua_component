import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';

@Component
export class MainVueComponent extends Vue {
  // 国际化
  title = window.env.browserInfo.lang.title;
  titleBoxArr = window.env.browserInfo.lang.titleBoxArr;
  buttonArr = window.env.browserInfo.lang.buttonArr;
  tableArr = window.env.browserInfo.lang.tableArr;
  // data
  zoom1 = 0;
  value1 = 1.6;
  value2 = 2.3;
  dis = 3.9;
  r = 3;
  a = -1;
  b = -1;
  r2 = 3;
  a2 = -7;
  b2 = -1;
  sliderOption1 = {
    width: 180, height: 2, min: 0.1, max: 5, tooltip: 'always',
    dotSize: [20, 20], process: true, speed: 0.5, interval: 0.1
  };
  sliderOption2 = {
    width: 180, height: 2, min: 0.1, max: 5, tooltip: 'always',
    dotSize: [20, 20], process: true, speed: 0.5, interval: 0.1
  };
  have = true;
  isChecked = false;
  titleBox:any = null;
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
    setTimeout(() => {
        const box = document.getElementsByClassName('vue-slider-dot-tooltip-inner');
        const spanbox = document.getElementsByClassName('vue-slider-dot-tooltip-inner-top');
        const circle = document.getElementsByClassName('vue-slider-dot-handle');
        const text = document.getElementsByClassName('vue-slider-dot-tooltip-text');
        const changeTop = document.getElementsByClassName(' vue-slider-dot-tooltip-top');
        (box[0] as any).style.backgroundColor = 'transparent';
        (box[0] as any).style.color = '#fff';
        (box[0] as any).style.fontSize = '18px';
        (spanbox[0] as any).style.borderTopColor = 'transparent';
        (circle[0] as any).style.backgroundColor = '#fff';
        (changeTop[0] as any).style.top = '-3px';
        (changeTop[1] as any).style.top = '-3px';
      (box[1] as any).style.backgroundColor = 'transparent';
      (box[1] as any).style.color = '#fff';
      (box[1] as any).style.fontSize = '18px';
      (spanbox[1] as any).style.borderTopColor = 'transparent';
      (circle[1] as any).style.backgroundColor = '#fff';
    }, 100);
    this.titleBox = this.titleBoxArr[3];
  }

  // mounted
  mounted() {
    (document.getElementsByClassName('control-panel_div_floatRight')[0] as any).style.display = 'none';
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
  }

  //监听事件
  @Watch('a')
  offa(v: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.changePosByVue({ x: -v, y: -this.b });
  };
  @Watch('b')
  offb(v: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.changePosByVue({ x: -this.a, y: -v });
  };
  @Watch('a2')
  offa2(v: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.changePosByVue2({ x: -v, y: -this.b2 });
  };
  @Watch('b2')
  offb2(v: any) {
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.changePosByVue2({ x: -this.a2, y: -v });
  };

  // 监听滑动条的拖动
  //监听事件
  @Watch('value1')
  onChildChanged(radius: number) {
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.changeRadius(radius,null,0);
  }
  @Watch('value2')
  onChildChanged2(radius: number) {
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.changeRadius(radius,null,2);
  }

  //methods
  clickbutton() {
      this.isChecked = !this.isChecked;
      if( this.isChecked ){
        document.getElementById('textImg2').style.opacity = '1';
        setTimeout(() => {
          const el = document.getElementById('rightBox');
          el.scrollTop = el.scrollHeight - el.clientHeight;
        });
      } else {
        window.location.href="#maodian";
        document.getElementById('textImg2').style.opacity = '0';
      }

  }

  //适配
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    // if (W1 >= 1200) {
    //   this.zoom1 = 1;
    // } else {
    //   this.zoom1 = H1 / W1;
    // }
    if (W1 / H1 > 1200 / 675) {
      this.zoom1 = H1 / 675;
    } else {
      this.zoom1 = W1 / 1200;
    }
    if( W1 === 818){
      (document.getElementById('title') as any).style.zoom = 0.7;
    }
    if( H1 < 535 ){
      // document.getElementById('rightBox').style.transform = 'scale(0.7) translate(30%,0%)';
      (document.getElementsByClassName('title_box')[0] as any).style.zoom = 0.8;
    }
    if( W1 === 854){
      (document.getElementById('title') as any).style.zoom = 0.7;
    }
    if( W1 === 806){
      (document.getElementById('title') as any).style.zoom = 0.7;
    }
    if( H1 === 330){
      // document.getElementById('rightBox').style.transform = 'scale(0.5) translate(30%,0%)';
    }
    if( H1 === 360){
      // document.getElementById('rightBox').style.transform = 'scale(0.55) translate(30%,0%)';
    }
    if( H1 === 375){
      (document.getElementById('title') as any).style.zoom = 0.7;
      (document.getElementsByClassName('title_box')[0] as any).style.zoom = 0.6;
      // document.getElementById('rightBox').style.transform = 'scale(0.55) translate(30%,0%)';
    }
    if( H1 === 336){
      (document.getElementById('title') as any).style.zoom = 0.7;
      (document.getElementsByClassName('title_box')[0] as any).style.zoom = 0.6;
      // document.getElementById('rightBox').style.transform = 'scale(0.5) translate(30%,0%)';
    }
    if( W1 === 1024){
      (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.moveScene();
    }
  }

  // 重置
  reset() {
    window.location.href="#maodian";
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.resetModelPosition();
  }
}

