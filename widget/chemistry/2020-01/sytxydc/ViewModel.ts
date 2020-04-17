import Vue from 'vue';
import video from 'video.js';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {SytxydcViewHandler} from './services/SytxydcViewHandler';
import * as coverImage from './sub_static/img/coverImg@2x.png';

const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    // 标题
    title: string = window.env.browserInfo.lang.title;
    // 按钮
    button: Array<string> = window.env.browserInfo.lang.button;
    // 电极
    electrode: Array<string> = window.env.browserInfo.lang.electrode;
    // 存储视频
    player: any;
    // 当前是否是微观选项
    isMicro = false;
    // 是否显示化学反应方程式
    isShowReaction = false;
    // 视频封面图
    posterImage = coverImage;

    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new SytxydcViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.initVideo();
        this.setBgColor();
    }

    // 初始化视频
    private initVideo() {
        this.player = video('microVideo', {
            loop: true,
            controls: false,
        });
    }

    // 播放视频
    playVideo() {
        this.player.play();
    }

    // 点击选择宏观或微观
    async selectType(type: string) {
        if (type === 'micro') {
            if (this.isMicro) {
                return;
            }
            this.playVideo();
            this.isMicro = true;
        } else {
            this.isMicro = false;
            this.player.pause();
            this.player.currentTime(0);
        }
    }

    // 为不同设备设置不同的背景色
    private setBgColor() {
        if (window.env.browserInfo.os === 'Mac OS X') {
            document.getElementById('background').style.backgroundColor = '#53585b';
        } else if (window.env.browserInfo.isIpad) {
            document.getElementById('background').style.backgroundColor = '#4A4D52';
        } else if (window.env.browserInfo.isPc && window.navigator.maxTouchPoints) {
            document.getElementById('background').style.backgroundColor = '#494E51';
        } else if (window.env.browserInfo.isIphone) {
            document.getElementById('background').style.backgroundColor = '#4A4D52';
        } else if (window.env.browserInfo.isQQ) {
            document.getElementById('background').style.backgroundColor = '#494C51';
        } else {
            document.getElementById('background').style.backgroundColor = '#4A4D52';
        }
    }

    // 重置
    resetEvent() {
        this.isShowReaction = false;
        this.isMicro = false;
        this.player.pause();
        this.player.currentTime(0);
    }

}
