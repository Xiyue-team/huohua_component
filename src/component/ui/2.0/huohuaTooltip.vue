<template>
  <div ref="toolTipDiv" class='tooltip-wrapper' :class="[direction, theme]"  :style="tooltipStyle" >
      <transition name="fade">
          <div v-show="showTip" class="tooltip-text-wrapper" :style="tooltipTextWrapperStyle">
             {{title}}
          </div>
      </transition>
      <transition name="fade">
          <div v-show="showTip" class="tooltip-line"  :style="tooltipLineStyle"></div>
      </transition>
      <div ref="pointPanel" tabindex="1" :style="pointStyle" class="tooltip-point"  @mousedown="openPanel" @touchstart="openPanel"
           @blur="closePanel" >
          <div v-show="showPanel"  ref="ctrlPanelDiv" class="tooltip-panel" >
              <!-- 弹出拖拽条 -->
              <div class="move_bar"  @mousedown="moveStart" @touchstart="moveStart"   >
                  <div :style="moveBarStyle" class="move_ico"></div>
              </div>
              <slot></slot>
          </div>
      </div>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';


@Component({name : 'HuohuaTooltip'})
export default class HuoHuaToolTip extends Vue {

  // 提示文字
  @Prop() title: string;

  // 坐标
  @Prop() left!:  string;


  @Prop() top!: string;


  // 朝向
  @Prop({ default: 'top'}) direction: 'top' | 'bottom' | 'left' | 'right';

  // 目标坐标
  @Prop() targetPosition:  Object;

  @Prop({default: 10}) tooltipSize:  number;


  @Prop({ default: 'light'}) theme!:  'light' | 'dark';


  @Prop() pointColor: string;

  @Prop() panelColor: string;

  @Prop() barColor: string;


  pointStyle = {background: 'white'};

  // 提示框初始坐标和过渡动画时间
  tooltipStyle = {
    left: '0px',
    top: '0px',
    transitionDuration: '400ms'
  };

  tooltipTextWrapperStyle = {
    top: 'unset',
    transform: 'unset'
  };

  tooltipLineStyle = {
    left: 'unset',
    top: 'unset'
  };

  moveBarStyle = {};

  // 操作面板宽高
  ctrlPanelWidth = 0;
  ctrlPanelHeight = 0;

  //悬浮圆点坐标
  pointX = 0;
  pointY = 0;

  // html对象
  $refs!: {
    toolTipDiv: HTMLDivElement,
    ctrlPanelDiv: HTMLDivElement,
    pointPanel: HTMLDivElement
  };

  showTip = true;
  showPanel = false;

  focustimes = 0;

  mousePosition = {
    startX: 0,
    startY: 0
  };

  tooltipPosition = {
    x: 0,
    y: 0
  };

  moveFlag = false;

  isFouchsPanel = false;
  mousedownTimer;

  @Watch('left')
  propsLeftChange(left: string) {
    this.tooltipStyle.left = left + 'px';
  }

  @Watch('top')
  propsTopChange(top: string) {
    this.tooltipStyle.top = top + 'px';
  }



  mounted() {

    // 初始化坐标， 根据用户传入props 动态定位坐标
    this.tooltipStyle.left = this.left + 'px';
    this.tooltipStyle.top = this.top + 'px';
    this.pointStyle.background = this.pointColor;
    /**
     * 由于弹窗大小根据子元素动态变化，
     * 所以需要计算实际展开弹窗大小，
     * 以方便设置过度动画
     **/
    this.$refs.ctrlPanelDiv.style.cssText = `visibility:hidden`;
    const boundRect = this.$refs.ctrlPanelDiv.getBoundingClientRect();
    this.ctrlPanelHeight = boundRect.height;
    this.ctrlPanelWidth = boundRect.width;

    this.$refs.ctrlPanelDiv.style.cssText = `display:none`;
    this.$refs.pointPanel.style.width = `${this.tooltipSize}px`;
    this.$refs.pointPanel.style.height = `${this.tooltipSize}px`;

    this.pointX = this.$refs.pointPanel.getBoundingClientRect().left;
    this.pointY = this.$refs.pointPanel.getBoundingClientRect().top;

    this.initTooltipStyle();

    const usecaptureClosePanel = () => {
      clearTimeout(this.mousedownTimer);
      this.mousedownTimer = setTimeout(() => {
        if (this.isFouchsPanel) {
          this.isFouchsPanel = false;
          return;
        }

          this.showTip = false;
          this.closePanel();

      }, 300);
    };

    // 点击空白处关闭弹窗
    const closeFunction = () => {
      if ( this.moveFlag ) {
        return;
      }
      this.showTip = false;
      this.closePanel();
    };

    // 点击空白处隐藏
    document.body.addEventListener('mousedown', usecaptureClosePanel, true);
    document.body.addEventListener('mousedown', closeFunction, false);
    document.body.addEventListener('touchstart', closeFunction, false);

    //移动控制面板
    document.body.addEventListener('mousemove', (event) => { this.moving(event); } , false );
    document.body.addEventListener('touchmove', (event) => { this.moving(event); } , false );

    //移动结束
    document.body.addEventListener('mouseup', (event) => { this.moveEnd(event); } , false );
    document.body.addEventListener('touchend', (event) => { this.moveEnd(event); } , false );
  }

