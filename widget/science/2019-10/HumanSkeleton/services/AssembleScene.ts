import Vue from 'vue';
import {
    Vector3, Texture, AbstractMesh, MeshBuilder, Scene, Engine, HemisphericLight, SceneLoader, Mesh, 
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { HumanComponent } from './HumanComponent';
import { ConfigUtils } from './ConfigUtils';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';
import * as egg from '../sub_static/human.babylon';
import * as bodybg from '../sub_static/image/bodybg.png';
import * as dot from '../sub_static/image/dot.png';

export class AssembleScene extends OrthoGraphicScene {
    text = window.env.browserInfo.lang.text;
    viewModel: ViewModel;
    humanComponents: HumanComponent[] = []; //骨骼组件
    humanComponentConfigs: {
        name: string;
        alphaIndex: number;
        texture: any;
        rot: Vector3;
        pos: Vector3;
        option: { width: number; height: number; };
        label: { pos: Vector3; text: any; }[];
    }[] = []; //骨骼组件配置
    advancedTexture: GUI.AdvancedDynamicTexture;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.humanComponentConfigs = new ConfigUtils().humanComponentConfigs;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize(1200, 700);
    }
    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.13333333333333333, 0.45098039215686275, 0.6823529411764706, 1);
        this.TargetCamera(scene, 1200, 700);
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const pickinfoMesh = MeshBuilder.CreatePlane('plan', { width: 3500, height: 3026 }, scene);
        pickinfoMesh.isVisible = false;

        const tipTex = new Texture(bodybg, scene);
        tipTex.hasAlpha = true;
        const bgMesh = MeshBuilder.CreatePlane('bg', { width: 441, height: 993 }, scene);
        bgMesh.isPickable = false;
        bgMesh.material = PlanUtils.CreateMaterial('tipMat', tipTex, scene);
        bgMesh.alphaIndex = 0;
        SceneLoader.ImportMesh('', egg.replace('human.babylon', ''), 'human.babylon', scene, (v) => { this.importMeshSuccess(v); });
        this.addPointerEventListener(pickinfoMesh, canvas, scene);
        return scene;
    }

    importMeshSuccess(meshes: AbstractMesh[]) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
            meshes[i].scaling = Vector3.One();
        }
        this.createHumanComponents(this.scene);
    }

    /**
     * 创建骨骼组件
     * @param scene 
     */
    createHumanComponents(scene: Scene) {
        for (let i = 0; i < this.humanComponentConfigs.length; i++) {
            const element = this.humanComponentConfigs[i];
            const bgMesh = <Mesh>scene.getMeshByName(element.name);
            this.humanComponents.push(
                new HumanComponent(element.name, element.alphaIndex, element.texture, dot, this.advancedTexture,
                    element.option, element.label, element.pos, element.rot, scene, null, bgMesh));
                    bgMesh.dispose();
        }
        this.reset();
    }
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        currentMesh.position = startingPoint;
    }
    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh) {
        (currentMesh as HumanComponent).onPointerDown(startingPoint);
        this.viewModel.verificationActived = false;
        this.viewModel.msgShow = false;
        this.verificationEvent(false);
    }
    /**
     * 打开关闭标签
     * @param type 
     */
    verificationEvent(type: boolean) {
        let v = true;
        for (let i = 0; i < this.humanComponents.length; i++) {
            if (!this.humanComponents[i].getBorder()) {
                v = false;
            }
        }
        if (v) {
            for (let i = 0; i < this.humanComponents.length; i++) {
                this.humanComponents[i].setLabelV(type);
            }
        } else {
            this.viewModel.verificationActived = false;
        }
    }

    onPointerUp(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tipribCage') !== -1) {
            (currentMesh as HumanComponent).onPointerUp(startingPoint,
                (this.scene.getMeshByName('tipspine') as HumanComponent).getBorder());
            if (!(currentMesh as HumanComponent).getBorder()) {
                (this.scene.getMeshByName('tipRightUpperLimb') as HumanComponent).setGoPos();
                (this.scene.getMeshByName('tipLeftUpperLimb') as HumanComponent).setGoPos();
            }
        } else if (currentMesh.name.indexOf('tipHipBone') !== -1) {
            (currentMesh as HumanComponent).onPointerUp(startingPoint,
                (this.scene.getMeshByName('tipspine') as HumanComponent).getBorder());
            if (!(currentMesh as HumanComponent).getBorder()) {
                (this.scene.getMeshByName('tipRightDownLimb') as HumanComponent).setGoPos();
                (this.scene.getMeshByName('tipLeftDownLimb') as HumanComponent).setGoPos();
            }
        } else if (currentMesh.name.indexOf('tipspine') !== -1) {
            (currentMesh as HumanComponent).onPointerUp(startingPoint, true);
            if (!(currentMesh as HumanComponent).getBorder()) {
                (this.scene.getMeshByName('tipRightDownLimb') as HumanComponent).setGoPos();
                (this.scene.getMeshByName('tipLeftDownLimb') as HumanComponent).setGoPos();
                (this.scene.getMeshByName('tipRightUpperLimb') as HumanComponent).setGoPos();
                (this.scene.getMeshByName('tipLeftUpperLimb') as HumanComponent).setGoPos();
                (this.scene.getMeshByName('tipHipBone') as HumanComponent).setGoPos();
                (this.scene.getMeshByName('tipribCage') as HumanComponent).setGoPos();
            }
        } else if (currentMesh.name.indexOf('tipRightUpperLimb') !== -1 || currentMesh.name.indexOf('tipLeftUpperLimb') !== -1) {
            (currentMesh as HumanComponent).onPointerUp(startingPoint,
                (this.scene.getMeshByName('tipspine') as HumanComponent).getBorder() &&
                (this.scene.getMeshByName('tipribCage') as HumanComponent).getBorder());
        } else if (currentMesh.name.indexOf('tipRightDownLimb') !== -1 || currentMesh.name.indexOf('tipLeftDownLimb') !== -1) {
            (currentMesh as HumanComponent).onPointerUp(startingPoint,
                (this.scene.getMeshByName('tipspine') as HumanComponent).getBorder() &&
                (this.scene.getMeshByName('tipHipBone') as HumanComponent).getBorder());
        } else {
            (currentMesh as HumanComponent).onPointerUp(startingPoint, true);
        }
    }

    reset() {
        for (let i = 0; i < this.humanComponents.length; i++) {
            this.humanComponents[i].resetPosition();
        }
        this.verificationEvent(false);
    }
}
