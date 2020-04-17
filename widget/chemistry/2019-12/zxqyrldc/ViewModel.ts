import Vue from 'vue';
import video from 'video.js';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ZxqyrldcViewHandler} from './services/ZxqyrldcViewHandler';
import * as coverImage from './sub_static/img/coverImg@2x.png';

const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    // 标题
    title: string = window.env.browserInfo.lang.title;
    // 按钮
    button: Array<string> = window.env.browserInfo.lang.button;
    // 存储视频
    video: any;
    // 当前是否是微观选项
    isMicro = false;
    // 视频是否播放结束
    isEnding = false;
    // 是否显示化学反应方程式
    isShowReaction = false;
    // 视频封面图
    posterImage = coverImage;

    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new ZxqyrldcViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.initVideo();
        this.setBgColor();
    }

    // 初始化视频
    private initVideo() {
        this.video = video('microVideo', {
            loop: false,
            controls: false,
        }, () => {
            this.video.on('ended', () => {
                this.isEnding = true;
            });
        });
    }

    // 播放视频
    playVideo() {
        this.video.play();
        this.isEnding = false;
    }

    // 点击选择宏观或微观
    async selectType(type: string) {
        if (type === 'micro') {
            if (this.isMicro) {
                return;
            }
            this.isMicro = true;
            this.playVideo();
        } else {
            this.isMicro = false;
            this.video.pause();
            this.video.currentTime(0);
        }
    }

    // 为mac电脑和windows设置不同的背景色
    private setBgColor() {
        if (window.env.browserInfo.os === 'Mac OS X') {
            document.getElementById('background').style.backgroundColor = '#53585b';
        } else if (window.env.browserInfo.isIpad) {
            document.getElementById('background').style.backgroundColor = '#4A4D52';
        } else if (window.env.browserInfo.isPc && window.navigator.maxTouchPoints) {
            document.getElementById('background').style.backgroundColor = '#4A4D52';
        } else if (window.env.browserInfo.isIphone) {
            document.getElementById('background').style.backgroundColor = '#4A4D52';
        } else {
            document.getElementById('background').style.backgroundColor = '#4A4D52';
        }
    }

    // 重置
    resetEvent() {
        this.isShowReaction = false;
        this.isEnding       = false;
        this.isMicro        = false;
        this.video.pause();
        this.video.currentTime(0);
    }

}
