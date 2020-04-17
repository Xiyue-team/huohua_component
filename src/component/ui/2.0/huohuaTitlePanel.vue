<template>
  <div ref="toolTipDiv" class='tooltip-wrapper' :class="[theme, panelPosition]"  :style="tooltipStyle" >

      <div ref="pointPanel" tabindex="1" :style="{background: pointColor}"
           :class="{
           'tooltip-point': tooltipClass,
           'point-size': pointClass,
           'full-panle-size': displayFullPanel,
           'silence_tool_container': isSilence}"
           @mousedown="openPanel"
           @touchstart="openPanel"
           @blur="closePanel" >

          <div v-show="!showPanel" class="title-logo-container"  @mousedown="moveStart" @touchstart="moveStart"  @mouseup="openPanel" @touchend="openPanel">
                  <transition name="fade">
                      <svg v-show="!showPanel" class="title-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.44 56.84">
                          <defs>
                          </defs>
                          <g id="tc_2" data-name="tc2">
                              <g id="tc_1-2" data-name="tc1">
                                  <path class="cls-1" d="M3.95,34.95a1.33,1.33,0,0,0-1.67.62A20.11,20.11,0,0,1,1,37.6c-.25.35-.5.69-.74,1a1.33,1.33,0,0,0,.77,2.13A50.36,50.36,0,0,1,18.34,48a51.22,51.22,0,0,1,9.4,8,.34.34,0,0,0,.53-.4,58.42,58.42,0,0,0-10.8-12.64A43,43,0,0,0,3.95,34.95Z"/>
                                  <path class="cls-1" d="M9.09,33.52a1.54,1.54,0,0,1-.16-2.62l.89-.65c.74-.56,1.42-1.13,2-1.68a1.52,1.52,0,0,1,2.06,0A54.53,54.53,0,0,1,21.18,37,54.56,54.56,0,0,1,27.06,47.7a.33.33,0,0,1-.57.34,56.87,56.87,0,0,0-8.41-8.5A56.87,56.87,0,0,0,9.09,33.52Z"/>
                                  <path class="cls-1" d="M19.39,11.73a2.25,2.25,0,0,1,3.31,1.09,136.53,136.53,0,0,1,4.48,13.9,150.47,150.47,0,0,1,4.49,23.83.34.34,0,0,1-.64.16,130.91,130.91,0,0,0-11.87-21.5,120.71,120.71,0,0,0-7.61-10.09,2.25,2.25,0,0,1,.75-3.48c1.19-.57,2.41-1.2,3.67-1.9S18.31,12.41,19.39,11.73Z"/>


                                  <path class="cls-1" d="M26.9,2.24a1.92,1.92,0,0,1,2-2.23c1.8.13,3.73.2,5.77.2S38.42.13,40.12,0A1.8,1.8,0,0,1,42,2.15c-2.62,13.53-4.66,27.07-7.23,40.6a.34.34,0,0,1-.66,0Z"/>
                                  <path class="cls-1" d="M50.28,14.53A1.91,1.91,0,0,1,53,14.17q1.48,1.19,3.07,2.39t3.17,2.33a1.91,1.91,0,0,1,.22,2.94A97,97,0,0,0,45.13,39a78.22,78.22,0,0,0-7.62,14.71l-1.11,2.87a.34.34,0,0,1-.65-.12c0-7,1-15.49,6.1-27.28A75.82,75.82,0,0,1,50.28,14.53Z"/>
                                  <path class="cls-1" d="M57.38,32.57a1.52,1.52,0,0,1,2.31.33q.65,1,1.4,2.14c.67,1,1.35,1.87,2,2.7a1.5,1.5,0,0,1-.57,2.32A71.27,71.27,0,0,0,40.76,55a.33.33,0,0,1-.53-.39,75,75,0,0,1,8.86-13.14A93.94,93.94,0,0,1,57.38,32.57Z"/>
                              </g>
                          </g>
                      </svg>
                  </transition>
            </div>

          <div v-show="showPanel"  ref="ctrlPanelDiv" class="tooltip-panel" >
              <!-- 弹出拖拽条 -->
              <div class="move_bar" @mousedown="moveStart" @touchstart="moveStart"   >
                  <div class="move_ico"></div>
              </div>

              <div class="subject_logo_container">
                  <img :src="subjectLogo" class="normal_logo"/>
                  <img :src="smallSubjectLogo" class="small_logo"/>
              </div>
              <div ref="detailPanelDiv" class="widget_detail_container" tabindex="9" @click="showDetailPop" @blur="hideDetailPop">
                  <div :class="{'detail_transition' : true ,'widget_detail_container_box': isPopDetail}">
                      <div class="widget_detail_title">{{title}} <span class="right-arrow"></span> </div>
                      <div class="widget_detail_summary text_overflow" style="">{{summary}}</div>
                  </div>
              </div>
              <div class="widget_operation_container">
                  <div class="widget_operation_share  event_disabled" @click="shareWidget">
                      <img class="light_ico share_ico" src="../../../../static/images/share.svg"/>
                      <img class="dark_ico share_ico" src="../../../../static/images/dark_share.svg"/>
                      <span class="share_tip">分享素材</span>
                  </div>
                  <div class="widget_operation_share widget_video_explanation  event_disabled"  @click="videoExplain">
                      <img class="light_ico share_ico" src="../../../../static/images/play.svg"/>
                      <img class="dark_ico share_ico" src="../../../../static/images/dark_play.svg"/>
                      <span class="share_tip">视频讲解</span>
                  </div>
              </div>
              <div class="widget_operation_container">
                  <div class="widget_tool_container  event_disabled"  @click="annotationComment">
                      <img class="light_ico share_ico" src="../../../../static/images/annotation.svg"/>
                      <img class="dark_ico share_ico" src="../../../../static/images/dark_annotation.svg"/>
                  </div>
                  <div class="widget_tool_container  event_disabled" @click="exitWidget">
                      <img class="light_ico share_ico" src="../../../../static/images/exit.svg"/>
                      <img class="dark_ico share_ico" src="../../../../static/images/dark_exit.svg"/>
                  </div>
                  <div class="widget_tool_container " @click="resetEvent">
                      <img class="light_ico share_ico" src="../../../../static/images/reset.svg"/>
                      <img class="dark_ico share_ico" src="../../../../static/images/dark_reset.svg"/>
                  </div>
              </div>

          </div>
      </div>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';


