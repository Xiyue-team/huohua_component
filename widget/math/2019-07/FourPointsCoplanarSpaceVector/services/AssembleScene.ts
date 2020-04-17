/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/7/20 10:10
 */
import Vue from 'vue';
import {
    Vector3,
    Color3,
    Color4,
    Mesh,
    Material,
    LinesMesh,
    TransformNode,
    Scene,
    Engine,
    AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Coordinate3DSystem } from '../../../../babylon/Math/utils/Coordinate3DSystem';
import { Base3DScene } from '../../../../babylon/template/Base3DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as dot from '../sub_static/dot.png';

export class AssembleScene extends Base3DScene {
    viewModel: ViewModel;
    edgesWidth = 6;
    coordinateSystem: Coordinate3DSystem;
    colorHexStringRed = '#F05467';
    colorHexStringBlack = '#020202';
    colorHexStringGreen = '#8BC052';
    colorHexStringBlue = '#5F9BEE';
    colorRed: Color3;
    colorBlack: Color3;
    colorGreen: Color3;
    colorBlue: Color3;

    //点A B C P
    posA = new Vector3(5, 5, 5);
    tipAA: Mesh;
    tipA: Mesh;
    tiptextA: GUI.TextBlock;

    posC = new Vector3(8.954, -0.592, 8.954);
    tipC: Mesh;
    tiptextC: GUI.TextBlock;
    tipCC: Mesh;

    posB = new Vector3(8.526, 7.796, -2.48);
    tipBB: Mesh;
    tipB: Mesh;
    tiptextB: GUI.TextBlock;

    posP = new Vector3(-2.093, 9.194, 6.162);
    tipPP: Mesh;
    tipP: Mesh;
    tiptextP: GUI.TextBlock;

    LineOA: LinesMesh;
    LineOB: LinesMesh;
    LineOC: LinesMesh;
    LineOP: LinesMesh;

    LineAB: LinesMesh;
    LineAC: LinesMesh;
    LineAP: LinesMesh;

    NodeOA: TransformNode;
    NodeOB: TransformNode;
    NodeOC: TransformNode;
    NodeOP: TransformNode;

    NodeAB: TransformNode;
    NodeAC: TransformNode;
    NodeAP: TransformNode;

    ArrowOA: Mesh;
    ArrowOB: Mesh;
    ArrowOC: Mesh;
    ArrowOP: Mesh;

    ArrowAB: Mesh;
    ArrowAC: Mesh;
    ArrowAP: Mesh;
    plan: Mesh; //可交互平面

    IsMoved = true;
    length = 0.5;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /**
     * 初始化颜色 
     */
    initColor() {
        this.colorRed = Color3.FromHexString(this.colorHexStringRed);
        this.colorBlack = Color3.FromHexString(this.colorHexStringBlack);
        this.colorGreen = Color3.FromHexString(this.colorHexStringGreen);
        this.colorBlue = Color3.FromHexString(this.colorHexStringBlue);
    }

    /**
     * 初始化网格
     * @param scene 
     */
    initMesh(scene: Scene) {
        this.tipAA = new Mesh('a');
        this.tipCC = new Mesh('a');
        this.tipBB = new Mesh('a');
        this.tipPP = new Mesh('a');

        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipC = Mesh.CreateSphere('tipC', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);
        this.tipP = Mesh.CreateSphere('tipP', 8, 1.5, scene);
        this.setMeshVisible([this.tipP, this.tipA, this.tipB, this.tipC], false);

        this.tipA.position = this.posA;
        this.tipB.position = this.posB;
        this.tipC.position = this.posC;
        this.tipP.position = this.posP;
        this.initArrow(scene);
    }