  initTooltipStyle() {
    if (this.direction === 'top') {
      this.tooltipTextWrapperStyle.top = 'calc(-48px - 16px)';
      this.tooltipTextWrapperStyle.transform = `translateX(calc(-50% + ${this.tooltipSize / 2}px))`;

      this.tooltipLineStyle.top = `-16px`;
      this.tooltipLineStyle.left = `${this.tooltipSize / 2 - 2}px`;

    } else if (this.direction === 'left') {
      this.tooltipTextWrapperStyle.top = 'unset';
      this.tooltipTextWrapperStyle.transform = `translate(calc(-100% - 15px) ,
      calc(-50% + ${this.tooltipSize / 2 - 1}px))`;

      this.tooltipLineStyle.top = `${this.tooltipSize / 2 - 2}px`;
      this.tooltipLineStyle.left = `-16px`;

    } else if (this.direction === 'bottom') {

      this.tooltipTextWrapperStyle.top = `calc(${this.tooltipSize}px + 16px)`;
      this.tooltipTextWrapperStyle.transform = `translateX(calc(-50% +  ${this.tooltipSize / 2}px))`;

      this.tooltipLineStyle.top = `${this.tooltipSize}px`;
      this.tooltipLineStyle.left = `${this.tooltipSize / 2 - 2}px`;

    } else if (this.direction === 'right') {

      this.tooltipTextWrapperStyle.top = 'unset';
      this.tooltipTextWrapperStyle.transform = `translate(calc(${this.tooltipSize}px + 15px) ,
      calc(-50% + ${this.tooltipSize / 2 - 1}px))`;

      this.tooltipLineStyle.top = `${this.tooltipSize / 2 - 2}px` ;
      this.tooltipLineStyle.left = `${this.tooltipSize - 1}px` ;
    }
  }


  openPanel() {
    this.isFouchsPanel = true;
    this.focustimes = new Date().getTime();
    if (this.showPanel) {
      return;
    }

    this.pointStyle.background = this.panelColor ? this.panelColor : 'white';
    this.moveBarStyle.backgroundColor = this.barColor ? this.barColor : 'rgba(0,0,0,0.08)';

    this.$refs.pointPanel.style.width = `${this.ctrlPanelWidth}px`;
    this.$refs.pointPanel.style.height = `${this.ctrlPanelHeight}px`;
    this.$refs.pointPanel.style.borderRadius = `10px`;
    // this.$refs.pointPanel.style.padding = `0 15px 15px 15px`;

  /*  this.$refs.pointPanel.style.cssText = `width:${this.ctrlPanelWidth + this.tooltipSize * 2}px;
    height:${this.ctrlPanelHeight + this.tooltipSize * 2}px;
    border-radius:10px;padding: 0 15px 15px 15px;`;*/

    // 如果设置了目标坐标，则在点击后圆点移动到目标坐标处
    if ( this.targetPosition ) {
      this.tooltipStyle.left = this.targetPosition.left + 'px';
      this.tooltipStyle.top = this.targetPosition.top + 'px';
    }

    //设置面板延迟显示
    setTimeout(() => {
      this.showPanel = true;
    }, 300);
  }

  closePanel() {
    //设置函数防抖时间
    const diff = new Date().getTime() - this.focustimes;
    if (diff < 301) {
        return;
    }
    this.pointStyle.background = this.pointColor;
    this.showPanel = false;
    setTimeout(() => {
      this.$refs.pointPanel.style.width = `${this.tooltipSize}px`;
      this.$refs.pointPanel.style.height = `${this.tooltipSize}px`;
      this.$refs.pointPanel.style.borderRadius = `50%`;
      /*this.$refs.pointPanel.style.padding = `unset`;*/
     /* this.$refs.pointPanel.style.cssText = `width:${this.tooltipSize}px;height:${this.tooltipSize}px;
      border-radius:50%;padding:unset;`;*/
    }, 25);
  }

