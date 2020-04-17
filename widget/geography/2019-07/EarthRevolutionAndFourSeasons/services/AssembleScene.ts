/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/7/19 21:10
 */
import Vue from 'vue';
import {
    Vector3, Color3, Texture, ArcRotateCamera, TransformNode,
    Mesh, ShaderMaterial, StandardMaterial, Scene, SceneLoader, AbstractMesh, Engine, Effect, Material, HemisphericLight
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';

import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from './Base2DScene';
import { Utils } from './Utils';
import { DrawEarth } from '../../../../babylon/Geography/util/DrawEarth';
import { DrawEarthLabel } from '../../../../babylon/Geography/util/DrawEarthLabel';

import * as suntex from '../sub_static/sun.jpg';
import * as earthday from '../sub_static/earthday.jpg';
import * as earthnight from '../sub_static/earthnight.jpg';
import * as dot from '../sub_static/dot.png';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import * as path from '../sub_static/path.glb';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    r = 2;
    lineradius = this.r + 0.01;

    earthgroup: TransformNode;
    earthp: Mesh;
    earthpangle: TransformNode;
    earthforMaterial: ShaderMaterial;
    sun: Mesh; //太阳
    earthLinegroup: TransformNode; //纬线组
    alpha = 0;
    beta = 0;
    cra = 40; //长半轴
    crb = 30; //短半轴

    nextV: number; //下一个地球坐标方程值位置
    nextPos: Vector3; //下一个地球位置
    index = 0;
    //季节位置
    springPos: Vector3;
    summerPos: Vector3;
    autumnPos: Vector3;
    winterPos: Vector3;

    springM: Mesh;
    summerM: Mesh;
    autumnM: Mesh;
    winterM: Mesh;

    springDot: GUI.Control;
    summerDot: GUI.Control;
    autumnDot: GUI.Control;
    winterDot: GUI.Control;

    cameraPos: Vector3; //相机位置
    cameraTargetPos: Vector3; //摄像机目标位置
    boolCameraMove = false; //是否移动摄像机
    boolCameraBack = false; //是否返回大视图
    boolCameraTargetMove = false; //是否移动摄像机目标

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.defaultHardwareScalingLevel = 0.8;
        this.init();
    }
    /** 
     * 初始化 
     */
    init() {
        super.init();
        if (Engine.isSupported()) {
            this.registerBeforeRender();
        }
    }

    /**
     * 创建相机
     * @param scene 
     */
    createArcRotateCamera(scene: Scene): ArcRotateCamera {
        const camera = new ArcRotateCamera('Camera', 0, 0, 100, Vector3.Zero(), scene);
        camera.attachControl(this.canvas, true);
        camera.lowerRadiusLimit = 80;
        camera.upperRadiusLimit = 120;
        camera.position = new Vector3(0, 20, -90);
        scene.activeCameras.push(camera);
        return camera;
    }

    /**
     * 创建太阳
     * @param scene 
     */
    createSun(scene: Scene): Mesh {
        const sunMat = Utils.CreateMaterial(`${suntex}`, scene, new Color3(119, 119, 2));
        const sun = Mesh.CreateSphere('sun', 32, 10, scene);
        sun.position = new Vector3(10, 0, 0);
        sun.material = sunMat;
        sun.isPickable = false;
        return sun;
    }

    /**
     * 创建地球材质
     * @param scene 
     */
    createMaterial(scene: Scene): ShaderMaterial {
        const earthdaySampler = new Texture(`${earthday}`, scene);
        const earthnightSampler = new Texture(`${earthnight}`, scene);
        Effect.ShadersStore['customVertexShader'] = this.customVertexShader;
        Effect.ShadersStore['shadowFragmentShader'] = this.shadowFragmentShader;
        const earthforMaterial = new ShaderMaterial('shader', scene, {
            vertex: 'custom', fragment: 'shadow',
        }, {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection']
        });
        earthforMaterial.setTexture('daySampler', earthdaySampler);
        earthforMaterial.setTexture('nightSampler', earthnightSampler);
        earthforMaterial.setVector3('cameraPosition', this.camera.position);
        earthforMaterial.setVector3('vLightPosition', this.sun.position);
        earthforMaterial.backFaceCulling = false;
        earthforMaterial.freeze();
        return earthforMaterial;
    }

    /**
     * 创建地球
     * @param r 
     * @param material 
     * @param parent 
     * @param scene 
     */
    createEarth(r: number, material: Material, parent: TransformNode, scene: Scene) {
        const earth = Mesh.CreateSphere('earth', 32, 2 * r, scene);
        earth.material = material;
        earth.rotation = new Vector3(0, 0, Math.PI);
        earth.setParent(parent);
        earth.isPickable = false;
        const sliderR = r + 0.6;
        const cylinderMat = new StandardMaterial('cylinder', scene);
        cylinderMat.emissiveColor = Color3.Gray();
        cylinderMat.freeze();
        const cylinder = Mesh.CreateCylinder('cylinder', 2 * sliderR + 0.6, 0.05, 0.05, 16, 1, scene);
        cylinder.material = cylinderMat;
        cylinder.setParent(parent);
        cylinder.isPickable = false;
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
     * 初始化触发点
     * @param scene 
     */
    initPos(scene: Scene) {
        this.autumnPos = Utils.GetEllipsePoint(this.cra, this.crb, 270);
        this.winterPos = Utils.GetEllipsePoint(this.cra, this.crb, 0);
        this.springPos = Utils.GetEllipsePoint(this.cra, this.crb, 90);
        this.summerPos = Utils.GetEllipsePoint(this.cra, this.crb, 180);

        const material = new StandardMaterial('cylinder', scene);
        material.diffuseColor = new Color3(0, 0, 0.5);
        material.specularColor = new Color3(0, 0, 0);
        material.emissiveColor = new Color3(0, 0, 0.5);
        material.alpha = 0.5;
        this.springM = this.createDot('1', this.r, this.springPos, material, scene);
        this.summerM = this.createDot('2', this.r, this.summerPos, material, scene);
        this.autumnM = this.createDot('3', this.r, this.autumnPos, material, scene);
        this.winterM = this.createDot('4', this.r, this.winterPos, material, scene);
        material.freeze();
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.9490196078431372, 0.9725490196078431, 1, 1);
        const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
        light.intensity = 0.1;
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
        }
        this.initPos(scene);

        const tipA = Mesh.CreateSphere('1tipA', 8, 0.5, scene);
        tipA.position = this.springPos;
        const tipC = Mesh.CreateSphere('2tipC', 8, 0.5, scene);
        tipC.position = this.summerPos;
        const tipB = Mesh.CreateSphere('3tipB', 8, 0.5, scene);
        tipB.position = this.autumnPos;
        const tipP = Mesh.CreateSphere('4tipP', 8, 0.5, scene);
        tipP.position = this.winterPos;
        this.setMeshVisible([tipP, tipA, tipB, tipC], false);

        this.springDot = LabelUtils.CreateImageLabel(advancedTexture, tipA, dot, ImageLabelOption);
        this.summerDot = LabelUtils.CreateImageLabel(advancedTexture, tipC, dot, ImageLabelOption);
        this.autumnDot = LabelUtils.CreateImageLabel(advancedTexture, tipB, dot, ImageLabelOption);
        this.winterDot = LabelUtils.CreateImageLabel(advancedTexture, tipP, dot, ImageLabelOption);

        this.setGUIVisible([this.springDot, this.summerDot, this.autumnDot, this.winterDot], false);
        this.camera = this.createArcRotateCamera(scene);
        this.sun = this.createSun(scene);
        this.earthforMaterial = this.createMaterial(scene);
        this.earthgroup = new TransformNode('g', scene);
        this.earthLinegroup = new TransformNode('p', scene);
        this.earthLinegroup.setParent(this.earthgroup);
        this.createWeftAndWarpLabel(scene);
        this.createWeftAndWarpLine(scene);
        this.earthp = new Mesh('p', scene);
        this.earthpangle = new TransformNode('p', scene);
        this.earthgroup.setParent(this.earthpangle);
        this.earthpangle.setParent(this.earthp);
        this.createEarth(this.r, this.earthforMaterial, this.earthgroup, scene);
        this.earthp.position = new Vector3(0, 0, 20);
        this.earthpangle.rotation = new Vector3(0, 0, -Math.PI / 180 * 23.6);
        this.earthgroup.rotation = new Vector3(0, Math.PI / 180, 0);
        this.earthp.position = Utils.GetEllipsePoint(this.cra, this.crb, 0);
        SceneLoader.ImportMesh('', path.replace('path.glb', ''), 'path.glb', scene, (v) => { this.importMeshSuccess(v); });

        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }
    importMeshSuccess(meshes: AbstractMesh[]) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
        }
    }

    /** 
     * 创建地球经纬网
     */
    createWeftAndWarpLine(scene: Scene) {
        const DashedLineColor = new Color3(1, 1, 0);
        DrawEarth.CreateWeft( 23.26, this.lineradius, 360, DashedLineColor, true, this.earthLinegroup); //创建回归线；
        DrawEarth.CreateWeft( 23.26, this.lineradius, 360, DashedLineColor, false, this.earthLinegroup);
        DrawEarth.CreateWeft( 66.74, this.lineradius, 360, DashedLineColor, false, this.earthLinegroup); //创建极圈；
        DrawEarth.CreateWeft( 66.74, this.lineradius, 360, DashedLineColor, true, this.earthLinegroup);
        DrawEarth.CreateWeft( 0, this.lineradius, 360, DashedLineColor, true, this.earthLinegroup);
        this.earthLinegroup.rotation = new Vector3(0, Math.PI / 18, 0);
    }
    /** 
     * 创建地球经纬标签 
     */
    createWeftAndWarpLabel(scene: Scene) {
        const textColor = '#cccccc';
        const fontSize = 20;
        DrawEarthLabel.CreateWeftLineLabel(textColor, fontSize, 23.26, this.lineradius, this.earthgroup, scene, false);
        DrawEarthLabel.CreateWeftLineLabel(textColor, fontSize, 23.26, this.lineradius, this.earthgroup, scene, true);
        DrawEarthLabel.CreateWeftLineLabel(textColor, fontSize, 66.74, this.lineradius, this.earthgroup, scene, false);
        DrawEarthLabel.CreateWeftLineLabel(textColor, fontSize, 66.74, this.lineradius, this.earthgroup, scene, true);
        DrawEarthLabel.CreateWeftLineLabel(textColor, fontSize, 0, this.lineradius, this.earthgroup, scene, true);
    }
    /** 
     * BeforeRender循环 
     */
    registerBeforeRender() {
        this.scene.registerBeforeRender(() => {
            this.earthgroup.rotation = new Vector3(0, -this.beta + Math.PI / 180, 0);
            this.beta += 0.01;
            if (this.viewModel.buttonActived === 0) {
                this.earthp.position = Utils.GetEllipsePoint(this.cra, this.crb, this.alpha);
                this.alpha += 0.1;
            } else {
                if (Vector3.Distance(this.earthp.position, this.nextPos) > 0.01) {
                    this.earthp.position = Utils.GetEllipsePoint(this.cra, this.crb, this.alpha);
                    const p = Math.abs(this.nextV - this.alpha) / 10;
                    this.alpha += p > 10 ? 10 : p < 0.01 ? 0.01 : p;
                } else {
                    this.earthp.position = Utils.GetEllipsePoint(this.cra, this.crb, this.nextV);
                    this.alpha = this.nextV;
                }
                if (Vector3.Distance(this.earthp.position, this.nextPos) < 0.11) {
                    this.springDot.isVisible = Vector3.Distance(this.earthp.position, this.springPos) <= 0.1;
                    this.summerDot.isVisible = Vector3.Distance(this.earthp.position, this.summerPos) <= 0.1;
                    this.autumnDot.isVisible = Vector3.Distance(this.earthp.position, this.autumnPos) <= 0.1;
                    this.winterDot.isVisible = Vector3.Distance(this.earthp.position, this.winterPos) <= 0.1;
                }
            }
            if (this.alpha >= 360) {
                this.alpha = 0;
            }

            if (this.boolCameraMove) {
                if (this.boolCameraBack === true) {
                    if (Vector3.Distance(this.camera.position, new Vector3(0, 30, -70)) > 1) {
                        this.camera.position =
                            this.camera.position.add(new Vector3(0, 30, -70).subtract(this.camera.position).scale(0.5));
                    } else {
                        this.boolCameraBack = false;
                        this.setGUIVisible([this.springDot, this.summerDot, this.autumnDot, this.winterDot], false);
                    }
                } else {
                    if (Vector3.Distance(this.camera.position, this.cameraPos) > 0.01) {
                        this.camera.position = this.camera.position.add(this.cameraPos.subtract(this.camera.position).scale(0.2));
                    } else {
                        this.boolCameraMove = false;
                        this.camera.attachControl(this.canvas, true);
                        (this.camera as ArcRotateCamera).upperRadiusLimit = 15;
                        this.camera.position = this.cameraPos;
                    }
                }
            }

            if (this.boolCameraTargetMove) {
                if (Vector3.Distance((this.camera as ArcRotateCamera).target, this.cameraTargetPos) > 0.01) {
                    (this.camera as ArcRotateCamera).setTarget((this.camera as ArcRotateCamera).target.add(
                        this.cameraTargetPos.subtract((this.camera as ArcRotateCamera).target).scale(0.3)));
                } else {
                    this.boolCameraTargetMove = false;
                    (this.camera as ArcRotateCamera).setTarget(this.cameraTargetPos);
                }
            }
        });
    }

    /**
     * '季节'按钮
     * @param i 
     */
    seasons(i: number) {
        if (this.index !== i) {
            this.index = i;
            if (i === 1) {
                this.nextPos = this.springPos.scale(1);
                this.nextV = 90;
                this.cameraPos = new Vector3(0, 5, 20);
                this.cameraTargetPos = new Vector3(0, 0, this.crb);
            } else if (i === 2) {
                this.nextPos = this.summerPos.scale(1);
                this.nextV = 180;
                this.cameraPos = new Vector3(-this.cra, 5, -10);
                this.cameraTargetPos = new Vector3(-this.cra, 0, 0);
            } else if (i === 3) {
                this.nextPos = this.autumnPos.scale(1);
                this.cameraPos = new Vector3(0, 5, -40);
                this.cameraTargetPos = new Vector3(0, 0, -this.crb);
                this.nextV = 270;
            } else if (i === 4) {
                this.nextPos = this.winterPos.scale(1);
                this.nextV = 360;
                this.cameraPos = new Vector3(this.cra, 5, -10);
                this.cameraTargetPos = new Vector3(this.cra, 0, 0);
            }
            (this.camera as ArcRotateCamera).upperRadiusLimit = 120;
            (this.camera as ArcRotateCamera).lowerRadiusLimit = 10;
            this.camera.detachControl(this.canvas);
            this.boolCameraBack = true;
            this.boolCameraMove = true;
            this.boolCameraTargetMove = true;
        }
    }


    /**
     * 按下事件
     * @param currentMesh 
     */
    onPointerDown(currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf(`${this.viewModel.buttonActived}`) !== -1 &&
            Vector3.Distance(this.earthp.position, this.nextPos) < 0.1) {
            this.viewModel.showPlan = this.viewModel.buttonActived;
        }
    }

    /**
     * '重置'按钮
     */
    reset(): void {
        this.index = 0;
        this.viewModel.buttonActived = 0;
        this.alpha = 0;
        this.beta = 0;
        this.boolCameraBack = false;
        this.boolCameraMove = false;
        this.boolCameraTargetMove = false;
        (this.camera as ArcRotateCamera).upperRadiusLimit = 120;
        (this.camera as ArcRotateCamera).lowerRadiusLimit = 10;
        this.camera.position = new Vector3(0, 30, -100);
        (this.camera as ArcRotateCamera).setTarget(Vector3.Zero());
        this.earthgroup.rotation = new Vector3(0, Math.PI / 180, 0);
        this.earthp.position = Utils.GetEllipsePoint(this.cra, this.crb, 0);
        this.camera.detachControl(this.canvas);
        this.setGUIVisible([this.springDot, this.summerDot, this.autumnDot, this.winterDot], false);
    }
}
