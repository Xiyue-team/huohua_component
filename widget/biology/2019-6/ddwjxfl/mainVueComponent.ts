import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { SgdhhViewHandler } from './services/SgdhhViewHandler';
@Component
export class MainVueComponent extends Vue {
  //data
  zoom1 = 0; //屏幕宽高比
  flag = false;
  flags = false;
  secend = false;
  thired1 = false;
  thired2 = false;
  title = window.env.browserInfo.lang.title;
  bg5: any = require('./sub_static/bg.png');
  optionTextleft: any = ["", "", "", "", "", "", "", "", "", "", "", ""];
  buttonBox1: any = [
    {
      src: require('./sub_static/1.png'),
      name: '壁虎'
    },
    {
      src: require('./sub_static/2.png'),
      name: '蚯蚓'
    },
    {
      src: require('./sub_static/3.png'),
      name: '蜂鸟'
    },
    {
      src: require('./sub_static/4.png'),
      name: '水螅'
    },
    {
      src: require('./sub_static/5.png'),
      name: '蜗牛'
    },
    {
      src: require('./sub_static/6.png'),
      name: '大象'
    },
    {
      src: require('./sub_static/7.png'),
      name: '青蛙'
    },
    {
      src: require('./sub_static/8.png'),
      name: '涡虫'
    },
    {
      src: require('./sub_static/9.png'),
      name: '蝴蝶'
    },
    {
      src: require('./sub_static/10.png'),
      name: '鱼'
    },
    {
      src: require('./sub_static/11.png'),
      name: '蛔虫'
    },
  ];
  vertebratebtn: any = '无脊椎动物';
  invertebratebtn: any = '脊椎动物';
  vertebrate:any = [
    "", 
    "腔<br/>肠<br/>动<br/>物", 
    "线<br/>形<br/>动<br/>物", 
    "扁<br/>形<br/>动<br/>物", 
    "环<br/>节<br/>动<br/>物",
    "软<br/>体<br/>动<br/>物", 
    "节<br/>肢<br/>动<br/>物", 
    "鱼<br/>类", 
    "两<br/>栖<br/>类", 
    "爬<br/>行<br/>类", 
    "鸟<br/>类", 
    "哺<br/>乳<br/>动<br/>物"];
  srcArr: any = [{ src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" },
    { src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" }];
  timer: any = null; //定时器
  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new SgdhhViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
    // console.log(this.vertebrate1);
  }
  
  firstBox() {
    (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.animal();
    this.secend = true;
    this.flags = true;
  }
  // 按钮点击事件
  vertebrate_click() {
    this.thired1 = true;
    this.flag = true;
    return (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.initvertebrate();
  }
  invertebrate_click() {
    this.thired2 = true;
    this.flag = true;

    return (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.initinvertebrate();
  }
  //H5坐标转为THREE场景坐标
  transitionPos(left: number, top: number) {
    return (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.transitionPos(left, top);
  }
  //重置
  reset() {
    (ViewController.getInstance().viewHandler as SgdhhViewHandler).reset();

  }
  //适配
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 > 730) {
      this.zoom1 = 1;
    } else {
      this.zoom1 = H1 / (W1 * 0.5);
    }
  }
}
