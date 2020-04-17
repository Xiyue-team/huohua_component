import {ViewHandler} from '../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import { default as Konva, Group, ImageConfig, Layer, Stage} from 'konva';

import {ViewController} from '../../../../src/core/ViewController';
import {Constant} from './Constant';
import * as dnaUncomplete from './sub_static/dnaUncomplete.png';
import * as dna1 from './sub_static/dna01.png';
import * as dna2 from './sub_static/dna02.png';
import * as dna3 from './sub_static/dna03.png';
import * as dna4 from './sub_static/dna04.png';
import * as dna5 from './sub_static/dna05.png';

import * as mRNA1 from './sub_static/mRNA01.png';
import * as mRNA2 from './sub_static/mRNA02.png';
import * as mRNA3 from './sub_static/mRNA03.png';
import * as mRNA4 from './sub_static/mRNA04.png';
import * as mRNA5 from './sub_static/mRNA05.png';

import * as rectangle from './sub_static/rectangle.png';

import * as grayPeptide from './sub_static/grayPeptideChain.png';
import * as grayPeptide1 from './sub_static/grayPeptideChain1.png';
import * as grayPeptide2 from './sub_static/grayPeptideChain2.png';
import * as grayPeptide3 from './sub_static/grayPeptideChain3.png';

import * as peptide from './sub_static/peptideChain.png';
import * as peptide1 from './sub_static/peptideChain1.png';
import * as peptide2 from './sub_static/peptideChain2.png';
import * as peptide3 from './sub_static/peptideChain3.png';

import * as redArrow from './sub_static/redArrow.png';
import * as arrow01 from './sub_static/arrow01.png';

import * as greyLine from './sub_static/grey_line.png';
import * as point from './sub_static/point.png';
import {KonvaViewHandler} from '../../../../src/core/viewHandler/KonvaViewHandler';
import {DNAAnimation} from './services/DNAAnimation';
import {HammerDragEvent} from './HammerDragEvent';



export class JytbViewHandler extends KonvaViewHandler implements ViewHandler {
    private stage: Stage;
    layer: Layer;
    private staticLayer: Layer;
    private dnaAnimation: DNAAnimation;

    dnaGroupUncomplete: Group;
    dnaGroupComplete: Group;

    mRnaGroupUncomplete: Group;
    mRnaGroupComplete: Group;

    stageWidth: any;

    stageHeight: any ;



    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {

        super.domReady();
        this.initElement();
    }

    //初始化元素
     async initElement() {
        this.initStage();
        this.initLayer();
        this.initGroup();
        console.log('初始化构造方法');
        this.initText();
        await this.initDNAImg();
        await this.initmRNA();
        this.initRedArrow();
        this.initPeptide();
         this.initGrayPeptide();
        this.stage.scale({x: 1.2, y: 1.2});
        this.dnaAnimation = new DNAAnimation(this.layer);

        /** 初始化拖拽时间 **/
        const dragEvtA = new HammerDragEvent('icoA', (x: any, y: any) => {
            this.hitmRNA(x, y, 'A');
        });
        const dragEvtU = new HammerDragEvent('icoU', (x: any, y: any) => {
            this.hitmRNA(x, y, 'U');
        });
        const dragEvtC = new HammerDragEvent('icoC', (x: any, y: any) => {
            this.hitmRNA(x, y, 'C');
        });
        const dragEvtG = new HammerDragEvent('icoG', (x: any, y: any) => {
            this.hitmRNA(x, y, 'G');
        });
        const dragEvtArray = [dragEvtA, dragEvtU, dragEvtC, dragEvtG];
        console.log(dragEvtArray.length);

        this.layer.setZIndex(0);
        this.staticLayer.setZIndex(1);

        ViewController.getInstance().hideLoading(1000);
    }

    //初始化舞台
    initStage() {
        Konva.pixelRatio = 1;
        this.stage = new Konva.Stage({
            container: 'box',
            width: document.getElementById('box').clientWidth,
            height: document.getElementById('box').clientHeight
        });

        this.stageWidth = document.getElementById('box').clientWidth;
        this.stageHeight = document.getElementById('box').clientHeight;
    }

    //初始化层
    initLayer() {

        this.layer = new Konva.Layer();
        this.staticLayer = new Konva.Layer();
    }