  reset() {
      this.tooltipStyle.left = this.left + 'px';
      this.tooltipStyle.top = this.top + 'px';
      this.showTip = true;
  }

  moveStart(event) {
    this.isFouchsPanel = true;
    //阻止时间冒泡传播，防止在拖拽时控制面板消失
    event.stopPropagation();

    this.moveFlag = true;
    this.tooltipStyle.transitionDuration = '0ms';
    let x = 0;
    let y = 0;
    if (event.type === 'mousedown') {
      x = event.clientX;
      y = event.clientY;
    } else if (event.type === 'touchstart') {
      x = (event as TouchEvent).touches[0].clientX;
      y = (event as TouchEvent).touches[0].clientY;
    }

    this.mousePosition.startX = x;
    this.mousePosition.startY = y;
    this.tooltipPosition.x = this.$refs.toolTipDiv.getBoundingClientRect().left;
    this.tooltipPosition.y = this.$refs.toolTipDiv.getBoundingClientRect().top;
  }


  moving(event) {
    if ( !this.moveFlag ) {
      return;
    }

    let x = 0;
    let y = 0;
    if (event.type === 'mousemove') {
        x = event.clientX;
        y = event.clientY;
    } else if (event.type === 'touchmove') {
        x = (event as TouchEvent).touches[0].clientX;
        y = (event as TouchEvent).touches[0].clientY;
    }
    const diffX = x - this.mousePosition.startX;
    const diffY = y - this.mousePosition.startY;
    this.tooltipStyle.left = `${this.tooltipPosition.x + diffX }px`;
    this.tooltipStyle.top = `${this.tooltipPosition.y + diffY }px`;
  }

  moveEnd(event) {
    this.moveFlag = false;
    this.tooltipStyle.transitionDuration = '400ms';
  }

}
</script>

<style scoped>
    /*系统会给节点动态增加class 勿删*/
  .fade-enter-active, .fade-leave-active {
        transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
  }

  .tooltip-wrapper {
    position: absolute;
    display: inline-block;
    transition-property: left, top;
    transition-duration: 400ms;
    transition-timing-function: ease-out;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,
    Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  }

  .tooltip-text-wrapper {
    background: #FFFFFF;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
    border-radius: 10px;
    font-size: 16px;
    line-height: 16px;
    color: #8A8A8A;
    min-height: 48px;
    box-sizing: border-box;
    text-align: center;
    padding: 15px ;
    position: relative;
    display: inline-block;
    z-index: 1;
  }

  .tooltip-line {
    background: #FFFFFF;
    border-left: 1px solid rgba(0,0,0,0.06);
    border-right: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
    box-sizing: border-box;
    position: absolute;
  }

  .tooltip-point {
    min-width: 10px;
    min-height: 10px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid rgba(0,0,0,0.12);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
    border-radius: 50%;
    z-index: 1;
    display: inline-block;
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-out;
    outline: none;
    position: absolute;
    left: 0;
    top: 0;
  }
  .tooltip-panel {
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      transform: translate(-1px, -1px);
      padding : 0 15px 15px 15px;
      box-sizing: border-box;
      border: 1px solid rgba(0,0,0,0.12);
      border-radius: 10px;
  }
    /********* 主题样式 *********/

  .dark .tooltip-text-wrapper {
      background-color: #383847;
      color: #FFFFFF;
  }

  .dark .tooltip-line {
      background-color: #383847;
  }

  .dark .tooltip-point {
      background-color: #383847;
  }

/*  .dark .move_ico {
      background: #70707A;
  }*/

/*  .dark .tooltip-panel {
      background-color: #383847;
      color: #FFFFFF;
  }*/

  /********* top *********/
  .top .tooltip-line {
      width: 4px;
      height: 17px;
  }

  /********* left *********/
  .left .tooltip-line {
      display: inline-block;
      height: 4px;
      width: 17px;
      border-top: 1px solid rgba(0,0,0,0.06);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      box-shadow: 2px 0 2px 0 rgba(0,0,0,0.05);
  }

  /********* bottom *********/
  .bottom .tooltip-line {
      width: 4px;
      height: 16px;
  }

  /********* right *********/
  .right .tooltip-line {
      display: inline-block;
      height: 4px;
      width: 16px;
      border-top: 1px solid rgba(0,0,0,0.06);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      box-shadow: 2px 0 2px 0 rgba(0,0,0,0.05);
  }

  .move_bar {
      height: 28px;
      width: 100%;
      text-align: center;
  }

  .move_bar:hover {
      cursor: move;
  }

  .move_ico {
      display: inline-block;
      width: 36px;
      height: 6px;
      border-radius: 3px;
      border-radius: 3px;
  }
</style>
