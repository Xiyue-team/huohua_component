import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {MicroscopeModel} from './MicroscopeModel';

export class UseMicroscopeViewHandler extends KonvaViewHandler implements ViewHandler {
    textModel: MicroscopeModel;

    //构造函数
    constructor(vm: Vue) {
        super(vm);

    }

    domReady() {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('Container').clientWidth;
        const height = document.getElementById('Container').clientHeight;
        this.textModel = new MicroscopeModel(document.getElementById('Container'), fov, width, height, near, far);
        this.textModel.init();
        this.initElement();
    }

    //初始化元素
    initElement() {
        const that = this;
        return new Promise((resove, reject) => {
            this.textModel.animateImg().then(() => {
                that.textModel.animateImg1().then(() => {
                    that.textModel.animateImg2().then(() => {
                        resove();
                        ViewController.getInstance().hideLoading(1000);
                    });
                });
            });
        });
    }

    //播放装片动画
    animateImg() {
        this.textModel.getImgAnimation();
    }

    //播放换40倍镜动画
    animateImg1() {
        this.textModel.getImgAnimation1();
    }

    //播放换10倍镜动画
    animateImg2() {
        this.textModel.getImgAnimation2();
    }

    complete() {

    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        this.textModel.reset();
    }

}
