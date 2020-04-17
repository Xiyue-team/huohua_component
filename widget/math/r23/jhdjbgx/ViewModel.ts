import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { Watch } from 'vue-property-decorator';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {

  //按钮样式
  isClick         = false;
  isShow          = false;
  isDetail        = false;
  detailClick     = false;
  relationTitle   = '关系';
  detailTitle     = '说明';
  detailActived   = false;
  relationActived   = false;

  oneDisable = false;
  twoDisable = false;
  threeDisable = false;
  detailDisable = false;

  // 定义滑条的样式
  sliderNumTop = 100;

  // 判断是否是手机
  isPhone = false;

  //滑动条样式设置
  sliderNum = 10;
  sliderOption = {
    lazy: false,
    width: '180px',
    height: 2,
    min: 0,
    max: 20,
    reverse: false,
    tooltip: 'none',
    piecewise: false,
    dotSize: [24, 24],
    process: false,
    railStyle: {
      backgroundColor: '#737373',
    }
  };

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new AssembleViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().hideLoading();
    ViewController.getInstance().domReady();
    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
      this.sliderOption.width = '120px';
      (document.querySelector('.sliderStyle') as any).style.width = '150px';
    }
  }

  @Watch('sliderNum')
  getSliderNumber(value: number) {

    const assemble = (ViewController.getInstance().viewHandler as any).assemble;

    assemble.scale = value / 10;
    assemble.circleA.scale.set(value / 10, value / 10, value / 10);

    const radius = assemble.circleA.geometry.parameters.radius * assemble.scale;

    const scaleVal = radius / assemble.endPointA.radius;

    //根据三角形的同宽比同高原理（将a元素随着A集合的变化而变化）
    const formulaA_x  = assemble.scale * (assemble.offsetTextA.x - assemble.circleA.position.x);
    const endA_x      =  formulaA_x + (assemble.circleA.position.x);

    const formulaA_y  = assemble.scale * (assemble.offsetTextA.y - assemble.circleA.position.y);
    const endA_y      =  formulaA_y + (assemble.circleA.position.y);

    const formulaX = scaleVal * (assemble.endPointA.x - assemble.circleA.position.x);
    const endX  = formulaX + (assemble.circleA.position.x);

    const formulaY = scaleVal * (assemble.endPointA.y - assemble.circleA.position.y);
    const endY  = formulaY + (assemble.circleA.position.y);

    assemble.pointA.position.set(endX, endY, 1);
    assemble.textA.position.set(endA_x, endA_y, 0);

    //关于关系的三张图切换
    if (this.isClick) {
      if (value === 0) {
        this.oneDisable   = false;
        this.twoDisable   = false;
        this.threeDisable = true;
      } else if (value === 20) {
        this.oneDisable   = true;
        this.twoDisable   = false;
        this.threeDisable = false;
      } else {
        this.oneDisable   = false;
        this.twoDisable   = true;
        this.threeDisable = false;
      }
    } else {
      this.oneDisable     = false;
      this.twoDisable     = false;
      this.threeDisable   = false;
    }

    //集合A的显示情况
    if (value === 0) {
      assemble.endTextA.visible = true;
      assemble.pointA.visible   = false;
      assemble.textA.visible    = false;
    } else {
      assemble.endTextA.visible = false;
      assemble.pointA.visible   = true;
      assemble.textA.visible    = true;
    }

    if (this.isClick) {  //说明按钮的状态

      if (value === 0 || value === 20) {
         this.isDetail = false;
      } else {
        this.isDetail = true;
      }
    }

    if (this.detailActived) { //说明文字显示状态
      if (value === 0 || value === 20) {
        this.detailDisable = false;
      } else {
        this.detailDisable = true;
      }
    }

    if (value === 0 || value === 20) {
        assemble.pointB.visible = false;
    } else {
        if (assemble.createBoundB(assemble.pointB.position)) {

          if (this.detailActived) {
            assemble.pointB.visible = true;
          }
        } else {
          assemble.pointB.visible = false;
          this.detailClick   = false;
          this.detailActived = false;
          this.detailDisable = false;
        }
    }

    if (value === 20) {
      this.detailClick   = false;
      this.detailActived = false;
      this.detailDisable = false;
    }



    // if (value === 0) {
    //   assemble.pointB.visible = false;
    // } else {
    //   if (assemble.createBoundB(assemble.pointB.position)) {
    //     if (this.detailClick && this.isClick) {
    //       assemble.pointB.visible = true;
    //     } else {
    //       assemble.pointB.visible = false;
    //     }
    //
    //   } else {
    //     assemble.pointB.visible = false;
    //   }
    // }
  }

  //'按钮'事件
  relationButtonEvent() {
    this.isClick = !this.isClick;
    this.relationActived = this.isClick;
    const assemble = (ViewController.getInstance().viewHandler as any).assemble;

    if (this.isClick) {
      if (this.sliderNum === 0) {
        this.oneDisable   = false;
        this.twoDisable   = false;
        this.threeDisable = true;

      } else if (this.sliderNum === 20) {
        this.oneDisable   = true;
        this.twoDisable   = false;
        this.threeDisable = false;

      } else {
        this.isDetail = true;
        this.oneDisable   = false;
        this.twoDisable   = true;
        this.threeDisable = false;
      }

    } else {
      //当关系消失时，说明按钮消失，说明文字消失
      this.isDetail           = false;
      this.detailClick        = false;
      this.detailActived      = false;
      this.detailDisable      = false;
      assemble.pointB.visible = false;

      this.oneDisable = false;
      this.twoDisable = false;
      this.threeDisable = false;
    }
  }

  //'说明'事件
  detailButtonEvent() {
    this.detailClick    = !this.detailClick;
    this.detailActived  = this.detailClick; // 高亮状态
    this.detailDisable  = this.detailClick; //说明的文字显示状态
    const assemble = (ViewController.getInstance().viewHandler as any).assemble;

    if (this.detailClick) {
      assemble.pointB.position.set(-34, 0, 1);
      assemble.pointB.visible = true;

    } else {
      assemble.pointB.visible = false;
    }
  }

  resetEvent() {
    this.sliderNum = 10;
    this.isClick            = false;
    this.isShow             = false;
    this.isDetail           = false;
    this.detailClick        = false;
    this.detailActived      = false;
    this.relationActived    = false;

    this.oneDisable     = false;
    this.twoDisable     = false;
    this.threeDisable   = false;
    this.detailDisable  = false;
  }
}

