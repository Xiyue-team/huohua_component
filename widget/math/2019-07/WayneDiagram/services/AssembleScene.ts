/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/7/19 21:10
 */
import Vue from 'vue';
import { Vector3, Engine, HemisphericLight, Texture, Scene } from '@babylonjs/core/Legacy/legacy';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { Utils } from './Utils';
import * as beer from '../sub_static/image/bg.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    beerTex: Texture;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }
    /** 
     * 窗口尺寸重置 
     */
    resize() {
        super.resize();
        this.changeCameraSize();
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 540);
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;
        this.beerTex = Utils.CreateTexture(`${beer}`, 1 / 3, 1 / 2, 0, 0, scene);
        const beerPlan = Utils.CreatePlan(this.beerTex, new Vector3(0, 0, 0), { width: 553, height: 496 }, scene);
        beerPlan.isPickable = false;
        this.reset();
        return scene;
    }

    /**
     * 选择表达式
     * @param index 
     */
    selectChange(index: number) {
        if (index === 0) {
            this.beerTex.uOffset = 1 / 3;
            this.beerTex.vOffset = 1 / 2;
        } else if (index === 1) {
            this.beerTex.uOffset = 0;
            this.beerTex.vOffset = 1 / 2;
        } else if (index === 2) {
            this.beerTex.uOffset = 2 / 3;
            this.beerTex.vOffset = 1 / 2;
        } else if (index === 3) {
            this.beerTex.uOffset = 1 / 3;
            this.beerTex.vOffset = 0;
        } else if (index === 4) {
            this.beerTex.uOffset = 0;
            this.beerTex.vOffset = 0;
        } else if (index === 5) {
            this.beerTex.uOffset = 2 / 3;
            this.beerTex.vOffset = 0;
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.selectChange(0);
    }

}
