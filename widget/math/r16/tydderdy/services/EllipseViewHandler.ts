import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {LineModel} from './LineModel';


export class EllipseViewHandler extends KonvaViewHandler implements ViewHandler {
    public timer: any;
    public timer1: any;
    public LineExtModel: any;

    //构造函数
    constructor(vm: Vue) {
        super(vm);


    }

    domReady() {
        this.initElement();
        super.domReady();
    }

    //初始化元素
    initElement() {

        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('Container').clientWidth;
        const height = document.getElementById('Container').clientHeight;
        this.LineExtModel = new LineModel(document.getElementById('Container'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading(1000);
    }

    preloadImage(path: any) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image.src);
            image.onerror = reject;
            image.src = path;
        });
    }


    complete() {

    }

    drawAllEllipse() {
        this.LineExtModel.drawAllEllipse();
    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        this.LineExtModel.reset();
    }

}
