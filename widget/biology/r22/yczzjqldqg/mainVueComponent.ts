import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZhswyyhswViewHandler} from './services/ZhswyyhswViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as readybg from './sub_static/0.png';
import $ from 'jquery-ts';
@Component
export class MainVueComponent extends Vue {

  //data
  zoom1 = 0;
  have = true;
  ishave: any = 6;
  textArr = ['根', '茎', '叶', '花', '果实', '种子'];
  img1: any = '';
  explain: any =  false;
  arr: any = [];
  imgArr: any = [];
  img_Arr: any = [];
  isMake: any = false;
   //created
   created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;
    for (let i = 0; i < 13; i++) {
      this.arr.push(i);
    }
    const promises = this.arr.map((vlaue: any, index: any) => {
      const img1 = require(`./sub_static/${index}.png`);
      return this.preloadImage(img1).then((image: any) => {
        this.imgArr[index] = image;
      });
    });
    Promise.all(promises).then(() => {
      this.img_Arr = this.imgArr;
    });
    ViewController.getInstance(new ZhswyyhswViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
}

//mounted
mounted() {
    this.resize();
    window.addEventListener('resize', () => {
        this.resize();
    });
    this.img1 = readybg;
    ViewController.getInstance().domReady();
}
//预加载
preloadImage(path: any) {
  return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = path;
      image.onload = () => resolve(image);
      image.onerror = reject;
  })
}

clickbutton(num: any) {
  this.ishave = num;
  this.isMake = true;
  if (num === 0) {
    this.clickChange(10, 9, num);
  } else if (num === 1) {
    this.clickChange(6, 5, num);
  } else if (num === 2) {
    this.clickChange(8, 7, num);
  } else if (num === 3) {
    this.clickChange(2, 1, num);
  } else if (num === 4) {
    this.clickChange(4, 3, num);
  } else if (num === 5) {
    this.clickChange(12, 11, num);
  }
}

//点击换图
clickChange(num: any, numb: number, numbe: number) {
  if ($(`#index${numbe}`).hasClass('bulecomplete')) {
    return;
  }
  this.explain = true;
  const full_dom = document.getElementById('full_img');
  const explain_dom = document.getElementById('explain');
  full_dom.appendChild(this.img_Arr[num]);
  explain_dom.appendChild(this.img_Arr[numb]);
  this.img_Arr[num].style.width = '100%';
  this.img_Arr[num].style.height = '100%';
  this.img_Arr[numb].style.width = '100%';
  this.img_Arr[numb].style.height = '100%';
  full_dom.removeChild(full_dom.firstChild);
  explain_dom.removeChild(explain_dom.firstChild);
}

reset() {
  const explain_dom = document.getElementById('explain');
  const full_dom = document.getElementById('full_img');
  const _div = document.createElement('div');
  if (!this.isMake) {
        return;
  }
  this.isMake = false;
  full_dom.appendChild(this.img_Arr[0]);
  full_dom.removeChild(full_dom.firstChild);
  explain_dom.appendChild(_div);
  explain_dom.removeChild(explain_dom.firstChild);
  this.explain = false;
  this.ishave = false;
}
resize() {
  const W1 = window.innerWidth;
  const H1 = window.innerHeight;
  if (W1 / H1 > 1024 / 750) {
      this.zoom1 = H1 / 750;
  } else {
      this.zoom1 = W1 / 1024;
  }
}
}
