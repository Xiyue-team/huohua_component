import Vue from 'vue';
import {
    Vector3, Texture, AbstractMesh, MeshBuilder, Mesh, Scene, Engine,
    HemisphericLight, StandardMaterial, SceneLoader, Ray, Vector2, ExecuteCodeAction, ActionManager
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { SrcUtils } from '../SrcUtils';
import { Pos } from './Pos';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import {PlanUtils} from '../../../../babylon/util/PlanUtils';

import * as NorthAmerica from '../sub_static/NorthAmerica.glb';
import * as dot from '../sub_static/dot.png';
export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    src: SrcUtils;
    bgTex40: Texture;
    bgTex100: Texture;
    bgMat: StandardMaterial;
    frontTex40: Texture;
    frontTex100: Texture;
    frontMat: StandardMaterial;
    tipTex: Texture;
    bgFPlan: Mesh;
    type: number;
    tip: Mesh;
    dotM: Mesh;
    dotRay: Ray;
    ray: Ray;
    line40: AbstractMesh;
    line100: AbstractMesh;

    curve40: AbstractMesh;
    curve100: AbstractMesh;
    msg = <HTMLElement>document.getElementById('msg');
    msgH: number;

    line40Pos = [new Vector3(-324.53, 22.11, 1),
    new Vector3(-185.87, -46.00, 1),
    new Vector3(-141.64, -60.34, 1),
    new Vector3(-71.12, -74.68, 1), new Vector3(13.75, -83.05, 1)
        , new Vector3(100.93, -79.46, 1), new Vector3(210.97, -72.29, 1), new Vector3(336.48, -37.64, 1)];

    line100Pos = [new Vector3(96.22, -197.76, 1),
    new Vector3(92.64, -71.10, 1), new Vector3(87.85, 31.67, 1),
    new Vector3(77.10, 126.06, 1),
    new Vector3(65.14, 249.14, 1), new Vector3(50.80, 450.41, 1)];

    curve40Dots = [new Vector3(-408.20, -453.47, 1),
    new Vector3(-354.41, -392.53, 1),
    new Vector3(-301.81, -301.72, 1),
    new Vector3(-111.76, -300.52, 1),
    new Vector3(11.36, -408.07, 1),
    new Vector3(130.89, -418.82, 1), new Vector3(230.10, -363.85, 1), new Vector3(401.02, -416.43, 1)];

    curve100Dots = [new Vector3(-385.49, -435.55, 1), new Vector3(-199.02, -449.89, 1),
    new Vector3(-54.39, -421.21, 1),
    new Vector3(145.23, -412.85, 1),
    new Vector3(316.16, -448.69, 1),
    new Vector3(395.05, -470.20, 1)];
    line40Dis = [120, 30, 15, 20, 30, 15, 20, 80];
    line100Dis = [20, 40, 20, 30, 20, 60];

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }
    resize() {
        super.resize();
        this.changeCameraSize(560, 513);
        this.msgH = this.msg.clientHeight;
        this.msgMove();
    }
    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        this.msgH = this.msg.clientHeight;
        this.src = new SrcUtils();
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.TargetCamera(scene, 560, 513);

        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;
        const option = { width: 1500, height: 1026 };
        this.bgTex40 = new Texture(this.src.bgSrc, scene);
        this.bgTex40.hasAlpha = true;
        this.bgTex100 = new Texture(this.src.bgSrc2, scene);
        this.bgTex100.hasAlpha = true;
        this.bgMat = PlanUtils.CreateMaterial('bgMat', this.bgTex40, scene);
        const bgPlan = PlanUtils.CreatePlan(this.bgMat, new Vector3(0, 0, 1), option, scene);
        bgPlan.alphaIndex = 0;

        this.frontTex40 = new Texture(this.src.bg40, scene);
        this.frontTex40.hasAlpha = true;
        this.frontTex100 = new Texture(this.src.bg100, scene);
        this.frontTex100.hasAlpha = true;

        this.frontMat = PlanUtils.CreateMaterial('frontMat', this.frontTex40, scene);
        this.bgFPlan = PlanUtils.CreatePlan(this.frontMat, new Vector3(0, 0, 0), option, scene);
        this.bgFPlan.alphaIndex = 4;
        this.bgFPlan.isPickable = false;
        this.tipTex = PlanUtils.CreateTexture(this.src.tip, 1 / 3, 1, 2 / 3, 0, scene);
        this.tipTex.hasAlpha = true;

        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.tip = MeshBuilder.CreatePlane('tipA', { width: 120, height: 120 }, scene);
        } else {
            this.tip = MeshBuilder.CreatePlane('tipA', { width: 80, height: 80 }, scene);
        }
        this.tip.actionManager = new ActionManager(scene);
        this.tip.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (ev) => {
            scene.hoverCursor = 'pointer';
        }));
        this.tip.material = PlanUtils.CreateMaterial('tipMat', this.tipTex, scene);

        const dotT = new Texture(this.src.dot, scene);
        dotT.hasAlpha = true;
        this.dotM = MeshBuilder.CreatePlane('dot', { width: 40, height: 40 }, scene);
        this.dotM.material = PlanUtils.CreateMaterial('dotMat', dotT, scene);

        SceneLoader.ImportMesh('', NorthAmerica.replace('NorthAmerica.glb', ''), 'NorthAmerica.glb',
            scene, (v) => { this.importMeshSuccess(v); });
        this.ray = new Ray(new Vector3(0, 10, 0), new Vector3(0, 1, 0), 200);
        this.dotRay = new Ray(new Vector3(0, 10, 0), new Vector3(0, 1, 0), 300);
        this.addPointerEventListener(bgPlan, canvas, scene);
        this.reset();
        return scene;
    }

    importMeshSuccess(meshes: AbstractMesh[]) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
            if (meshes[i].name === 'nurbsToPoly2') {
                this.curve40 = meshes[i];
            } else if (meshes[i].name === 'nurbsToPoly1') {
                this.curve100 = meshes[i];
            } else if (meshes[i].name === 'nurbsToPoly3') {
                this.line40 = meshes[i];
                meshes[i].isPickable = false;
            } else if (meshes[i].name === 'nurbsToPoly4') {
                this.line100 = meshes[i];
                meshes[i].isPickable = false;
            }
        }
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh === this.tip) {
            if (this.type === 1) {
                this.pointCastPos(startingPoint.add(new Vector3(-50, 0, -1)), new Vector3(1, 0, 0),
                    currentMesh, this.line100, this.curve100, this.line100Pos, this.line100Dis);
            } else if (this.type === 2) {
                this.pointCastPos(startingPoint.add(new Vector3(0, 50, -0.8)), new Vector3(0, -1, 0),
                    currentMesh, this.line40, this.curve40, this.line40Pos, this.line40Dis);
            }
        } else {
            currentMesh.position = startingPoint;
        }
    }

    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh) {
        this.tipTex.uOffset = 0;
    }

    pointCastPos(origin: Vector3, direction: Vector3, currentMesh: AbstractMesh,
        pickingMesh: AbstractMesh, dotpickingMesh: AbstractMesh, poses: Vector3[], dises: number[], slider = true) {
        this.ray.origin = origin;
        this.ray.direction = direction;
        const p = this.castPos(this.ray, pickingMesh, this.scene);
        if (p !== null) {
            const i = this.getNearPos(p, poses);
            let step = 0;
            let temp = Vector3.Zero();
            if (pickingMesh === this.line100) {
                if (p.y < poses[i].y) {
                    if (i > 0) {
                        step = Vector3.Distance(poses[i - 1], p) / Vector3.Distance(poses[i - 1], poses[i]);
                        temp = this.curve100Dots[i - 1].add(this.curve100Dots[i].subtract(this.curve100Dots[i - 1]).scale(step));
                    } else {
                        step = Vector3.Distance(Pos.pos100Start, p) / Vector3.Distance(Pos.pos100Start, poses[i]);
                        temp = Pos.pos100CurveStart.add(this.curve100Dots[i].subtract(Pos.pos100CurveStart).scale(step));
                    }
                } else {
                    if (i < poses.length - 1) {
                        step = Vector3.Distance(poses[i], p) / Vector3.Distance(poses[i + 1], poses[i]);
                        temp = this.curve100Dots[i].add(this.curve100Dots[i + 1].subtract(this.curve100Dots[i]).scale(step));
                    } else {
                        step = Vector3.Distance(poses[i], p) / Vector3.Distance(Pos.pos100End, poses[i]);
                        temp = this.curve100Dots[i].add(Pos.pos100CurveEnd.subtract(this.curve100Dots[i]).scale(step));
                    }
                }
                this.dotRay.origin = new Vector3(temp.x, -600, -0.8);
            } else if (pickingMesh === this.line40) {
                if (p.x < poses[i].x) {
                    if (i > 0) {
                        step = Vector3.Distance(poses[i - 1], p) / Vector3.Distance(poses[i - 1], poses[i]);
                        temp = this.curve40Dots[i - 1].add(this.curve40Dots[i].subtract(this.curve40Dots[i - 1]).scale(step));
                    } else {
                        step = Vector3.Distance(Pos.pos40Start, p) / Vector3.Distance(Pos.pos40Start, poses[i]);
                        temp = Pos.pos40CurveStart.add(this.curve40Dots[i].subtract(Pos.pos40CurveStart).scale(step));
                    }
                } else {
                    if (i < poses.length - 1) {
                        step = Vector3.Distance(poses[i], p) / Vector3.Distance(poses[i + 1], poses[i]);
                        temp = this.curve40Dots[i].add(this.curve40Dots[i + 1].subtract(this.curve40Dots[i]).scale(step));
                    } else {
                        step = Vector3.Distance(poses[i], p) / Vector3.Distance(Pos.pos40End, poses[i]);
                        temp = this.curve40Dots[i].add(Pos.pos40CurveEnd.subtract(this.curve40Dots[i]).scale(step));
                    }
                }
                this.dotRay.origin = new Vector3(temp.x, -600, -0.8);
            }
            const dotPos = this.castPos(this.dotRay, dotpickingMesh, this.scene);
            if (dotPos !== null) {
                this.dotM.position = dotPos;
            }
            currentMesh.position = p;
            this.msgMove();
            this.msg.hidden = Vector3.Distance(p, poses[i]) > dises[i];
            this.viewModel.slideTo(i, slider);
        }
    }

    getNearPos(p: Vector3, poses: Vector3[]) {
        let tempIndex = 0;
        let temp = poses[0];
        for (let i = 1; i < poses.length; i++) {
            if (Vector3.Distance(p, poses[i]) < Vector3.Distance(p, temp)) {
                tempIndex = i;
                temp = poses[i];
            }
        }
        return tempIndex;
    }

    castPos(ray: Ray, pickinfoMesh: AbstractMesh, scene: Scene): Vector3 {
        const hit = scene.pickWithRay(ray, (mesh) => mesh === pickinfoMesh, true);
        if (hit.pickedMesh) {
            return hit.pickedPoint;
        } else {
            return null;
        }
    }

    ButtonEvent(type: number) {
        this.type = type;
        if (this.type === 0) {
            this.camera.position.y = 10;
            this.bgMat.diffuseTexture = this.bgTex40;
            this.setMeshVisible([this.tip, this.dotM, this.bgFPlan], false);
            this.msg.hidden = true;
        } else {
            this.camera.position.y = 0;
            this.setMeshVisible([this.tip, this.dotM, this.bgFPlan], true);
            if (this.type === 1) {
                this.tipTex.uOffset = 2 / 3;
                this.tip.position = Pos.pos100Start;
                this.dotM.position = Pos.pos100CurveStart;
                this.frontMat.diffuseTexture = this.frontTex100;
                this.bgMat.diffuseTexture = this.bgTex100;
            } else if (this.type === 2) {
                this.tipTex.uOffset = 1 / 3;
                this.tip.position = Pos.pos40Start;
                this.dotM.position = Pos.pos40CurveStart;
                this.frontMat.diffuseTexture = this.frontTex40;
                this.bgMat.diffuseTexture = this.bgTex40;
            }
        }
        this.msgMove();
    }

    slideChangeTransitionEnd(index: number) {
        const startingPoint = new Vector3(0, 0, 1);
        if (this.type === 1) {
            startingPoint.x = this.line100Pos[index].x;
            startingPoint.y = this.line100Pos[index].y;
            this.pointCastPos(startingPoint.add(new Vector3(-50, 0, -1)), new Vector3(1, 0, 0),
                this.tip, this.line100, this.curve100, this.line100Pos, this.line100Dis);
        } else if (this.type === 2) {
            startingPoint.x = this.line40Pos[index].x;
            startingPoint.y = this.line40Pos[index].y;
            this.pointCastPos(startingPoint.add(new Vector3(0, 50, -0.8)), new Vector3(0, -1, 0),
                this.tip, this.line40, this.curve40, this.line40Pos, this.line40Dis);
        }
        if (this.tipTex.uOffset !== 0) {
            this.tipTex.uOffset = 0;
        }
    }

    progressCall(progress: number) {
        const startingPoint = new Vector3(0, 0, 1);
        if (this.type === 1) {
            const stepLength = 1 / (this.line100Pos.length - 1);
            const v = Math.floor(progress / stepLength);
            const lessP = progress - stepLength * v;
            const start = v < 0 ? Pos.pos100Start : v >= this.line100Pos.length ? 
            this.line100Pos[this.line100Pos.length - 1] : this.line100Pos[v];
            const end = v >= this.line100Pos.length - 1 ? Pos.pos100End : this.line100Pos[v + 1];

            startingPoint.y = start.y + (end.y - start.y) * (lessP / stepLength);
            startingPoint.x = start.x;
            this.pointCastPos(startingPoint.add(new Vector3(-50, 0, -1)), new Vector3(1, 0, 0),
                this.tip, this.line100, this.curve100, this.line100Pos, this.line100Dis, false);
        } else if (this.type === 2) {
            const stepLength = 1 / (this.line40Pos.length - 1);
            const v = Math.floor(progress / stepLength);
            const lessP = progress - stepLength * v;
            const start = v < 0 ? Pos.pos40Start : v >= this.line40Pos.length ? 
            this.line40Pos[this.line40Pos.length - 1] : this.line40Pos[v];
            const end = v >= this.line40Pos.length - 1 ? Pos.pos40End : this.line40Pos[v + 1];
            startingPoint.x = start.x + (end.x - start.x) * (lessP / stepLength);
            startingPoint.y = start.y;
            this.pointCastPos(startingPoint.add(new Vector3(0, 50, -0.8)), new Vector3(0, -1, 0),
                this.tip, this.line40, this.curve40, this.line40Pos, this.line40Dis, false);
        }
        if (this.tipTex.uOffset !== 0) {
            this.tipTex.uOffset = 0;
        }
        this.msg.hidden = true;
    }

    msgMove() {
        const screen = new Vector2(0, 0);
        screen.x = (this.tip.position.x + this.camera.orthoRight) / Math.abs(this.camera.orthoRight) / 2 * this.engine.getRenderWidth();
        screen.y = (this.tip.position.y - this.camera.orthoTop) / Math.abs(this.camera.orthoBottom) / 2 * this.engine.getRenderHeight();
        if (this.isMob) {
            this.msg.style.top = `${-screen.y / 2 - this.msgH / 4 - 5}px`;
            this.msg.style.left = `${screen.x / 2 + 20}px`;
        } else {
            this.msg.style.top = `${-screen.y - this.msgH / 2 - 10}px`;
            this.msg.style.left = `${screen.x + 40}px`;
        }
    }

    reset() {
        this.ButtonEvent(0);
    }
}
