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
    const one_r = document.getElementById('one').getBoundingClientRect().right;
    const one_t = document.getElementById('one').getBoundingClientRect().top;
    const one_b = document.getElementById('one').getBoundingClientRect().bottom;
    // 方格2
    const two_l = document.getElementById('two').getBoundingClientRect().left;
    const two_r = document.getElementById('two').getBoundingClientRect().right;
    const two_t = document.getElementById('two').getBoundingClientRect().top;
    const two_b = document.getElementById('two').getBoundingClientRect().bottom;
    // 方格3
    const three_l = document.getElementById('three').getBoundingClientRect().left;
    const three_r = document.getElementById('three').getBoundingClientRect().right;
    const three_t = document.getElementById('three').getBoundingClientRect().top;
    const three_b = document.getElementById('three').getBoundingClientRect().bottom;
    // 方格4
    const four_l = document.getElementById('four').getBoundingClientRect().left;
    const four_r = document.getElementById('four').getBoundingClientRect().right;
    const four_t = document.getElementById('four').getBoundingClientRect().top;
    const four_b = document.getElementById('four').getBoundingClientRect().bottom;

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
    if (x > one_l - this.obj * 0.8 && x < one_r - this.obj * 0.4 && y > one_t - this.obj * 0.8 && y < one_b - this.obj * 0.4 &&
      ~['image_left1', 'image_right1'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_one[0] === "") {
        this.changeBackground(vm, 0, 0);
        console.log(1111);
      }
      if (ACQUIRE_PRICE_one[0] !== "") {
        this.coverChange(vm, 0);
      }
    }
    if (x > one_l - this.obj * 0.8 && x < one_r - this.obj * 0.4 && y > one_t - this.obj * 0.8 && y < one_b - this.obj * 0.4 &&
      ~['image_left0', 'image_left2', 'image_left3', 'image_right0', 'image_right2', 'image_right3'].indexOf(this.el.id)) {
      this.backBackground(0);
    }

    // 第二个方格区域
    const ACQUIRE_PRICE_two = [];
    for (let i = 0; i < 2; i++) {
      const p = $(`#twoDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_two.push(p);
    }
    if (x > two_l - this.obj * 0.6 && x < two_r - this.obj * 0.4 && y > two_t - this.obj * 0.8 && y < two_b - this.obj * 0.4 &&
      ~['image_left0', 'image_right2'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_two[0] === "") {
        this.changeBackground(vm, 0, 1);
      }
      if (ACQUIRE_PRICE_two[0] !== "") {
        this.coverChange(vm, 1);
      }
    }
    if (x > two_l - this.obj * 0.6 && x < two_r - this.obj * 0.4 && y > two_t - this.obj * 0.8 && y < two_b - this.obj * 0.4 &&
      ~['image_left1', 'image_left2', 'image_left3', 'image_right0', 'image_right1', 'image_right3'].indexOf(this.el.id)) {
      this.backBackground(1);
    }

    // 第三个方格区域
    const ACQUIRE_PRICE_three = [];
    for (let i = 0; i < 2; i++) {
      const p = $(`#threeDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_three.push(p);
    }
    if (x > three_l - this.obj * 0.8 && x < three_r - this.obj * 0.4 && y > three_t - this.obj * 0.6 && y < three_b - this.obj * 0.4 &&
      ~['image_left3', 'image_right3'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_three[0] === "") {
        this.changeBackground(vm, 0, 2);
      }
      if (ACQUIRE_PRICE_three[0] !== "") {
        this.coverChange(vm, 2);
      }
    }
    if (x > three_l - this.obj * 0.8 && x < three_r - this.obj * 0.4 && y > three_t - this.obj * 0.6 && y < three_b - this.obj * 0.4 &&
      ~['image_left0', 'image_left2', 'image_left1', 'image_right0', 'image_right1', 'image_right2'].indexOf(this.el.id)) {
      this.backBackground(2);
    }

    // 第四个方格区域
    const ACQUIRE_PRICE_four = [];
    for (let i = 0; i < 2; i++) {
      const p = $(`#fourDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE_four.push(p);
    }
    if (x > four_l - this.obj * 0.6 && x < four_r - this.obj * 0.4 && y > four_t - this.obj * 0.6 && y < four_b - this.obj * 0.4 &&
      ~['image_left2', 'image_right0'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE_four[0] === "") {
        this.changeBackground(vm, 0, 3);
      }
      if (ACQUIRE_PRICE_four[0] !== "") {
        this.coverChange(vm, 3);
      }
    }
    if (x > four_l - this.obj * 0.6 && x < four_r - this.obj * 0.4 && y > four_t - this.obj * 0.6 && y < four_b - this.obj * 0.4 &&
      ~['image_left0', 'image_left1', 'image_left3', 'image_right1', 'image_right2', 'image_right3'].indexOf(this.el.id)) {
      this.backBackground(3);
    }
  }

  changeBackground(vm: any, index: any, num: number) {
    if (num === 0) {
      vm.imgArr1[index].src = this.el.src;
      setTimeout(() => {
        $('#one').css({
          border: ' 2px solid #9BF23B'
        });
        setTimeout(() => {
          {
            $('#one').css({
              border: '2px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.10)'
            });
          }
        }, 400);
      });
    } else if (num === 1) {
      vm.imgArr2[index].src = this.el.src;
      setTimeout(() => {
        $('#two').css({
          border: ' 2px solid #9BF23B'
        });
        setTimeout(() => {
          {
            $('#two').css({
              border: '2px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.10)'
            });
          }
        }, 400);
      });
    } else if (num === 2) {
      vm.imgArr3[index].src = this.el.src;
      setTimeout(() => {
        $('#three').css({
          border: ' 2px solid #9BF23B'
        });
        setTimeout(() => {
          {
            $('#three').css({
              border: '2px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.10)'
            });
          }
        }, 400);
      });
    } else if (num === 3) {
      vm.imgArr4[index].src = this.el.src;
      setTimeout(() => {
        $('#four').css({
          border: ' 2px solid #9BF23B'
        });
        setTimeout(() => {
          {
            $('#four').css({
              border: '2px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.10)'
            });
          }
        }, 400);
      });
    }
    $(`#${this.el.id}`).css('visibility', 'hidden');
  }


  coverChange(vm: any, numb: number) {
    if (numb === 0) {
      if (vm.imgArr1[0].src !== this.el.src) {
        this.changeBackground(vm, 1, 0);
      }
    }
    if (numb === 1) {
      if (vm.imgArr2[0].src !== this.el.src) {
        this.changeBackground(vm, 1, 1);
      }
    }
    if (numb === 2) {
      if (vm.imgArr3[0].src !== this.el.src) {
        this.changeBackground(vm, 1, 2);
      }
    }
    if (numb === 3) {
      if (vm.imgArr4[0].src !== this.el.src) {
        this.changeBackground(vm, 1, 3);
      }
    }
  }

  backBackground(num: number) {
    if (num === 0) {
      setTimeout(() => {
        $('.one').css({
          border: '2px solid #FF5A5A'
        });
        setTimeout(() => {
          $('.one').css({
            background: 'rgba(255,255,255,0.10)',
            border: '2px solid rgba(255,255,255,0.10)'
          });
        }, 400);
      });
    }
    if (num === 1) {
      setTimeout(() => {
        $('.two').css({
          border: '2px solid #FF5A5A'
        });
        setTimeout(() => {
          $('.two').css({
            background: 'rgba(255,255,255,0.10)',
            border: '2px solid rgba(255,255,255,0.10)'
          });
        }, 400);
      });
    }
    if (num === 2) {
      setTimeout(() => {
        $('.three').css({
          border: '2px solid #FF5A5A'
        });
        setTimeout(() => {
          $('.three').css({
            background: 'rgba(255,255,255,0.10)',
            border: '2px solid rgba(255,255,255,0.10)'
          });
        }, 400);
      });
    }
    if (num === 3) {
      setTimeout(() => {
        $('.four').css({
          border: '2px solid #FF5A5A'
        });
        setTimeout(() => {
          $('.four').css({
            background: 'rgba(255,255,255,0.10)',
            border: '2px solid rgba(255,255,255,0.10)'
          });
        }, 400);
      });
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
    // if (ev.type === 'pinchstart') {
    //   // this.initScale = this.transform.scale || 1;
    // }
    // // this.el.classList.remove('animate');
    // // this.transform.scale = this.initScale * ev.scale;
    //
    // this.requestElementUpdate();
  }

  onRotate(ev: any) {
    // if (ev.type === 'rotatestart') {
    //   // this.initAngle = this.transform.angle || 0;
    // }
    // // this.el.classList.remove('animate');
    // // this.transform.rz = 1;
    // // this.transform.angle = this.initAngle + ev.rotation;
    //
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
    const elIndex = this.el.id.replace('image', "");
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
