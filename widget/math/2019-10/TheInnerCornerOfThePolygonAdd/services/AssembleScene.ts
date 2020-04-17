/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/10/1 21:10
 */
import Vue from 'vue';
import {
    Vector3, Color3, LinesMesh, Scene, Engine, StandardMaterial, Mesh, AbstractMesh,
    Texture, ExecuteCodeAction, ActionManager, HemisphericLight, Vector2
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from './Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { PolygonUtils } from '../../../../babylon/Math/utils/PolygonUtils';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { Data } from './Data';
import { Utils } from './Utils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';
export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    hexRed = '#FF5A5A';
    hexBlue = '#17A3FF';
    hexYellow = '#FFD621';
    colorRed: Color3;
    colorBlue: Color3;
    colorYellow: Color3;

    tipP: Mesh; //动点
    mat: StandardMaterial;
    polygon: LinesMesh; //多边形
    positions: Vector3[] = [];
    msg = Data.massage;
    dashedLine: LinesMesh[] = [];
    dots: Mesh[] = [];
    angline: Mesh;
    msgHtml = <HTMLElement>document.getElementById('msg');
    msgH: number;
    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize();
        this.msgH = this.msgHtml.clientHeight;
        this.msgMove();
    }

    /**
     * 初始化颜色
     */
    initColor() {
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorYellow = Color3.FromHexString(this.hexYellow);

    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.msgH = this.msgHtml.clientHeight;
        if (this.isMob) {
            this.tipP = Mesh.CreateSphere('tipC', 8, 4, scene);
        } else {
            this.tipP = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        }
        this.setMeshVisible([this.tipP], false);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.initColor();
        this.initMesh(scene);
        const dotOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob) {
            dotOption.height = dotOption.width = '80px';
        }
        LabelUtils.CreateDot(advancedTexture, this.tipP, dot, dotOption);
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;

        this.createTargetCamera4Math(scene, 20);
        this.camera.position.y = 0;
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);
        this.mat = MaterialLab.CreateLightMaterial(this.colorRed, scene, 0.5);

        let option = { width: 2, height: 2 };

        if (this.isMob && (window as any)['env'].browserInfo.isSmallDevice) {
            option = { width: 4, height: 4 };
        }
        const bgTex40 = new Texture(dot2, scene);
        bgTex40.hasAlpha = true;
        const bgMat = PlanUtils.CreateMaterial('bgMat', bgTex40, scene);
        const bgPlan = PlanUtils.CreatePlan(bgMat, new Vector3(0, 0, 0), option, scene);
        bgPlan.renderingGroupId = 2;
        bgPlan.actionManager = new ActionManager(scene);
        bgPlan.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (ev) => {
            this.scene.hoverCursor = 'pointer';
        }));

        for (let i = 0; i < 7; i++) {
            let line: LinesMesh = null;
            line = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([Vector3.Zero(), Vector3.One()], 20),
                this.colorYellow, this.edgesWidth, line, scene);
            this.dashedLine.push(line);
            const dotcell = bgPlan.clone('dot' + i);
            dotcell.actionManager = new ActionManager(scene);
            dotcell.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (ev) => {
                this.scene.hoverCursor = 'pointer';
            }));
            this.dots.push(dotcell);
        }
        bgPlan.dispose();
        this.addPointerEventListener(canvas, scene);
        this.reset();
        this.msgMove();
        return scene;
    }

    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        if (currentMesh.name.indexOf('dot') !== -1 && this.viewModel.buttonActived === 1) {
            this.tipP.position = this.positions[Number(currentMesh.name.replace('dot', ''))];
            this.updateLine();
            this.postMessage();
        }
        this.viewModel.msgShow = false;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (this.viewModel.buttonActived === 3) {
            const isInPolygon = PolygonUtils.IsInPolygon(this.positions, startingPoint);
            if (isInPolygon) {
                const pos = Utils.castForPos(Vector3.Zero(), Vector3.Normalize(startingPoint), 1000, this.scene);
                if (Vector3.Distance(startingPoint, pos) < 0.3) {
                    startingPoint = startingPoint.clone().subtract(startingPoint.clone().normalize().scale(0.3));
                }
                currentMesh.position = startingPoint;
            }
        } else if (this.viewModel.buttonActived === 2) {
            const pos = Utils.castForPos(Vector3.Zero(), Vector3.Normalize(startingPoint), 1000, this.scene);
            if (pos !== null) {
                const temp = this.getPoint(pos);
                if (temp === pos) {
                    currentMesh.position = this.getPoint(pos);
                } else {
                    const pos2 = Utils.castForPos(Vector3.Zero(),
                        Vector3.Normalize(temp.add(Vector3.Cross(temp, new Vector3(0, 0, 1)).normalize())), 1000, this.scene);
                    currentMesh.position = this.getPoint(pos2);
                }

            }
        }
        this.updateLine();
        this.postMessage();
    }

    /**
     * 更新线条
     */
    updateLine() {
        for (let i = 0; i < this.positions.length - 1; i++) {
            const element = this.dashedLine[i];
            this.updateMeshVertData(element, Vector3Utils.ToMoreVector3ToArray([this.tipP.position, this.positions[i]], 20));
            this.dots[i].position = this.positions[i];
        }

        let startPos = 0, endPos = 362;
        const po = [];
        for (let i = 0; i < this.positions.length - 1; i++) {
            if (this.viewModel.buttonActived === 1) {
                if (Vector3.Distance(this.tipP.position, this.positions[i]) === 0) {
                    const ang1 = this.positions[i + 1].subtract(this.positions[i]);
                    let ang2 = null;
                    if (i === 0) {
                        ang2 = this.positions[this.positions.length - 2].subtract(this.positions[i]);
                    } else {
                        ang2 = this.positions[i - 1].subtract(this.positions[i]);
                    }
                    startPos = Vector3Utils.GetAngle(ang1, new Vector3(1, 0, 0));
                    startPos = ang1.y >= 0 ? startPos : 360 - startPos;
                    endPos = Vector3Utils.GetAngle(ang2, new Vector3(1, 0, 0));
                    endPos = ang2.y >= 0 ? endPos : 360 - endPos;
                    endPos = endPos < startPos ? endPos + 360 : endPos;
                }
            } else if (this.viewModel.buttonActived === 2) {
                if (Vector3.Dot(Vector3.Normalize(this.positions[i].subtract(this.tipP.position)),
                    Vector3.Normalize(this.tipP.position.subtract(this.positions[i + 1]))) > 0.999) {
                    const ang1 = this.positions[i + 1].subtract(this.positions[i]);
                    startPos = Vector3Utils.GetAngle(ang1, new Vector3(1, 0, 0));
                    startPos = ang1.y >= 0 ? startPos : 360 - startPos;
                    endPos = startPos + 180;
                }
            }
        }
        const poses = FormulasUtils.GetArcUpdateVertices(1, startPos, endPos);
        for (let j = 0; j < poses.length; j++) {
            po.push([poses[j], Vector3.Zero()]);
        }
        if (this.angline) {
            this.angline.dispose();
        }
        this.angline = Mesh.CreateRibbon('ribbon', po, false, false, 0, this.scene, true, Mesh.DOUBLESIDE);
        this.angline.isPickable = false;
        this.angline.material = this.mat;
        this.angline.position = this.tipP.position;
    }

    /**
     * 获取点
     * @param p 
     */
    getPoint(p: Vector3): Vector3 {
        for (let i = 0; i < this.positions.length - 1; i++) {
            const element = this.positions[i];
            if (Vector3.Distance(element, p) < 0.7) {
                return element;
            }
        }
        return p;
    }

    /**
     * 选择边数
     * @param index 
     */
    sideEvent(index: number) {
        this.rebuildMesh(index);
        this.selectMode(this.viewModel.buttonActived);
    }

    rebuildMesh(index: number) {
        if (this.polygon) {
            this.polygon.dispose();
        }
        this.polygon = LinesBuild.CreateLines(this.msg[index - 3].pos, this.colorBlue, this.edgesWidth, this.scene);
        this.polygon.isPickable = true;
        this.positions = this.msg[index - 3].pos;
        for (let i = 0; i < this.dashedLine.length; i++) {
            this.dashedLine[i].isVisible = false;
            this.dots[i].isVisible = false;
            this.dots[i].isPickable = false;

        }
        for (let i = 0; i < this.positions.length - 1; i++) {
            this.dashedLine[i].isVisible = true;
            this.dots[i].isVisible = true;
            this.dots[i].isPickable = true;
        }
    }

    /**
     * 选择模式
     * @param index 
     */
    selectMode(index: number) {
        if (index === 1) {
            if (this.viewModel.sideActived === 3) {
                this.viewModel.sideActived = 4;
                this.rebuildMesh(4);
            }
            this.tipP.position = this.positions[0];
        } else if (index === 2) {
            this.tipP.position = this.positions[0].add(this.positions[1]).scale(0.5);
        } else {
            this.tipP.position = Vector3.Zero();
        }
        this.updateLine();
        this.postMessage();
        for (let i = 0; i < this.dots.length; i++) {
            if (index === 1) {
                this.dots[i].actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (ev) => {
                    this.scene.hoverCursor = 'pointer';
                }));
            } else {
                this.dots[i].actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (ev) => {
                    this.scene.hoverCursor = '';
                }));
            }

        }
    }


    msgMove() {
        const screen = new Vector2(0, 0);
        screen.x = (this.tipP.position.x + this.camera.orthoRight) / Math.abs(this.camera.orthoRight) / 2 * this.engine.getRenderWidth();
        screen.y = (this.tipP.position.y - this.camera.orthoTop) / Math.abs(this.camera.orthoBottom) / 2 * this.engine.getRenderHeight();
        if (this.isMob) {
            this.msgHtml.style.top = `${-screen.y / 2 - this.msgH / 4 - 5}px`;
            this.msgHtml.style.left = `${screen.x / 2 + 20}px`;
        } else {
            this.msgHtml.style.top = `${-screen.y - this.msgH / 2 - 10}px`;
            this.msgHtml.style.left = `${screen.x + 40}px`;
        }
    }

    /**
     * 更新UI
     */
    postMessage() {
        if (this.viewModel.buttonActived === 1) {
            this.viewModel.msg = this.msg[this.viewModel.sideActived - 3].point;
        } else if (this.viewModel.buttonActived === 2) {
            this.viewModel.msg = this.msg[this.viewModel.sideActived - 3].side;
        } else {
            this.viewModel.msg = this.msg[this.viewModel.sideActived - 3].inner;
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.sideEvent(3);
    }
}
