import Vue from 'vue';
import {
    Vector3, StandardMaterial, PBRMaterial, HemisphericLight, DirectionalLight,
    Mesh, Scene, CubeTexture, AbstractMesh, Engine, ArcRotateCamera, SceneLoader
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base3DScene } from '../../../../babylon/template/Base3DScene';
import { MaterialUtils, Utils } from './MaterialUtils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as WeatherStation from '../sub_static/weatherStation.babylon';
import * as ganshi from '../sub_static/image/ganshi.png';
import * as reflectivity from '../sub_static/image/reflectivity.png';
import * as environment from '../sub_static/image/environmentSpecular.env';
import * as dot from '../sub_static/dot.png';

/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/14 10:10
 */
export class AssembleScene extends Base3DScene {
    viewModel: ViewModel;
    edgesWidth = 6;
    advancedTexture: GUI.AdvancedDynamicTexture;
    camera: ArcRotateCamera;
    tiptext: GUI.TextBlock; //提示文本
    label: GUI.Rectangle; //提示框
    //百叶箱 支架 百叶窗 最高温度表 最低温度表 干湿球温度表 温度表支架 毛发湿度计
    lang = window.env.browserInfo.lang;

    LouverboxLabel: GUI.Image;
    supportLabel: GUI.Image;
    shutterLabel: GUI.Image;
    thermometerHighLabel: GUI.Image;
    thermometerLowLabel: GUI.Image;
    thermometerdryLabel: GUI.Image;
    thermometermoistLabel: GUI.Image;
    thermometersupportLabel: GUI.Image;
    DialLabel: GUI.Image;

    pos = new Vector3(-6.104, 0.011, 7.9);
    hdrTexture: CubeTexture;
    labelMat: StandardMaterial;
    glassMaterial: StandardMaterial;
    woodMaterial: PBRMaterial;
    metalMaterial: PBRMaterial;
    tip: Mesh;
    tipmesh: Mesh;

