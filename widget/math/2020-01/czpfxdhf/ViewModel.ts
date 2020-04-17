import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewHandler} from './services/ViewHandler';
import {NavigatorBar} from './services/NavigatorBar';
import {ControlBar} from './services/ControlBar';
import * as vPoster1 from './sub_static/image/d.png';

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

        const viewOption = new ViewOption();
        viewOption.adapterMobilePanel = false;
        viewOption.showMobileExpandIco = false;

        ViewController.getInstance(new ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();

        this.resize();
        this.initImg();
    }

    initImg() {
        const n = this.controlSteps.length;
        for (let i = 0; i < n; i++) {
            require('./sub_static/image/' + n.toString() + '.png');
        }
    }

    mounted() {
        ViewController.getInstance().domReady();
        const viewHandler = ViewController.getInstance().viewHandler;
        this.navigatorSteps = (ViewController.getInstance().viewHandler as any).stepVideo.steps;
        this.controlSteps = (ViewController.getInstance().viewHandler as any).stepVideo.steps;

    }

    resize() {
        if (window.innerWidth <= 1100 && window.innerWidth > 900) {

        } else if (window.innerWidth <= 900) {

        } else {
        }
    }

    initbuttonClickEvent(index: number) {

        const frame = document.getElementById('navigatorBar');
        // 监听触发动画的事件，如click
        // frame.addEventListener('click', () => {
            // 重新添加动画的class
            frame.classList.remove('naviTab');
            frame.classList.add('myAnimation');
        // }, false);

        const n = this.navigatorSteps.length;
        for (let i = 0 ; i < n ; i++) {
            document.getElementById('bgImg' + i).style.display = 'none';
            document.getElementById('csImg' + i).style.display = 'none';
        }

        setTimeout(() => {
            (ViewController.getInstance().viewHandler as any).naviBar.play();
            this.controlPanel(index);
        }, 500);
    }

    controlPanel(index: number) {
        setTimeout(() => {
            // this.playAndPause(index);
            (ViewController.getInstance().viewHandler as any).controlBar.play(index, 'play');
        }, 400);
        document.getElementById('controlTab0').style.borderBottomLeftRadius = '7px';
        document.getElementById('controlTab0').style.borderTopLeftRadius = '7px';
        document.getElementById('progress0').style.borderBottomLeftRadius = '7px';
        document.getElementById('progress0').style.width = '99%';
        document.getElementById('progress0').style.marginLeft = '1px';
        document.getElementById('controlTab' + (this.controlSteps.length - 1).toString()).style.borderBottomRightRadius = '7px';
        document.getElementById('controlTab' + (this.controlSteps.length - 1).toString()).style.borderTopRightRadius = '7px';
        document.getElementById('progress' + (this.controlSteps.length - 1).toString()).style.borderBottomRightRadius = '7px';
        document.getElementById('progress' + (this.controlSteps.length - 1).toString()).style.width = '100%';
        // setTimeout( () => {
            this.typebounce[index] = true;
        // }, 1000);
    }

    playAndPause(index: number) {
        const n = this.controlSteps.length;
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
    playVideo() {
        (ViewController.getInstance().viewHandler as any).controlBar.initVideo();
    }

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
