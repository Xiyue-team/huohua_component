import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.buttonTitle;
    text = window.env.browserInfo.lang.text;
    //创建按钮是否激活的变量
    active1 = true;
    changeImg = require(`./sub_static/UI/Img/diForever/1.jpg`);
    //控制反应级循环时的定时器
    timer: any;
    timer1: any;
    timer2: any;
    // 预加载图片组
    imgArr: any = [];
    // 控制重置按钮点击一次后不允许再次点击的变量
    mark = false;
    preload() {
        for (let i = 1; i < 31; i ++ ) {
            const img = require(`./sub_static/UI/Img/diForever/${i}.jpg`);
            this.imgArr.push(img);
        }
        for (let i = 1; i < 61; i ++ ) {
            const img = require(`./sub_static/UI/Img/pass/${i}.jpg`);
            this.imgArr.push(img);
        }
        for (let i = 1; i < 31; i ++ ) {
            const img = require(`./sub_static/UI/Img/gaoForever/${i}.jpg`);
            this.imgArr.push(img);
        }
        for (const img of this.imgArr) {
            const image = new Image();
            image.src = img;
        }
    }
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ModelViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        ViewController.getInstance().domReady();
        this.preload();
        this.playXhEvent(0, 29, 150);
        this.mark = true;
    }
    // 低温/高温下循环播放函数
    playXhEvent (val: number, val1: number, timer: number) {
        let value = val;
        const thiz = this;
        function add() {
            value ++;
            thiz.changeImg = thiz.imgArr[value];
            if (value >= val1) {
                clearInterval(thiz.timer);
                thiz.timer1 = setInterval(sub, timer);
            }
        }
        function sub() {
            value --;
            thiz.changeImg = thiz.imgArr[value];
            if (value <= val) {
                clearInterval(thiz.timer1);
                thiz.timer = setInterval(add, timer);
            }
        }
        thiz.timer = setInterval(add, timer);
    }
    // 低温到高温状态分子反应函数
    playPassEvent () {
        let value = 30;
        const thiz = this;
        function add() {
            value ++;
            thiz.changeImg = thiz.imgArr[value];
            if (value >= 89) {
                clearInterval(thiz.timer2);
                thiz.playXhEvent(90, 119, 60);
            }
        }
        thiz.timer2 = setInterval(add, 30);
    }
    // 高温到低温状态分子反应函数
    playPassFEvent () {
        let value = 89;
        const thiz = this;
        function add() {
            value --;
            thiz.changeImg = thiz.imgArr[value];
            if (value <= 30) {
                clearInterval(thiz.timer2);
                thiz.playXhEvent(0, 29, 150);
                thiz.mark = true;
            }
        }
        thiz.timer2 = setInterval(add, 50);
    }
    getEvent(index: number) {
        this.mark = false;
        this.clearTimer();
        if (index === 1) {
            if (this.active1 === true) {
                return;
            }
            this.playPassFEvent();
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        } else if (index === 2) {
            if (!this.active1 === true) {
                return;
            }
            this.playPassEvent();
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(2);
        }
    }
    // 清除定时器
    clearTimer () {
        clearInterval(this.timer);
        clearInterval(this.timer1);
        clearInterval(this.timer2);
    }
}

