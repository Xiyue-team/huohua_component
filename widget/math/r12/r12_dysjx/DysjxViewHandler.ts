/**
 * 探究几种弱酸的酸性强弱
 */
import {CommonViewHandler} from '../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Circle, default as Konva, Group, Layer, Stage} from 'konva';

import * as sjx1 from './sub_static/01.png';
import {SplitTriangle} from './services/SplitTriangle';
import {AddTriangle} from './services/AddTriangle';
import {AddMoreTriangle} from './services/AddMoreTriangle';
import {ViewController} from '../../../../src/core/ViewController';



export class DysjxViewHandler extends CommonViewHandler implements ViewHandler {
    private stage: Stage;
    private layer: Layer;
    group: Group;

    splitTriangle: SplitTriangle;
    addTriangle: AddTriangle;
    addMoreTriangle: AddMoreTriangle;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.initElement();

        ViewController.getInstance().hideLoading();
    }

    //初始化元素
     initElement() {
        this.initStage();
        this.initLayer();
        this.initGroup();
    }

    //初始化舞台
    initStage() {
        Konva.pixelRatio = 1;
        this.stage = new Konva.Stage({
            container: 'box',
            width: document.getElementById('box').clientWidth,
            height: document.getElementById('box').clientHeight
        });
    }

    //初始化层
    initLayer() {

        this.layer = new Konva.Layer();

    }

    //初始化组
    initGroup() {
        this.group = new Group();
        this.initImage();

        this.splitTriangle = new SplitTriangle(this.stage);
        this.addTriangle = new AddTriangle(this.stage);
        this.addMoreTriangle = new AddMoreTriangle(this.stage);
    }

    splitTriangleAnimation() {
        this.group.hide();
        this.stage.draw();
        //this.splitTriangle = new SplitTriangle(this.stage);
        this.splitTriangle.runAnimation();
    }

    splicingTriangleAnimation() {
        this.group.hide();
        this.stage.draw();
        this.splitTriangle.splicingTriangleAnimation();
    }

    addTriangleAnimation() {
        this.group.hide();
        this.stage.draw();
        //this.addTriangle = new AddTriangle(this.stage);
        this.addTriangle.runAnimation();
    }

    addMoreTriangleAnimation() {
        this.group.hide();
        this.stage.draw();
        //this.addMoreTriangle =  new AddMoreTriangle(this.stage);
        this.addMoreTriangle.runAnimation();
    }

    initImage() {


        /* 三角形 */
        const imageObj = new Image();
        const sjxWidth  = 270;
        const sjxHeight = 270;
        let sjxImg;
        imageObj.onload = () => {
             sjxImg = new Konva.Image({
                x: this.stage.getWidth() / 2 - sjxWidth / 2,
                y: this.stage.getHeight() / 2 - sjxHeight / 2,
                image: imageObj,
                width: sjxWidth,
                height: sjxHeight,
                name: 'triangle'
            });
            this.group.add(sjxImg);
            this.layer.add(this.group);

            this.stage.add(this.layer);
        };
        imageObj.src = (sjx1 as any);


        let sjxText;
        sjxText = new Konva.Text({
            x: this.stage.getWidth() / 2 + 15,
            y: this.stage.getHeight() / 2 - 15,
            text: '10',
            fontSize: 30,
            fill: 'black'
        });
        this.group.add(sjxText);
        this.layer.add(this.group);

    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();

        this.group.show();
        this.layer.draw();
        //销毁舞台
        this.splitTriangle.reset();
        this.addTriangle.reset();
        this.addMoreTriangle.reset();
        //this.stage.destroy();
            //重画

        //setTimeout( () => {
         //this.initElement();
        //}, 1000 );

    }

}
