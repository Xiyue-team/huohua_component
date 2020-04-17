/**
 * 拖拽事件类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/21 10:22
 */
import * as Hammer from 'hammerjs';
import $ from 'jquery-ts' ;

export class HammerDragEvent {
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
    })).recognizeWith([mc.get('pan'), mc.get('rotate')] as any);
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
    });
    mc.on('rotatestart rotatemove', (evt) => {
      this.onRotate(evt);
    });
    mc.on('pinchstart pinchmove', (evt) => {
      this.onPinch(evt);
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
    // 圆圈1
    const one_l = document.getElementById('one').getBoundingClientRect().left;
    const one_r = document.getElementById('one').getBoundingClientRect().right;
    const one_t = document.getElementById('one').getBoundingClientRect().top;
    const one_b = document.getElementById('one').getBoundingClientRect().bottom;
    // 圆圈2
    const two_l = document.getElementById('two').getBoundingClientRect().left;
    const two_r = document.getElementById('two').getBoundingClientRect().right;
    const two_t = document.getElementById('two').getBoundingClientRect().top;
    const two_b = document.getElementById('two').getBoundingClientRect().bottom;
    // 圆圈3
    const three_l = document.getElementById('three').getBoundingClientRect().left;
    const three_r = document.getElementById('three').getBoundingClientRect().right;
    const three_t = document.getElementById('three').getBoundingClientRect().top;
    const three_b = document.getElementById('three').getBoundingClientRect().bottom;
    // 圆圈4
    const four_l = document.getElementById('four').getBoundingClientRect().left;
    const four_r = document.getElementById('four').getBoundingClientRect().right;
    const four_t = document.getElementById('four').getBoundingClientRect().top;
    const four_b = document.getElementById('four').getBoundingClientRect().bottom;
    // 圆圈5
    const five_l = document.getElementById('five').getBoundingClientRect().left;
    const five_r = document.getElementById('five').getBoundingClientRect().right;
    const five_t = document.getElementById('five').getBoundingClientRect().top;
    const five_b = document.getElementById('five').getBoundingClientRect().bottom;
    // 圆圈6
    const six_l = document.getElementById('six').getBoundingClientRect().left;
    const six_r = document.getElementById('six').getBoundingClientRect().right;
    const six_t = document.getElementById('six').getBoundingClientRect().top;
    const six_b = document.getElementById('six').getBoundingClientRect().bottom;
    //圆圈7
    const seven_l = document.getElementById('seven').getBoundingClientRect().left;
    const seven_r = document.getElementById('seven').getBoundingClientRect().right;
    const seven_t = document.getElementById('seven').getBoundingClientRect().top;
    const seven_b = document.getElementById('seven').getBoundingClientRect().bottom;
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
    // 第一个圆圈区域
    const ACQUIRE_PRICE_one = [];
    for (let i = 0; i < 1; i++) {
      const p = $(`#oneDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_one.push(p);
    }
    if (x > one_l - this.obj * 0.8 && x < one_r - this.obj * 0.4 && y > one_t - this.obj * 0.8 && y < one_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_one[0] === "") {
        this.changeBackground(vm, 0, 0);
      }
      if (ACQUIRE_PRICE_one[0] !== "") {
        return;
      }
    }
    // 第二个圆圈区域
    const ACQUIRE_PRICE_two = [];
    for (let i = 0; i < 1; i++) {
      const p = $(`#twoDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_two.push(p);
    }
    if (x > two_l - this.obj * 0.6 && x < two_r - this.obj * 0.4 && y > two_t - this.obj * 0.8 && y < two_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_two[0] === "") {
        this.changeBackground(vm, 0, 1);
      }
      if (ACQUIRE_PRICE_two[0] !== "") {
        return;
      }
    }

    // 第三个圆圈区域
    const ACQUIRE_PRICE_three = [];
    for (let i = 0; i < 1; i++) {
      const p = $(`#threeDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_three.push(p);
    }
    if (x > three_l - this.obj * 0.6 && x < three_r - this.obj * 0.4 && y > three_t - this.obj * 0.6 && y < three_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_three[0] === "") {
        this.changeBackground(vm, 0, 2);
      }
      if (ACQUIRE_PRICE_three[0] !== "") {
        return;
      }
    }


    // 第四个圆圈区域
    const ACQUIRE_PRICE_four = [];
    for (let i = 0; i < 1; i++) {
      const p = $(`#fourDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_four.push(p);
    }
    if (x > four_l - this.obj * 0.6 && x < four_r - this.obj * 0.4 && y > four_t - this.obj * 0.6 && y < four_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_four[0] === "") {
        this.changeBackground(vm, 0, 3);
      }
      if (ACQUIRE_PRICE_four[0] !== "") {
        return;
      }
    }

    // 第五个圆圈区域
    const ACQUIRE_PRICE_five = [];
    for (let i = 0; i < 1; i++) {
      const p = $(`#fiveDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_five.push(p);
    }
    if (x > five_l - this.obj * 0.6 && x < five_r - this.obj * 0.4 && y > five_t - this.obj * 0.6 && y < five_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_five[0] === "") {
        this.changeBackground(vm, 0, 4);
      }
      if (ACQUIRE_PRICE_five[0] !== "") {
        return;
      }
    }


    // 第六个圆圈区域
    const ACQUIRE_PRICE_six = [];
    for (let i = 0; i < 1; i++) {
      const p = $(`#sixDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_six.push(p);
    }
    if (x > six_l - this.obj * 0.6 && x < six_r - this.obj * 0.4 && y > six_t - this.obj * 0.6 && y < six_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_six[0] === "") {
        this.changeBackground(vm, 0, 5);
      }
      if (ACQUIRE_PRICE_six[0] !== "") {
        return;
      }
    }

    // 第七个圆圈区域
    const ACQUIRE_PRICE_seven = [];
    for (let i = 0; i < 1; i++) {
      const p = $(`#sevenDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_seven.push(p);
    }
    if (x > seven_l - this.obj * 0.6 && x < seven_r - this.obj * 0.4 && y > seven_t - this.obj * 0.6 && y < seven_b - this.obj * 0.4 &&
      ~['image0', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_seven[0] === "") {
        this.changeBackground(vm, 0, 6);
      }
      if (ACQUIRE_PRICE_seven[0] !== "") {
        return;
      }
    }
  }

  changeBackground(vm: any, index: any, num: number) {
    const elIndex = this.el.id.replace('image', "");
    const op = (window as any).viewHandler.viewModel.$data;
    op.newArr.push(elIndex);
    if (num === 0) {
      vm.imgArr1[index].src = vm.allImagArr[elIndex];
      vm.imgArr1[index].text = elIndex;
      op.xuankuangArr[0] = elIndex;
      op.imgArr1[index].name = op.imgNameArr[elIndex];
    } else if (num === 1) {
      vm.imgArr2[index].src = vm.allImagArr[elIndex];
      vm.imgArr2[index].text = elIndex;
      op.xuankuangArr[1] = elIndex;
      op.imgArr2[index].name = op.imgNameArr[elIndex];
    } else if (num === 2) {
      vm.imgArr3[index].src = vm.allImagArr[elIndex];
      vm.imgArr3[index].text = elIndex;
      op.xuankuangArr[2] = elIndex;
      op.imgArr3[index].name = op.imgNameArr[elIndex];
    } else if (num === 3) {
      vm.imgArr4[index].src = vm.allImagArr[elIndex];
      vm.imgArr4[index].text = elIndex;
      op.xuankuangArr[3] = elIndex;
      op.imgArr4[index].name = op.imgNameArr[elIndex];
    } else if (num === 4) {
      vm.imgArr5[index].src = vm.allImagArr[elIndex];
      vm.imgArr5[index].text = elIndex;
      op.xuankuangArr[4] = elIndex;
      op.imgArr5[index].name = op.imgNameArr[elIndex];
    } else if (num === 5) {
      vm.imgArr6[index].src = vm.allImagArr[elIndex];
      vm.imgArr6[index].text = elIndex;
      op.xuankuangArr[5] = elIndex;
      op.imgArr6[index].name = op.imgNameArr[elIndex];
    } else if (num === 6) {
      vm.imgArr7[index].src = vm.allImagArr[elIndex];
      vm.imgArr7[index].text = elIndex;
      op.xuankuangArr[6] = elIndex;
      op.imgArr7[index].name = op.imgNameArr[elIndex];
    }
    $(`#${this.el.id}`).css('visibility', 'hidden');
    //控制完成按钮的代码
    if (op.newArr.length === 7) {
      op.ishave = 2;
    }
  }

  //点击完成触发的事件
  complete11() {
    const op = (window as any).viewHandler.viewModel.$data;
    if (op.ishave >= 2) {
      if (op.xuankuangArr[0] === '0' && op.xuankuangArr[1] === '4' && op.xuankuangArr[2] === '1' && op.xuankuangArr[3] === '2' &&
        op.xuankuangArr[4] === '3' && op.xuankuangArr[5] === '5' && op.xuankuangArr[6] === '6') {
        op.tishi_right = true;
        op.ishave = 3;
        setTimeout(() => {
          op.tishi_right = false;
          if( !op.tishi){
            op.showButton = false;
            op.img_delete = false;
          }
          setTimeout(() => {
            if( !op.tishi){
              op.isShow = true;
            }
          }, 100);
        }, 2000);
      } else if (op.xuankuangArr[0] === '1' && op.xuankuangArr[1] === '2' && op.xuankuangArr[2] === '3' && op.xuankuangArr[3] === '5' &&
        op.xuankuangArr[4] === '6' && op.xuankuangArr[5] === '0' && op.xuankuangArr[6] === '4') {
        op.tishi_right = true;
        op.ishave = 3;
        setTimeout(() => {
          op.tishi_right = false;
          if( !op.tishi){
            op.showButton = false;
            op.img_delete = false;
          }
          setTimeout(() => {
            if( !op.tishi){
              op.isShow = true;
            }
          }, 100);
        }, 2000);
      } else if (op.xuankuangArr[0] === '2' && op.xuankuangArr[1] === '3' && op.xuankuangArr[2] === '5' && op.xuankuangArr[3] === '6' &&
        op.xuankuangArr[4] === '0' && op.xuankuangArr[5] === '4' && op.xuankuangArr[6] === '1') {
        op.tishi_right = true;
        op.ishave = 3;
        setTimeout(() => {
          op.tishi_right = false;
          if( !op.tishi){
            op.showButton = false;
            op.img_delete = false;
          }
          setTimeout(() => {
            if( !op.tishi){
              op.isShow = true;
            }
          }, 100);
        }, 2000);
      } else if (op.xuankuangArr[0] === '3' && op.xuankuangArr[1] === '5' && op.xuankuangArr[2] === '6' && op.xuankuangArr[3] === '0' &&
        op.xuankuangArr[4] === '4' && op.xuankuangArr[5] === '1' && op.xuankuangArr[6] === '2') {
        op.tishi_right = true;
        op.ishave = 3;
        setTimeout(() => {
          op.tishi_right = false;
          if( !op.tishi){
            op.showButton = false;
            op.img_delete = false;
          }
          setTimeout(() => {
            if( !op.tishi){
              op.isShow = true;
            }
          }, 100);
        }, 2000);
      } else if (op.xuankuangArr[0] === '4' && op.xuankuangArr[1] === '1' && op.xuankuangArr[2] === '2' && op.xuankuangArr[3] === '3' &&
        op.xuankuangArr[4] === '5' && op.xuankuangArr[5] === '6' && op.xuankuangArr[6] === '0') {
        op.tishi_right = true;
        op.ishave = 3;
        setTimeout(() => {
          op.tishi_right = false;
          if( !op.tishi){
            op.showButton = false;
            op.img_delete = false;
          }
          setTimeout(() => {
            if( !op.tishi){
              op.isShow = true;
            }
          }, 100);
        }, 2000);
      } else if (op.xuankuangArr[0] === '5' && op.xuankuangArr[1] === '6' && op.xuankuangArr[2] === '0' && op.xuankuangArr[3] === '4' &&
        op.xuankuangArr[4] === '1' && op.xuankuangArr[5] === '2' && op.xuankuangArr[6] === '3') {
        op.tishi_right = true;
        op.ishave = 3;
        setTimeout(() => {
          op.tishi_right = false;
          if( !op.tishi){
            op.showButton = false;
            op.img_delete = false;
          }
          setTimeout(() => {
            if( !op.tishi){
              op.isShow = true;
            }
          }, 100);
        }, 2000);
      } else if (op.xuankuangArr[0] === '6' && op.xuankuangArr[1] === '0' && op.xuankuangArr[2] === '4' && op.xuankuangArr[3] === '1' &&
        op.xuankuangArr[4] === '2' && op.xuankuangArr[5] === '3' && op.xuankuangArr[6] === '5') {
        op.tishi_right = true;
        op.ishave = 3;
        setTimeout(() => {
          op.tishi_right = false;
          if( !op.tishi){
            op.showButton = false;
            op.img_delete = false;
          }
          setTimeout(() => {
            if( !op.tishi){
              op.isShow = true;
            }
          }, 100);
        }, 2000);
      } else {
        op.tishi_right = false;
        op.tishi_error = true;
        op.ishave = 3;
        setTimeout(() => {
          op.tishi_error = false;
          if( op.newArr.length === 0){
            op.ishave = 1;
          } else {
            op.ishave = 2;
          }
        }, 2000);
      }
    }
  }


  //删除图片时控制button按钮的颜色
  restore() {
    const op = (window as any).viewHandler.viewModel.$data;
    op.newArr.length = op.newArr.length - 1;
    if (op.newArr.length < 7) {
      op.ishave = 1;
    }
  }


  //拖拽开始
  onPan(ev: any, hitCall: any, vm: any) {
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
  }

  onPinch(ev: any) {
    if (ev.type === 'pinchstart') {
      // this.initScale = this.transform.scale || 1;
    }
    this.el.classList.remove('animate');
    // this.transform.scale = this.initScale * ev.scale;

    this.requestElementUpdate();
  }

  onRotate(ev: any) {
    if (ev.type === 'rotatestart') {
      // this.initAngle = this.transform.angle || 0;
    }
    this.el.classList.remove('animate');
    // this.transform.rz = 1;
    // this.transform.angle = this.initAngle + ev.rotation;

    this.requestElementUpdate();
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
    const elIndex = this.el.id.replace('image', "");
    const selectedItem = vm.allImagArr[elIndex];
    // const selectedItemArr = vm.allImagArrMax[elIndex];
    if (selectedItem === vm.selectedItem) {
      vm.cleanSelectedItem();
    } else {
      vm.selectedItem = selectedItem;  // 高亮选中
      // vm.tipMax_img_src = selectedItemArr;
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.resetElement();
    }, 0);
    this.requestElementUpdate();
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
