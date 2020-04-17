import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { EthaneViewHandler } from './services/EthaneViewHandler';

@Component
export class MainVueComponent extends Vue {

      table = false;
      tableTitle = '打开图表';
      thirteenTitle = '2013年';
      fourteenTitle = '2014年';
      fifteenTitle = '2015年';
      sixteenTitle = '2016年';
      seventeenTitle = '2017年';
      eighteenTitle = '2018年';
      flag13 = false;
      flag14 = false;
      flag15 = false;
      flag16 = false;
      flag17 = false;
      flag18 = false;
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
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
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

        if ((window as any)['env'].browserInfo.os === 'Mac OS X' && (window as any)['env'].browserInfo.isElectron) {
          this.heightNum = 300;
          this.widthNum = 330;
        }

        //适配各个端
        if ((window as any)['env'].browserInfo.os === 'Windows'
          && !(window as any)['env'].browserInfo.isElectron) {
          this.heightNum = 500;
          this.widthNum = 550;
          this.changeStyle(this.heightNum, this.widthNum);
        } else if ((window as any)['env'].browserInfo.isSmallDevice) {
          this.heightNum = 220;
          this.widthNum = 242;
          this.changeStyle(this.heightNum, this.widthNum);

          //适配手机
          (document.getElementsByClassName('title_text')[0] as HTMLElement).style.width = 340 + 'px';
          (document.getElementsByClassName('title_text')[0] as HTMLElement).style.height = 30 + 'px';
          (document.getElementsByClassName('title_text')[0] as HTMLElement).style.fontSize = 16 + 'px';

          //手机端按钮
          (document.getElementsByClassName('thirteenButton')[0] as HTMLElement).style.left = '3%';
          (document.getElementsByClassName('fourteenButton')[0] as HTMLElement).style.left = '16%';
          (document.getElementsByClassName('fifteenButton')[0] as HTMLElement).style.left = '29%';
          (document.getElementsByClassName('sixteenButton')[0] as HTMLElement).style.left = '42%';
          (document.getElementsByClassName('seventeenButton')[0] as HTMLElement).style.left = '55%';
          (document.getElementsByClassName('eighteenButton')[0] as HTMLElement).style.left = '68%';
          (document.getElementsByClassName('tableButton')[0] as HTMLElement).style.left = '81%';

        } else {
          this.heightNum = 300;
          this.widthNum = 330;
          this.changeStyle(this.heightNum, this.widthNum);
        }
      }

      //2013
      thirteenEvent() {
        if (!this.flag13) {
          this.flag13 = true;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.animation2013();
        } else {
          this.flag13 = false;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
                  (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup1, false);
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.oneImg.style.width = 0 + 'px';
          clearInterval((ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.timer2013);
        }
      }

      //2014
      fourteenEvent() {
        if (!this.flag14) {
          this.flag14 = true;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.animation2014();
        } else {
          this.flag14 = false;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
            (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup2, false);
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.twoImg.style.width = 0 + 'px';
          clearInterval((ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.timer2014);
        }
      }

      //2015
      fifteenEvent() {
        if (!this.flag15) {
          this.flag15 = true;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.animation2015();
        } else {
          this.flag15 = false;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
            (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup3, false);
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.threeImg.style.width = 0 + 'px';
          clearInterval((ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.timer2015);
        }
      }

      //2016
      sixteenEvent() {
        if (!this.flag16) {
          this.flag16 = true;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.animation2016();
        } else {
          this.flag16 = false;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
            (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup4, false,
            (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.timer2016);
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.fourImg.style.width = 0 + 'px';
          clearInterval((ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.timer2016);
        }
      }

      //2017
      seventeenEvent() {
        if (!this.flag17) {
          this.flag17 = true;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.animation2017();
        } else {
          this.flag17 = false;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
            (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup5, false);
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.fiveImg.style.width = 0 + 'px';
          clearInterval((ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.timer2017);
        }
      }

      //2018
      eighteenEvent() {
        if (!this.flag18) {
          this.flag18 = true;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.animation2018();
        } else {
          this.flag18 = false;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.hideOrShowTyphoonPoints(
            (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.pointsGroup6, false);
          (ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.sixImg.style.width = 0 + 'px';
          clearInterval((ViewController.getInstance().viewHandler as EthaneViewHandler).tfCanvas.timer2018);
        }
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

