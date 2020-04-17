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

//拖拽事件
  onPanend(vm: any) {
    const box = document.getElementById('leftPanel').getBoundingClientRect().right;
    const topBoxBottom = document.getElementById('topBox').getBoundingClientRect().bottom;
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

    const ACQUIRE_PRICE = [];
    for (let i = 0; i < 6; i++) {
      const p = $(`#topMinDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
      ACQUIRE_PRICE.push(p);
    }
    if (x < box - this.obj / 2 && y < topBoxBottom - this.obj / 2 &&
      ~['image0', 'image3', 'image4', 'image9', 'image8'].indexOf(this.el.id)) {
      if (ACQUIRE_PRICE[0] === "") {
        this.changeBackground(vm, 0, 0);
      }
      if (ACQUIRE_PRICE[0] !== "") {
        this.coverChange(vm, 0);
      }
    }
    if (x < box - this.obj / 2 && y < topBoxBottom - this.obj / 2 &&
      ~['image1', 'image2', 'image5', 'image6', 'image7'].indexOf(this.el.id)) {
      this.backBackground(0);
    }
    const ACQUIRE_PRICE_RIGHT = [];
    for (let i = 0; i < 6; i++) {
      const p = $(`#bottomMinDiv${i}`).find('img').attr('src');
      ACQUIRE_PRICE_RIGHT.push(p);
    }
    if (x < box - this.obj / 2 && y > (topBoxBottom - this.obj / 2) &&
      ~['image1', 'image2', 'image5', 'image6', 'image7'].indexOf(this.el.id)
    ) {
      if (ACQUIRE_PRICE_RIGHT[0] === "") {
        this.changeBackground(vm, 0, 1);
      }
      if (ACQUIRE_PRICE_RIGHT[0] !== "") {
        this.coverChange(vm, 1);
      }
    }
    if (x < box - this.obj / 2 && y > (topBoxBottom - this.obj / 2) &&
      ~['image0', 'image3', 'image4', 'image9', 'image8'].indexOf(this.el.id)
    ) {
      this.backBackground(1);
    }
  }

  changeBackground(vm: any, index: any, num: number) {
    const elIndex = this.el.id.replace('image', "");
    if (num === 0) {
      vm.imgArr[index].src = this.el.src;
      vm.imgArr[index].text = vm.textArr[elIndex];
      $(`#textText${elIndex}`).hide();
      setTimeout(() => {
        $('.topBox').css({
          backgroundColor: '#8CAB6D'
        });
        setTimeout(() => {
            $('.topBox').css({
              backgroundColor: '#8CAB6D'
            });
          }
        );
        setTimeout(() => {
          {
            $('.topBox').css({
              backgroundColor: '#515151'
            });
          }
        }, 600);
      });
    } else {
      vm.imgArr1[index].src = this.el.src;
      vm.imgArr1[index].text = vm.textArr[elIndex];
      $(`#textText${elIndex}`).hide();
      setTimeout(() => {
        $('.bottomBox').css({
          backgroundColor: '#8CAB6D'
        });
        setTimeout(() => {
            $('.bottomBox').css({
              backgroundColor: '#8CAB6D'
            });
          }
        );
        setTimeout(() => {
          {
            $('.bottomBox').css({
              backgroundColor: '#515151'
            });
          }
        }, 600);
      });
    }

    const W = window.innerWidth;
    if (W > 1000) {
      $(`#${this.el.id}`).css('visibility', 'hidden');
    } else {
      $(`#${this.el.id}`).parent().hide(); //实现自动滚动
    }
  }

  coverChange(vm: any, numb: number) {
    if (numb === 0) {
      const ACQUIRE_PRICE = [];
      for (let i = 0; i < 5; i++) {
        const p = $(`#topMinDiv${i}`).find('img').attr('src');
        ACQUIRE_PRICE.push(p);
      }
      if (ACQUIRE_PRICE[0] === "") {
          if( vm.imgArr[0].src !== this.el.src){
             this.changeBackground(vm, 0, 0);
          }
      } else if (ACQUIRE_PRICE[1] === "") {
            if( vm.imgArr[0].src !== this.el.src){
              this.changeBackground(vm, 1, 0);
            }
      } else if (ACQUIRE_PRICE[2] === "") {
          if( vm.imgArr[1].src !== this.el.src){
            this.changeBackground(vm, 2, 0);
          }
      } else if (ACQUIRE_PRICE[3] === "") {
        if( vm.imgArr[2].src !== this.el.src){
           this.changeBackground(vm, 3, 0);
        }
      } else if (ACQUIRE_PRICE[4] === "") {
        if(vm.imgArr[3].src !== this.el.src){
          this.changeBackground(vm, 4, 0);
        }
      } else if (ACQUIRE_PRICE[5] === "") {
        if( vm.imgArr[4].src !== this.el.src){
          this.changeBackground(vm, 5, 0);
        }
      }
    }

    if (numb === 1) {
      const ACQUIRE_PRICE_RIGHT = [];
      for (let i = 0; i < 5; i++) {
        const p = $(`#bottomMinDiv${i}`).find('img').attr('src');
        ACQUIRE_PRICE_RIGHT.push(p);
        if (ACQUIRE_PRICE_RIGHT[0] === "") {
          if( vm.imgArr1[0].src !== this.el.src){
            this.changeBackground(vm, 0, 1);
          }
        } else if (ACQUIRE_PRICE_RIGHT[1] === "") {
          if( vm.imgArr1[0].src !== this.el.src){
            this.changeBackground(vm, 1, 1);
          }
        } else if (ACQUIRE_PRICE_RIGHT[2] === "") {
          if(vm.imgArr1[1].src !== this.el.src){
            this.changeBackground(vm, 2, 1);
          }
        } else if (ACQUIRE_PRICE_RIGHT[3] === "") {
          if( vm.imgArr1[2].src !== this.el.src){
            this.changeBackground(vm, 3, 1);
          }
        } else if (ACQUIRE_PRICE_RIGHT[4] === "") {
          if( vm.imgArr1[3].src !== this.el.src){
            this.changeBackground(vm, 4, 1);
          }
        } else if (ACQUIRE_PRICE_RIGHT[5] === "") {
          if( vm.imgArr1[4].src !== this.el.src){
            this.changeBackground(vm, 5, 1);
          }
        }
      }
    }
  }

  backBackground(num: number) {
    if (num === 0) {
      setTimeout(() => {
        $('.topBox').css({
          backgroundColor: '#C76D6D '
        });
        setTimeout(() => {
          $('.topBox').css({
            backgroundColor: '#515151'
          });
        }, 400);
      });
    } else {
      setTimeout(() => {
        $('.bottomBox').css({
          backgroundColor: '#C76D6D '
        });
        setTimeout(() => {
          $('.bottomBox').css({
            backgroundColor: '#515151'
          });
        }, 400);
      });
    }
  }

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
    const selectedItemArr = vm.allImagArrMax[elIndex];
    if (selectedItem === vm.selectedItem) {
      vm.cleanSelectedItem();
    } else {
      vm.selectedItem = selectedItem;  // 高亮选中
      vm.tipMax_img_src = selectedItemArr;
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
