/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/8/19 21:10
 */
import Vue from 'vue';
import {
    Mesh, Vector3, Engine, HemisphericLight, Scene, MeshBuilder, ShaderMaterial, Vector2
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Utils } from './Utils';

import * as path from '../sub_static/image/path.png';
import * as pathbg from '../sub_static/image/pathbg.png';
import * as tip from '../sub_static/image/tip.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;

    bgfront: ShaderMaterial;
    text: GUI.TextBlock; //气温标签文字
    Image: GUI.Image; //气温标签贴图
    TipImage: Mesh; //气温标签定位点
    edgesWidth = 6;

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
        scene.clearColor.set(0.8627450980392157, 0.9411764705882353, 0.8156862745098039, 1);
        this.createTargetCamera4Math(scene, 400);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.changeCamera(500);
        }
        this.camera.position.x = 80;
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;
        this.TipImage = new Mesh('ti');
        this.TipImage.position.y = -301;

        const options = { width: 831, height: 575 };
        const bg = Utils.CreateTexture(`${pathbg}`, 1, 1, 0, 0, scene);
        const beerbg = Utils.CreatePlan(bg, new Vector3(5, -15, 0), options, scene);
        beerbg.isPickable = false;

        this.bgfront = Utils.CreateMaterial(path, scene);
        const plan = MeshBuilder.CreatePlane('plan', options, scene);
        plan.material = this.bgfront;
        plan.position = new Vector3(5, -15, 0);
        plan.isPickable = false;

        const ImageLabelOptions = {
            height: '43px', width: '138px', color: '#FFFFFF',
            linkOffsetX: '50px', linkOffsetY: '0px'
        };
        const option2 = { color: '#1A1A1A', fontSize: '16px', fontFamily: '', fontStyle: 'bold' };
        this.text = FastCreater.TextBlock('2°C', option2);
        this.text.paddingLeft = '70px';
        this.text.textWrapping = GUI.TextWrapping.Clip;
        this.Image = LabelUtils.CreateImageTextLabel(advancedTexture, this.TipImage, `${tip}`, ImageLabelOptions, [this.text]);
        this.reset();
        return scene;
    }

    /**
     * 获取温度标签X轴数值
     * @param y
     */
    GetX2FromYPoint(y: number): Vector3 {
        let x = 0;
        if (y > 270) {
            y = 270;
            x = 25;
        } else if (y <= 270 && y > -25) {
            x = Math.sqrt(-(y - 270) / 0.5) * 8 + 25;
        } else {
            x = Math.sqrt(-(y + 25) / 0.5) * 8 + 222;
        }
        return new Vector3(x, y, 0);
    }

    /**
     * 选择表达式
     * @param index
     */
    formatter(index: number) {
        const posy = (index - 8 - 26) / 52 * 571 - 15.5;
        this.bgfront.setVector2('pos', new Vector2(0, posy));
        this.TipImage.position = this.GetX2FromYPoint(posy);
        this.text.text = `${(30 - index / 30 * 18).toFixed(1)}°C`;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.formatter(8);
    }
}