import Component from 'vue-class-component';

const HuoHuaToolTipProps = Vue.extend({
  props: {
    // 提示文字
    title: String,
    summary: String,
    // 朝向
    direction: {
      type: 'top' | 'bottom' | 'left' | 'right',
      default: 'top',
    },

    subjectLogo: {
      type: String
    },
    smallSubjectLogo: {
      type: String
    },
    // 目标坐标
    targetPosition: {
        type: Object,
    },

    theme: {
      type: 'light' | 'dark',
      default: 'light'
    },
    pointColor: {
      type: String
    },
    reset: {
      type: Function
    }

}
});

@Component
export default class HuoHuaTitlePanel extends HuoHuaToolTipProps {

  // 提示框初始坐标和过渡动画时间
  tooltipStyle = {
    left: 'unset',
    top: 'unset',
    transitionDuration: '400ms'
  };

  //面板位置 左/右
  panelPosition = 'right';

  //是否显示弹窗
  isPopDetail = false;

  // 坐标位置
  positionMap = {
    'left':  { left: '36px', top: 'calc( 100% - 36px )' },
    'right': { left: 'calc( 100% - 36px )', top: 'calc( 100% - 36px )' }
  };

  tooltipTextWrapperStyle = {
    top: 'unset',
    transform: 'unset'
  };

  tooltipLineStyle = {
    left: 'unset',
    top: 'unset'
  };

  tooltipClass = true;
  pointClass = true;
  displayFullPanel = false;
  isSilence = false;

  //悬浮圆点坐标
  pointX = 0;
  pointY = 0;

  // html对象
  $refs!: {
    toolTipDiv: HTMLDivElement,
    ctrlPanelDiv: HTMLDivElement,
    pointPanel: HTMLDivElement,
    detailPanelDiv: HTMLDivElement
  };

  showTip = true;
  showPanel = false;

  //点击事件 同时 会触发失焦得关闭面板事件，所以当触发间隔大于一定毫秒时才认定为失焦
  focustimes = 0;

  //点击事件和拖拽事件冲突，所以当 点击/拖拽 时间小于一定毫秒判断为点击事件
  dragtimes = 0 ;
  isMoving = false;
  isFouchsPanel = false;

  mousePosition = {
    startX: 0,
    startY: 0
  };

  tooltipPosition = {
    x: 0,
    y: 0
  };

  diff = {
    x: 0,
    y: 0
  };

  // 移动面板标识
  moveFlag = false;

  //事件捕获 计时器
  mousedownTimer ;

  silenceTimer;


