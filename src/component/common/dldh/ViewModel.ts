import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewHandler } from './services/ViewHandler';
import { NavigatorBar } from './services/NavigatorBar';
import { ControlBar } from './services/ControlBar';
import { Prop } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  @Prop() config!: JSON;
  @Prop() videoSrc!: string;
  @Prop() videoPoster!: string;
  @Prop() stepsImg!: Array<string>;

  viewHandler: ViewHandler;
  naviBar: NavigatorBar;
  controlBar: ControlBar;
  viewhandler: ViewHandler;
  typefall = [true, true, true, true];
  typebounce = [false, false, false, false];
  videoPoster1 = this.videoPoster;
  //默认显示导航
  showNavigatorBar = true;
  //默认不显示控制条
  showControlBar = false;
  navigatorSteps: any[] = [];
  controlSteps: any[] = [];
  currentStep = 1;

  created() {
    this.viewHandler = new ViewHandler();
  }

  mounted() {
    this.viewHandler.domReady(this.config);
    // new vconsole();
    this.navigatorSteps = this.viewHandler.stepVideo.steps;
    this.controlSteps = this.viewHandler.stepVideo.steps;

    for (let i = 0; i < this.navigatorSteps.length; i++) {
      this.navigatorSteps[i].img = this.stepsImg[i];
    }
  }

  initbuttonClickEvent(index: number) {
    const frame = document.getElementById('navigatorBar');
    // 重新添加动画的class
    frame.classList.remove('naviTab');
    frame.classList.add('myAnimation');
    const n = this.navigatorSteps.length;
    for (let i = 0; i < n; i++) {
      document.getElementById('bgImg' + i).style.display = 'none';
      document.getElementById('csImg' + i).style.display = 'none';
    }

    setTimeout(() => {
      this.play();
      this.controlPanel(index);
      this.viewHandler.controlBar.controlindex = index;
      console.log(this.showNavigatorBar);
    }, 500);
  }

  controlPanel(index: number) {
    this.viewHandler.controlBar.play(index, 'play');
    const controlTabOne = document.getElementById('controlTab0');
    const progressOne = document.getElementById('progress0');
    controlTabOne.style.borderBottomLeftRadius = '7px';
    controlTabOne.style.borderTopLeftRadius = '7px';
    progressOne.style.borderBottomLeftRadius = '7px';
    progressOne.style.width = '99%';
    progressOne.style.marginLeft = '1px';
    document.getElementById('controlTab' + (this.controlSteps.length - 1).toString()).style.borderBottomRightRadius = '7px';
    document.getElementById('controlTab' + (this.controlSteps.length - 1).toString()).style.borderTopRightRadius = '7px';
    document.getElementById('progress' + (this.controlSteps.length - 1).toString()).style.borderBottomRightRadius = '7px';
    document.getElementById('progress' + (this.controlSteps.length - 1).toString()).style.width = '100%';
    this.typebounce[index] = true;
  }

  playAndPause(index: number) {
    const n = this.controlSteps.length;
    for (let i = 0; i < n; i++) {
      this.controlSteps[i].isShow = false;
    }
    // 操作的是当前的step
    if (this.viewHandler.controlBar.index === index) {
      this.changeStatus(index);
    } else {
      // 操作的不是当前的step，直接播放
      for (let i = 0; i < n; i++) {
        this.controlSteps[i].isPlaying = false;
      }
      this.controlSteps[index].isPlaying = true;
      this.viewHandler.controlBar.play(index, 'play');
    }

    this.typefall[index] = false;
    for (let i = 0; i < n; i++) {
      if (i === index) {
        this.typebounce[index] = true;
      } else {
        this.typebounce[i] = false;
      }
    }
  }

  changeStatus(index: number) {
    if (this.controlSteps[index].isPlaying === true) {
      this.controlSteps[index].isShow = true;
      this.controlSteps[index].isPlaying = false;
      this.viewHandler.controlBar.play(index, 'pause');
    } else {
      this.controlSteps[index].isShow = false;
      this.controlSteps[index].isPlaying = true;
      this.viewHandler.controlBar.play(index, 'play');
    }
  }

  //导航按钮的显示控制
  play() {
    this.showNavigatorBar = false;
    this.showControlBar = true;
  }

  myResize() {
    this.viewHandler.resize();
  }
}
