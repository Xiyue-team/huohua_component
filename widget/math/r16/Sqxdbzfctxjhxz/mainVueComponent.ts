import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {SqxdbzfctxjhxzViewHandler} from './services/SqxdbzfctxjhxzViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { setTimeout } from 'timers';

@Component
export class MainVueComponent extends Vue {
    // data
    ellipsePicture = '';
    isShow = 'yes';
    timer1: any;
    timer2: any;
    timer3: any;
    timer4: any;
    timer5: any;
    timer6: any;
    index = 0;
    a: any;
    val: number;
    items = ['', '', '', '', '', '', '', ''];
    isShowCover = false;
    arr: any = [];
    store: any = [];
    store1: any = [];
    store2: any = [];

    // created
    created() {
        this.arr = [];
        for (let i = 0; i < 8; i++) {
            this.arr.push(i);
        }
        const promises = this.arr.map((value: any, index: any) => {
            const img1 = require(`./sub_static/UI1/${value}.png`);
            return this.preloadImage(img1).then((image: any) => {
                this.store1[index] = image;
            });
        });
        Promise.all(promises).then(() => {
            const promises1 = this.arr.map((value: any, index: any) => {
                const img2 = require(`./sub_static/UI2/${value}.png`);
                return this.preloadImage(img2).then((image: any) => {
                    this.store2[index] = image;
                });
            });
            Promise.all(promises1).then(() => {
                this.store = this.store1; 
            });
        });
        this.ellipsePicture = require('./sub_static/UI1/0.png');
        clearTimeout(this.timer5);
        this.timer3 = setTimeout(() => {
            this.isShowCover = true;
            clearTimeout(this.timer3);
        }, 600);
        this.timer1 = setTimeout(() => {
            this.isShow = 'no';
            this.ellipsePicture = require('./sub_static/UI2/0.png');
            clearTimeout(this.timer1);
        }, 1200);
        this.timer5 = setTimeout(() => {
            this.isShowCover = false;
            clearTimeout(this.timer5);
        }, 1400);
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new SqxdbzfctxjhxzViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }

    // methods
    getFirstEvent(index: number) {
        clearTimeout(this.timer4);
        clearTimeout(this.timer2);
        this.index = index;
        this.store = this.store2;
        this.changeContentPicture();
        this.timer4 = setTimeout(() => {
                this.isShowCover = true;
                this.timer6 = setTimeout(() => {
                    this.changeResultPicture();
                    clearTimeout(this.timer6);
                }, 600);
                this.timer2 = setTimeout(() => {
                    this.isShow = 'no';
                    this.isShowCover = false; 
                    clearTimeout(this.timer2);
                }, 800);
            clearTimeout(this.timer4);
        }, 100);
    }
    getSecondEvent () {
        this.val = this.index;
        this.store = this.store1;
        this.isShowCover = true;
        this.isShowCover = false;
        this.isShow = 'yes'; 
        this.ellipsePicture = this.store[this.val].src;
    }
    changeContentPicture () {
        this.val = this.index;
        this.store = this.store1;
        this.ellipsePicture = this.store[this.val].src;
    }
    changeResultPicture () {
        this.val = this.index;
        this.store = this.store2;
        this.ellipsePicture = this.store[this.val].src;
    }

    resetEvent() {
        // 重置
        (ViewController.getInstance().viewHandler as SqxdbzfctxjhxzViewHandler).reset();

    }
    preloadImage(path: any) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = path;
            image.onload = () => resolve(image);
            image.onerror = reject;
        });
    }
}

