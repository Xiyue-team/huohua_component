/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/8/28 21:10
 */
import Vue from 'vue';
import {
    Color3, Mesh, Scene, Vector3, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Vector, VectorMoveHandler } from '../../../../babylon/Math/Vector/Vector';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';

import * as a from '../sub_static/a.png';
import * as b from '../sub_static/b.png';
import * as ab from '../sub_static/ab.png';
import * as dot from '../sub_static/dot.png';

export class AssembleScene extends Base2DScene implements VectorMoveHandler {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    vectorA: Vector; //向量A
    vectorAPos = new Vector3(-2, -3, 0);
    vectorAArrowPos = new Vector3(3, 12, 0);
    vectorAShadow: Vector; //向量A阴影

    vectorB: Vector; //向量B
    vectorBPos = new Vector3(2, -3, 0);
    vectorBArrowPos = new Vector3(13, 2, 0);
    vectorBShadow: Vector; //向量A阴影
    vectorA1: Vector; //向量A平行
    vectorB1: Vector; //向量B平行
    vectorAB: Vector; //向量A+B

    hexBlue = '#18A2FF';
    hexShadowBlue = '#1d7dbf';
    hexOrange = '#ED6616';
    colorBlue: Color3;
    colorShadowBlue: Color3;
    colorOrange: Color3;
    check = 0;
    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize();
    }

    /**
     * 初始化颜色
     */
    initColor() {
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.colorShadowBlue = Color3.FromHexString(this.hexShadowBlue);
        this.colorOrange = Color3.FromHexString(this.hexOrange);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.initColor();
        const ImageLabelOptionDot = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageLabelOption = { height: '80px', width: '80px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '160px';
            ImageLabelOptionDot.height = ImageLabelOptionDot.width = '80px';
        }

        const matBlue = MaterialLab.CreateLightMaterial(this.colorBlue, scene);
        const matShadowBlue = MaterialLab.CreateLightMaterial(this.colorShadowBlue, scene);
        const matOrange = MaterialLab.CreateLightMaterial(this.colorOrange, scene);
        let tempMesh:Mesh=null;
        if (this.isMob && (window as any)['env'].browserInfo.isSmallDevice) {
            tempMesh = Mesh.CreateSphere('tipVRoot', 8, 2.8, scene);
        } else {
            tempMesh = Mesh.CreateSphere('tipVRoot', 8, 1.8, scene);
        }

        this.vectorA = new Vector('tipA', this.edgesWidth, scene, this, null, tempMesh)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorAPos, this.vectorAArrowPos, this.colorBlue, matBlue)
            .initDotLabel(`${dot}`, ImageLabelOptionDot)
            .initImageLabel(`${a}`, ImageLabelOption);

        this.vectorAShadow = new Vector('tipAShadow', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(Vector3.Zero(), new Vector3(3, 3, 0), this.colorShadowBlue, matShadowBlue, true)
            .initImageLabel(`${a}`, ImageLabelOption).setArrowPickAble(false);

            this.vectorBShadow = new Vector('tipBShadow', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(Vector3.Zero(), new Vector3(3, 3, 0), this.colorShadowBlue, matShadowBlue, true)
            .initImageLabel(`${b}`, ImageLabelOption).setArrowPickAble(false);

        this.vectorB = new Vector('tipB', this.edgesWidth, scene, this, null, tempMesh)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorBPos, this.vectorBArrowPos, this.colorBlue, matBlue)
            .initDotLabel(`${dot}`, ImageLabelOptionDot)
            .initImageLabel(`${b}`, ImageLabelOption);

        this.vectorA1 = new Vector('tipA1', this.edgesWidth, scene)
            .initValue(Vector3.Zero(), new Vector3(3, 3, 0), this.colorShadowBlue, matShadowBlue, true);

        this.vectorB1 = new Vector('tipB1', this.edgesWidth, scene)
            .initValue(Vector3.Zero(), new Vector3(3, 3, 0), this.colorShadowBlue, matShadowBlue, true);

        this.vectorAB = new Vector('tipE2', this.edgesWidth, scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(Vector3.Zero(), new Vector3(6, 0, 0), this.colorOrange, matOrange, true)
            .initImageLabel(`${ab}`, ImageLabelOption);
        this.vectorAB.position = new Vector3(-3, -3, 0);
        tempMesh.dispose();
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 18);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 手势监听
     * @param startingPoint 
     * @param currentMesh
     */
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            this.vectorB.updateDataWithLength(currentMesh, startingPoint, this.orthoX, this.orthoY, this.offset);
            if (this.viewModel.buttonActived === 1) {
                if (currentMesh === this.vectorA) {
                    this.setAPosWithJudge(startingPoint, this.orthoX, this.orthoY, this.offset);
                } else if (currentMesh === this.vectorA.getArrow()) {
                    this.setArrowAPosWithJudge(startingPoint, this.orthoX, this.orthoY, this.offset);
                } else {
                    this.vectorA.updateDataWithLength(currentMesh, startingPoint, this.orthoX, this.orthoY, this.offset);
                }
            } else if (this.viewModel.buttonActived === 2) {
                if (currentMesh === this.vectorA) {
                    this.setPosWithJudge(startingPoint, this.orthoX, this.orthoY, this.offset);
                } else {
                    this.vectorA.updateDataWithLength(currentMesh, startingPoint, this.orthoX, this.orthoY, this.offset);
                }
            } else {
                this.vectorA.updateDataWithLength(currentMesh, startingPoint, this.orthoX, this.orthoY, this.offset);
            }
            this.updateVector();
        }
    }

    setArrowAPosWithJudge(pos: Vector3, orthoX: number, orthoY: number, offset: number, min = 1) {
        const arrowPOs = pos.add(this.vectorB.getArrowPos());
        arrowPOs.x = arrowPOs.x < -orthoX + offset ? -orthoX + offset : arrowPOs.x;
        arrowPOs.x = arrowPOs.x > orthoX - offset ? orthoX - offset : arrowPOs.x;
        arrowPOs.y = arrowPOs.y < -orthoY + offset ? -orthoY + offset : arrowPOs.y;
        arrowPOs.y = arrowPOs.y > orthoY - offset ? orthoY - offset : arrowPOs.y;

        const arrowAPos = arrowPOs.subtract(this.vectorB.getArrowPos());

        const dis = Vector3.Distance(arrowAPos, this.vectorA.position);
        let tempPos = Vector3.Zero();
        if (dis < min) {
            tempPos = Vector3.Normalize(arrowAPos.subtract(this.vectorA.position.scale(1))).scale(min);
        } else if (dis > 15) {
            tempPos = Vector3.Normalize(arrowAPos.subtract(this.vectorA.position.scale(1))).scale(15);
        } else {
            tempPos = arrowAPos.subtract(this.vectorA.position.scale(1));
        }

        this.vectorB.setPos(this.vectorA.position.add(tempPos)).updateRotation();
        this.vectorA.setArrowPos(tempPos).updateRotation();
    }

    setAPosWithJudge(pos: Vector3, orthoX: number, orthoY: number, offset: number, min = 1) {
        const arrowPOs = pos.add(this.vectorA.getArrowPos()).add(this.vectorB.getArrowPos());
        arrowPOs.x = arrowPOs.x < -orthoX + offset ? -orthoX + offset : arrowPOs.x;
        arrowPOs.x = arrowPOs.x > orthoX - offset ? orthoX - offset : arrowPOs.x;
        arrowPOs.y = arrowPOs.y < -orthoY + offset ? -orthoY + offset : arrowPOs.y;
        arrowPOs.y = arrowPOs.y > orthoY - offset ? orthoY - offset : arrowPOs.y;

        const arrowAPos = arrowPOs.subtract(this.vectorA.getArrowPos()).subtract(this.vectorB.getArrowPos());
        const aarrowPOs = arrowAPos.add(this.vectorA.getArrowPos());
        aarrowPOs.x = aarrowPOs.x < -orthoX + offset ? -orthoX + offset : aarrowPOs.x;
        aarrowPOs.x = aarrowPOs.x > orthoX - offset ? orthoX - offset : aarrowPOs.x;
        aarrowPOs.y = aarrowPOs.y < -orthoY + offset ? -orthoY + offset : aarrowPOs.y;
        aarrowPOs.y = aarrowPOs.y > orthoY - offset ? orthoY - offset : aarrowPOs.y;
        const endPos = aarrowPOs.subtract(this.vectorA.getArrowPos());
        this.vectorB.setPos(aarrowPOs).updateRotation();
        this.vectorA.setPos(endPos).updateRotation();
    }

    setPosWithJudge(pos: Vector3, orthoX: number, orthoY: number, offset: number, min = 1) {
        const arrowPOs = pos.add(this.vectorB.getArrowPos());
        arrowPOs.x = arrowPOs.x < -orthoX + offset ? -orthoX + offset : arrowPOs.x;
        arrowPOs.x = arrowPOs.x > orthoX - offset ? orthoX - offset : arrowPOs.x;
        arrowPOs.y = arrowPOs.y < -orthoY + offset ? -orthoY + offset : arrowPOs.y;
        arrowPOs.y = arrowPOs.y > orthoY - offset ? orthoY - offset : arrowPOs.y;

        const arrowAPos = arrowPOs.subtract(this.vectorB.getArrowPos());
        const aarrowPOs = arrowAPos.add(this.vectorA.getArrowPos());
        aarrowPOs.x = aarrowPOs.x < -orthoX + offset ? -orthoX + offset : aarrowPOs.x;
        aarrowPOs.x = aarrowPOs.x > orthoX - offset ? orthoX - offset : aarrowPOs.x;
        aarrowPOs.y = aarrowPOs.y < -orthoY + offset ? -orthoY + offset : aarrowPOs.y;
        aarrowPOs.y = aarrowPOs.y > orthoY - offset ? orthoY - offset : aarrowPOs.y;
        const endPos = aarrowPOs.subtract(this.vectorA.getArrowPos());
        this.vectorB.setPos(endPos).updateRotation();
        this.vectorA.setPos(endPos).updateRotation();
    }

    updateVector() {
        if (this.viewModel.buttonActived === 2) {
            const a1pos = this.vectorA.position.add(this.vectorA.getArrowPos()).scale(1);
            const ar1pos = this.vectorB.getArrowPos().scale(1);
            this.vectorB1.setPos(a1pos).setArrowPos(ar1pos).updateRotation();
            const b1pos = this.vectorB.position.add(this.vectorB.getArrowPos()).scale(1);
            const br1pos = this.vectorA.getArrowPos().scale(1);
            this.vectorA1.setPos(b1pos).setArrowPos(br1pos).updateRotation();
        }
        this.vectorAB.setPos(this.vectorA.position)
            .setArrowPos(this.vectorA.getArrowPos().add(this.vectorB.getArrowPos()).scale(1)).updateRotation();
        this.vectorAShadow.setArrowPos(this.vectorA.getArrowPos()).updateRotation();
        this.vectorBShadow.setArrowPos(this.vectorB.getArrowPos()).updateRotation();
    }
    
    moveEnd(v: Vector): void {
        this.check++;
        if (this.check === 2) {
            this.vectorA.setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true);
            this.vectorB.setArrowPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true);
            if (this.viewModel.buttonActived === 2) {
                this.vectorB1.setVisible(true);
                this.vectorA1.setVisible(true);
            }
            this.vectorAB.setVisible(true).setLabelVisible(true);
            this.updateVector();
            this.check = 0;
        }
    }

    /**
     * '三角形，四边形法则'按钮
     */
    ButtonEvent(index: number) {
        this.vectorAShadow.setPos(this.vectorA.getLastPos()).setArrowPos(this.vectorA.getLastArrowPos())
            .setLabelVisible(true).setVisible(true).updateRotation();
            this.vectorBShadow.setPos(this.vectorB.getLastPos()).setArrowPos(this.vectorB.getLastArrowPos())
            .setLabelVisible(true).setVisible(true).updateRotation();
        this.vectorAB.setLabelVisible(false).setVisible(false).setPickAble(false);
        this.vectorA.setPickAble(false).setRootLabelVisible(false).setArrowLabelVisible(false);
        this.vectorB.setPickAble(false).setRootLabelVisible(false).setArrowLabelVisible(false);
        if (index === 1) {
            this.vectorA1.setVisible(false);
            this.vectorB1.setVisible(false);
            const pos = this.vectorB.position.subtract(this.vectorA.getArrowPos());
            this.vectorA.setCheck(Vector3.Zero().subtract(this.vectorA.getArrowPos()));
            this.vectorB.setCheck(Vector3.Zero());
        } else if (index === 2) {
            this.vectorA.setCheck(Vector3.Zero());
            this.vectorB.setCheck(Vector3.Zero());
        }
        this.check = 0;
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.check = 0;
        this.vectorAShadow.setLabelVisible(false).setVisible(false).setPickAble(false);
        this.vectorBShadow.setLabelVisible(false).setVisible(false).setPickAble(false);
        this.vectorAB.setLabelVisible(false).setVisible(false).setPickAble(false);
        this.vectorA1.setPickAble(false).setVisible(false);
        this.vectorB1.setPickAble(false).setVisible(false);
        this.vectorA.notCheck().setPos(this.vectorAPos).setArrowPos(this.vectorAArrowPos)
            .setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true).updateRotation();
        this.vectorB.notCheck().setPos(this.vectorBPos).setArrowPos(this.vectorBArrowPos)
            .setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true).updateRotation();
    }
}
