import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
const Swiper = require('./sub_static/swiper');
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    text = window.env.browserInfo.lang.text;
    textTip = '硝酸铵';
    textTip1 = '氯化钾';
    tipText_eight: any = null;
    bg: any = require('./sub_static/UI/bg.png');
    active = false;
    active1 = true;
    mySwiper: any;
    one: any = null;
    two: any = null;
    imgs: any = [];
    src1: any = [];
    // 预加载
    preload() {
        // 20张不同化学危险品图片
        for (let i = 1; i < 21; i ++) {
            const img = require(`./sub_static/UI/${i}.png`);
            this.imgs.push(img);
        }
        for (const img of this.imgs) {
            const image = new Image();
            image.src = img;
        }
        // 初始界面十张图片
        for (let i = 1; i < 11; i ++) {
            const img1 = require(`./sub_static/UI/home${i}.png`);
            this.src1.push(img1);
        }
        for (const img1 of this.src1) {
            const image = new Image();
            image.src = img1;
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
        this.textTip = this.text[0];
        this.mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal', // 横向切换选项
            loop: false, // 循环模式选项
            initialSlide: 0,
            spaceBetween: 20,
            keyboardControl: true,
            mousewheelControl: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
        });
        setTimeout( () => {
            this.tipText_eight = document.getElementsByClassName('textTip');
        }, 100);

    }
    changeImg (num1: number, num2: number) {
        this.one = this.imgs[num1];
        this.two = this.imgs[num2];
        this.textTip = this.text[num1];
        this.textTip1 = this.text[num2];
        this.tipText_eight[0].classList.remove('textTip_eight');
        this.tipText_eight[1].classList.remove('textTip_eight');
    }
    // 点击切换
    getChange(offset: any) {
        this.active1 = false;
        switch (offset) {
            case 1:
                this.changeImg(0, 1);
                break;
            case 2:
                this.changeImg(2, 3);
                break;
            case 3:
                this.changeImg(4, 5);
                break;
            case 4:
                this.changeImg(6, 7);
                break;
            case 5:
                this.changeImg(8, 9);
                break;
            case 6:
                this.changeImg(10, 11);
                break;
            case 7:
                this.changeImg(12, 13);
                break;
            case 8:
                this.changeImg(14, 15);
                this.tipText_eight[0].classList.add('textTip_eight');
                this.tipText_eight[1].classList.add('textTip_eight');
                break;
            case 9:
                this.changeImg(16, 17);
                break;
            case 10:
                this.changeImg(18, 19);
                break;
        }
        this.active = true;
    }
    cancelEvt () {
        this.reset();
        this.active1 = false;
    }
    // 重置
    reset() {
        this.active = false;
        this.active1 = true;
        this.one = null;
        this.two = null;
        (this.mySwiper as any).slideTo(0);
    }
}