  mounted() {
    this.tooltipStyle.left  = this.positionMap[this.panelPosition].left;
    this.tooltipStyle.top  = this.positionMap[this.panelPosition].top;
    this.startSilenceTime();
    // 点击空白处关闭弹窗
    const closePanel = () => {
      if ( this.moveFlag ) {
        return;
      }

      // 如果是微件描述先弹出来则先关闭微件描述
      if ( this.isPopDetail) {
        return ;
      }
      // this.startSilenceTime();
      this.showTip = false;
      this.closePanel();
    };


    const usecaptureClosePanel = () => {
      clearTimeout(this.mousedownTimer);
      this.mousedownTimer = setTimeout(() => {
        if (this.isFouchsPanel) {
              this.isFouchsPanel = false;
              return;
        }

        if (this.isPopDetail) {
            this.hideDetailPop();
        } else {
            this.showTip = false;
            this.closePanel();
        }

      }, 300);
    };

    //解决有些微件阻止了dom的冒泡事件
    document.body.addEventListener('mousedown',  usecaptureClosePanel, true);
     // document.body.addEventListener('touchstart',  usecaptureClosePanel, true);


    // 点击空白处隐藏
    document.body.addEventListener('mousedown', closePanel, false);
    document.body.addEventListener('touchstart', closePanel, false);

    //移动控制面板
    document.body.addEventListener('mousemove', (event) => { this.moving(event); } , false );
    document.body.addEventListener('touchmove', (event) => { this.moving(event); } , false );

    //移动结束
    document.body.addEventListener('mouseup', (event) => { this.moveEnd(event); } , false );
    document.body.addEventListener('touchend', (event) => { this.moveEnd(event); } , false );

    this.stopMouseEvent();
  }

  stopMouseEvent() {
    document.addEventListener('touchstart', function (event) {
      if ( event.touches.length > 1) {
        event.preventDefault();
      }
    });
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      const now = ( new Date() ).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });

  }

  /**
   * 开始静默操作
   **/
  startSilenceTime() {
    this.silenceTimer = setTimeout(() => {
        this.isSilence = true;
    }, 3000);
  }

  endSilenceTime() {
    window.clearTimeout(this.silenceTimer);
    this.isSilence = false;
  }


  openPanel() {
    this.isFouchsPanel = true;
    this.endSilenceTime();
    this.focustimes = new Date().getTime();
    const dragDiffTimes = new Date().getTime() - this.dragtimes;


    const limit = 5;

    if (this.showPanel ||
      (dragDiffTimes > 150 && ( Math.abs(this.diff.x) > limit || Math.abs(this.diff.y) > limit) ) ||
      (this.isMoving && Math.abs(this.diff.x) > limit && Math.abs(this.diff.y) > limit)) {
      return;
    }
    this.pointClass = false;
    this.displayFullPanel = true;

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

    this.showPanel = false;
    setTimeout(() => {
      this.displayFullPanel = false;
      this.pointClass = true;
      this.endSilenceTime();
      this.startSilenceTime();
    }, 25);
  }


  moveStart(event) {
    this.isFouchsPanel = true;
    //阻止时间冒泡传播，防止在拖拽时控制面板消失
    event.stopPropagation();
    this.endSilenceTime();
    this.isMoving = false;
    this.moveFlag = true;
    this.dragtimes = new Date().getTime();
    this.tooltipStyle.transitionDuration = '0ms';
    this.diff.x = 0;
    this.diff.y = 0;

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
    this.endSilenceTime();
    this.isMoving = true;

    let x = 0;
    let y = 0;
    if (event.type === 'mousemove') {
        x = event.clientX;
        y = event.clientY;
    } else if (event.type === 'touchmove') {
        x = (event as TouchEvent).touches[0].clientX;
        y = (event as TouchEvent).touches[0].clientY;
    }
    this.diff.x = x - this.mousePosition.startX;
    this.diff.y = y - this.mousePosition.startY;
    this.tooltipStyle.left = `${this.tooltipPosition.x + this.diff.x }px`;
    this.tooltipStyle.top = `${this.tooltipPosition.y + this.diff.y }px`;
  }

  moveEnd(event) {

    this.tooltipStyle.transitionDuration = '400ms';
    if (this.moveFlag ) {
        this.adsorbent(event);
    }

    this.moveFlag = false;
  }

  /**
   * 吸附
   */
  adsorbent(event) {
    // 根据鼠标最后得位置判断标题面板最终吸附在左下角或者右下角
    let x = 0;
    if (event.type === 'mouseup') {
      x = event.clientX;
    } else if (event.type === 'touchend') {
      x = (event as TouchEvent).changedTouches[0].clientX;
    }


    const domWidth = document.body.clientWidth;
    this.panelPosition = x >= domWidth / 2 ? 'right' : 'left';
    this.tooltipStyle.left  = this.positionMap[this.panelPosition].left;
    this.tooltipStyle.top  = this.positionMap[this.panelPosition].top;
  }

  showDetailPop() {
    this.isPopDetail = true;
  }

  hideDetailPop() {
    this.isPopDetail = false;
  }

  shareWidget() {
    console.log('分享微件');
  }
  videoExplain() {
    console.log('视频讲解');
  }
  annotationComment() {
    console.log('批注');
  }
  exitWidget() {
    console.log('退出微件');
  }
  resetEvent() {
    console.log('重置微件');
    this.tooltipStyle.left = this.left + 'px';
    this.tooltipStyle.top = this.top + 'px';
    this.showTip = true;
    this.endSilenceTime();
    this.reset();
  }


}
</script>

<style scoped src="../../../assets/css/titlePanel.css"></style>
<style scoped src="../../../assets/css/titlePanel@mobile.css"></style>
