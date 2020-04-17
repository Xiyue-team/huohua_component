import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {CellViewHandler} from './services/CellViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as img1 from './sub_static/UI/x4@3x.png';
import * as img2 from './sub_static/UI/x10@3x.png';
import * as img3 from './sub_static/UI/x40@3x.png';
import * as img4 from './sub_static/UI/yc@3x.png';
import * as img5 from './sub_static/UI/hfcy@3x.png';
import * as img6 from './sub_static/UI/rkq@3x.png';

@Component

export class MainVueComponent extends Vue {
    // data
    title = '显微镜下的几种细胞';
    topIndex = 0;
    bottomIndex = 3;
    num = 0;
    value = 0;
    cellPicture = '';
    val = 0;
    oldVal = 0;
    mark = 1;
    timer = null;
    arr = [];
    store = [];
    // bg1/bg2/bg3指不同显微镜头背景图片
    bg1 = '';
    bg2 = '';
    bg3 = '';
    // bg2/bg3/bg4指不同类型细胞背景图片
    bg4 = '';
    bg5 = '';
    bg6 = '';
    glass = '';
    // created
    created() {
        this.arr = [];
        this.store = [];
        for (let i = 0; i < 70; i++) {
            this.arr.push(i);
        }
        const promises = this.arr.map((value, index) => {
            const microscopeImg = require(`./sub_static/microscope/${index}.png`);
            this.glass = microscopeImg;
            return this.preloadImage(`${this.glass}`).then((microscope) => {
                this.store[index] = microscope;
            });
        });
        Promise.all(promises).then(() => {
        }).catch((err) => {
        });
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new CellViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        this.initImgSource();
        ViewController.getInstance().domReady();
    }

    // methods
    initImgSource() {
        this.bg1 = img1 as any;
        this.bg2 = img2 as any;
        this.bg3 = img3 as any;
        this.bg4 = img4 as any;
        this.bg5 = img5 as any;
        this.bg6 = img6 as any;
        const img = require('./sub_static/UI/0-3.png');
        this.cellPicture = img;
    }

    preloadImage(path: string) {
        return new Promise((resolve, reject) => {
            const microscope = new Image();
            microscope.onload = () => resolve(microscope);
            microscope.onerror = reject;
            microscope.src = path;
        });
    }

    // 细胞图片动画
    changePicture() {
        const img = require(`./sub_static/UI/${this.topIndex}-${this.bottomIndex }.png`);
        this.cellPicture = img;
    }

    // 转镜动画
    play(number1: number, number2: number) {
        clearTimeout(this.timer);
        this.value = number1;
        const timeFun = () => {
            if (this.value === number2) {
                clearTimeout(this.timer);
                this.changePicture();
                return;
            }
            this.value--;
            this.timer = setTimeout(timeFun, 100);
        };
        timeFun();
    }

    playConverse(number3: number, number4: number) {
        clearTimeout(this.timer);
        this.value = number3;
        const timeFun = () => {
            if (this.value === number4) {
                clearTimeout(this.timer);
                this.changePicture();
                return;
            }
            this.value++;
            this.timer = setTimeout(timeFun, 100);
        };
        timeFun();
    }

    // 点击切换显微镜镜头
    topClickHandle(index: number) {
        this.cellPicture = require('./sub_static/UI/Step1.png');
        this.mark = 0;
        this.topIndex = index;
    }

    // 点击切换细胞切片动画
    bottomClickHandle(index: number) {
        this.cellPicture = require('./sub_static/UI/0-3.png');
        this.mark = 1;
        this.bottomIndex = index;
        this.topIndex = 0;
        this.playConverse(0, 17);
    }

    // 重置
    reset() {
        this.mark = 2;
        this.value = 0;
        this.topIndex = 0;
        this.bottomIndex = 3;
        this.cellPicture = require('./sub_static/UI/0-3.png');
        clearTimeout(this.timer);
    }

    // 监听事件
    @Watch('topIndex')
    onChildChanged(val: number, oldVal: number) {
        this.val = val;
        this.oldVal = oldVal;
        if (this.mark === 0) {
            if (this.val === 1 && this.oldVal === 0) {
                this.playConverse(18, 35);
            }
            // 红黄显微镜互转 35-18号为黄色转到红色
            if (this.val === 0 && this.oldVal === 1) {
                this.play(35, 18);
            }
            // 黄蓝显微镜互转 36-53号为黄色转到蓝色
            if (this.val === 2 && this.oldVal === 1) {
                this.playConverse(36, 53);
            }
            // 黄蓝显微镜互转 53-36号为蓝色转到黄色
            if (this.val === 1 && this.oldVal === 2) {
                this.play(53, 36);
            }
            // 红蓝显微镜互转 54-69号为蓝色转到红色
            if (this.val === 0 && this.oldVal === 2) {
                this.playConverse(54, 69);
            }
            // 红蓝显微镜互转 69-54号为红色转到蓝色
            if (this.val === 2 && this.oldVal === 0) {
                this.play(69, 54);
            }
        }
    }
    @Watch('value')
    onChanged (v: number) {
        const dom = document.getElementById('microscope');
        this.num = v;
        dom.appendChild(this.store[v]); //先添加后删除 入栈速度略高于出栈
        if (this.store[v]) {
            dom.removeChild(dom.firstChild);
        }
    }
}