    initText() {

        const staticLayer = new Konva.FastLayer();
        const dna = new Konva.Text({
            x: Constant.DnaLabelPosition.x,
            y: Constant.DnaLabelPosition.y,
            text: 'DNA',
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            listening : false
        });

        const rDna = new Konva.Text({
            x: Constant.RDnaLablePosition.x ,
            y: Constant.RDnaLablePosition.y,
            text: 'mRNA',
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            listening : false
        });



        staticLayer.add(dna);
        staticLayer.add(rDna);
        this.stage.add(staticLayer);

    }

    loadImageSuccessCalll = (konvaImg: Konva.Image) => {
        this.layer.add(konvaImg);
        this.stage.add(this.layer);
    }

    loadgrayPetideChainImg = (konvaImg: Konva.Image) => {
        this.staticLayer.add(konvaImg);
        this.stage.add(this.staticLayer);
    }

    /**
     * 由于dna链是要做缺失功能，所以是由5个图片拼接而成
     */
    async initDNAImg() {

        const upcompleteGroup = (konvaImg: Konva.Image) => {
            this.dnaGroupUncomplete.add(konvaImg);
        };

        const completeGroup = (konvaImg: Konva.Image) => {
            this.dnaGroupComplete.add(konvaImg);
        };

        await this.loadImage(dnaUncomplete as any,  Constant.DNAUncompleteImg as ImageConfig).then(upcompleteGroup);
        await this.loadImage(dna1 as any,  Constant.DNA1Img as ImageConfig).then(completeGroup);
        await this.loadImage(dna2 as any,  Constant.DNA2Img as ImageConfig).then(completeGroup);
        await this.loadImage(dna3 as any,  Constant.DNA3Img as ImageConfig).then(completeGroup);
        await this.loadImage(dna4 as any,  Constant.DNA4Img as ImageConfig).then(completeGroup);
        await this.loadImage(dna5 as any,  Constant.DNA5Img as ImageConfig).then(completeGroup);
        return new Promise<boolean>((resolve) => {
            resolve(true);
        });

    }

    /**
     * 初始化mRNA
     */
    async initmRNA() {

        const upcompleteGroup = (konvaImg: Konva.Image) => {
            this.mRnaGroupUncomplete.add(konvaImg);
        };

        const completeGroup = (konvaImg: Konva.Image) => {
            this.mRnaGroupComplete.add(konvaImg);
        };

        await this.loadImage(greyLine as any,  Constant.mRNAUncompleteImg as ImageConfig).then(upcompleteGroup);
        await this.loadImage(point as any,     Constant.mRNAPointImg as ImageConfig).then(upcompleteGroup);

        await this.loadImage(mRNA1 as any,  Constant.mRNA1Img as ImageConfig).then(completeGroup);
        await this.loadImage(mRNA2 as any,  Constant.mRNA2Img as ImageConfig).then(completeGroup);
        await this.loadImage(mRNA3 as any,  Constant.mRNA3Img as ImageConfig).then(completeGroup);
        await this.loadImage(mRNA4 as any,  Constant.mRNA4Img as ImageConfig).then(completeGroup);
        await this.loadImage(mRNA5 as any,  Constant.mRNA5Img as ImageConfig).then(completeGroup);

        return new Promise<boolean>((resolve) => {
            resolve(true);
        });
    }

    /**
     * 初始化灰色肽链
     */
    initGrayPeptide() {
        this.loadImage(rectangle as any,  Constant.petideBorderImg as ImageConfig).then(this.loadImageSuccessCalll);

        this.loadImage(grayPeptide as any,   Constant.grayPetideChainImg  as ImageConfig).then(this.loadgrayPetideChainImg);
        this.loadImage(grayPeptide1 as any,  Constant.grayPetideChain1Img as ImageConfig).then(this.loadgrayPetideChainImg);
        this.loadImage(grayPeptide2 as any,  Constant.grayPetideChain2Img as ImageConfig).then(this.loadgrayPetideChainImg);
        this.loadImage(grayPeptide3 as any,  Constant.grayPetideChain3Img as ImageConfig).then(this.loadgrayPetideChainImg);
        setTimeout( () => {this.staticLayer.findOne('#grayPetideChain').draw(); }, 300);
        setTimeout( () => {this.staticLayer.findOne('#grayPetide1Chain').draw(); }, 300);
        setTimeout( () => {this.staticLayer.findOne('#grayPetide2Chain').draw(); }, 300);
        setTimeout( () => {this.staticLayer.findOne('#grayPetide3Chain').draw(); }, 300);
    }

