/**
 * 拖拽事件类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/21 10:22
 */
import * as Hammer from 'hammerjs';
import $ from 'jquery-ts' ;
import * as img3 from '../sub_static/UI/3.png';
import * as img4 from '../sub_static/UI/4.png';

import * as imgP1 from '../sub_static/UI/p_1.png';
import * as imgP2 from '../sub_static/UI/p_2.png';
import * as imgE1 from '../sub_static/UI/e_1.png';
import * as imgE2 from '../sub_static/UI/e_2.png';
import * as imgE22 from '../sub_static/UI/e_22.png';
import { MyViewHandler } from './MyViewHandler';
import { ViewController } from '../../../../../src/core/ViewController';
import { Vue } from 'vue/types/vue';

export class HammerDragEvent {
  // MyViewHandler = new MyViewHandler();
  transform: any;
  el: any;
  timer: any;
  ticking = false;
  START_X: any;
  START_Y: any;
  initScale = 1;
  initAngle = 0;
  obj: any;
  letter: any;
  obj1: any;
  MyViewHandler: MyViewHandler;

  constructor(vm: any, id: string, hitCall?: any) {

    document.querySelector('.control-panel_div_rt');
    this.el = document.getElementById(id);

    this.START_X = 0;
    this.START_Y = 0;

    const mc = new Hammer.Manager(this.el);
    mc.add(new Hammer.Pan({
      threshold: 0,
      pointers: 0
    }));
    mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Rotate({
      threshold: 0
    })).recognizeWith(mc.get('pan'));

    mc.add(new Hammer.Pinch({
      threshold: 0
    })).recognizeWith([mc.get('rotate')] as any);
    mc.add(new Hammer.Tap({
      event: 'doubletap',
      taps: 2
    }));
    mc.add(new Hammer.Tap());
    mc.add(new Hammer.Press({
      time: 0
    }));

    mc.on('panstart panmove', (evt) => {
      this.onPan(evt, hitCall, vm);
    });
    mc.on('press', () => {
      this.onPress();
      this.clickBig();
    });
    mc.on('rotatestart rotatemove', (evt) => {
      // this.onRotate(evt);
    });
    mc.on('pinchstart pinchmove', (evt) => {
      // this.onPinch(evt);
    });
    //移动
    mc.on('panend', () => {
      this.onPanend(vm);
    });

