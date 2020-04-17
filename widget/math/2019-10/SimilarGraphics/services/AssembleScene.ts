/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/10/30 10:10
 */
import Vue from 'vue';
import {
    Color3, Vector3, Animation, LinesMesh, Mesh, Scene, Engine
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Face } from './Face';
import { OrthoGraphicScene } from '../../../../babylon/template/OrthoGraphicScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';


export class AssembleScene extends OrthoGraphicScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽

    hexYellow = '#F8E71C';
    colorYellow: Color3;

    tipA: Mesh; //模型A
    tipB: Mesh; //模型B
    tipC: Mesh; //模型C
    tipD: Mesh; //模型D
    Linetriangular: LinesMesh; //三角形
    Linequadrilateral: LinesMesh; //四边形
    face: Face; //笑脸
    group: Mesh; //组

    tipAA: Mesh; //模型A
    tipBB: Mesh; //模型B
    tipCC: Mesh; //模型C
    tipDD: Mesh; //模型D
    Linetriangular2: LinesMesh; //三角形2
    Linequadrilateral2: LinesMesh; //四边形2

    tiplA: Mesh; //模型A
    tiplB: Mesh; //模型B
    tiplC: Mesh; //模型C
    tiplD: Mesh; //模型D
    tiplA2: Mesh; //模型A2
    tiplB2: Mesh; //模型B2
    tiplC2: Mesh; //模型C2
    tiplD2: Mesh; //模型D2
    face2: Face; //笑脸2
    group2: Mesh; //组2

    labelA: GUI.TextBlock; //标签A
    labelB: GUI.TextBlock; //标签B
    labelC: GUI.TextBlock; //标签C
    labelD: GUI.TextBlock; //标签D

    labelA2: GUI.TextBlock; //标签A2
    labelB2: GUI.TextBlock; //标签B2
    labelC2: GUI.TextBlock; //标签C2
    labelD2: GUI.TextBlock; //标签D2

    anphaPos: Animation; //位置动画
    anphaScale: Animation; //缩放动画
    anphaRotate: Animation;  //旋转动画
    frameRate = 25; //帧

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        this.changeCameraSize(22, 18);
        super.resize();
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipA = new Mesh('AA');
        this.tipB = new Mesh('AA');
        this.tipC = new Mesh('AA');
        this.tipD = new Mesh('AA');
        this.group = new Mesh('AA');
        this.face = new Face('face', scene).createLine(this.colorYellow, this.edgesWidth);

        this.tiplA = new Mesh('AA');
        this.tiplB = new Mesh('BB');
        this.tiplC = new Mesh('CC');
        this.tiplD = new Mesh('AA');

        this.tipA.setParent(this.group);
        this.tipB.setParent(this.group);
        this.tipC.setParent(this.group);
        this.tipD.setParent(this.group);
        this.face.setParent(this.group);
        this.tiplA.setParent(this.group);
        this.tiplB.setParent(this.group);
        this.tiplC.setParent(this.group);
        this.tiplD.setParent(this.group);

        this.tipAA = new Mesh('AA');
        this.tipBB = new Mesh('BB');
        this.tipCC = new Mesh('CC');
        this.tipDD = new Mesh('AA');

        this.tiplA2 = new Mesh('AA');
        this.tiplB2 = new Mesh('BB');
        this.tiplC2 = new Mesh('CC');
        this.tiplD2 = new Mesh('AA');

        this.group2 = new Mesh('AA');
        this.face2 = new Face('face', scene).createLine(this.colorYellow, this.edgesWidth);
        this.tipAA.setParent(this.group2);
        this.tipBB.setParent(this.group2);
        this.tipCC.setParent(this.group2);
        this.tipDD.setParent(this.group2);
        this.face2.setParent(this.group2);
        this.tiplA2.setParent(this.group2);
        this.tiplB2.setParent(this.group2);
        this.tiplC2.setParent(this.group2);
        this.tiplD2.setParent(this.group2);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene): void {
        this.colorYellow = Color3.FromHexString(this.hexYellow);
        this.initMesh(scene);

        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const options = {
            height: 30, width: 60, color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        if (this.isMob) {
            ImageLabelOption.height = ImageLabelOption.width = '60px';
            options.width = 120;
            options.height = 45;
            options.fontSize = '36px';
        }
        this.labelA = LabelUtils.CreateLabel(advancedTexture, this.tiplA, 'A', options);
        this.labelB = LabelUtils.CreateLabel(advancedTexture, this.tiplB, 'B', options);
        this.labelC = LabelUtils.CreateLabel(advancedTexture, this.tiplC, 'C', options);
        this.labelD = LabelUtils.CreateLabel(advancedTexture, this.tiplD, 'D', options);
        this.labelA2 = LabelUtils.CreateLabel(advancedTexture, this.tiplA2, `A'`, options);
        this.labelB2 = LabelUtils.CreateLabel(advancedTexture, this.tiplB2, `B'`, options);
        this.labelC2 = LabelUtils.CreateLabel(advancedTexture, this.tiplC2, `C'`, options);
        this.labelD2 = LabelUtils.CreateLabel(advancedTexture, this.tiplD2, `D'`, options);
    }

    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.TargetCamera(scene, 22, 18);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.initValue(advancedTexture, scene);
        const pos = Vector3.Zero();
        this.Linetriangular = LinesBuild.CreateUpdateLines([pos, pos, pos, pos],
            this.colorYellow, this.edgesWidth, this.Linetriangular, scene);
        this.Linetriangular.setParent(this.group);
        this.Linetriangular2 = LinesBuild.CreateUpdateLines([pos, pos, pos, pos],
            this.colorYellow, this.edgesWidth, this.Linetriangular2, scene);
        this.Linetriangular2.setParent(this.group2);

        this.Linequadrilateral = LinesBuild.CreateUpdateLines([pos, pos, pos, pos, pos],
            this.colorYellow, this.edgesWidth, this.Linequadrilateral, scene);
        this.Linequadrilateral.setParent(this.group);
        this.Linequadrilateral2 = LinesBuild.CreateUpdateLines([pos, pos, pos, pos, pos],
            this.colorYellow, this.edgesWidth, this.Linequadrilateral2, scene);
        this.Linequadrilateral2.setParent(this.group2);
        scene.registerBeforeRender(() => {
            if (this.viewModel.verificationActived) {
                this.viewModel.rotateNumber = Math.floor(this.group2.rotation.z * 180 / Math.PI);
                this.viewModel.sizeNumber = Number(this.group2.scaling.x.toFixed(1));
            }
        });
        this.reset();
        return scene;
    }

    /**
     * 更新线条
     */
    updateLineData(): void {
        const posA = this.tipA.position, posB = this.tipB.position, posC = this.tipC.position, posD = this.tipD.position;
        this.tipAA.position = posA;
        this.tipBB.position = posB;
        this.tipCC.position = posC;
        this.tipDD.position = posD;
        this.updateMeshVertData(this.Linetriangular, Vector3Utils.ToArray([posA, posB, posC, posA]));
        this.updateMeshVertData(this.Linetriangular2, Vector3Utils.ToArray([posA, posB, posC, posA]));
        this.updateMeshVertData(this.Linequadrilateral, Vector3Utils.ToArray([posA, posB, posC, posD, posA]));
        this.updateMeshVertData(this.Linequadrilateral2, Vector3Utils.ToArray([posA, posB, posC, posD, posA]));
        if (this.viewModel.buttonActived === 2) {
            this.setGUIVisible([this.labelA2, this.labelB2, this.labelC2, this.labelD2],
                this.group2.rotation.z !== 0 || Vector3.Distance(this.group2.position, this.group.position) > 0.001);
        } else if (this.viewModel.buttonActived === 3) {
            this.setGUIVisible([this.labelA2, this.labelB2, this.labelC2],
                this.group2.rotation.z !== 0 || Vector3.Distance(this.group2.position, this.group.position) > 0.001);
        }
        this.updateLabelPos();
    }
    /**
      * 更新ABC标签位置
      */
    updateLabelPos() {
        const posA = this.tipA.position, posB = this.tipB.position, posC = this.tipC.position, posD = this.tipD.position;
        this.tiplA.position = posA.add(Vector3.Normalize(posA));
        this.tiplB.position = posB.add(Vector3.Normalize(posB));
        this.tiplC.position = posC.add(Vector3.Normalize(posC));
        this.tiplD.position = posD.add(Vector3.Normalize(posD));
        const v = this.viewModel.sizeNumber === 0 ? 0.0001 : this.viewModel.sizeNumber;
        this.tiplA2.position = posA.add(Vector3.Normalize(posA).scale(1 / v));
        this.tiplB2.position = posB.add(Vector3.Normalize(posB).scale(1 / v));
        this.tiplC2.position = posC.add(Vector3.Normalize(posC).scale(1 / v));
        this.tiplD2.position = posD.add(Vector3.Normalize(posD).scale(1 / v));
    }
    /**
     * 选择图形按钮
     * @param i 
     */
    switchGraphic(i: number) {
        this.face.setMeshVisible(false);
        this.face2.setMeshVisible(false);
        this.setMeshVisible([this.Linequadrilateral, this.Linequadrilateral2, this.Linetriangular, this.Linetriangular2], false);
        this.setGUIVisible([this.labelA, this.labelB, this.labelC, this.labelD,
        this.labelA2, this.labelB2, this.labelC2, this.labelD2], false);
        if (i === 1) {
            this.face.setMeshVisible(true);
            this.face2.setMeshVisible(true);
        } else if (i === 2) {
            this.setGUIVisible([this.labelA, this.labelB, this.labelC, this.labelD], true);
            this.setMeshVisible([this.Linequadrilateral, this.Linequadrilateral2], true);
            this.tipA.position = new Vector3(-4, -3, 0);
            this.tipB.position = new Vector3(4, 1, 0);
            this.tipC.position = new Vector3(2, 3.5, 0);
            this.tipD.position = new Vector3(-3.5, 3, 0);
        } else if (i === 3) {
            this.setGUIVisible([this.labelA, this.labelB, this.labelC], true);
            this.setMeshVisible([this.Linetriangular, this.Linetriangular2], true);
            this.tipA.position = new Vector3(-4, -2, 0);
            this.tipB.position = new Vector3(3.5, -1, 0);
            this.tipC.position = new Vector3(-2, 3, 0);
        }
        this.switchGraphicReset();
        this.updateLineData();
    }

    /**
     * 旋转滑条回调
     * @param angle 
     */
    formatterRotation(angle: number) {
        if (this.anphaPos || this.anphaRotate || this.anphaScale) {
            this.scene.stopAllAnimations();
        }
        this.group2.rotation.z = angle / 180 * Math.PI;
        this.group2.position = new Vector3(5, 0, 0);
        this.animationFinish();
        this.setGUIVisible([this.labelA2, this.labelB2, this.labelC2],
            this.viewModel.sizeNumber !== 0 && this.viewModel.buttonActived !== 1);
        this.setGUIVisible([this.labelD2],
            this.viewModel.sizeNumber !== 0 && this.viewModel.buttonActived === 2);
        this.updateLineData();
    }

    /**
     * 大小滑条回调
     * @param size 
     */
    formatterSize(size: number) {
        if (this.anphaPos || this.anphaRotate || this.anphaScale) {
            this.scene.stopAllAnimations();
        }
        this.group2.scaling = Vector3.One().scale(size === 0 ? 0.0001 : size);
        this.animationFinish();
        this.group2.position = new Vector3(6, 0, 0);
        this.updateLabelPos();
    }

    /**
     * 验证
     * @param isV 
     */
    verificationEvent(isV: boolean) {
        if (isV) {
            this.updateLineData();
            this.createAnimation(this.group2.position, this.group.position, this.group2.scaling, this.group.scaling,
                this.group2.rotation, this.group.rotation);
            this.scene.beginDirectAnimation(this.group2, [this.anphaPos], 0, 36, false, 1, () => {
                this.scene.beginDirectAnimation(this.group2, [this.anphaRotate], 0, 36, false, 1, () => {
                    this.scene.beginDirectAnimation(this.group2, [this.anphaScale], 0, 36, false, 1, () => {
                        this.animationFinish();
                    });
                });
            });
        } else {
            if (this.anphaPos || this.anphaRotate || this.anphaScale) {
                this.scene.stopAllAnimations();
            }
            this.group2.position = new Vector3(6, 0, 0);
            this.viewModel.rotateNumber = 30;
            this.viewModel.sizeNumber = 0.5;
            this.formatterRotation(30);
            this.formatterSize(0.5);
            this.animationFinish();
        }
    }

    /**
     * 创建动画
     * @param fromPos 
     * @param toPos 
     * @param fromScale 
     * @param toScale 
     * @param fromRotate 
     * @param toRotate 
     */
    createAnimation(fromPos: Vector3, toPos: Vector3, fromScale: Vector3, toScale: Vector3, fromRotate: Vector3, toRotate: Vector3) {
        this.anphaPos = new Animation('position', 'position', this.frameRate,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.anphaPos.setKeys([{ frame: 0, value: fromPos }, { frame: 36, value: toPos }]);

        this.anphaScale = new Animation('scaling', 'scaling', this.frameRate,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.anphaScale.setKeys([{ frame: 0, value: fromScale }, { frame: 36, value: toScale }]);

        this.anphaRotate = new Animation('rotation', 'rotation', this.frameRate,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.anphaRotate.setKeys([{ frame: 0, value: fromRotate }, { frame: 36, value: toRotate }]);
    }

    /**
     * 动画回调
     */
    animationFinish() {
        if (this.viewModel.verificationActived) {
            this.labelA.text = `A(A')`;
            this.labelB.text = `B(B')`;
            this.labelC.text = `C(C')`;
            this.labelD.text = `D(D')`;
        } else {
            this.labelA.text = `A`;
            this.labelB.text = `B`;
            this.labelC.text = `C`;
            this.labelD.text = `D`;
        }
        this.setGUIVisible([this.labelA2, this.labelB2, this.labelC2],
            !this.viewModel.verificationActived && this.viewModel.buttonActived !== 1);
        this.setGUIVisible([this.labelD2],
            !this.viewModel.verificationActived && this.viewModel.buttonActived === 2);
    }

    /**
     * 重置图形
     */
    switchGraphicReset(): void {
        this.verificationEvent(this.viewModel.verificationActived);
        this.viewModel.rotateNumber = 30;
        this.viewModel.sizeNumber = 0.5;
        this.formatterRotation(30);
        this.formatterSize(0.5);
        this.group.position = new Vector3(-14, 0, 0);
        this.group2.position = new Vector3(6, 0, 0);
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.switchGraphic(1);
        this.switchGraphicReset();
    }
}