    /**
     * 初始化肽链
     */
    initPeptide() {
        this.loadImage(peptide as any,   Constant.petideChainImg  as ImageConfig).then(this.loadImageSuccessCalll);
        this.loadImage(peptide1 as any,  Constant.petideChain1Img as ImageConfig).then(this.loadImageSuccessCalll);
        this.loadImage(peptide2 as any,  Constant.petideChain2Img as ImageConfig).then(this.loadImageSuccessCalll);
        this.loadImage(peptide3 as any,  Constant.petideChain3Img as ImageConfig).then(this.loadImageSuccessCalll);

    }

    /**
     * 初始化箭头
     */
    initRedArrow() {
        this.loadImage(arrow01 as any,  Constant.redArrow1Img as ImageConfig).then(this.loadImageSuccessCalll);

        this.loadImage(redArrow as any,  Constant.redArrow2Img as ImageConfig).then(this.loadImageSuccessCalll);
        this.loadImage(redArrow as any,  Constant.redArrow3Img as ImageConfig).then(this.loadImageSuccessCalll);
        this.loadImage(redArrow as any,  Constant.redArrow4Img as ImageConfig).then(this.loadImageSuccessCalll);
        this.loadImage(redArrow as any,  Constant.redArrow5Img as ImageConfig).then(this.loadImageSuccessCalll);

    }

    hitmRNA(x: any, y: any, letter: any) {
        x = x - document.getElementById('box').offsetLeft;
        y = y - document.getElementById('box').offsetTop;

        this.dnaAnimation.hitmRNA(x / 1.2, y / 1.2, letter);
    }

    //初始化组
    initGroup() {
        this.dnaGroupUncomplete = new Group();
        this.layer.add(this.dnaGroupUncomplete);
        this.stage.add(this.layer);

        this.dnaGroupComplete = new Group();
        this.layer.add(this.dnaGroupComplete);
        this.stage.add(this.layer);

        this.mRnaGroupUncomplete = new Group({id: 'mRnaGroupUncomplete'});
        this.layer.add(this.mRnaGroupUncomplete);
        this.stage.add(this.layer);

        this.mRnaGroupComplete = new Group({id: 'mRnaGroupComplete'});
        this.layer.add(this.mRnaGroupComplete);
        this.stage.add(this.layer);

    }

    /**
     * 正常dna
     */
    complete() {
        this.dnaAnimation.completeAnimation();

        this.layer.findOne('#redArrow1').hide();
        this.layer.findOne('#redArrow1').draw();

        if (this.dnaAnimation.outoTranslate) {
            this.hideArrow();
            this.layer.findOne('#redArrow2').show();
            this.layer.findOne('#redArrow2').draw();
        } else {
            this.layer.findOne('#redArrow1').show();
            this.layer.findOne('#redArrow1').draw();
        }
    }


    /**
     * 缺失1
     */
    miss1() {
        this.dnaAnimation.miss1Animation();

        if (this.dnaAnimation.outoTranslate) {
            this.hideArrow();
            this.layer.findOne('#redArrow3').show();
            this.layer.findOne('#redArrow3').draw();
        } else {
            this.layer.findOne('#redArrow1').show();
            this.layer.findOne('#redArrow1').draw();
        }

    }

    /**
     * 缺失2
     */
    miss2() {
        this.dnaAnimation.miss2Animation();

        if (this.dnaAnimation.outoTranslate) {
            this.hideArrow();
            this.layer.findOne('#redArrow4').show();
            this.layer.findOne('#redArrow4').draw();
        } else {
            this.layer.findOne('#redArrow1').show();
            this.layer.findOne('#redArrow1').draw();
        }
    }

    /**
     * 缺失3
     */
    miss3() {
        this.dnaAnimation.miss3Animation();

        if (this.dnaAnimation.outoTranslate) {
            this.hideArrow();
            this.layer.findOne('#redArrow5').show();
            this.layer.findOne('#redArrow5').draw();
        } else {
            this.layer.findOne('#redArrow1').show();
            this.layer.findOne('#redArrow1').draw();
        }
    }

    /**
     * 隐藏箭头
     */
    hideArrow() {
        this.layer.findOne('#redArrow2').hide();
        this.layer.findOne('#redArrow3').hide();
        this.layer.findOne('#redArrow4').hide();
        this.layer.findOne('#redArrow5').hide();

        this.layer.findOne('#redArrow2').draw();
        this.layer.findOne('#redArrow3').draw();
        this.layer.findOne('#redArrow4').draw();
        this.layer.findOne('#redArrow5').draw();
    }

