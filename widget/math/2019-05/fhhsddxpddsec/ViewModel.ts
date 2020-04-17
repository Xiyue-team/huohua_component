import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {YzxViewHandler} from './services/YzxViewHandler';
import { EquationG } from './services/EquationG';
import { EquationF } from './services/EquationF';
import { EquationFG } from './services/EquationFG';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title

  params = {
    a: 1,
    b: 3,
    c: 4,
    m: 5
  };
  zoom = 10;
  relation = false;
  fg = false;
  absLine = false;
  formula: any = {
    g: new EquationG(),
    f: new EquationF(),
    fg: new EquationFG(),
  };
  show = true;
  opacity = 1;
  isshow = '隐藏'
  isGesture = false;

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

    // document.addEventListener('mousedown',  () =>  {
    //   this.isGesture = true;
    //   // event.preventDefault();
    // });
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
    // 长安监听
  longtapHandler(event): void {
    this.isGesture = true;
  }
  // 开始拖动
  touchStart(event): void {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
 
    if (event.touches) {
      if (event.touches.length > 1) {
        return;
      } else {
        game.touchMove(event);
      }
    } else {
      game.mouseDown();
    }
    
  }
 // 拖动ing
  touchMove(event): void {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    if (event.touches) {
      if (event.touches.length > 1) {
        return;
      } else {
        game.touchMove(event);
      }
    } else {
      game.touchMove(event);
    }
  }
  touchEnd(event):void{
    // this.isGesture = false;
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

  toggleAbs(): void {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.absLine = this.absLine = !this.absLine;
    game.drawCanvas();
  }

  @Watch('params', { deep: true })
  onParamsChanged() {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.params.setParam('a', this.params.a);
    game.params.setParam('b', this.params.b);
    game.params.setParam('c', this.params.c);
    game.params.setParam('m', this.params.m);
    game.drawCanvas();
  }

  @Watch('zoom')
  onZoomChanged(newZoom: number, oldZoom: number) {
    const game = (ViewController.getInstance().viewHandler as YzxViewHandler).game;
    game.zoomChanged(oldZoom, newZoom);
    game.drawCanvas();
  }

  resetEvent() {
    this.params.a = 1;
    this.params.b = 3;
    this.params.c = 4;
    this.params.m = 5;
    this.zoom = 10;
    this.relation = false;
    this.fg = false;
    this.absLine = false;
    this.show = true;
    let btn = document.getElementById('show');
    this.opacity = 1;
    btn.innerHTML = '隐藏';
  }
}
