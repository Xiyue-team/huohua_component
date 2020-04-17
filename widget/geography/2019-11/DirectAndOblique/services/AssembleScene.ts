import Vue from 'vue';
import {
    Vector3, StandardMaterial, HemisphericLight,
    Mesh, Scene, AbstractMesh, Engine, ArcRotateCamera, SceneLoader,
    Color3, SpotLight, TransformNode, LinesMesh, ActionManager, ExecuteCodeAction, Material, Texture
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from './OrthoGraphicScene';

import * as lighter from '../sub_static/lighter.babylon';
import * as lighterTex from '../sub_static/lighter.png';

import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { CartesianSystemUtils } from '../../../../babylon/util/CartesianSystemUtils';
import { MaterialUtils } from './MaterialUtils';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';

/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/12/14 10:10
 */
export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    edgesWidth = 6;
    camera: ArcRotateCamera;
    msg = <HTMLElement>document.getElementById('msg');

    hexYellow = '#F5A623';
    colorYellow: Color3;
    lit: AbstractMesh; //灯模型
    mainLight: SpotLight; //光
    needMsgPos = true; //提示位置
    lineDir: LinesMesh; //方向线
    lineAngle: LinesMesh; //直角
    liG: TransformNode; //组
    lightMat: Material; //光线材质
    lighterMat: StandardMaterial; //灯材质
    emmitMat: StandardMaterial; //灯光材质
    focusPos = Vector3.Zero();
    tempPos = Vector3.Zero();
    canMove = false;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        if (this.lit) {
            const vectTarget = CartesianSystemUtils.WorldToScreen(this.lit.getAbsolutePosition(), this.camera, this.scene, this.engine);
            if (vectTarget.x.toString() !== 'NaN') {
                if (this.isMob) {
                    this.msg.style.top = `${vectTarget.y / 2}px`;
                    this.msg.style.left = `${vectTarget.x / 2}px`;
                } else {
                    this.msg.style.top = `${vectTarget.y}px`;
                    this.msg.style.left = `${vectTarget.x}px`;
                }
            }
        }
    }

    /** 
     * 创建场景
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.14901960784313725, 0.14901960784313725, 0.14901960784313725, 1);
        this.colorYellow = Color3.FromHexString(this.hexYellow);
        const HemisphericLight1 = new HemisphericLight('HLight', new Vector3(0, 1, 0), scene);
        HemisphericLight1.intensity = 0.3;
        this.mainLight = new SpotLight('spotLight', new Vector3(0, 10, 0), new Vector3(0, -1, 0), Math.PI / 2, 50, scene);
        this.mainLight.diffuse = Color3.FromHexString('#FFD621');
        this.mainLight.intensity = 2;

        this.camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 5, 0), scene);
        scene.activeCameras.push(this.camera);

        this.lightMat = MaterialUtils.CreateEarthMaterial(this.camera.position, scene);
        this.lighterMat = new StandardMaterial('lighterMat', scene);
        this.lighterMat.diffuseTexture = new Texture(lighterTex, scene);
        this.lighterMat.specularPower = 0;
        this.lighterMat.specularColor = Color3.Black();

        this.emmitMat = new StandardMaterial('emmitMat', scene);
        this.emmitMat.diffuseColor = Color3.Yellow();
        this.emmitMat.emissiveColor = Color3.Yellow();

        SceneLoader.ImportMesh('', lighter.replace('lighter.babylon', ''), `lighter.babylon`, scene, (v) => {
            this.importMeshSuccess(v, scene);
        });

        const ground = Mesh.CreateGround('ground', 2000, 2000, 1, scene, false);
        const groundMaterial = new StandardMaterial('ground', scene);
        groundMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
        ground.material = groundMaterial;
        ground.isPickable = false;
        const plan = Mesh.CreateGround('ground', 200, 200, 1, scene, false);
        plan.rotation.x = -Math.PI / 2;
        plan.isVisible = false;

        const len = 0.5;
        this.lineAngle = LinesBuild.CreateLines([new Vector3(len, 0, 0), new Vector3(len, len, 0), new Vector3(0, len, 0)],
            this.colorYellow, this.edgesWidth, scene);
        this.lineAngle.isPickable = false;
        LinesBuild.CreateLines([new Vector3(-40, 0, 0), new Vector3(40, 0, 0)], this.colorYellow, this.edgesWidth, scene);
        this.lineDir = LinesBuild.CreateUpdateLines([new Vector3(0, 0, 0), new Vector3(0, 10, 0)],
            this.colorYellow, this.edgesWidth, this.lineDir, scene);
        this.lineDir.isPickable = false;

        this.addPointerEventListener(plan, canvas, scene);
        scene.registerBeforeRender(() => {
            if (this.needMsgPos && this.lit) {
                const vectTarget = CartesianSystemUtils.WorldToScreen(this.lit.getAbsolutePosition(), this.camera, scene, engine);
                if (vectTarget.x.toString() !== 'NaN') {
                    if (this.isMob) {
                        this.msg.style.top = `${vectTarget.y / 2}px`;
                        this.msg.style.left = `${vectTarget.x / 2}px`;
                    } else {
                        this.msg.style.top = `${vectTarget.y}px`;
                        this.msg.style.left = `${vectTarget.x}px`;
                    }
                    this.needMsgPos = false;
                }
            }
            const dir = Vector3.Normalize(this.focusPos.clone().subtract(this.mainLight.position));
            if (this.liG) {
                this.liG.lookAt(this.focusPos);
            }
            this.mainLight.direction = dir;
        });
        this.reset();
        return scene;
    }

    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh) {
        this.viewModel.msgShow = false;
        this.canMove = false;
        this.tempPos = startingPoint;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (Vector3.Distance(startingPoint, this.tempPos) > 0.5) {
            this.canMove = true;
        }
        if (this.canMove) {
            startingPoint.x = Math.abs(startingPoint.x) < 0.5 ? 0 : startingPoint.x;
            this.lineAngle.isVisible = startingPoint.x === 0;
            const pos = startingPoint.clone().subtract(this.liG.position);
            let ang = Math.atan2(-5, pos.x) * 180 / Math.PI;
            ang = ang < 0 ? ang + 360 : ang;
            ang = ang > 315 ? 315 : ang < 225 ? 225 : ang;
            this.focusPos = startingPoint.clone().add(FormulasUtils.GetCirclePoint(100, ang));
            this.updateMeshVertData(this.lineDir, Vector3Utils.ToArray([this.focusPos, this.liG.position]));
        }
    }

    /**
     * 导入模型
     * @param meshes 
     */
    importMeshSuccess(meshes: AbstractMesh[], scene: Scene) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new Vector3(1, 1, 1);
            meshes[i].isVisible = true;
            if (meshes[i].name === 'Light') {
                meshes[i].material = this.lightMat;
                meshes[i].isPickable = false;
            } else if (meshes[i].name === 'tipLight') {
                meshes[i].material = this.lighterMat;
                this.lit = meshes[i];
            } else if (meshes[i].name === 'lighter') {
                this.liG = meshes[i];
            } else if (meshes[i].name === 'emmit') {
                meshes[i].material = this.emmitMat;
            }
        }
        this.lit.actionManager = new ActionManager(scene);
        this.lit.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (ev) => {
            this.scene.hoverCursor = 'pointer';
        }));
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.viewModel.msgShow = true;
        this.camera.detachControl(this.canvas);
        this.camera.position = new Vector3(0, 10, -25);
        if (this.liG) {
            this.onPointerMove(Vector3.Zero(), null);
        }
    }
}