    translate() {

        console.log('比较数组' + this.dnaAnimation.compareUserData());
        if ( (this.dnaAnimation.currentStatus === 'uncomplete') ||
            (   !this.dnaAnimation.compareUserData() && this.dnaAnimation.successed === false)) {
            return;
        }
        console.log('排序成功');
        this.dnaAnimation.successed = true;
        this.viewModel.$data.disabled = false;
        switch (this.dnaAnimation.currentStatus) {
            case 'miss1':
                // this.hideArrow();
                this.layer.findOne('#petide1Chain').show();
                this.layer.findOne('#petide1Chain').draw();
                this.staticLayer.findOne('#grayPetide1Chain').hide();
                this.staticLayer.findOne('#grayPetide1Chain').draw();
                // this.layer.findOne('#redArrow3').show();
                // this.layer.findOne('#redArrow3').draw();
                setTimeout( () => {this.layer.findOne('#petide1Chain').draw(); }, 300);

                break;
            case 'miss2':
                // this.hideArrow();
                this.layer.findOne('#petide2Chain').show();
                this.layer.findOne('#petide2Chain').draw();
                this.staticLayer.findOne('#grayPetide2Chain').hide();
                this.staticLayer.findOne('#grayPetide2Chain').draw();
                // this.layer.findOne('#redArrow4').show();
                // this.layer.findOne('#redArrow4').draw();
                setTimeout( () => {this.layer.findOne('#petide2Chain').draw(); }, 300);
                break;
            case 'miss3':
                // this.hideArrow();
                this.layer.findOne('#petide3Chain').show();
                this.layer.findOne('#petide3Chain').draw();
                this.staticLayer.findOne('#grayPetide3Chain').hide();
                this.staticLayer.findOne('#grayPetide3Chain').draw();
                // this.layer.findOne('#redArrow5').show();
                // this.layer.findOne('#redArrow5').draw();
                setTimeout( () => {this.layer.findOne('#petide3Chain').draw(); }, 300);
                break;
            case 'complete':
                // this.hideArrow();
                this.layer.findOne('#petideChain').show();
                this.layer.findOne('#petideChain').draw();
                this.staticLayer.findOne('#grayPetideChain').hide();
                this.staticLayer.findOne('#grayPetideChain').draw();
                // this.layer.findOne('#redArrow2').show();
                // this.layer.findOne('#redArrow2').draw();
                setTimeout( () => {this.layer.findOne('#petideChain').draw(); }, 300);
                break;
        }
        console.log('show ' + this.dnaAnimation.currentStatus + '肽链');
        this.layer.findOne('#border').moveToBottom();
        this.layer.draw();
        this.staticLayer.draw();
    }

    autoTranslate() {
        if ( this.dnaAnimation.successed === false && this.dnaAnimation.currentStatus !== 'uncomplete') {
            console.log('禁用');
            this.viewModel.$data.disabled = true;
            this.viewModel.$data.translateDisabled = true;
        }
        this.layer.findOne('#redArrow1').hide();
        this.layer.findOne('#redArrow1').draw();

        this.dnaAnimation.autoTranslate();
    }


    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        this.dnaAnimation.toUncomplete();
        this.viewModel.$data.disabled = false;
        this.dnaAnimation.manualTranscription = 0;
        this.dnaAnimation.totalTranscription = 1;
        this.dnaAnimation.outoTranslate = false;
        this.layer.findOne('#petide1Chain').hide();
        this.layer.findOne('#petide2Chain').hide();
        this.layer.findOne('#petide3Chain').hide();
        this.layer.findOne('#petideChain').hide();

        this.staticLayer.findOne('#grayPetideChain').show();
        this.staticLayer.findOne('#grayPetide1Chain').show();
        this.staticLayer.findOne('#grayPetide2Chain').show();
        this.staticLayer.findOne('#grayPetide3Chain').show();

        this.layer.findOne('#redArrow1').hide();
        this.layer.findOne('#redArrow2').hide();
        this.layer.findOne('#redArrow3').hide();
        this.layer.findOne('#redArrow4').hide();
        this.layer.findOne('#redArrow5').hide();

        this.layer.draw();
        this.staticLayer.draw();

        setTimeout( () => {this.staticLayer.findOne('#grayPetideChain').draw(); }, 300);
        setTimeout( () => {this.staticLayer.findOne('#grayPetide1Chain').draw(); }, 300);
        setTimeout( () => {this.staticLayer.findOne('#grayPetide2Chain').draw(); }, 300);
        setTimeout( () => {this.staticLayer.findOne('#grayPetide3Chain').draw(); }, 300);
    }

}