    initArrow(scene: Scene) {
        this.NodeOA = new TransformNode('NodeOA');
        this.NodeOB = new TransformNode('NodeOB');
        this.NodeOC = new TransformNode('NodeOC');
        this.NodeOP = new TransformNode('NodeOP');
        this.NodeAB = new TransformNode('NodeAB');
        this.NodeAC = new TransformNode('NodeAC');
        this.NodeAP = new TransformNode('NodeAP');
        const lightmaterial = MaterialLab.CreateLightMaterial(this.colorBlack, scene);
        lightmaterial.freeze();

        this.ArrowOA = Mesh.CreateCylinder('arrowA', 0.2, 0, 0.2, 16, 1, scene);
        this.ArrowOA.rotation = new Vector3(-Math.PI / 2, 0, 0);
        this.ArrowOA.position = new Vector3(0, 0, 0.1);
        this.ArrowOA.material = lightmaterial;
        this.ArrowOA.isPickable = false;

        this.ArrowOB = this.ArrowOA.clone('ArrowOB', this.NodeOB);
        this.ArrowOC = this.ArrowOA.clone('ArrowOC', this.NodeOC);
        this.ArrowOP = this.ArrowOA.clone('ArrowOP', this.NodeOP);
        this.ArrowAB = this.ArrowOA.clone('ArrowAB', this.NodeAB);
        this.ArrowAC = this.ArrowOA.clone('ArrowAC', this.NodeAC);
        this.ArrowAP = this.ArrowOA.clone('ArrowAP', this.NodeAP);
        this.ArrowOA.setParent(this.NodeOA);
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.initColor();
        this.initMesh(scene);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.coordinateSystem = new Coordinate3DSystem('coordinateSystem', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .createSystem(5, 2, { x: this.colorHexStringRed, y: this.colorHexStringBlue, z: this.colorHexStringGreen }, this.edgesWidth)
            .createAxisOLabel({
                height: 40, width: 40, color: '#000000',
                fontSize: 12, fontFamily: '', fontStyle: ''
            })
            .createNumberLabel({
                height: '20px', width: '30px', color: '#000000',
                fontSize: 12, fontFamily: '', fontStyle: ''
            });

        const options = {
            height: 30, width: 70, color: this.colorHexStringBlack,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        this.tiptextA = LabelUtils.CreateLabel(advancedTexture, this.tipAA, 'A', options);
        this.tiptextB = LabelUtils.CreateLabel(advancedTexture, this.tipBB, 'B', options);
        this.tiptextC = LabelUtils.CreateLabel(advancedTexture, this.tipCC, 'C', options);
        this.tiptextP = LabelUtils.CreateLabel(advancedTexture, this.tipPP, 'P', options);

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, `${dot}`, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipP, `${dot}`, ImageLabelOption);

        this.LineOA = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.posA], this.colorBlack, this.edgesWidth, this.LineOA, scene);
        this.LineOB = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.posB], this.colorBlack, this.edgesWidth, this.LineOB, scene);
        this.LineOC = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.posC], this.colorBlack, this.edgesWidth, this.LineOC, scene);
        this.LineOP = LinesBuild.CreateUpdateLines([Vector3.Zero(), this.posP], this.colorBlack, this.edgesWidth, this.LineOP, scene);

        this.LineAB = LinesBuild.CreateUpdateLines([this.posA, this.posB], this.colorBlack, this.edgesWidth, this.LineAB, scene);
        this.LineAC = LinesBuild.CreateUpdateLines([this.posA, this.posC], this.colorBlack, this.edgesWidth, this.LineAC, scene);
        this.LineAP = LinesBuild.CreateUpdateLines([this.posA, this.posP], this.colorBlack, this.edgesWidth, this.LineAP, scene);
    }


    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.camera = this.createArcRotateCamera4Math(scene);
        this.initValue(scene);

        const planMaterialXZ = MaterialLab.CreateLightMaterial(this.colorBlue, scene, 0.3);
        planMaterialXZ.backFaceCulling = false;
        const planXZ = Mesh.CreatePlane('plan', 20, scene);
        planXZ.rotation = new Vector3(Math.PI / 2, 0, 0);
        planXZ.material = planMaterialXZ;

        const planMaterial = MaterialLab.CreateLightMaterial(this.colorRed, scene, 0.3);
        planMaterial.backFaceCulling = false;
        this.plan = Mesh.CreatePlane('plan', 18, scene);
        this.plan.rotation = new Vector3(Math.PI / 4, Math.PI * 5 / 4, 0);
        this.plan.position = new Vector3(5, 5, 5);
        this.plan.material = planMaterial;
        this.addPointerEventListener(this.plan, canvas, scene);
        this.reset();
        return scene;
    }

    /**
      * 更新ABC标签位置
      */
    updateLabelPos() {
        this.tipAA.position = this.tipA.position.add(this.tipA.position.scale(1).normalize().scale(this.length));
        this.tipBB.position = this.tipB.position.add(this.tipB.position.scale(1).normalize().scale(this.length));
        this.tipCC.position = this.tipC.position.add(this.tipC.position.scale(1).normalize().scale(this.length));
        this.tipPP.position = this.tipP.position.add(this.tipP.position.scale(1).normalize().scale(this.length));

        this.NodeOA.position = this.tipA.position;
        this.NodeOA.lookAt(Vector3.Zero());

        this.NodeOB.position = this.tipB.position;
        this.NodeOB.lookAt(Vector3.Zero());

        this.NodeOC.position = this.tipC.position;
        this.NodeOC.lookAt(Vector3.Zero());

        this.NodeOP.position = this.tipP.position;
        this.NodeOP.lookAt(Vector3.Zero());

        this.NodeAC.position = this.tipC.position;
        this.NodeAC.lookAt(this.tipA.position);

        this.NodeAB.position = this.tipB.position;
        this.NodeAB.lookAt(this.tipA.position);

        this.NodeAP.position = this.tipP.position;
        this.NodeAP.lookAt(this.tipA.position);
    }
    /**
     * 更新线条
     */
    updateLineData(): void {
        this.updateLabelPos();
        this.updateVerticesData();
    }

    /**
     * 更新线条实体
     */
    updateVerticesData() {
        this.updateMeshVertData(this.LineOA, Vector3Utils.ToArray([Vector3.Zero(), this.tipA.position]));
        this.updateMeshVertData(this.LineOB, Vector3Utils.ToArray([Vector3.Zero(), this.tipB.position]));
        this.updateMeshVertData(this.LineOC, Vector3Utils.ToArray([Vector3.Zero(), this.tipC.position]));
        this.updateMeshVertData(this.LineOP, Vector3Utils.ToArray([Vector3.Zero(), this.tipP.position]));

        this.updateMeshVertData(this.LineAB, Vector3Utils.ToArray([this.tipA.position, this.tipB.position]));
        this.updateMeshVertData(this.LineAC, Vector3Utils.ToArray([this.tipA.position, this.tipC.position]));
        this.updateMeshVertData(this.LineAP, Vector3Utils.ToArray([this.tipA.position, this.tipP.position]));
    }
    /**
     * 手势监听
     * @param plan
     * @param canvas
     * @param scene
     */
    addPointerEventListener(plan: Mesh, canvas: HTMLCanvasElement, scene: Scene): void {
        let currentMesh: AbstractMesh;
        let startingPoint: Vector3;
        const getGroundPosition = (evt: any) => {
            const pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                return mesh === plan;
            });
            if (pickinfo.hit) {
                return pickinfo.pickedPoint;
            }
            return null;
        };
        // 场景输入坐标监听（按下）
        const onPointerDown = (evt: any) => {
            if (evt.button !== 0) { return; }
            const pickInfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) { return mesh !== plan && mesh.isPickable !== false; });
            if (pickInfo.hit) {
                currentMesh = pickInfo.pickedMesh;
                if (currentMesh.name.indexOf('tip') !== -1) {
                    startingPoint = getGroundPosition(evt);
                    if (startingPoint) {
                        this.camera.detachControl(canvas);
                    }
                }
            }
        };
        // 场景输入坐标监听（移动）
        const onPointerMove = (evt: any) => {
            if (!startingPoint) { return; }
            const current = getGroundPosition(evt);
            if (!current) { return; }
            if (currentMesh.name.indexOf('tip') !== -1) {
                currentMesh.position = startingPoint;
                this.updateLineData();
            }
            startingPoint = current;
        };
        // 场景输入坐标监听（抬起）
        const onPointerUp = () => {
            if (startingPoint) {
                this.camera.attachControl(canvas, true);
                startingPoint = null;
                return;
            }
        };
        canvas.addEventListener('pointerdown', onPointerDown, false);
        canvas.addEventListener('pointerup', onPointerUp, false);
        canvas.addEventListener('pointermove', onPointerMove, false);

        scene.onDispose = function () {
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointermove', onPointerMove);
        };
    }

    /**
     * 答案步骤
     * @param i 
     */
    Answer(i: number) {
        if (i === 1) {
            this.IsMoved = true;
            this.setMeshVisible([this.LineAB, this.LineAC, this.LineAP, this.ArrowAB, this.ArrowAC, this.ArrowAP], true);
            this.setMeshVisible([this.LineOA, this.LineOB, this.LineOC, this.LineOP,
            this.ArrowOA, this.ArrowOB, this.ArrowOC, this.ArrowOP, this.plan], false);
        } else if (i === 2) {
            this.IsMoved = false;
            this.setMeshVisible([this.LineAB, this.LineAC, this.LineAP, this.ArrowAB, this.ArrowAC, this.ArrowAP], false);
            this.setMeshVisible([this.LineOA, this.LineOB, this.LineOC, this.LineOP,
            this.ArrowOA, this.ArrowOB, this.ArrowOC, this.ArrowOP, this.plan], true);
        }
        this.updateLineData();
    }

    /**
     * '重置'按钮
     */
    reset(): void {
        this.Answer(1);
    }
}
