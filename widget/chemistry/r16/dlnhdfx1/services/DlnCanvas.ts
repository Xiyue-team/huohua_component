

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import {DlnConfig} from './DlnConfig';
import {Layer} from 'konva';

import * as step1 from '../sub_static/photo/step1.png';
import * as step2 from '../sub_static/photo/step2.png';
import * as step3 from '../sub_static/photo/step3.png';
import * as step4 from '../sub_static/photo/step4.png';
import * as step5 from '../sub_static/photo/step5.png';

import * as bElement from '../sub_static/photo/B@3x.png';
import * as beElement from '../sub_static/photo/Be@3x.png';
import * as liElement from '../sub_static/photo/Li@3x.png';

import * as siElement from '../sub_static/photo/Si@3x.png';
import * as pElement from '../sub_static/photo/P@3x.png';
import * as alElement from '../sub_static/photo/Al@3x.png';

import * as nElement from '../sub_static/photo/N@3x.png';
import * as oElement from '../sub_static/photo/O@3x.png';
import * as flElement from '../sub_static/photo/F@3x.png';

import * as li2Element from '../sub_static/photo/Li2@3x.png';
import * as naElement from '../sub_static/photo/Na@3x.png';
import * as kElement from '../sub_static/photo/K@3x.png';


export class DlnCanvas extends SimpleKonvaTemplate {
    config: DlnConfig;


    group1: Konva.Group;
    group2: Konva.Group;
    group3: Konva.Group;
    group4: Konva.Group;
    group5: Konva.Group;

    private element_B: Konva.Image;
    private element_Be: Konva.Image;
    private element_Li: Konva.Image;

    private element_Si: Konva.Image;
    private element_P: Konva.Image;
    private element_Al: Konva.Image;

    private element_N: Konva.Image;
    private element_O: Konva.Image;
    private element_F: Konva.Image;

    private element_Li2: Konva.Image;
    private element_Na: Konva.Image;
    private element_K: Konva.Image;

    constructor() {
        super('3dModel');

        this.config = new DlnConfig();
        this.group1 = new Konva.Group({visible: true});
        this.group2 = new Konva.Group({visible: false});
        this.group3 = new Konva.Group({visible: false});
        this.group4 = new Konva.Group({visible: false});
        this.group5 = new Konva.Group({visible: false});

        this.initStep1();
        this.initStep2();
        this.initStep3();
        this.initStep4();
        this.initStep5();

    }

    async initStep1() {
        // 步骤1
        const stepImage1 = await this.loadImage((step1 as any), this.config.step1Config as any);
        this.group1.add(stepImage1);

        this.staticLayer.add(this.group1);
        this.stage.add(this.staticLayer);
    }

    async initStep2() {
        // 步骤2
        const stepImage2 = await this.loadImage((step2 as any), this.config.step1Config as any);
        this.group2.add(stepImage2);

        // 元素图片
        this.element_B = await this.loadImage((bElement as any), this.config.bElementConfig as any);
        this.group2.add(this.element_B);

        this.element_Be = await this.loadImage((beElement as any), this.config.beElementConfig as any);
        this.group2.add(this.element_Be);

        this.element_Li = await this.loadImage((liElement as any), this.config.liElementConfig as any);
        this.group2.add(this.element_Li);

        // 元素点
        const liPoint = new Konva.Rect(this.config.liPointConfig as any);
        this.group2.add(liPoint);

        const bePoint = new Konva.Rect(this.config.bePointConfig as any);
        this.group2.add(bePoint);

        const bPoint = new Konva.Rect(this.config.bPointConfig as any);
        this.group2.add(bPoint);

        this.staticLayer.add(this.group2);
        this.stage.add(this.staticLayer);

        this.pointClickEvent(liPoint, this.element_Li);
        this.pointClickEvent(bePoint, this.element_Be);
        this.pointClickEvent(bPoint, this.element_B);
    }

