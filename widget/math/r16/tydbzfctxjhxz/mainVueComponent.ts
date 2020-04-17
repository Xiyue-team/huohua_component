import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {EllipseViewHandler} from './services/EllipseViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
    // data
    ellipsePicture = '';
    isShow = 'yes';
    timer1: number;
    timer2: number;
    timer3: number;
    timer4: number;
    timer5: number;
    timer6: number;
    index = 0;
    val: number;
    items = ['', '', '', '', '', '', '', '', ''];
    isShowCover = false;
    arr1: any = [];
    arr2: any = [];
    store: any = [];
    store1: any = [];
    store2: any = [];
    // created
    created() {
        this.arr1 = [];
        for (let i = 0; i < 9; i++) {
            this.arr1.push(i);
        }
        this.arr2 = [];
        for (let i = 0; i < 8; i++) {
            this.arr2.push(i);
        }
        const promises = this.arr1.map((value: any, index: any) => {
            const img1 = require(`./sub_static/UI1/${index}.png`);
            return this.preloadImage(img1).then((image: any) => {
                this.store1[index] = image;
            });
        });
        Promise.all(promises).then(() => {
            const promises1 = this.arr2.map((value: any, index: any) => {
                const img2 = require(`./sub_static/UI2/${index}.png`);
                return this.preloadImage(img2).then((image: any) => {
                    this.store2[index] = image;
                });
            });
            Promise.all(promises1).then(() => {
                this.store = this.store1;
            });
        });
        this.ellipsePicture = require('./sub_static/UI1/0.png');
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
        ViewController.getInstance(new EllipseViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        // for (let i = 0; i < this.store1.length; i++) {
        //     const fragment1 = document.createDocumentFragment();
        //     const imageElement = document.createElement('img');
        //     imageElement.id = `image_${i + 1}`;
        //     imageElement.src = this.imageArray[i];
        //     imageElement.style.width = this.imgWidth;
        //     imageElement.style.height = this.imgHeight;
        //     imageElement.addEventListener('touchend', () => {
        //         return false;
        //     });
        //     fragment1.appendChild(imageElement);
        //     this.fragmentArray.push(fragment1);
        // }
        ViewController.getInstance().domReady();
    }
    // methods
    // 按钮点击事件

    getFirstEvent(index: number) {
        clearTimeout(this.timer4);
        clearTimeout(this.timer2);
        this.index = index;
        this.store = this.store2;
        this.changeContentPicture();
        this.timer4 = setTimeout(() => {
            if (this.index === 8) {
                return;
            } else {
                this.isShowCover = true;
                this.timer6 = setTimeout(() => {
                    this.changeResultPicture();
                    clearTimeout(this.timer6);
                }, 600);
                this.timer2 = setTimeout(() => {
                    this.isShowCover = false;
                    this.isShow = 'no';
                    clearTimeout(this.timer2);
                }, 800);
            }
            clearTimeout(this.timer4);
        }, 100);
    }
    getSecondEvent () {
        this.val = this.index;
        this.store = this.store1;
        this.isShowCover = false;
        this.isShow = 'yes';
        this.ellipsePicture = this.store[this.val].src;
        // this.ellipsePicture = require(`./sub_static/UI1/${this.val}.png`);
    }
    // 更改背景图片
    changeContentPicture () {
        this.val = this.index;
        this.store = this.store1;
        this.ellipsePicture = this.store[this.val].src;
        // this.ellipsePicture = require(`./sub_static/UI1/${this.index}.png`);
    }
    changeResultPicture () {
        this.val = this.index;
        this.store = this.store2;
        this.ellipsePicture = this.store[this.val].src;
        // this.ellipsePicture = require(`./sub_static/UI2/${this.index}.png`);
    }
    // 重置
    resetEvent() {
        (ViewController.getInstance().viewHandler as EllipseViewHandler).reset();
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

