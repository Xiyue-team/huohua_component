import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {YzxViewHandler} from './services/YzxViewHandler';
import { Watch } from 'vue-property-decorator';
import { EquationG } from './services/EquationG';
import { EquationF } from './services/EquationF';
import { EquationFG } from './services/EquationFG';

@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title

  params = {
    k: 1,
    m: 2,
    b: 4
  };
  zoom = 10;
  relation = false;
  fg = false;
  formula: any = {
    g: new EquationG(),
    f: new EquationF(),
    fg: new EquationFG(),
  };

  show = true;
  opacity = 1;
  isshow = '隐藏'

  created() {
    const viewOption = new ViewOption();
    ViewController.getInstance(new YzxViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.drawCanvas();

    var pad = document.getElementById("controlPanel").parentNode;
    var btnOpen = document.getElementById('expandOpenBtn')
    var btnClose = document.getElementById('expandCloseBtn')
    pad.style.overflow='auto'
    if (btnOpen) 
      btnOpen.style.top = '15px'
    if(btnClose)
      btnClose.style.top = '15px'

    let info = navigator.userAgent
    if (info.indexOf('iPad') !== -1 || info.indexOf('iPhone') !== -1){
      // 阻止双击放大
      var lastTouchEnd = 0;
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);

      // 阻止双指放大
      document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
      });
    }

  }

  touchStart(): void {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.mouseDown();
    console.log('touchStart')
  }

  touchMove(event): void {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.touchMove(event);
    console.log('touchMove')
  }

  touchEnd(): void {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.mouseUp();
    console.log('touchEnd')
  }

  toggleRelation(): void {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.relation = this.relation = !this.relation;
    game.drawCanvas();
  }

  toggleFg(): void {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.fg = this.fg = !this.fg;
    game.drawCanvas();
  }

  isShow(): void {
    this.show = !this.show;
    let btn = document.getElementById('show');
    if(!this.show){
      this.opacity = 0;
      btn.innerHTML = '显示';
    } else {
      this.opacity = 1;
      btn.innerHTML = '隐藏';
    }

  }

  @Watch('params', { deep: true })
  onParamsChanged() {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.params.setParam('k', this.params.k);
    game.params.setParam('m', this.params.m);
    game.params.setParam('b', this.params.b);
    game.drawCanvas();
  }

  @Watch('zoom')
  onZoomChanged(newZoom: number, oldZoom: number) {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.zoomChanged(oldZoom, newZoom);
    game.drawCanvas();
  }

  resetEvent() {
    this.params.k = 1;
    this.params.m = 2;
    this.params.b = 4;
    this.zoom = 10;
    this.relation = false;
    this.fg = false;
    this.show = true;
    let btn = document.getElementById('show');
    this.opacity = 1;
    btn.innerHTML = '隐藏';
  }
}
