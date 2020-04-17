import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {PositionViewHandler} from './services/PositionViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {Watch} from 'vue-property-decorator';
@Component
export class ViewModel extends Vue {

  isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
  newTitle1 = '磁场B';
  newTitle2 = '速度V';
  newTitle3 = '力F';
  newTitle4 = '存档';
  newTitle5 = '旋转';

  newTitle6 = '旋转';
  color1 = false;
  color2 = false;
  color3 = false;
  color4 = false;
  color5 = false;

  color6 = false;
  isdisabled1 = false;
  isdisabled2 = true;
  isdisabled3 = true;
  isdisabled4 = true;
  isdisabled5 = true;
  count = 1;
  direction: number[][] = [];
  direction2: number[][] = [];
  direction3: number[][] = [];
  backgroundControl = true;
  backgroundControl2 = false;
  isShowControl = true;
  w = 0;
  h = 0;

    @Watch('direction')
    drawLine(val: number[][]) {
        switch (val.length) {
            case 1:
                (ViewController.getInstance().viewHandler as any).vbf3d.createArrow(val[0], '#0199FF',
                    (ViewController.getInstance().viewHandler as any).vbf3d.blueArrow,
                    (ViewController.getInstance().viewHandler as any).vbf3d.Arrow1);
              break;
            case 2:
                (ViewController.getInstance().viewHandler as any).vbf3d.createArrow(val[1], '#FF4747',
                    (ViewController.getInstance().viewHandler as any).vbf3d.redArrow,
                    (ViewController.getInstance().viewHandler as any).vbf3d.Arrow2);
              break;
            case 3:
                (ViewController.getInstance().viewHandler as any).vbf3d.createArrow(val[2], '#7C41A7',
                    (ViewController.getInstance().viewHandler as any).vbf3d.purpleArrow,
                    (ViewController.getInstance().viewHandler as any).vbf3d.Arrow3);
              break;
        }
    }

    @Watch('direction3')
    drawLine3(val: number[][]) {
        switch (val.length) {
            case 1:
                (ViewController.getInstance().viewHandler as any).vbf3d2.createArrow(val[0], '#0199FF',
                    (ViewController.getInstance().viewHandler as any).vbf3d2.blueArrow,
                    (ViewController.getInstance().viewHandler as any).vbf3d2.Arrow1);
                break;
            case 2:
                (ViewController.getInstance().viewHandler as any).vbf3d2.createArrow(val[1], '#FF4747',
                    (ViewController.getInstance().viewHandler as any).vbf3d2.redArrow,
                    (ViewController.getInstance().viewHandler as any).vbf3d2.Arrow2);
                break;
            case 3:
                (ViewController.getInstance().viewHandler as any).vbf3d2.createArrow(val[2], '#7C41A7',
                    (ViewController.getInstance().viewHandler as any).vbf3d2.purpleArrow,
                    (ViewController.getInstance().viewHandler as any).vbf3d2.Arrow3);
                break;
        }
    }
  created() {
    ViewController.getInstance(new PositionViewHandler(this));
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().hideLoading();
    ViewController.getInstance().domReady();
  }

  magnetic() {
    this.color1 = true;
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.bluePImg.moveToTop();
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.changePointImg(true, false, false);
  }

  speed() {
    this.color2 = true;
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.redPImg.moveToTop();
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.changePointImg(false, true, false);
  }

  force() {
    this.color3 = true;
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.purplePImg.moveToTop();
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.changePointImg(false, false, true);
  }

  animation() {
      this.color6 = !this.color6;
      this.removeImage();
      if (this.color6) {
          this.backgroundControl2 = true;
          this.backgroundControl  = false;
          this.newTitle6 = '原始数据';
          (ViewController.getInstance().viewHandler as any).vbf3d.play();
          (ViewController.getInstance().viewHandler as any).vbf3d2.play();
      } else {
          this.newTitle6 = '旋转';
          (ViewController.getInstance().viewHandler as any).vbf3d.reset1();
          (ViewController.getInstance().viewHandler as any).vbf3d2.reset1();
      }
  }

  removeImage() {
      const img1 = document.getElementById('myImage1');
      const img3 = document.getElementById('myImage3');
      if (img1) {
          img1.parentNode.removeChild(img1);
      }
      if (img3) {
          img3.parentNode.removeChild(img3);
      }

  }