    mc.on('swipe', (evt) => {
      this.onSwipe(evt);
    });
    mc.on('tap', () => {
      this.onTap(vm);
    });
    mc.on('hammer.input', (ev) => {
      if (ev.isFinal) {
        this.resetElement();
      }
    });
    this.resetElement();
  }

  reqAnimationFrame(callback: any) {
    window.setTimeout(callback, 1000 / 60);
  }

  updateElementTransform() {
    if (this.transform.translate.y === 0 && this.transform.translate.x === 0) {
      setTimeout(() => {
        this.el.style.display = 'block';
      }, 300);
    }
    let value = [
      'translate3d(' + this.transform.translate.x + 'px, ' + this.transform.translate.y + 'px, 0)',
      'scale(' + this.transform.scale + ', ' + this.transform.scale + ')',
      'rotate3d(' + this.transform.rx + ',' + this.transform.ry + ',' + this.transform.rz + ',' + this.transform.angle + 'deg)'
    ];
    value = value.join(' ') as any;
    this.el.style.webkitTransform = value;
    this.el.style.mozTransform = value;
    this.el.style.transform = value;
    this.ticking = false;
  }

  requestElementUpdate() {
    if (!this.ticking) {
      this.reqAnimationFrame(() => {
        this.updateElementTransform();
      });
    }
  }

  onPress() {
    this.requestElementUpdate();
  }

  //拖拽事件(结束)
  onPanend(vm: any) {
    // 方格1
    const one_l = document.getElementById('one').getBoundingClientRect().left;
    const one_t = document.getElementById('one').getBoundingClientRect().top;
    const one_r = document.getElementById('one').getBoundingClientRect().right;
    const one_b = document.getElementById('one').getBoundingClientRect().bottom;
    // 方格2
    const two_l = document.getElementById('two').getBoundingClientRect().left;
    const two_t = document.getElementById('two').getBoundingClientRect().top;
    const two_r = document.getElementById('two').getBoundingClientRect().right;
    const two_b = document.getElementById('two').getBoundingClientRect().bottom;


    const userAgent = navigator.userAgent;
    const isEdge = userAgent.indexOf('Edge') > -1;
    const isIE = userAgent.indexOf('.NET') > -1;
    const op = (window as any).viewHandler.viewModel.$data.zoom1;
    if (isEdge || isIE) {
      this.obj = $('.img').height() * op;
      this.obj1 = $('.head').height() * op;
    } else {
      this.obj = $('.img').height();
      this.obj1 = $('.head').height();
    }
    const x1 = this.el.getBoundingClientRect().left;
    /**拖拽图片的x坐标**/
    const y1 = this.el.getBoundingClientRect().top;
    /**拖拽图片的y坐标**/
    const x = x1;
    const y = y1;


    // 第一个方格区域
    const ACQUIRE_PRICE_one = [];
    for (let i = 0; i < 2; i++) {
      const p = $(`#oneDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_one.push(p);
    }
    if (x > one_l - this.obj * 0.8 && x < one_r - this.obj * 0.4 && y > one_t - this.obj * 1.5 && y < one_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_one[0] === '') {
        this.changeBackground(vm, 0, 0);
      }
      if (ACQUIRE_PRICE_one[0] !== '') {
        if ((window as any).viewHandler.viewModel.$data.num1 === 1) {
          this.coverChange(vm, 0);
        }
      }
    } else {
      (window as any).viewHandler.viewModel.$data.ishave = false;
    }


    // 第二个方格区域
    const ACQUIRE_PRICE_two = [];
    for (let i = 0; i < 2; i++) {
      const p = $(`#twoDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_two.push(p);
    }
    if (x > two_l - this.obj * 0.6 && x < two_r - this.obj * 0.4 && y > two_t - this.obj * 1.5 && y < two_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_two[0] === '') {
        this.changeBackground(vm, 0, 1);
      }
      if (ACQUIRE_PRICE_two[0] !== '') {
        if ((window as any).viewHandler.viewModel.$data.num2 === 1) {
          this.coverChange(vm, 1);
        }
      }
    } else {
      (window as any).viewHandler.viewModel.$data.ishave = false;
    }

  }

  changeBackground(vm: any, index: any, num: number) {
    const elIndex = this.el.id.replace('image', '');
    const op = (window as any).viewHandler.viewModel.$data;
    if (elIndex == 0 || elIndex == 4 || elIndex == 1 || elIndex == 5) {
      op.numArr = op.numArr + 1;
    }
    if (num === 0) {
      if (elIndex == 2 || elIndex == 6 || elIndex == 3 || elIndex == 7) {
        (window as any).viewHandler.viewModel.$data.ishave = false;
        return;
      }
      op.leftArr.push(elIndex);
      vm.imgArr1[index].src = this.el.src;
      op.ishave = false;
      op.picture3 = img3;
      op.picture4 = img4;
      op.num1 = 1;
      (document.getElementsByClassName('textText3')[0] as any).style.color = '#fff';
      (document.getElementsByClassName('textText4')[0] as any).style.color = '#fff';
      (window as any).viewHandler.viewModel.$data.showMonban = false;
      if (elIndex == 0 || elIndex == 4) {
        (window as any).viewHandler.viewModel.$data.leftImgId = 1;
      }
      if (elIndex == 1 || elIndex == 5) {
        (window as any).viewHandler.viewModel.$data.leftImgId = 2;
      }
    } else if (num === 1) {
      if (elIndex == 2 || elIndex == 6 || elIndex == 3 || elIndex == 7) {
        (window as any).viewHandler.viewModel.$data.ishave = false;
        return;
      }
      op.rightArr.push(elIndex);
      vm.imgArr2[index].src = this.el.src;
      op.ishave = false;
      op.picture3 = img3;
      op.picture4 = img4;
      op.num2 = 1;
      (document.getElementsByClassName('textText3')[0] as any).style.color = '#fff';
      (document.getElementsByClassName('textText4')[0] as any).style.color = '#fff';
      op.showMonban = false;
      if (elIndex == 0 || elIndex == 4) {
        op.rightImgId = 1;
      }
      if (elIndex == 1 || elIndex == 5) {
        op.rightImgId = 2;
      }
    }

  }

  coverChange(vm: any, numb: number) {
    const elIndex = this.el.id.replace('image', '');
    const op = (window as any).viewHandler.viewModel.$data;
    if (numb == 0) {
      op.leftArr.push(elIndex);
      if ((window as any).viewHandler.viewModel.$data.leftImgId == 1) {
        if (elIndex == 2 || elIndex == 6) {
          (document.getElementById('leftImg') as any).src = imgP1;
          (window as any).viewHandler.viewModel.$data.num1 = 2;
        }
        if (elIndex == 3 || elIndex == 7) {
          (document.getElementById('leftImg') as any).src = imgP2;
          (window as any).viewHandler.viewModel.$data.num1 = 2;
        }
        this.backBackground(0);
      }
      if ((window as any).viewHandler.viewModel.$data.leftImgId == 2) {
        if (elIndex == 2 || elIndex == 6) {
          (document.getElementById('leftImg') as any).src = imgE1;
          (window as any).viewHandler.viewModel.$data.num1 = 2;
        }
        if (elIndex == 3 || elIndex == 7) {
          (document.getElementById('leftImg') as any).src = imgE2;
          (document.getElementById('leftImg3') as any).src = imgE22;
          (window as any).viewHandler.viewModel.$data.num1 = 2;
        }
        this.backBackground(0);
      }
    }
    if (numb == 1) {
      op.rightArr.push(elIndex);
      if ((window as any).viewHandler.viewModel.$data.rightImgId == 1) {
        if (elIndex == 2 || elIndex == 6) {
          (document.getElementById('rightImg') as any).src = imgP1;
          (window as any).viewHandler.viewModel.$data.num2 = 2;
        }
        if (elIndex == 3 || elIndex == 7) {
          (document.getElementById('rightImg') as any).src = imgP2;
          (window as any).viewHandler.viewModel.$data.num2 = 2;
        }
        this.backBackground(1);
      }
      if ((window as any).viewHandler.viewModel.$data.rightImgId == 2) {
        if (elIndex == 2 || elIndex == 6) {
          (document.getElementById('rightImg') as any).src = imgE1;
          (window as any).viewHandler.viewModel.$data.num2 = 2;
        }
        if (elIndex == 3 || elIndex == 7) {
          (document.getElementById('rightImg') as any).src = imgE2;
          (document.getElementById('rightImg3') as any).src = imgE22;
          (window as any).viewHandler.viewModel.$data.num2 = 2;
        }
        this.backBackground(1);
      }
    }
  }

  backBackground(num: number) {
    const elIndex = this.el.id.replace('image', '');
    const op = (window as any).viewHandler.viewModel.$data;
    if (num === 0) {
      if ((window as any).viewHandler.viewModel.$data.num1 == 2) {
        if (op.leftArr[0] === '1' || op.leftArr[0] === '5') {
          (document.getElementsByClassName('btn1')[0] as any).style.left = '30%';
          (document.getElementsByClassName('text1')[0] as any).style.left = '30%';
        }
        (window as any).viewHandler.viewModel.$data.showBtn1 = true;
      }
    }
    if (num === 1) {
      if ((window as any).viewHandler.viewModel.$data.num2 == 2) {
        if (op.rightArr[0] === '1' || op.rightArr[0] === '5') {
          (document.getElementsByClassName('btn2')[0] as any).style.left = '30%';
          (document.getElementsByClassName('text2')[0] as any).style.left = '30%';
        }
        (window as any).viewHandler.viewModel.$data.showBtn2 = true;
      }
    }
  }

  //拖拽开始
  onPan(ev: any, hitCall: any, vm: any) {
    const elIndex = this.el.id.replace('image', '');
    vm.cleanSelectedItem();
    (window as any).viewHandler.viewModel.$data.tishi = false;

    this.el.classList.remove('animate');
    const userAgent = navigator.userAgent;
    const isEdge = userAgent.indexOf('Edge') > -1;
    const isIE = userAgent.indexOf('.NET') > -1;
    if (isEdge || isIE) {
      this.transform.translate = {
        x: this.START_X + ev.deltaX,
        y: this.START_Y + ev.deltaY
      };
    } else {
      this.transform.translate = {
        x: this.START_X + (ev.deltaX / (window as any).viewHandler.viewModel.$data.zoom1),
        y: this.START_Y + (ev.deltaY / (window as any).viewHandler.viewModel.$data.zoom1)
      };
    }
    hitCall(this.el.getBoundingClientRect().left, this.el.getBoundingClientRect().top);
    this.requestElementUpdate();
    this.showBig();

    if (elIndex == 2 || elIndex == 6 || elIndex == 3 || elIndex == 7) {
      return;
    } else {
      if ((window as any).viewHandler.viewModel.$data.numArr <= 1) {
        (window as any).viewHandler.viewModel.$data.ishave = true;
      }
    }
  }

  onPinch(ev: any) {
    // if (ev.type === 'pinchstart') {
    //   // this.initScale = this.transform.scale || 1;
    // }
    // this.el.classList.remove('animate');
    // // this.transform.scale = this.initScale * ev.scale;
    // this.requestElementUpdate();
  }

  onRotate(ev: any) {
    // if (ev.type === 'rotatestart') {
    //   // this.initAngle = this.transform.angle || 0;
    // }
    // this.el.classList.remove('animate');
    // // this.transform.rz = 1;
    // // this.transform.angle = this.initAngle + ev.rotation;
    // this.requestElementUpdate();
  }

  onSwipe(ev: any) {
    const angle = 0;
    this.transform.ry = (ev.direction && Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
    this.transform.rx = (ev.direction && Hammer.DIRECTION_VERTICAL) ? 1 : 0;
    this.transform.angle = (ev.direction && (Hammer.DIRECTION_RIGHT || Hammer.DIRECTION_UP)) ? angle : -angle;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.resetElement();
    }, 300);
    this.requestElementUpdate();
  }

  onTap(vm: any) {
    // const elIndex = this.el.id.replace('image', "");
    // const selectedItem = vm.allImagArr[elIndex];
    // if (selectedItem === vm.selectedItem) {
    //   vm.cleanSelectedItem();
    // } else {
    //   vm.selectedItem = selectedItem;  // 高亮选中
    // }
    // clearTimeout(this.timer);
    // this.timer = setTimeout(() => {
    //   this.resetElement();
    // }, 0);
    // this.requestElementUpdate();
  }

  // 拖动图片时让图片放大
  showBig() {
    const elIndex = this.el.id.replace('image', '');
    if (elIndex == 0 || elIndex == 2 || elIndex == 3 || elIndex == 4 || elIndex == 6 || elIndex == 7) {
      this.transform.scale = 1.9;
    } else if (elIndex == 1 || elIndex == 5) {
      this.transform.scale = 1.9;
    }
  }

  // 点击图片时让图片放大
  clickBig() {
    const elIndex = this.el.id.replace('image', '');
    if (elIndex == 0 || elIndex == 2 || elIndex == 3 || elIndex == 4 || elIndex == 6 || elIndex == 7) {
      this.transform.scale = 1.9;
    } else if (elIndex == 1 || elIndex == 5) {
      this.transform.scale = 1.9;
    }
  }


  resetElement() {
    this.el.classList.add('animate');
    this.transform = {
      translate: {
        x: this.START_X,
        y: this.START_Y
      },
      scale: 1,
      angle: 0,
      rx: 0,
      ry: 0,
      rz: 0
    };
    this.requestElementUpdate();
  }

}
