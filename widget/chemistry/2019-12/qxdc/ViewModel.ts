import Vue from 'vue';
import video from 'video.js';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {QxdcViewHandler} from './services/QxdcViewHandler';
import positive_reaction from './sub_static/img/positive_reaction@2x.png';
import negatve_reaction from './sub_static/img/negative_reaction@2x.png';
import anode_reaction from './sub_static/img/anode_reaction@2x.png';
import cathode_reaction from './sub_static/img/cathode_reaction@2x.png';
import charge_total_reaction from './sub_static/img/charge_total_reaction@2x.png';
import discharge_total_reaction from './sub_static/img/discharge_total_reaction@2x.png';

const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    // 标题
    title: string = window.env.browserInfo.lang.title;
    // 按钮
    button: Array<string> = window.env.browserInfo.lang.button;
    // 存储视频
    myVideo: Array<any> = [];
    // 解决按钮重复点击以及一些界面展示和隐藏
    isCharge    = false;
    isDischarge = false;
    // 视频是否播放结束
    isEnding    = false;
    // 解决从默认到视频节面闪
    chargeClickNum: number    = 0;
    dischargeClickNum: number = 0;

    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new QxdcViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.initVideo(0, 'dischargeVideo');
        this.initVideo(1, 'chargeVideo');
        this.setBgColor();
    }

    // 初始化视频
    private initVideo(index: number, id: string) {
        this.myVideo[index] = video(id, {
            loop: false,
            controls: false,
        }, () => {
            this.myVideo[index].on('ended', () => {
                this.isEnding = true;
            });
        });
    }

    // 点击选择充电或者放电
    async selectType(type: string) {
        const dischargeStyle = document.getElementById('dischargeVideo').style;
        const chargeStyle = document.getElementById('chargeVideo').style;
        if (type === 'charge' && !this.isCharge) {
            this.chargeClickNum++;
            dischargeStyle.zIndex = '1';
            chargeStyle.zIndex = '2';
            this.isCharge = true;
            this.isDischarge = false;
            if (this.chargeClickNum > 1) {
                this.myVideo[1].load();
            }
            this.showVideo();
        }

        if (type === 'discharge' && !this.isDischarge) {
            this.dischargeClickNum++;
            dischargeStyle.zIndex = '2';
            chargeStyle.zIndex = '1';
            this.isCharge = false;
            this.isDischarge = true;
            if (this.dischargeClickNum > 1) {
                this.myVideo[0].load();
            }
            this.showVideo();
        }
    }

    // 切换反应式开关
    openReaction() {
        const isCheck = (<HTMLInputElement>document.getElementById('reaction_button')).checked;
        if (isCheck) {
            this.showReactionDom();
            this.showReaction();
        } else {
            this.hideReactionDom();
        }
    }

    // 显示化学反应式
    showReaction() {
        if (this.isCharge) {
            document.getElementById('positive_reaction').setAttribute('src', anode_reaction);
            document.getElementById('negative_reaction').setAttribute('src', cathode_reaction);
            document.getElementById('total_reaction').setAttribute('src', charge_total_reaction);
        } else {
            document.getElementById('positive_reaction').setAttribute('src', positive_reaction);
            document.getElementById('negative_reaction').setAttribute('src', negatve_reaction);
            document.getElementById('total_reaction').setAttribute('src', discharge_total_reaction);
        }
    }

    // 展示视频区域
    private showVideo() {
        this.playVideo();
        this.hideReactionDom();
        (<HTMLInputElement>document.getElementById('reaction_button')).checked = false;
    }

    // 播放视频
    playVideo() {
        if (this.isCharge) {
            this.myVideo[0].pause();
            this.myVideo[1].play();
            this.isEnding = false;
        } else {
            this.myVideo[1].pause();
            this.myVideo[0].play();
            this.isEnding = false;
        }
    }

    // 隐藏反应式
    hideReactionDom() {
        document.getElementById('reaction').style.display = 'none';
    }

    // 显示反应式
    showReactionDom() {
        document.getElementById('reaction').style.display = 'block';
    }

    // 为mac电脑和windows设置不同的背景色
    private setBgColor() {
        if (window.env.browserInfo.os === 'Mac OS X') {
            document.getElementById('background').style.backgroundColor = '#52565a';
        } else if (window.env.browserInfo.isIpad) {
            document.getElementById('background').style.backgroundColor = '#484D50';
        } else if (window.env.browserInfo.isPc && window.navigator.maxTouchPoints) {
            document.getElementById('background').style.backgroundColor = '#4C5154';
        } else {
            document.getElementById('background').style.backgroundColor = '#494C51';
        }
    }

    // 重置
    resetEvent() {
        this.myVideo[0].pause();
        this.myVideo[1].pause();
        this.myVideo[0].load();
        this.myVideo[1].load();
        this.isCharge = false;
        this.isDischarge = false;
        this.chargeClickNum = 0;
        this.dischargeClickNum = 0;
        this.hideReactionDom();
    }

}
