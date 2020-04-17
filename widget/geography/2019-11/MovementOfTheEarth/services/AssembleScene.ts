/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/12/14 10:10
 */
import Vue from 'vue';
import { ViewModel } from '../ViewModel';
import {
    Vector3, Color3, Scene, Engine, DefaultRenderingPipeline, StandardMaterial, Mesh
} from '@babylonjs/core/Legacy/legacy';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

import { BaseScene } from '../../../../babylon/template/Base/BaseScene';
import { Utils } from './Utils';
import { Earth, EventHandler } from './Earth';
import { Timer } from './Timer';
import { SunAngle } from './SunAngle';
import { Sun, AnimationEventHandler } from './Sun';
import { Sky } from './Sky';
import { Orbit } from './Orbit';
import { TravelCamera } from './TravelCamera';

export class AssembleScene extends BaseScene implements EventHandler, AnimationEventHandler {

    static instance: AssembleScene;
    viewModel: ViewModel;

    r = 4;
    cra = 40; //长半轴
    crb = 30; //短半轴
    alpha = 10; // 公转角度
    edgesWidth = 4; // 线宽
    time: Timer; // 时间点
    dirLight: SunAngle; // 太阳高度角组

    hexRed = '#FF5A5A';
    hexYellow = '#ffffff';
    colorRed: Color3;
    colorYellow: Color3;

    earth: Earth; // 地球
    sun: Sun; // 太阳
    type = 0; // 
    sky: Sky;
    travelCamera: TravelCamera; // 漫游相机
    pubRot = false; // 是否公转

    //季节位置
    springPos = new Vector3(0, 0, 30);
    summerPos = new Vector3(-40, 0, 0);
    autumnPos = new Vector3(0, 0, -30);
    winterPos = new Vector3(40, 0, 0);
    currentPos = Vector3.Zero();
    springM: Mesh;
    summerM: Mesh;
    autumnM: Mesh;
    winterM: Mesh;

    constructor(vm: Vue) {
        super();
        AssembleScene.instance = this;
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
        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorYellow = Color3.FromHexString(this.hexYellow);

        this.earth = new Earth('earth', this.r, advancedTexture, this, scene);
        this.sun = new Sun('sun', 6, this.earth.sunPlanMat, this, scene);
        this.sun.position.x = 3;
        this.travelCamera = new TravelCamera('Camera', 0, 0, 13, Vector3.Zero(), scene).setCanvas(canvas);

        this.time = new Timer('timer', this.r, advancedTexture, scene);
        this.dirLight = new SunAngle('dirLight', this.r, advancedTexture, scene);
        this.earth.updateAllMaterial(this.travelCamera.position, this.sun.position);

        this.sky = new Sky('sky', scene);
        const material = new StandardMaterial('cylinder', scene);
        material.diffuseColor = new Color3(0, 0, 0.5);
        material.specularColor = new Color3(0, 0, 0);
        material.emissiveColor = new Color3(0, 0, 0.5);
        material.alpha = 0.5;
        this.springM = this.createDot('1', this.r, this.springPos, material, scene);
        this.summerM = this.createDot('2', this.r, this.summerPos, material, scene);
        this.autumnM = this.createDot('3', this.r, this.autumnPos, material, scene);
        this.winterM = this.createDot('4', this.r, this.winterPos, material, scene);
        this.setMeshVisible([this.springM, this.summerM, this.autumnM, this.winterM], false);
        scene.registerBeforeRender(() => {
            if (this.pubRot) {
                const nowPos = Orbit.GetEllipsePoint(this.cra, this.crb, this.alpha);
                this.dirLight.position = this.time.position = this.earth.position = nowPos;

                const pos = Utils.SortPos([this.springPos, this.summerPos, this.autumnPos, this.winterPos], nowPos);
                if (Vector3.Distance(pos, Vector3.Zero()) > 1 && this.currentPos !== pos) {
                    this.currentPos = pos;
                    this.earth.setButtonVisible(true);
                    this.pubRot = false;
                    this.viewModel.btn[2].disabled = this.viewModel.btn[3].disabled = false;
                }
                this.alpha += 1;
                if (this.alpha >= 360) {
                    this.alpha = 0;
                }
            }
        });

        const defaultPipeline = new DefaultRenderingPipeline('default', true, scene, [this.travelCamera]);
        defaultPipeline.samples = 8;
        defaultPipeline.imageProcessingEnabled = false;
        this.reset();
        return scene;
    }