    line: GUI.MultiLine;
    shutterMesh: AbstractMesh;
    shutterRot = Vector3.Zero();
    shutterMeshRotation: Vector3;
    cameraPos: Vector3;
    boolCameraMove = false;
    boolInside = false;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }
    /** 初始化 */
    init() {
        super.init();
        if (Engine.isSupported()) {
            this.registerBeforeRender();
        }
    }

    /**
     *  初始化数值 
     * */
    initValue(scene: Scene) {
        this.tip = new Mesh('t');
        this.tipmesh = new Mesh('t');
        this.hdrTexture = CubeTexture.CreateFromPrefilteredData(environment, scene);
        scene.createDefaultSkybox(this.hdrTexture, true, 1000, 0.3);
        const LouverboxMesh = new Mesh('t');
        LouverboxMesh.position = new Vector3(-0.073, 23.037, -7.497);
        const supportMesh = new Mesh('t');
        supportMesh.position = new Vector3(-0.073, -16.95, -2.153);
        const shutterMesh = new Mesh('t');
        shutterMesh.position = new Vector3(-0.073, 15.313, -7.497);
        const thermometerHighMesh = new Mesh('t');
        thermometerHighMesh.position = new Vector3(-4.118, 5.017, -0.858);
        const thermometerLowMesh = new Mesh('t');
        thermometerLowMesh.position = new Vector3(-4.118, 4.478, -1.442);
        const thermometerdryMesh = new Mesh('t');
        thermometerdryMesh.position = new Vector3(-3.117, 10.477, 0.093);
        const thermometermoistMesh = new Mesh('t');
        thermometermoistMesh.position = new Vector3(2.149, 10.477, 0.093);
        const thermometersupportMesh = new Mesh('t');
        thermometersupportMesh.position = new Vector3(-0.073, 2.98, -0.527);
        const DialMesh = new Mesh('t');
        DialMesh.position = new Vector3(-0.289, 10.559, -0.735);
        Mesh.CreateSphere('sky', 8, 1200, scene);

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob) {
            ImageLabelOption.height = '80px';
            ImageLabelOption.width = '80px';
        }
        this.LouverboxLabel = LabelUtils.CreateImageLabel(this.advancedTexture, LouverboxMesh, `${dot}`, ImageLabelOption);
        this.supportLabel = LabelUtils.CreateImageLabel(this.advancedTexture, supportMesh, `${dot}`, ImageLabelOption);
        this.shutterLabel = LabelUtils.CreateImageLabel(this.advancedTexture, shutterMesh, `${dot}`, ImageLabelOption);
        this.thermometerHighLabel = LabelUtils.CreateImageLabel(this.advancedTexture, thermometerHighMesh, `${dot}`, ImageLabelOption);
        this.thermometerLowLabel = LabelUtils.CreateImageLabel(this.advancedTexture, thermometerLowMesh, `${dot}`, ImageLabelOption);
        this.thermometerdryLabel = LabelUtils.CreateImageLabel(this.advancedTexture, thermometerdryMesh, `${dot}`, ImageLabelOption);
        this.thermometermoistLabel = LabelUtils.CreateImageLabel(this.advancedTexture, thermometermoistMesh, `${dot}`, ImageLabelOption);
        this.thermometersupportLabel =
            LabelUtils.CreateImageLabel(this.advancedTexture, thermometersupportMesh, `${dot}`, ImageLabelOption);
        this.DialLabel = LabelUtils.CreateImageLabel(this.advancedTexture, DialMesh, `${dot}`, ImageLabelOption);
    }

    /** 
     * 创建场景
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(scene);

        const HemisphericLight1 = new HemisphericLight('HLight', new Vector3(0, 1, 0), scene);
        HemisphericLight1.intensity = 0.3;
        const DirectLight = new DirectionalLight('DLight', new Vector3(0, 0.6, 0.4), scene);
        DirectLight.intensity = 0.6;
        this.camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 10, 0), scene);
        this.camera.upperBetaLimit = Math.PI / 2;
        scene.activeCameras.push(this.camera);

        this.label = new GUI.Rectangle('label');
        this.tiptext = new GUI.TextBlock();
        this.line = new GUI.MultiLine();
        Utils.createLabel(this.label, this.tiptext, this.line, this.tip, this.tipmesh, this.advancedTexture);
        this.importBabylonMesh(WeatherStation.replace('weatherStation.babylon', ''), `weatherStation.babylon`, scene);
        this.addPointerEventListener(canvas, scene);
        return scene;
    }

    /**
     * 导入模型
     * @param rootUrl 
     * @param sceneFilename 
     * @param scene 
     */
    importBabylonMesh(rootUrl: string, sceneFilename: string | File, scene: Scene) {
        const thiz = this;
        this.glassMaterial = MaterialUtils.CreateGlassMaterial(this.hdrTexture, scene);
        this.metalMaterial = MaterialUtils.CreateMetalMaterial(this.hdrTexture, scene);
        this.labelMat = MaterialUtils.CreateStandardMaterial(`${ganshi}`, scene);
        this.woodMaterial = MaterialUtils.CreateWoodMaterial(`${reflectivity}`, this.hdrTexture, scene);
        SceneLoader.ImportMesh('', rootUrl, sceneFilename, scene, function (meshes) {
            for (let i = 0; i < meshes.length; i++) {
                meshes[i].scaling = new Vector3(1, 1, 1);
                meshes[i].isVisible = true;
                if (meshes[i].name === 'Dial') {
                    meshes[i].material = thiz.labelMat;
                } else if (meshes[i].name === 'thermometersupport') {
                    meshes[i].material = thiz.metalMaterial;
                } else if (meshes[i].name === 'mate') {
                    meshes[i].material = thiz.metalMaterial;
                } else if (meshes[i].name === 'cup') {
                    meshes[i].material = thiz.glassMaterial;
                } else if (meshes[i].name === 'label') {
                    meshes[i].material = thiz.labelMat;
                } else if (meshes[i].name.indexOf('thermometer') !== -1) {
                    meshes[i].material = thiz.glassMaterial;
                } else if (meshes[i].name === 'redheart') {
                    meshes[i].material = thiz.labelMat;
                } else if (meshes[i].name === 'water') {
                    meshes[i].material = thiz.glassMaterial;
                }
                if (meshes[i].name === 'Louverbox' || meshes[i].name === 'support' ||
                    meshes[i].name === 'shutter' || meshes[i].name === 'shutter2') {
                    meshes[i].material = thiz.woodMaterial;
                }
                if (meshes[i].name === 'shutter') {
                    thiz.shutterMesh = meshes[i];
                    thiz.shutterRot = thiz.shutterMesh.rotation.scale(1);
                }
            }
            thiz.reset();
        });
    }

    /**
     * 手势监听
     * @param canvas 
     * @param scene 
     */
    addPointerEventListener(canvas: HTMLCanvasElement, scene: Scene) {
        let currentMesh: AbstractMesh;
        // 场景输入坐标监听（按下）
        const onPointerDown = (evt: any) => {
            if (evt.button !== 0) { return; }
            const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
            if (pickInfo.hit) {
                currentMesh = pickInfo.pickedMesh;
                this.tipmesh.position = pickInfo.pickedPoint;
                this.line.isVisible = this.label.isVisible = true;
                if (currentMesh.name === 'Louverbox') {
                    this.tiptext.text = this.lang.Louverbox;
                } else if (currentMesh.name === 'support') {
                    this.tiptext.text = this.lang.support;
                } else if (currentMesh.name.indexOf('shutter') !== -1) {
                    this.tiptext.text = this.lang.shutter;
                } else if (currentMesh.name === 'thermometerHigh') {
                    this.tiptext.text = this.lang.thermometerHigh;
                } else if (currentMesh.name === 'thermometerLow') {
                    this.tiptext.text = this.lang.thermometerLow;
                } else if (currentMesh.name === 'thermometerdry') {
                    this.tiptext.text = this.lang.thermometerdry;
                } else if (currentMesh.name === 'thermometermoist') {
                    this.tiptext.text = this.lang.thermometermoist;
                } else if (currentMesh.name === 'thermometersupport') {
                    this.tiptext.text = this.lang.thermometersupport;
                } else if (currentMesh.name === 'Dial') {
                    this.tiptext.text = this.lang.Dial;
                } else {
                    this.line.isVisible = this.label.isVisible = false;
                }
                if (currentMesh.name === 'Louverbox' || currentMesh.name === 'support' || currentMesh.name.indexOf('shutter') !== -1) {
                    this.tip.position = this.tipmesh.position.add(new Vector3(5, 5, 0));
                } else {
                    this.tip.position = this.tipmesh.position.add(new Vector3(2, 1, 0));
                }

                if (this.viewModel.buttonActived) {
                    if (currentMesh.name === 'Louverbox' || currentMesh.name === 'support' || currentMesh.name.indexOf('shutter') !== -1) {
                        this.line.isVisible = this.label.isVisible = false;
                    }
                }
            }
        };

        canvas.addEventListener('pointerdown', onPointerDown, false);
        scene.onDispose = function () {
            canvas.removeEventListener('pointerdown', onPointerDown);
        };
    }

    /** 
     * BeforeRender循环 
     */
    registerBeforeRender() {
        this.scene.registerBeforeRender(() => {
            if (this.boolInside) {
                if (Vector3.Distance(this.shutterMesh.rotation, this.shutterMeshRotation) > 0.01) {
                    this.shutterMesh.rotation = this.shutterMesh.rotation.add(
                        this.shutterMeshRotation.subtract(this.shutterMesh.rotation).scale(0.1));
                } else {
                    this.shutterMesh.rotation = this.shutterMeshRotation;
                    this.boolInside = false;
                }
            }
            if (this.boolCameraMove) {
                const dis = Vector3.Distance(this.camera.position, this.cameraPos);
                if (dis > 0.1) {
                    this.camera.position = this.camera.position.add(this.cameraPos.subtract(this.camera.position).scale(0.2));
                } else {
                    this.boolCameraMove = false;
                    this.camera.attachControl(this.canvas, true);
                    this.camera.position = this.cameraPos;
                    if (Vector3.Distance(this.camera.position, new Vector3(0, 12, -13)) < 0.01) {
                        this.camera.upperRadiusLimit = 30;
                        this.camera.lowerAlphaLimit = Math.PI * 23 / 16;
                        this.camera.upperAlphaLimit = Math.PI * 13 / 8;
                        this.camera.lowerBetaLimit = Math.PI * 3 / 8;
                        this.setinnerlabel(true);
                    } else {
                        this.camera.lowerRadiusLimit = 50;
                        this.setoutlabel(true);
                    }
                }
            }
        });
    }

    setoutlabel(labelout: boolean) {
        this.LouverboxLabel.isVisible = labelout;
        this.supportLabel.isVisible = labelout;
        this.shutterLabel.isVisible = labelout;
    }

    setinnerlabel(labelinner: boolean) {
        this.thermometerHighLabel.isVisible = labelinner;
        this.thermometerLowLabel.isVisible = labelinner;
        this.thermometerdryLabel.isVisible = labelinner;
        this.thermometermoistLabel.isVisible = labelinner;
        this.thermometersupportLabel.isVisible = labelinner;
        this.DialLabel.isVisible = labelinner;
    }
    /**
     * '百叶窗内部'按钮
     */
    check(): void {
        if (this.viewModel.buttonActived) {
            this.setoutlabel(false);
            this.shutterMeshRotation = this.shutterRot.add(new Vector3(0, Math.PI * 3 / 4, 0));
            this.cameraPos = new Vector3(0, 12, -13); //注意摄像机目标为Vector3(0, 10, 0)
            this.camera.lowerRadiusLimit = 10;
        } else {
            this.setinnerlabel(false);
            this.shutterMeshRotation = this.shutterRot.scale(1);
            this.cameraPos = new Vector3(0, 15, -100);
            this.camera.lowerAlphaLimit = null;
            this.camera.upperAlphaLimit = null;
            this.camera.upperRadiusLimit = 110;
        }
        this.camera.detachControl(this.canvas);
        this.boolInside = true;
        this.boolCameraMove = true;
        this.line.isVisible = this.label.isVisible = false;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.camera.detachControl(this.canvas);
        this.setoutlabel(true);
        this.setinnerlabel(false);
        this.line.isVisible = this.label.isVisible = false;
        this.boolInside = false;
        this.boolCameraMove = false;
        this.camera.lowerAlphaLimit = null;
        this.camera.upperAlphaLimit = null;
        this.camera.lowerBetaLimit = Math.PI * 3 / 8;
        this.camera.lowerRadiusLimit = 50;
        this.camera.upperRadiusLimit = 110;
        this.camera.attachControl(this.canvas, true);
        this.shutterMesh.rotation = this.shutterRot.scale(1);
        this.camera.position = new Vector3(0, 15, -100);
        this.viewModel.buttonActived = false;
    }
}
