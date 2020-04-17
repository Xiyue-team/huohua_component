import Vue from 'vue';
import {
    Vector3, Texture, AbstractMesh, MeshBuilder, Mesh, Scene, Engine,
    HemisphericLight, StandardMaterial, SceneLoader, Ray, Vector2, ExecuteCodeAction, ActionManager
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';

import { ViewModel } from '../ViewModel';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { SrcUtils } from '../SrcUtils';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';
import { Pos } from './Pos';
import * as Europe from '../sub_static/Europe.glb';

export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    src: SrcUtils;
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

    line40: AbstractMesh;
    line100: AbstractMesh;

    curve40: AbstractMesh;
    curve100: AbstractMesh;
    msg = <HTMLElement>document.getElementById('msg');
    msgH: number;

    line40Dis = [30, 40, 20, 30, 30, 20, 50, 20];
    line100Dis = [100, 20, 20, 30, 20, 20];

    line40Pos = [new Vector3(-262.89, 100.34, 1), new Vector3(-201.73, 72.29, 1), new Vector3(-155.99, 60.34, 1),
    new Vector3(-93.83, 49.59, 1), new Vector3(-36.46, 47.20, 1)
        , new Vector3(240.85, 86.63, 1), new Vector3(292.25, 108.14, 1), new Vector3(392.66, 149.96, 1)];

    line100Pos = [new Vector3(-155.99, -165.50, 1), new Vector3(-138.06, -7.77, 1), new Vector3(-135.67, 22.11, 1),
    new Vector3(-132.08, 51.98, 1), new Vector3(-122.52, 124.87, 1), new Vector3(-96.22, 290.96, 1)];

    curve40Dots = [new Vector3(-432.10, -476.18, 1), new Vector3(-329.31, -416.43, 1), new Vector3(-249.22, -431.97, 1),
    new Vector3(-112.96, -325.62, 1), new Vector3(5.38, -332.79, 1),
    new Vector3(193.04, -418.82, 1), new Vector3(268.35, -430.77, 1), new Vector3(373.53, -333.98, 1)];

    curve100Dots = [new Vector3(-313.77, -464.23, 1), new Vector3(-132.08, -328.01, 1), new Vector3(-14.94, -412.85, 1),
    new Vector3(66.34, -371.02, 1), new Vector3(194.24, -408.07, 1), new Vector3(326.92, -365.05, 1)];

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

        this.frontTex40 = new Texture(this.src.bg40, scene);
        this.frontTex40.hasAlpha = true;
        this.frontTex100 = new Texture(this.src.bg100, scene);
        this.frontTex100.hasAlpha = true;

        this.frontMat = PlanUtils.CreateMaterial('frontMat', this.frontTex40, scene);
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

        SceneLoader.ImportMesh('', Europe.replace('Europe.glb', ''), 'Europe.glb', scene, (v) => { this.importMeshSuccess(v); });
        this.ray = new Ray(new Vector3(0, 10, 0), new Vector3(0, 1, 0), 200);
        this.dotRay = new Ray(new Vector3(0, 10, 0), new Vector3(0, 1, 0), 300);
        this.addPointerEventListener(bgPlan, canvas, scene);
        this.reset();
        return scene;
    }

    importMeshSuccess(meshes: AbstractMesh[]) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
            if (meshes[i].name === 'nurbsToPoly5') {
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

    getNearPos(p: Vector3, poses: Vector3[]): number {
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
                this.tipTex.uOffset = 1 / 3;
                this.tip.position = Pos.pos40Start;
                this.dot.position = Pos.pos40CurveStart;
                this.frontMat.diffuseTexture = this.frontTex40;
            }
        }
        this.msgMove();
    }

    slideChangeTransitionEnd(index: number) {
        let startingPoint = new Vector3(0, 0, 1);
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
        let startingPoint = new Vector3(0, 0, 1);
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
