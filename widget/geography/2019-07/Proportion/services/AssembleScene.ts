import Vue from 'vue';
import {Vector3, Mesh, Texture, Scene, HemisphericLight, Engine} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import {ViewModel} from '../ViewModel';
import {Base2DScene} from '../../../../babylon/template/Base2DScene';
import {Utils} from './Utils';
import {LabelUtils} from '../../../../babylon/GUI/LabelUtils';

import * as Kilometer5 from '../sub_static/Kilometer5.png';
import * as Kilometer50 from '../sub_static/Kilometer50.png';
import * as Kilometer500 from '../sub_static/Kilometer500.png';
import * as Kilometerhalf from '../sub_static/Kilometerhalf.png';
import * as dot from '../sub_static/dot.png';

/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/7/19 21:10
 */

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    bgPlan2: Mesh;
    bgPlan3: Mesh;
    bgPlan4: Mesh;
    bgPlan5: Mesh;
    formatterV = 0;
    picIndex = 3;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /**
     * 窗口尺寸重置
     */
    resize() {
        this.changeCameraSize();
        super.resize();
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        this.createTargetCamera4Math(scene, 500 * 1584 * 0.4);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const ImageLabelOption = {height: '40px', width: '40px', color: '#FFFFFF'};
        if (this.isMob) {
            ImageLabelOption.height = '80px';
            ImageLabelOption.width = '80px';
        }
        LabelUtils.CreateImageLabel(advancedTexture, new Mesh(''), `${dot}`, ImageLabelOption);

        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;

        const bgTex5 = new Texture(`${Kilometerhalf}`, scene);
        bgTex5.hasAlpha = true;
        this.bgPlan5 = Utils.CreatePlan(bgTex5, new Vector3(0, 0, 0), {width: 0.5 * 2826, height: 0.5 * 1584}, scene);
        this.bgPlan5.alphaIndex = 5;

        const bgTex4 = new Texture(`${Kilometer5}`, scene);
        bgTex4.hasAlpha = true;
        this.bgPlan4 = Utils.CreatePlan(bgTex4, new Vector3(0, 0, 0), {width: 5 * 2826, height: 5 * 1584}, scene);
        this.bgPlan4.alphaIndex = 4;

        const bgTex = new Texture(`${Kilometer50}`, scene);
        bgTex.hasAlpha = true;
        this.bgPlan3 = Utils.CreatePlan(bgTex, new Vector3(0, 0, 0), {width: 50 * 2826, height: 50 * 1584}, scene);
        this.bgPlan3.alphaIndex = 3;

        const bgFTex = new Texture(`${Kilometer500}`, scene);
        bgFTex.hasAlpha = true;
        this.bgPlan2 = Utils.CreatePlan(bgFTex, new Vector3(0, 0, 0), {width: 500 * 2826, height: 500 * 1584}, scene);
        this.bgPlan2.alphaIndex = 2;
        this.formatter(0);
        this.addPointerEventListener(canvas, scene);
        return scene;
    }

    /**
     * 手势监听
     * @param canvas
     * @param scene
     */
    addPointerEventListener(canvas: HTMLCanvasElement, scene: Scene) {
        let evCache = new Array();
        let prevDiff = -1;
        // 场景输入坐标监听（按下）
        const onMouseWheel = (event: any) => {
            if (event.deltaY > 0) {
                this.formatterV -= 5;
            } else {
                this.formatterV += 5;
            }
            this.formatterV = this.formatterV >= 0 ? this.formatterV < 300 ? this.formatterV : 300 : 0;
            this.formatter(this.formatterV);
        };
        // 场景输入坐标监听（按下）
        const onPointerDown = (event: any) => {
            prevDiff = -1;
            evCache.push(event);
        };
        // 场景输入坐标监听（移动）
        const onPointerMove = (event: any) => {
            for (let i = 0; i < evCache.length; i++) {
                if (event.pointerId === evCache[i].pointerId) {
                    evCache[i] = event;
                    break;
                }
            }

            if (evCache.length >= 2) {
                const curDiff = Math.sqrt(Math.pow(evCache[1].pageX - evCache[0].pageX, 2) +
                    Math.pow(evCache[1].pageY - evCache[0].pageY, 2)) / 2;
                if (prevDiff > 0) {
                    const dif = curDiff - prevDiff;
                    this.formatterV += dif;
                    this.formatterV = this.formatterV >= 0 ? this.formatterV < 300 ? this.formatterV : 300 : 0;
                    this.formatter(this.formatterV);
                }
                prevDiff = curDiff;
            }
        };

        // 场景输入坐标监听（抬起）
        const onPointerUp = (event: any) => {
            evCache = evCache.filter(item => item.pointerId !== event.pointerId);
        };

        canvas.addEventListener('pointerdown', onPointerDown, false);
        canvas.addEventListener('pointerup', onPointerUp, false);
        canvas.addEventListener('pointermove', onPointerMove, false);
        canvas.addEventListener('wheel', onMouseWheel, false);
        scene.onDispose = function () {
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('wheel', onMouseWheel);
        };
    }

    formatter(n: number) {
        const e = 300 - n;
        const s = Math.pow(10, e / 100);
        const v = s * 0.5 * 1584 * 0.4;
        this.changeCamera(v);
        if (e > 50 && e < 100) {
            this.bgPlan5.material.alpha = (100 - e) / 50;
        } else if (e > 150 && e < 200) {
            this.bgPlan4.material.alpha = (200 - e) / 50;
        } else if (e > 250 && e <= 300) {
            this.bgPlan3.material.alpha = (300 - e) / 50;
        }
        if (this.picIndex !== Math.floor(e / 100)) {
            this.picIndex = Math.floor(e / 100);
            this.viewModel.bg = this.viewModel.pics[Math.floor(e / 100)];
            this.viewModel.right_container = this.viewModel.textList[Math.floor(e / 100)];
        }
    }

    /**
     * '重置'按钮
     */
    reset(): void {
        this.formatterV = 0;
        this.formatter(0);
    }
}
