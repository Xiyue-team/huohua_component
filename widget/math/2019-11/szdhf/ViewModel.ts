import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewHandler} from './services/ViewHandler';
import {NavigatorBar} from './services/NavigatorBar';
import {ControlBar} from './services/ControlBar';

import steps from '@huohua/rrwidget/types/mock/mock.data';

@Component
export class ViewModel extends Vue {
    title: string;
    naviBar: NavigatorBar;
    controlBar: ControlBar;
    viewhandler: ViewHandler;
    typefall = true;
    typebounce = false;

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
            require('./sub_static/image/' + n.toString() + '.jpg');
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

    initbuttonClickEvent() {

        const frame = document.getElementById('navigatorBar');
        // 监听触发动画的事件，如click
        frame.addEventListener('click', () => {
            // 重新添加动画的class
            frame.classList.remove('naviTab');
            frame.classList.add('myAnimation');
        }, false);

        setTimeout(() => {
            (ViewController.getInstance().viewHandler as any).naviBar.play();
            this.controlPanel();
        }, 1000);
    }

    controlPanel() {
        (ViewController.getInstance().viewHandler as any).naviBar.play();
        document.getElementById('controlTab0').style.borderBottomLeftRadius = '10px';
        document.getElementById('controlTab0').style.borderTopLeftRadius = '10px';
        document.getElementById('progress0').style.borderBottomLeftRadius = '10px';
        document.getElementById('progress0').style.width = '98%';
        document.getElementById('progress0').style.marginLeft = '4px';
        document.getElementById('controlTab' + (this.controlSteps.length - 1).toString()).style.borderBottomRightRadius = '10px';
        document.getElementById('controlTab' + (this.controlSteps.length - 1).toString()).style.borderTopRightRadius = '10px';
        document.getElementById('progress' + (this.controlSteps.length - 1).toString()).style.borderBottomRightRadius = '10px';
        document.getElementById('progress' + (this.controlSteps.length - 1).toString()).style.width = '98%';
        setTimeout( () => {
            this.typebounce = true;
        }, 1000);
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
        this.typefall = false;

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
