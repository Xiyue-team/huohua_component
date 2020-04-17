import Vue from 'vue';
import {
    Vector3, Texture, MeshBuilder, Mesh, Scene, Engine,
    HemisphericLight, StandardMaterial, Curve3, TransformNode,
    Animation, AnimationEvent, AbstractMesh, Tools, SceneLoader, ArcRotateCamera
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { SrcUtils } from '../SrcUtils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';
import river from '../sub_static/river.json';
import YangtzeRiver from '../sub_static/YangtzeRiver.babylon';

export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    src: SrcUtils;
    bgTex40: Texture; //背景图片
    riverAreaTex: Texture;
    riverAreaTex2: Texture;
    provinceTexf: Texture;
    provinceTexb: Texture;
    locationTex: Texture;
    lineTex: Texture;
    riverTex: Texture;
    tipTex: Texture; //定位标记图片

    bgMat: StandardMaterial; //背景材质
    pathMat: StandardMaterial; //背景材质
    riverMat: StandardMaterial; //背景材质
    riverAreaMat: StandardMaterial; //

    tip: Mesh; //定位面片
    dot: Mesh;
    pathPlan: AbstractMesh; //河流路径面片
    riverPlan: AbstractMesh; //河流流域面片

    animaNode: TransformNode;
    animaRotate: Animation;  //动画
    frameRate = 25; //帧
    bCurve: any[] = [];

    constructor(vm: Vue) {
        super();
        this.skipFrameCount = 16;
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize(900, 420);
    }

    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.animaNode = new TransformNode('anima');
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '80px';
        }
        
        for (let i = 0; i < this.src.btns.length; i++) {
            const tip = new Mesh('AA');
            tip.position = this.src.btns[i].pos;
            this.src.btns[i].btn = LabelUtils.CreateDot(advancedTexture, tip, this.src.btns[i].img, ImageLabelOption);
            this.src.btns[i].btn.onPointerClickObservable.add(() => {
                this.buttonEvent(i);
            });
        }
    }


    createTextures(scene: Scene) {
        this.provinceTexf = new Texture(this.src.frontf, scene);
        this.provinceTexf.hasAlpha = true;
        this.provinceTexb = new Texture(this.src.frontb, scene);
        this.provinceTexb.hasAlpha = true;
        this.locationTex = new Texture(this.src.lo, scene);
        this.locationTex.hasAlpha = true;
        this.lineTex = new Texture(this.src.line, scene);
        this.lineTex.hasAlpha = true;
        this.riverTex = new Texture(this.src.river, scene);
        this.riverTex.hasAlpha = true;
        this.bgTex40 = new Texture(this.src.bg, scene);
        this.riverAreaTex = new Texture(this.src.riverArea, scene);
        this.riverAreaTex.hasAlpha = true;
        this.riverAreaTex2 = new Texture(this.src.riverArea2, scene);
        this.riverAreaTex2.hasAlpha = true;
        this.tipTex = PlanUtils.CreateTexture(this.src.tip, 1, 1, 0, 0, scene);
        this.tipTex.hasAlpha = true;
        const pathTex = new Texture(this.src.path, this.scene);
        pathTex.hasAlpha = true;

        this.bgMat = PlanUtils.CreateMaterial('bgMat', this.bgTex40, scene);
        this.riverMat = PlanUtils.CreateMaterial('bgMat', this.riverTex, this.scene);
        this.riverAreaMat = PlanUtils.CreateMaterial('bgMat', this.riverAreaTex2, this.scene);
        this.pathMat = PlanUtils.CreateMaterial('bgMat', pathTex, this.scene);
        this.tip = MeshBuilder.CreatePlane('tipA', { width: 40, height: 80 }, scene);
        this.tip.material = PlanUtils.CreateMaterial('tipMat', this.tipTex, scene);
        this.tip.renderingGroupId = 3;
        this.tip.isVisible = false;
    }
    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        this.src = new SrcUtils();
        const scene = new Scene(engine);
        const canvas = engine.getRenderingCanvas();
        scene.clearColor.set(0.9647058823529412, 0.9725490196078431, 0.9921568627450981, 1);
        this.TargetCamera(scene, 900, 420);
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;

        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);
        this.createTextures(scene);
        SceneLoader.ImportMesh('', YangtzeRiver.replace('YangtzeRiver.babylon', ''), `YangtzeRiver.babylon`, scene, (v) => {
            this.importMeshSuccess(v, scene);
        });

        // this.addPointerEventListener(bgPlan, canvas, scene);
        this.getPos();
        this.reset();
        return scene;
    }
    /**
     * 导入模型
     * @param meshes 
     */
    importMeshSuccess(meshes: AbstractMesh[], scene: Scene) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].rotationQuaternion = null;
            meshes[i].isVisible = false;
            meshes[i].isPickable = false;
            if (meshes[i].name === 'bg') {
                meshes[i].material = this.bgMat;
                meshes[i].isVisible = true;
            } else if (meshes[i].name === 'path') {
                meshes[i].material = this.pathMat;
                this.pathPlan = meshes[i];
                this.pathPlan.alphaIndex = 5;
            } else if (meshes[i].name === 'riverArea') {
                meshes[i].material = this.riverAreaMat;
                this.riverPlan = meshes[i];
                this.riverPlan.alphaIndex = 2;
            } else if (meshes[i].name.indexOf('front') !== -1) {
                meshes[i].alphaIndex = 3;
                if (meshes[i].name === 'front11') {
                    meshes[i].alphaIndex = 4;
                }
            } else if (meshes[i].name.indexOf('river0') !== -1) {
                meshes[i].alphaIndex = 3;
            }
        }
        this.createProvince();
    }
    /**
     * 获取路径
     */
    getPos(): Vector3[] {
        const s = JSON.parse(JSON.stringify(river));
        const b = [];
        for (let i = 0; i < s.positions.length; i += 3) {
            b.push(new Vector3(-s.positions[i], s.positions[i + 1], 0));
        }
        this.bCurve = Curve3.CreateCatmullRomSpline(b, 2, false).getPoints();
        return b;
    }

    /**
     * 创建省份面片
     */
    createProvince() {
        for (let i = 0; i < this.src.frontList.length; i++) {
            const element = this.src.frontList[i];
            element.mat = PlanUtils.CreateMaterial('tipMat', this.provinceTexf, this.scene);
            element.mesh = this.scene.getMeshByName(element.name);
            element.mesh.material = element.mat;
            element.mesh.isVisible = false;
            element.mesh.isPickable = false;
        }
        const mat = PlanUtils.CreateMaterial('tipMat', this.locationTex, this.scene);
        for (let i = 0; i < this.src.loList.length; i++) {
            const element = this.src.loList[i];
            element.mesh = this.scene.getMeshByName(element.name);
            element.mesh.material = mat;
            element.mesh.isPickable = false;
        }

        const mat2 = PlanUtils.CreateMaterial('tipMat', this.lineTex, this.scene);
        for (let i = 0; i < this.src.lineList.length; i++) {
            const element = this.src.lineList[i];
            element.mesh = this.scene.getMeshByName(element.name);
            element.mesh.material = mat2;
            element.mesh.isVisible = false;
            element.mesh.isPickable = false;
        }
        const mat3 = PlanUtils.CreateMaterial('tipMat', this.riverTex, this.scene);
        for (let i = 0; i < this.src.tributaryList.length; i++) {
            const element = this.src.tributaryList[i];
            element.mesh = this.scene.getMeshByName(element.name);
            element.mesh.material = mat3;
            element.mesh.isVisible = false;
            element.mesh.isPickable = false;
        }
    }

    selectModeEvent(index: number) {
        this.viewModel.value = 0;
        this.tip.position = this.bCurve[0];
        this.tip.isVisible = index === 0 || index === 2 || index === 3;
        if (this.riverPlan) {
            this.riverPlan.isVisible = index === 0 || index === 3;
        }
        if (this.pathPlan) {
            this.pathPlan.isVisible = index === 0 || index === 3;
        }
        if (index === 0) {
            this.riverAreaMat.diffuseTexture = this.riverAreaTex;
        } else if (index === 1) {
            this.createAnimation(0, -Math.PI);
            this.scene.beginDirectAnimation(this.animaNode, [this.animaRotate], 0, 72, false, 1);
        } else if (index === 2) {

        } else if (index === 3) {
            this.riverAreaMat.diffuseTexture = this.riverAreaTex2;
        }
        if (index !== 1) {
            if (this.animaRotate) {
                this.scene.stopAllAnimations();
            }
            for (let j = 0; j < this.src.loList.length; j++) {
                if (this.src.loList[j].mesh !== null) {
                    this.src.loList[j].mesh.isVisible = false;
                }
            }
        }

        for (let n = 0; n < this.src.lineList.length; n++) {
            if (this.src.lineList[n].mesh !== null) {
                this.src.lineList[n].mesh.isVisible = false;
            }
        }
        for (let n = 0; n < this.src.tributaryList.length; n++) {
            if (this.src.tributaryList[n].mesh !== null) {
                this.src.tributaryList[n].mesh.isVisible = false;
            }
        }
        for (let n = 0; n < this.src.frontList.length; n++) {
            if (this.src.frontList[n].mesh !== null) {
                this.src.frontList[n].mesh.isVisible = false;
            }
        }

        for (let n = 0; n < this.src.btns.length; n++) {
            this.src.btns[n].btn.isVisible = false;
        }
    }

    /**
     * 创建动画
     * @param fromRotate
     * @param toRotate
     */
    createAnimation(fromRotate: number, toRotate: number) {
        this.animaRotate = new Animation('position', 'position.y', this.frameRate,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.animaRotate.setKeys([{ frame: 0, value: fromRotate }, { frame: 72, value: toRotate }]);
        for (let i = 0; i < this.src.loList.length; i++) {
            this.src.loList[i].mesh.isVisible = false;
            this.animaRotate.addEvent(new AnimationEvent(this.src.loList[i].frame,
                (frame) => {
                    this.src.loList[i].mesh.isVisible = true;
                }, true));
        }
    }

    /**
     * 滑动条回调
     * @param i
     */
    formatter(i: number) {
        this.tip.position = this.bCurve[Math.floor(i / 50 * 486)];
        if (this.viewModel.selectMode === 0) {//省份
            for (let index = 0; index < this.src.frontList.length; index++) {
                const element = this.src.frontList[index];
                element.mesh.material.diffuseTexture = i > element.change ? this.provinceTexb : this.provinceTexf;
                element.mesh.isVisible = i > element.show;
            }
        } else if (this.viewModel.selectMode === 2) {
            for (let j = 0; j < this.src.lineList.length; j++) {
                this.src.lineList[j].mesh.isVisible = i > this.src.lineList[j].show;
            }
        } else if (this.viewModel.selectMode === 3) {
            for (let index = 0; index < this.src.tributaryList.length; index++) {
                this.src.tributaryList[index].mesh.isVisible = i > this.src.tributaryList[index].show;
            }
            for (let index = 0; index < this.src.btns.length; index++) {
                this.src.btns[index].btn.isVisible = i > this.src.btns[index].active;
            }
        }
    }

    screenCut() {
        Tools.CreateScreenshot(this.engine, this.camera, { precision: 1 });
    }

    buttonEvent(type: number) {
        this.viewModel.buttonActived = type;
        if (type !== -1) {
            this.viewModel.item = this.viewModel.showList[type];
        } else {
            this.viewModel.item = null;
        }
    }

    reset() {
        this.selectModeEvent(-1);
    }
}