    /**
     * 按钮回调
     */
    go(): void {
        this.pubRot = true;
        this.viewModel.btn[2].disabled = this.viewModel.btn[3].disabled = true;
    }

    animationFinish(): void {
        this.setMeshVisible([this.springM, this.summerM, this.autumnM, this.winterM], this.pubRot);
    }
    /**
     * 按钮组
     * @param type
     * @param active
     */
    selectModeEvent(type: number, active: boolean) {
        if (type === 0) {
            this.earth.updatePlanVisible(active);
            this.sun.updatePlanVisible(active);
        } else if (type === 1) {
            this.earth.hasShadow(active);
        } else if (type === 2) {
            if (active && this.viewModel.isPuclicRotate) {
                this.puclicRotate(false);
                this.viewModel.isPuclicRotate = false;
            }
            this.dirLight.setVisible(active);
        } else if (type === 3) {
            if (active && this.viewModel.isPuclicRotate) {
                this.puclicRotate(false);
                this.viewModel.isPuclicRotate = false;
            }
            this.time.setLabelVisible(active);
        }
    }
    /**
     * 创建四个弹窗触发点
     * @param name 
     * @param r 
     * @param position 
     * @param material 
     * @param scene 
     */
    createDot(name: string, r: number, position: Vector3, material: StandardMaterial, scene: Scene): Mesh {
        const dots = Mesh.CreateSphere(name + 'tp', 32, 2 * r - 1, scene);
        dots.position = position;
        dots.material = material;
        dots.isPickable = false;
        return dots;
    }
    /**
     * 自传按钮
     * @param active
     */
    selfRotate(active: boolean) {
        this.earth.setSelfRotate(active);
    }

    /**
     * 公转按钮
     * @param active
     */
    puclicRotate(active: boolean) {
        this.pubRot = active;
        if (active) {
            this.travelCamera.setTargetPos(Vector3.Zero(), new Vector3(0, 30, -90), active);
            this.sun.setAnima(Vector3.Zero(), Vector3.One());
        } else {
            this.setMeshVisible([this.springM, this.summerM, this.autumnM, this.winterM], false);
            const earthPos = this.earth.getAbsolutePosition();
            const selfCameraPos =
                earthPos.clone().add(Vector3.Cross(earthPos, Vector3.Down()).normalize().scale(18).add(Vector3.Up().scale(5)));
            this.travelCamera.setTargetPos(earthPos, selfCameraPos, active);
            this.sun.setAnima(Vector3.One(), Vector3.Zero());
        }
        this.earth.setAnima(active).setPubRotate(active).setButtonVisible(false);
    }

    /** 重置按钮按下 */
    reset(): void {
        if (this.scene) {
            this.scene.stopAllAnimations();
        }
        this.earth.setButtonVisible(false).setSelfRotate(false).setPubRotate(false).hasShadow(false).updatePlanVisible(false);
        this.pubRot = false;
        this.alpha = 10;
        const earth_Pos = Orbit.GetEllipsePoint(this.cra, this.crb, this.alpha);
        this.dirLight.position = this.time.position = this.earth.position = earth_Pos;
        this.dirLight.setVisible(false);
        this.sun.updatePlanVisible(false);
        this.sun.sunMesh.scaling = Vector3.Zero();
        this.sun.orbit.isVisible = false;
        this.time.setLabelVisible(false);
        this.dirLight.setVisible(false);
        this.travelCamera.detachControl(this.canvas);
        this.travelCamera.position = earth_Pos.clone().add(new Vector3(0, 4, -20));
        this.travelCamera.setTarget(earth_Pos);
        this.travelCamera.reset();
        this.travelCamera.attachControl(this.canvas, true);
        this.animationFinish();
    }
}