    async initStep3() {
        // 步骤3
        const stepImage3 = await this.loadImage((step3 as any), this.config.step1Config as any);
        this.group3.add(stepImage3);

        // 元素图片
        this.element_Si = await this.loadImage((siElement as any), this.config.siElementConfig as any);
        this.group3.add(this.element_Si);

        this.element_P = await this.loadImage((pElement as any), this.config.pElementConfig as any);
        this.group3.add(this.element_P);

        this.element_Al = await this.loadImage((alElement as any), this.config.alElementConfig as any);
        this.group3.add(this.element_Al);

        // 元素点
        const alPoint = new Konva.Rect(this.config.alPointConfig as any);
        this.group3.add(alPoint);

        const siPoint = new Konva.Rect(this.config.siPointConfig as any);
        this.group3.add(siPoint);

        const pPoint = new Konva.Rect(this.config.pPointConfig as any);
        this.group3.add(pPoint);

        this.staticLayer.add(this.group3);
        this.stage.add(this.staticLayer);

        this.pointClickEvent(alPoint, this.element_Al);
        this.pointClickEvent(siPoint, this.element_Si);
        this.pointClickEvent(pPoint, this.element_P);
    }

    async initStep4() {
        // 步骤4
        const stepImage4 = await this.loadImage((step4 as any), this.config.step1Config as any);
        this.group4.add(stepImage4);

        // 元素图片
        this.element_N = await this.loadImage((nElement as any), this.config.nElementConfig as any);
        this.group4.add(this.element_N);

        this.element_O = await this.loadImage((oElement as any), this.config.oElementConfig as any);
        this.group4.add(this.element_O);

        this.element_F = await this.loadImage((flElement as any), this.config.fElementConfig as any);
        this.group4.add(this.element_F);

        // 元素点
        const nPoint = new Konva.Rect(this.config.nPointConfig as any);
        this.group4.add(nPoint);

        const oPoint = new Konva.Rect(this.config.oPointConfig as any);
        this.group4.add(oPoint);

        const fPoint = new Konva.Rect(this.config.fPointConfig as any);
        this.group4.add(fPoint);

        this.staticLayer.add(this.group4);
        this.stage.add(this.staticLayer);

        this.pointClickEvent(nPoint, this.element_N);
        this.pointClickEvent(oPoint, this.element_O);
        this.pointClickEvent(fPoint, this.element_F);
    }

    async initStep5() {
        // 步骤5
        const stepImage5 = await this.loadImage((step5 as any), this.config.step1Config as any);
        this.group5.add(stepImage5);


        this.element_Li2 = await this.loadImage((li2Element as any), this.config.li2ElementConfig as any);
        this.group5.add(this.element_Li2 );

        this.element_Na = await this.loadImage((naElement as any), this.config.naElementConfig as any);
        this.group5.add(this.element_Na );

        this.element_K = await this.loadImage((kElement as any), this.config.kElementConfig as any);
        this.group5.add(this.element_K );

        // 元素点
        const li2Point = new Konva.Rect(this.config.li2PointConfig as any);
        this.group5.add(li2Point);

        const naPoint = new Konva.Rect(this.config.naPointConfig as any);
        this.group5.add(naPoint);

        const kPoint = new Konva.Rect(this.config.kPointConfig as any);
        this.group5.add(kPoint);

        this.staticLayer.add(this.group5);
        this.stage.add(this.staticLayer);

        this.pointClickEvent(li2Point, this.element_Li2);
        this.pointClickEvent(naPoint, this.element_Na);
        this.pointClickEvent(kPoint, this.element_K);
    }

    hideGroup() {
        this.group1.visible(false);
        this.group2.visible(false);
        this.group3.visible(false);
        this.group4.visible(false);
        this.group5.visible(false);
    }

    hideImage() {
        this.element_B.visible(false);
        this.element_Be.visible(false);
        this.element_Li.visible(false);

        this.element_Si.visible(false);
        this.element_P.visible(false);
        this.element_Al.visible(false);

        this.element_N.visible(false);
        this.element_O.visible(false);
        this.element_F.visible(false);

        this.element_Li2.visible(false);
        this.element_Na.visible(false);
        this.element_K.visible(false);
    }

    pointClickEvent(point: Konva.Rect, image: Konva.Image) {
        point.on('click tap', () => {
            if (!image.visible()) {
                image.visible(true);
                console.log('true');
            } else {
                image.visible(false);
                console.log('false');
            }

            image.draw();
            this.staticLayer.draw();
        });

        point.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        point.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });


    }
}

