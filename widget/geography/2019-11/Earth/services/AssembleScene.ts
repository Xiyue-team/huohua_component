/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/12/14 10:10
 */
import Vue from 'vue';
import { ViewModel } from '../ViewModel';
import {
    Vector3, Color3, Scene, Engine, DefaultRenderingPipeline
} from '@babylonjs/core/Legacy/legacy';
import { BaseScene } from '../../../../babylon/template/Base/BaseScene';
import { Earth } from './Earth';
import { Sky } from './Sky';
import { TravelCamera } from './TravelCamera';

export class AssembleScene extends BaseScene {
    viewModel: ViewModel;
    r = 4;
    edgesWidth = 4; // 线宽
    hexRed = '#FF5A5A';
    hexYellow = '#ffffff';
    colorRed: Color3;
    colorYellow: Color3;
    earth: Earth; // 地球
    sky: Sky;
    travelCamera: TravelCamera; // 漫游相机

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /**
     * 创建场景
     * */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0, 0, 0, 1);
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorYellow = Color3.FromHexString(this.hexYellow);
        this.earth = new Earth('earth', this.r, scene);
        this.travelCamera = new TravelCamera('Camera', 0, 0, 13, Vector3.Zero(), scene).setCanvas(canvas);
        this.earth.updateAllMaterial(this.travelCamera.position, new Vector3(-1000, 0, 0));
        this.sky = new Sky('sky', scene);
        const defaultPipeline = new DefaultRenderingPipeline('default', true, scene, [this.travelCamera]);
        defaultPipeline.samples = 8;
        defaultPipeline.imageProcessingEnabled = false;
        this.reset();
        return scene;
    }


    /** 重置按钮按下 */
    reset(): void {
        this.earth.hasShadow(false);
        this.travelCamera.detachControl(this.canvas);
        this.travelCamera.position = new Vector3(-5, 5, 15);
        this.travelCamera.attachControl(this.canvas, true);
    }
}