  archive() {
    this.color4 = true;
    this.isdisabled1 = false;
    this.isdisabled2 = true;
    this.isdisabled3 = true;
    let id: string;
    id = 'myImage' + this.count;
    this.w = (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.stage.getWidth();
    this.h = (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.stage.getHeight();

    switch (id) {

      case 'myImage1':
        (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.interceptContent(id);
        setTimeout(() => {
          if (BrowserUtil.getBrowserInfo().os === 'Windows') {
            document.getElementById(id).style.transform = 'translate(-' + this.w / 2.75 + 'px,-' + this.h / 4 + 'px) scale(0.5, 0.5)';
          } else {
            document.getElementById(id).style.transform = 'translate(-' + this.w / 2.7 + 'px,-' + this.h / 4 + 'px) scale(0.4, 0.4)';
          }
          document.getElementById(id).style.transition = 'all 3s';
          document.getElementById(id).style.border = '2px solid gray';
          document.getElementById(id).style.borderRadius = '60px';
          document.getElementById(id).style.boxShadow = '2px 2px 2px 2px gray';
        }, 200);
        break;

      case 'myImage2':
        (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.interceptContent(id);
        setTimeout(() => {
          if (BrowserUtil.getBrowserInfo().os === 'Windows') {
            document.getElementById(id).style.transform = 'translate(-' + this.w / 2.85 + 'px,-' + this.h / 4.5 + 'px) scale(0.5, 0.5)';
          } else {
            document.getElementById(id).style.transform = 'translate(-' + this.w / 2.8 + 'px,-' + this.h / 4.5 + 'px) scale(0.4, 0.4)';
          }
          document.getElementById(id).style.transition = 'all 3s';
          document.getElementById(id).style.backgroundColor = '#fff';
          document.getElementById(id).style.border = '2px solid gray';
          document.getElementById(id).style.borderRadius = '60px';
          document.getElementById(id).style.boxShadow = '2px 2px 2px 2px gray';
        }, 200);
        break;

      case 'myImage3':
        (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.interceptContent(id);
        this.isdisabled1 = true;
        this.isdisabled2 = true;
        this.isdisabled3 = true;
        this.isdisabled4 = true;
        this.isdisabled5 = false;
        break;
    }

    this.count += 1;
    this.color1 = false;
    this.color2 = false;
    this.color3 = false;
    this.color4 = false;
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.hideArrowAndText();

    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.staticLayer.draw();

    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.horizontal = true;
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.vertical = true;
    (ViewController.getInstance().viewHandler as PositionViewHandler).position3dModel.oblique = true;

    this.isdisabled4 = true;

  }

  rotate() {
      (ViewController.getInstance().viewHandler as any).vbf3d.rotateArrow(this.direction[0], this.direction2[0],
          this.direction[1], this.direction2[1]);
      (ViewController.getInstance().viewHandler as any).vbf3d2.rotateArrow(this.direction3[0], this.direction2[0],
          this.direction3[1], this.direction2[1]);
    this.color5 = true;
    this.backgroundControl = false;
    this.isShowControl = false;
    setTimeout(() => {
      if (BrowserUtil.getBrowserInfo().os === 'Windows') {
        document.getElementById('myImage3').style.transform = 'translate(' + this.w / 4 + 'px,' + '0px) scale(0.7, 0.7)';
        document.getElementById('myImage2').style.transform = 'translate(' + 0 + 'px,' + 0 + 'px) scale(0.7, 0.7)';
        document.getElementById('myImage1').style.transform = 'translate(-' + this.w / 4 + 'px,' + 0 + 'px) scale(0.7, 0.7)';
      } else {
        document.getElementById('myImage3').style.transform = 'translate(' + this.w / 4 + 'px,' + '0px) scale(0.6, 0.6)';
        document.getElementById('myImage2').style.transform = 'translate(' + 0 + 'px,' + 0 + 'px) scale(0.6, 0.6)';
        document.getElementById('myImage1').style.transform = 'translate(-' + this.w / 4 + 'px,' + 0 + 'px) scale(0.6, 0.6)';
      }
        document.getElementById('myImage2').style.boxShadow = '';
        document.getElementById('myImage2').style.border = '';
        document.getElementById('myImage2').style.borderRadius = '';
        document.getElementById('myImage1').style.boxShadow = '';
        document.getElementById('myImage1').style.border = '';
        document.getElementById('myImage1').style.borderRadius = '';
        document.getElementById('myImage3').style.transition = 'all 3s';
    }, 200);

  }
}

