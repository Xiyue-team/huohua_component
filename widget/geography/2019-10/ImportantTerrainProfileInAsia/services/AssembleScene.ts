import Vue from 'vue';
import {
    Vector3, Texture, AbstractMesh, MeshBuilder, Mesh, Scene, Engine,
    HemisphericLight, StandardMaterial, SceneLoader, Ray, Vector2, ActionManager, ExecuteCodeAction
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { SrcUtils } from '../SrcUtils';
import { Pos } from './Pos';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';

import * as Asia from '../sub_static/Asia.glb';

export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    src: SrcUtils;
    frontTex30: Texture;
    frontTex40: Texture;
    frontTex100: Texture;
    frontMat: StandardMaterial;
    tipTex: Texture;
    bgFPlan: Mesh;
    type: number;
    tip: Mesh;
    dot: Mesh;
    dotRay: Ray;
    ray: Ray;

    line30: AbstractMesh;
    line40: AbstractMesh;
    line100: AbstractMesh;
    curve30: AbstractMesh;
    curve40: AbstractMesh;
    curve100: AbstractMesh;
    msg = <HTMLElement>document.getElementById('msg');
    msgH: number;

    line30Pos = [new Vector3(-516.87, 71.82, 1), new Vector3(-505.85, 67.50, 1), new Vector3(-455.27, 53.46, 1)
        , new Vector3(-404.47, 38.34, 1), new Vector3(-310.45, 17.82, 1), new Vector3(-210.58, 9.18, 1),
    new Vector3(-114.83, 4.86, 1), new Vector3(-39.18, 12.42, 1), new Vector3(15.94, 17.82, 1),
    new Vector3(67.82, 31.86, 1), new Vector3(155.36, 56.70, 1), new Vector3(193.19, 67.50, 1), new Vector3(280.73, 107.46, 1)];

    line40Pos = [new Vector3(-530.12, 192.78, 1), new Vector3(-442.30, 159.30, 1), new Vector3(-350.44, 136.62, 1),
    new Vector3(-298.56, 127.98, 1), new Vector3(-190.70, 115.02, 1), new Vector3(-102.94, 117.18, 1),
    new Vector3(-2.43, 126.90, 1), new Vector3(74.30, 142.02, 1), new Vector3(114.29, 148.50, 1),
    new Vector3(140.23, 159.30, 1), new Vector3(249.39, 193.86, 1), new Vector3(296.94, 218.70, 1), new Vector3(371.51, 257.58, 1)];

    line100Pos = [new Vector3(62.41, -280.26, 1), new Vector3(60.25, -227.34, 1), new Vector3(60.25, -193.86, 1),
    new Vector3(40.80, -25.82, 1), new Vector3(35.39, 5.46, 1), new Vector3(33.23, 55.62, 1),
    new Vector3(27.83, 83.70, 1), new Vector3(17.02, 122.58, 1), new Vector3(-0.27, 183.06, 1),
    new Vector3(-32.69, 281.34, 1), new Vector3(-61.87, 383.94, 1), new Vector3(-93.22, 469.26, 1)];

    line30Dis = [20, 6, 20, 20, 80, 10, 20, 60, 20, 20, 10, 20, 160];
    line40Dis = [10, 60, 20, 20, 40, 20, 50, 20, 20, 20, 40, 10, 80];
    line100Dis = [20, 20, 20, 30, 20, 20, 20, 20, 50, 20, 40, 10];


    curve30Dots = [new Vector3(-459.84, -458.22, 1), new Vector3(-421.92, -437.16, 1),
    new Vector3(-361.87, -426.62, 1), new Vector3(-297.61, -450.85, 1),
    new Vector3(-203.85, -423.46, 1), new Vector3(-82.70, -450.85, 1),
    new Vector3(0.53, -328.66, 1), new Vector3(60.57, -369.74, 1),
    new Vector3(102.71, -345.51, 1), new Vector3(178.56, -446.64, 1),
    new Vector3(340.80, -452.96, 1), new Vector3(365.03, -450.85, 1), new Vector3(421.92, -454.01, 1)];

    curve40Dots = [new Vector3(-456.68, -439.26, 1), new Vector3(-347.12, -369.74, 1),
    new Vector3(-248.09, -447.69, 1), new Vector3(-205.95, -428.73, 1),
    new Vector3(-84.80, -312.86, 1), new Vector3(14.22, -410.82, 1),
    new Vector3(100.61, -395.02, 1), new Vector3(186.99, -396.07, 1),
    new Vector3(207.01, -375.01, 1), new Vector3(233.35, -427.68, 1),
    new Vector3(345.01, -466.65, 1), new Vector3(391.37, -378.17, 1), new Vector3(433.51, -469.81, 1)];

    curve100Dots = [new Vector3(-354.50, -495.09, 1), new Vector3(-264.95, -484.56, 1),
    new Vector3(-233.35, -454.01, 1), new Vector3(-135.37, -454.01, 1),
    new Vector3(-102.71, -456.12, 1), new Vector3(-73.22, -407.66, 1),
    new Vector3(-46.88, -448.74, 1), new Vector3(65.84, -428.73, 1),
    new Vector3(126.94, -413.98, 1), new Vector3(179.62, -432.94, 1),
    new Vector3(250.20, -437.16, 1), new Vector3(342.91, -486.67, 1)];

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
        const bgTex = new Texture(this.src.bgSrc, scene);
        bgTex.hasAlpha = true;
        const bgPlan = PlanUtils.CreatePlan(PlanUtils.CreateMaterial('bgMat', bgTex, scene), new Vector3(0, 0, 1), option, scene);
        bgPlan.alphaIndex = 0;
        this.frontTex30 = new Texture(this.src.bg30, scene);
        this.frontTex30.hasAlpha = true;
        this.frontTex40 = new Texture(this.src.bg40, scene);
        this.frontTex40.hasAlpha = true;
        this.frontTex100 = new Texture(this.src.bg100, scene);
        this.frontTex100.hasAlpha = true;

        this.frontMat = PlanUtils.CreateMaterial('frontMat', this.frontTex30, scene);
        this.bgFPlan = PlanUtils.CreatePlan(this.frontMat, new Vector3(0, 0, 0), option, scene);
        this.bgFPlan.alphaIndex = 4;
        this.bgFPlan.isPickable = false;

        this.tipTex = PlanUtils.CreateTexture(this.src.tip, 1 / 3, 1, 2 / 3, 0, scene);

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
        this.dot = MeshBuilder.CreatePlane('dot', { width: 40, height: 40 }, scene);
        this.dot.material = PlanUtils.CreateMaterial('dotMat', dotT, scene);

        SceneLoader.ImportMesh('', Asia.replace('Asia.glb', ''), 'Asia.glb', scene, (v) => { this.importMeshSuccess(v); });
        this.ray = new Ray(new Vector3(0, 10, 0), new Vector3(0, 1, 0), 200);
        this.dotRay = new Ray(new Vector3(0, 10, 0), new Vector3(0, 1, 0), 300);
        this.addPointerEventListener(bgPlan, canvas, scene);
        this.reset();
        return scene;
    }

    importMeshSuccess(meshes: AbstractMesh[]) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
            if (meshes[i].name === 'nurbsToPoly1') {
                this.curve40 = meshes[i];
            } else if (meshes[i].name === 'nurbsToPoly2') {
                this.curve30 = meshes[i];
            } else if (meshes[i].name === 'nurbsToPoly3') {
                this.curve100 = meshes[i];
            } else if (meshes[i].name === 'nurbsToPoly4') {
                this.line30 = meshes[i];
                meshes[i].isPickable = false;
            } else if (meshes[i].name === 'nurbsToPoly5') {
                this.line40 = meshes[i];
                meshes[i].isPickable = false;
            } else if (meshes[i].name === 'nurbsToPoly6') {
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
                    currentMesh, this.line30, this.curve30, this.line30Pos, this.line30Dis);
            } else if (this.type === 3) {
                this.pointCastPos(startingPoint.add(new Vector3(0, 50, -0.8)), new Vector3(0, -1, 0),
                    currentMesh, this.line40, this.curve40, this.line40Pos, this.line40Dis);
            }
        } else {
            currentMesh.position = startingPoint;
        }
    }

    pointCastPos(origin: Vector3, direction: Vector3,
        currentMesh: AbstractMesh, pickingMesh: AbstractMesh, dotpickingMesh: AbstractMesh
        , poses: Vector3[], dises: number[], slider = true) {
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
            } else if (pickingMesh === this.line30) {
                if (p.x < poses[i].x) {
                    if (i > 0) {
                        step = Vector3.Distance(poses[i - 1], p) / Vector3.Distance(poses[i - 1], poses[i]);
                        temp = this.curve30Dots[i - 1].add(this.curve30Dots[i].subtract(this.curve30Dots[i - 1]).scale(step));
                    } else {
                        step = Vector3.Distance(Pos.pos30Start, p) / Vector3.Distance(Pos.pos30Start, poses[i]);
                        temp = Pos.pos30CurveStart.add(this.curve30Dots[i].subtract(Pos.pos30CurveStart).scale(step));
                    }
                } else {
                    if (i < poses.length - 1) {
                        step = Vector3.Distance(poses[i], p) / Vector3.Distance(poses[i + 1], poses[i]);
                        temp = this.curve30Dots[i].add(this.curve30Dots[i + 1].subtract(this.curve30Dots[i]).scale(step));
                    } else {
                        step = Vector3.Distance(poses[i], p) / Vector3.Distance(Pos.pos30End, poses[i]);
                        temp = this.curve30Dots[i].add(Pos.pos30CurveEnd.subtract(this.curve30Dots[i]).scale(step));
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
                this.dot.position = dotPos;
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

    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh) {
        this.tipTex.uOffset = 0;
    }

    ButtonEvent(type: number) {
        this.type = type;
        if (this.type === 0) {
            this.camera.position.y = 88.5;
            this.setMeshVisible([this.tip, this.dot, this.bgFPlan], false);
            this.msg.hidden = true;
        } else {
            this.camera.position.y = 0;
            this.setMeshVisible([this.tip, this.dot, this.bgFPlan], true);
            if (this.type === 1) {
                this.tipTex.uOffset = 2 / 3;
                this.tip.position = Pos.pos100Start;
                this.dot.position = Pos.pos100CurveStart;
                this.frontMat.diffuseTexture = this.frontTex100;
            } else if (this.type === 2) {
                this.tip.position = Pos.pos30Start;
                this.dot.position = Pos.pos30CurveStart;
                this.tipTex.uOffset = 1 / 3;
                this.frontMat.diffuseTexture = this.frontTex30;
            } else if (this.type === 3) {
                this.tip.position = Pos.pos40Start;
                this.dot.position = Pos.pos40CurveStart;
                this.tipTex.uOffset = 1 / 3;
                this.frontMat.diffuseTexture = this.frontTex40;
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
            startingPoint.x = this.line30Pos[index].x;
            startingPoint.y = this.line30Pos[index].y;
            this.pointCastPos(startingPoint.add(new Vector3(0, 50, -0.8)), new Vector3(0, -1, 0),
                this.tip, this.line30, this.curve30, this.line30Pos, this.line30Dis);
        } else if (this.type === 3) {
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
            const stepLength = 1 / (this.line30Pos.length - 1);
            const v = Math.floor(progress / stepLength);
            const lessP = progress - stepLength * v;
            const start = v < 0 ? Pos.pos30Start : v >= this.line30Pos.length ?
                this.line30Pos[this.line30Pos.length - 1] : this.line30Pos[v];
            const end = v >= this.line30Pos.length - 1 ? Pos.pos30End : this.line30Pos[v + 1];
            startingPoint.x = start.x + (end.x - start.x) * (lessP / stepLength);
            startingPoint.y = start.y;
            this.pointCastPos(startingPoint.add(new Vector3(0, 50, -0.8)), new Vector3(0, -1, 0),
                this.tip, this.line30, this.curve30, this.line30Pos, this.line30Dis, false);
        } else if (this.type === 3) {
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
            if (window.screen.height < 449) {
                this.msg.style.left = `${screen.x / 2 + 24 + 20}px`;
            } else {
                this.msg.style.left = `${screen.x / 2 + 48 + 20}px`;
            }
        } else {
            this.msg.style.top = `${-screen.y - this.msgH / 2 - 10}px`;
            this.msg.style.left = `${screen.x + 48 + 40}px`;
        }
    }

    reset() {
        this.ButtonEvent(0);
    }
}
