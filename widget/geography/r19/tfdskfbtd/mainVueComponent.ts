import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { EthaneViewHandler } from './services/EthaneViewHandler';

@Component
export class MainVueComponent extends Vue {

      startBtn = true;
      openTable = false;
      showBtn = false;
      table = false;
      startTitle = '开始';
      tableTitle = '打开图表';
      //用于播放动画时置灰切换按钮
      flag = false;
      textValue = 0;
      titleText = [2013, 2014, 2015, 2016, 2017, 2018];
      pageTurningCallBack: Function;

      heightNum = 500;
      widthNum = 550;

      container: any;
      tableImg: any;
      oneImg: any;
      twoImg: any;
      threeImg: any;
      fourImg: any;
      fiveImg: any;
      sixImg: any;

      created() {
        this.pageTurningCallBack = () => {
          switch (this.textValue) {
            //2018
            case 5:
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.showingEvent
              ((ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup6,
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.sixImg);

              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.staticLayer.draw();
              break;

            //2017
            case 4:
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.sixImg.style.width = 0 + 'px';
                //   台风点显示动画
                  (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.showingEvent(
                    (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup5,
                    (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.fiveImg);

              //隐藏和显示各年份台风点
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup6, false);

              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.staticLayer.draw();
              break;

            //2016
            case 3:
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.fiveImg.style.width = 0 + 'px';
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.showingEvent(
                  (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup4,
                  (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.fourImg);

              //隐藏和显示各年份台风点
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup5, false);

              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.staticLayer.draw();
              break;

            //2015
            case 2:
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.fourImg.style.width = 0 + 'px';
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.showingEvent(
                  (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup3,
                  (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.threeImg);

              //隐藏和显示各年份台风点
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup4, false);

              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.staticLayer.draw();
              break;

            //2014
            case 1:
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.threeImg.style.width = 0 + 'px';
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.showingEvent(
                  (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup2,
                  (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.twoImg);

              //隐藏和显示各年份台风点
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup3, false);

              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.staticLayer.draw();
              break;

            //2013
            case 0:
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.twoImg.style.width = 0 + 'px';

              //隐藏和显示各年份台风点
              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
                (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup2, false);

              (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.staticLayer.draw();
              break;
          }
        };

        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = true;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new EthaneViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
      }

      mounted() {
        this.container = document.getElementById('container');
        this.tableImg = document.getElementById('tableImg');
        this.oneImg = document.getElementById('oneImg');
        this.twoImg = document.getElementById('twoImg');
        this.threeImg = document.getElementById('threeImg');
        this.fourImg = document.getElementById('fourImg');
        this.fiveImg = document.getElementById('fiveImg');
        this.sixImg = document.getElementById('sixImg');
        ViewController.getInstance().domReady();
        const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
        (rightPanel as HTMLElement).style.width = '100%';

        //适配各个端
        if ((window as any)['env'].browserInfo.os === 'Mac OS X' || (window as any)['env'].browserInfo.os === 'Windows'
          && !(window as any)['env'].browserInfo.isElectron) {
          this.heightNum = 500;
          this.widthNum = 550;
          this.changeStyle(this.heightNum, this.widthNum);
        } else if ((window as any)['env'].browserInfo.isSmallDevice) {
          this.heightNum = 160;
          this.widthNum = 176;
          this.changeStyle(this.heightNum, this.widthNum);

          //适配手机
          (document.getElementsByClassName('tableButton')[0] as HTMLElement).style.bottom = '21%';
          (document.getElementsByClassName('title_text')[0] as HTMLElement).style.width = 340 + 'px';
          (document.getElementsByClassName('title_text')[0] as HTMLElement).style.height = 30 + 'px';
          (document.getElementsByClassName('title_text')[0] as HTMLElement).style.fontSize = 16 + 'px';
        } else {
          this.heightNum = 300;
          this.widthNum = 330;
          this.changeStyle(this.heightNum, this.widthNum);
        }
      }

      //开始按钮
      startEvent() {
          this.startBtn = false;
          this.openTable = true;
          this.showBtn = true;

        (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.showingEvent(
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup1,
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.oneImg);
      }

      //打开图表按钮
      openEvent() {
          if (this.tableTitle === '打开图表') {
              this.tableTitle = '关闭图表';
              this.table = true;
          } else {
              this.tableTitle = '打开图表';
              this.table = false;
          }
      }

      changeStyle(height: number, width: number) {
        (this.container as HTMLElement).style.height = height + 'px';
        (this.tableImg as HTMLElement).style.height = height + 'px';
        (this.oneImg as HTMLElement).style.height = height + 'px';
        (this.twoImg as HTMLElement).style.height = height + 'px';
        (this.threeImg as HTMLElement).style.height = height + 'px';
        (this.fourImg as HTMLElement).style.height = height + 'px';
        (this.fiveImg as HTMLElement).style.height = height + 'px';
        (this.sixImg as HTMLElement).style.height = height + 'px';

        (this.container as HTMLElement).style.width = width + 'px';
        (this.tableImg as HTMLElement).style.width = width + 'px';
      }
}

