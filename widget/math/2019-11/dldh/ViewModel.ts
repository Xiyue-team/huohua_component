import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewHandler} from './services/ViewHandler';
import {NavigatorBar} from './services/NavigatorBar';
import {ControlBar} from './services/ControlBar';
import * as vPoster1 from './sub_static/image/d.png';
const vconsole = require('vconsole');
@Component
export class ViewModel extends Vue {
    title: string;
    naviBar: NavigatorBar;
    controlBar: ControlBar;
    viewhandler: ViewHandler;
    typefall = [true, true, true, true];
    typebounce = [false, false, false, false];
    videoPoster1 = vPoster1;
    //默认显示导航
    showNavigatorBar = true;
    //默认不显示控制条
    showControlBar = false;
    navigatorSteps: any[] = [];
    controlSteps: any[] = [];
    currentStep = 1;
    created() {
        this.initImg();
        const viewOption = new ViewOption();
        viewOption.adapterMobilePanel = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        this.resize();
    }

    initImg() {
        const n = this.controlSteps.length;
        for (let i = 0; i < n; i++) {
            require('./sub_static/image/' + n.toString() + '.png');
        }
    }

    mounted() {
        ViewController.getInstance().domReady();
        new vconsole();
        this.navigatorSteps = (ViewController.getInstance().viewHandler as any).stepVideo.steps;
        this.controlSteps = (ViewController.getInstance().viewHandler as any).stepVideo.steps;
    }

    resize() {

    }

    initbuttonClickEvent(index: number) {
        const frame = document.getElementById('navigatorBar');
            // 重新添加动画的class
            frame.classList.remove('naviTab');
            frame.classList.add('myAnimation');
        const n = this.navigatorSteps.length;
        for (let i = 0 ; i < n ; i++) {
            document.getElementById('bgImg' + i).style.display = 'none';
            document.getElementById('csImg' + i).style.display = 'none';
        }

        setTimeout(() => {
            (ViewController.getInstance().viewHandler as any).naviBar.play();
            this.controlPanel(index);
            (ViewController.getInstance().viewHandler as any).controlBar.controlindex = index;
        }, 500);
    }

    controlPanel(index: number) {
        (ViewController.getInstance().viewHandler as any).controlBar.play(index, 'play');
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
        (ViewController.getInstance().viewHandler as any).controlBar.stop();
        for (let i = 0; i < n; i++) {
            this.controlSteps[i].isShow = false;
        }
        // 操作的是当前的step
        if ((ViewController.getInstance().viewHandler as any).controlBar.index === index) {
            this.changeStatus(index);
        } else {
            // 操作的不是当前的step，直接播放
            for (let i = 0; i < n; i++) {
                this.controlSteps[i].isPlaying = false;
            }
            this.controlSteps[index].isPlaying = true;
            (ViewController.getInstance().viewHandler as any).controlBar.play(index, 'play');
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
    // playVideo() {
    //     (ViewController.getInstance().viewHandler as any).controlBar.initVideo();
    // }

    changeStatus(index: number) {
        if (this.controlSteps[index].isPlaying === true) {
            this.controlSteps[index].isShow = true;
            this.controlSteps[index].isPlaying = false;
            (ViewController.getInstance().viewHandler as any).controlBar.play(index, 'pause');
        } else {
            this.controlSteps[index].isShow = false;
            this.controlSteps[index].isPlaying = true;
            (ViewController.getInstance().viewHandler as any).controlBar.play(index, 'play');
        }
    }
}
