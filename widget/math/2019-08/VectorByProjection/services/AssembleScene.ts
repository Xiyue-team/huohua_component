/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/8/28 21:10
 */
import Vue from 'vue';
import {
    Color3, LinesMesh, Mesh, Scene, Vector3, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Vector, VectorMoveHandler } from '../../../../babylon/Math/Vector/Vector';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

import * as a from '../sub_static/a.png';
import * as b from '../sub_static/b.png';
import * as A1 from '../sub_static/A1.png';
import * as B1 from '../sub_static/B1.png';
import * as AA from '../sub_static/AA.png';
import * as BB from '../sub_static/BB.png';
import * as dot from '../sub_static/dot.png';

export class AssembleScene extends Base2DScene implements VectorMoveHandler {

    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    moveStep = 0;
    vectorA: Vector; //向量a
    vectorAPos = new Vector3(0, 1, 0);
    vectorAArrowPos = new Vector3(3, 6, 0);

    vectorB: Vector; //向量b
    vectorBPos = new Vector3(1, 0, 0);
    vectorBArrowPos = new Vector3(7, 1, 0);

    tipH: Mesh; //垂足定位点
    tipO: Mesh; //O点定位
    textO: GUI.TextBlock; //O点文字
    LineOH: LinesMesh; //投影线
    LineHeight: LinesMesh; //高线
    LineAngle: LinesMesh; //垂角
    imageH: GUI.Image; //垂角文字图片
    //阴影向量
    vectorShadow1: Vector;
    vectorShadow2: Vector;
    vectorShadow3: Vector;
    vectorShadow4: Vector;

    Circle: LinesMesh; //角度线
    textAngle: GUI.TextBlock; //角度文本
    halfAngleP: Mesh; //角度文本定位
    arc: number;
    rot: number;

    hexBlue = '#18A2FF';
    hexShadowBlue = '#1d7dbf';
    hexOrange = '#ED6616';
    hexYellow = '#F5D733';
    hexPurple = '#CF16ED';
    colorBlue: Color3;
    colorShadowBlue: Color3;
    colorOrange: Color3;
    colorYellow: Color3;
    colorPurple: Color3;
    offsetx = 2;
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
        this.colorYellow = Color3.FromHexString(this.hexYellow);
        this.colorPurple = Color3.FromHexString(this.hexPurple);
    }

    /**
     * 初始化数值
     * @param advancedTexture
     * @param scene
     */
    initValue(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.initColor();
        this.tipH = new Mesh('h');
        this.tipO = new Mesh('O');
        this.halfAngleP = new Mesh('halfAngleP');
        const ImageLabelOptionDot = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        const ImageLabelOptions = {
            height: '40px', width: '40px', color: '#FFFFFF',
            linkOffsetX: '20px', linkOffsetY: '20px'
        };
        const options = {
            height: '40px', width: '40px', color: '#FFFFFF',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const OptionZ1Z2 = { linkOffsetX: '30px', linkOffsetY: '0px', height: '40px', width: '40px', color: '#FFFFFF' };
        const textoptions = {
            height: 40, width: 100, color: this.hexYellow,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        let offset = 30;
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            options.height = options.width =
                ImageLabelOption.height = ImageLabelOption.width =
                ImageLabelOptionDot.height = ImageLabelOptionDot.width =
                OptionZ1Z2.height = OptionZ1Z2.width =
                ImageLabelOptions.height = ImageLabelOptions.width = '80px';
            OptionZ1Z2.linkOffsetX = '60px';
            textoptions.fontSize = '40px';
            textoptions.height = 80;
            textoptions.width = 200;
            options.fontSize = '40px';
            offset = 50;
        }
        this.imageH = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipH, `${A1}`, ImageLabelOptions);
        this.textO = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipO, 'O', offset, offset, options);

        this.textAngle = LabelUtils.CreateLabel(advancedTexture, this.halfAngleP, 'α', textoptions);
        const matBlue = MaterialLab.CreateLightMaterial(this.colorBlue, scene);
        const matOrange = MaterialLab.CreateLightMaterial(this.colorOrange, scene);
        const tempMesh = Mesh.CreateSphere('tipVRoot', 8, 1.8, scene);

        this.vectorA = new Vector('tipE1', this.edgesWidth, scene, this, null, tempMesh)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorAPos, this.vectorAArrowPos, this.colorBlue, matBlue)
            .initDotLabel(`${dot}`, ImageLabelOptionDot)
            .initImageLabel(`${a}`, ImageLabelOption).initImageText(`${BB}`, OptionZ1Z2, []);

        this.vectorB = new Vector('tipE2', this.edgesWidth, scene, this, null, tempMesh)
            .setAdvancedDynamicTexture(advancedTexture)
            .initValue(this.vectorBPos, this.vectorBArrowPos, this.colorBlue, matBlue)
            .initDotLabel(`${dot}`, ImageLabelOptionDot)
            .initImageLabel(`${b}`, ImageLabelOption).initImageText(`${AA}`, OptionZ1Z2, []);

        this.vectorShadow1 = new Vector('tipE1', this.edgesWidth, scene)
            .initValue(new Vector3(0, 1, 0), new Vector3(5, 0, 0), this.colorOrange, matOrange, true).setPickAble(false);

        this.vectorShadow2 = new Vector('tipE1', this.edgesWidth, scene)
            .initValue(new Vector3(0, -1, 0), new Vector3(5, 0, 0), this.colorOrange, matOrange, true).setPickAble(false);

        this.vectorShadow3 = new Vector('tipE1', this.edgesWidth, scene)
            .initValue(new Vector3(0, 3, 0), new Vector3(5, 0, 0), this.colorOrange, matOrange, true).setPickAble(false);

        this.vectorShadow4 = new Vector('tipE1', this.edgesWidth, scene)
            .initValue(new Vector3(0, -3, 0), new Vector3(5, 0, 0), this.colorOrange, matOrange, true).setPickAble(false);
        tempMesh.dispose();
        this.Circle = LinesBuild.CreateUpdateLines(FormulasUtils.GetArcUpdateVertices(1, 0, 45),
            this.colorYellow, this.edgesWidth, this.Circle, scene);

        this.LineOH = LinesBuild.CreateUpdateLines([new Vector3(0, 1, 0), new Vector3(5, 0, 0)],
            this.colorPurple, this.edgesWidth, this.LineOH, scene);
        this.LineHeight = LinesBuild.CreateUpdateDashedLines(Vector3Utils.ToMoreVector3([new Vector3(0, 1, 0), new Vector3(5, 0, 0)], 20),
            this.colorOrange, this.edgesWidth, this.LineHeight, scene);
        this.LineAngle = LinesBuild.CreateUpdateLines([new Vector3(0, 1, 0), new Vector3(5, 0, 0), new Vector3(5, 0, 0)],
            this.colorYellow, this.edgesWidth, this.LineAngle, scene);
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
        startingPoint.x = startingPoint.x > this.orthoX - this.offset - 2 ? this.orthoX - this.offset - 2 : startingPoint.x;

        if (currentMesh.name.indexOf('tip') !== -1) {
            this.vectorB.updateDataWithLength(currentMesh, startingPoint, this.orthoX, this.orthoY, this.offset);
            if (this.viewModel.buttonActived === 1 || this.viewModel.buttonActived === 2) {
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

    setPosWithJudge(pos: Vector3, orthoX: number, orthoY: number, offset: number, min = 1) {
        const arrowPOs = pos.add(this.vectorB.getArrowPos());
        arrowPOs.x = arrowPOs.x < -orthoX + offset ? -orthoX + offset : arrowPOs.x;
        arrowPOs.x = arrowPOs.x > orthoX - offset - this.offsetx ? orthoX - offset - this.offsetx : arrowPOs.x;
        arrowPOs.y = arrowPOs.y < -orthoY + offset ? -orthoY + offset : arrowPOs.y;
        arrowPOs.y = arrowPOs.y > orthoY - offset ? orthoY - offset : arrowPOs.y;

        const arrowAPos = arrowPOs.subtract(this.vectorB.getArrowPos());
        const aarrowPOs = arrowAPos.add(this.vectorA.getArrowPos());
        aarrowPOs.x = aarrowPOs.x < -orthoX + offset ? -orthoX + offset : aarrowPOs.x;
        aarrowPOs.x = aarrowPOs.x > orthoX - offset - this.offsetx ? orthoX - offset - this.offsetx : aarrowPOs.x;
        aarrowPOs.y = aarrowPOs.y < -orthoY + offset ? -orthoY + offset : aarrowPOs.y;
        aarrowPOs.y = aarrowPOs.y > orthoY - offset ? orthoY - offset : aarrowPOs.y;
        const endPos = aarrowPOs.subtract(this.vectorA.getArrowPos());
        this.vectorB.setPos(endPos).updateRotation();
        this.vectorA.setPos(endPos).updateRotation();
    }

    updateVector() {
        this.updateCricle();
        if (this.viewModel.buttonActived === 1) {
            const OB1 = Vector3.Distance(this.vectorA.getArrowPos(), Vector3.Zero()) * Math.cos(this.arc / 180 * Math.PI);
            this.tipH.position = this.vectorB.position.add(this.vectorB.getArrowPos().normalize().scale(OB1));
            const addhb = this.vectorA.position.add(this.vectorB.getArrowPos()).subtract(this.tipH.position).scale(1).normalize();
            const addha = this.vectorA.position.add(this.vectorA.getArrowPos()).subtract(this.tipH.position).scale(1).normalize();
            const halfa = this.vectorA.position.add(this.vectorA.getArrowPos().scale(0.5));

            this.vectorShadow1.position = halfa.add(this.vectorB.getArrowPos().normalize().scale(-3)).add(addha.scale(13));
            this.vectorShadow2.position = halfa.add(this.vectorB.getArrowPos().normalize().scale(3)).add(addha.scale(13));
            this.vectorShadow3.position = halfa.add(this.vectorB.getArrowPos().normalize().scale(-1)).add(addha.scale(13));
            this.vectorShadow4.position = halfa.add(this.vectorB.getArrowPos().normalize().scale(1)).add(addha.scale(13));
            this.vectorShadow1.setArrowPos(addha.scale(-5)).updateRotation();
            this.vectorShadow2.setArrowPos(addha.scale(-5)).updateRotation();
            this.vectorShadow3.setArrowPos(addha.scale(-5)).updateRotation();
            this.vectorShadow4.setArrowPos(addha.scale(-5)).updateRotation();
            this.updateMeshVertData(this.LineHeight,
                Vector3Utils.ToMoreVector3ToArray([this.tipH.position, this.vectorA.position.add(this.vectorA.getArrowPos())], 20));
            this.updateMeshVertData(this.LineAngle, Vector3Utils.ToArray([this.tipH.position.add(addhb.scale(0.5)),
            this.tipH.position.add(addhb.scale(0.5)).add(addha.scale(0.5)), this.tipH.position.add(addha.scale(0.5))]));
        } else if (this.viewModel.buttonActived === 2) {
            const OA1 = Vector3.Distance(this.vectorB.getArrowPos(), Vector3.Zero()) * Math.cos(this.arc / 180 * Math.PI);
            this.tipH.position = this.vectorA.position.add(this.vectorA.getArrowPos().normalize().scale(OA1));
            const addhb = this.vectorA.position.add(this.vectorB.getArrowPos()).subtract(this.tipH.position).scale(1).normalize();
            const addha = this.vectorA.position.add(this.vectorA.getArrowPos()).subtract(this.tipH.position).scale(1).normalize();
            const halfb = this.vectorA.position.add(this.vectorB.getArrowPos().scale(0.5));

            this.vectorShadow1.position = halfb.add(this.vectorA.getArrowPos().normalize().scale(-3)).add(addhb.scale(13));
            this.vectorShadow2.position = halfb.add(this.vectorA.getArrowPos().normalize().scale(3)).add(addhb.scale(13));
            this.vectorShadow3.position = halfb.add(this.vectorA.getArrowPos().normalize().scale(-1)).add(addhb.scale(13));
            this.vectorShadow4.position = halfb.add(this.vectorA.getArrowPos().normalize().scale(1)).add(addhb.scale(13));
            this.vectorShadow1.setArrowPos(addhb.scale(-5)).updateRotation();
            this.vectorShadow2.setArrowPos(addhb.scale(-5)).updateRotation();
            this.vectorShadow3.setArrowPos(addhb.scale(-5)).updateRotation();
            this.vectorShadow4.setArrowPos(addhb.scale(-5)).updateRotation();

            this.updateMeshVertData(this.LineHeight,
                Vector3Utils.ToMoreVector3ToArray([this.tipH.position, this.vectorA.position.add(this.vectorB.getArrowPos())], 20));
            this.updateMeshVertData(this.LineAngle, Vector3Utils.ToArray([this.tipH.position.add(addhb.scale(0.5)),
            this.tipH.position.add(addhb.scale(0.5)).add(addha.scale(0.5)), this.tipH.position.add(addha.scale(0.5))]));
        }

        this.tipO.position = this.vectorA.position.scale(1);
        this.halfAngleP.position = this.vectorA.getArrowPos().normalize().add(this.vectorB.getArrowPos().normalize())
            .normalize().scale(2).add(this.vectorA.position);

        this.getArc();
        if (this.viewModel.buttonActived !== 0) {
            this.LineAngle.isVisible =
                1 - Math.abs(Vector3.Dot(Vector3.Normalize(this.vectorA.getArrowPos()),
                    Vector3.Normalize(this.vectorB.getArrowPos()))) > 0.001;
        }
        this.updateMeshVertData(this.LineOH, Vector3Utils.ToArray([this.tipH.position, this.vectorA.position]));
    }

    updateCricle() {
        let arcA = Vector3Utils.GetAngle(this.vectorA.getArrowPos(), new Vector3(1, 0, 0));
        let arcB = Vector3Utils.GetAngle(this.vectorB.getArrowPos(), new Vector3(1, 0, 0));
        arcA = this.vectorA.getArrowPos().y < 0 ? 360 - arcA : arcA;
        arcB = this.vectorB.getArrowPos().y < 0 ? 360 - arcB : arcB;
        if (arcA > arcB) {
            if (arcA - arcB > 180) {
                arcA = arcA - 360;
                this.updateMeshVertData(this.Circle, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1, arcA, arcB)));
            } else {
                this.updateMeshVertData(this.Circle, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1, arcB, arcA)));
            }
        } else {
            if (arcB - arcA > 180) {
                arcB = arcB - 360;
                this.updateMeshVertData(this.Circle, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1, arcB, arcA)));
            } else {
                this.updateMeshVertData(this.Circle, Vector3Utils.ToArray(FormulasUtils.GetArcUpdateVertices(1, arcA, arcB)));
            }
        }
        this.Circle.position = this.vectorA.position.scale(1);
    }

    getArc() {
        const arcA = Vector3Utils.GetAngle(this.vectorA.getArrowPos(), new Vector3(1, 0, 0));
        const arcB = Vector3Utils.GetAngle(this.vectorB.getArrowPos(), new Vector3(1, 0, 0));
        this.arc = Vector3Utils.GetAngle(this.vectorA.getArrowPos(), this.vectorB.getArrowPos());

        if (arcA > arcB) {
            if (this.vectorB.getArrowPos().y >= 0 && this.vectorA.getArrowPos().y >= 0) {
                this.rot = arcB;
            } else if (this.vectorB.getArrowPos().y >= 0 && this.vectorA.getArrowPos().y < 0) {
                this.rot = 360 - arcA;
            } else if (this.vectorB.getArrowPos().y < 0 && this.vectorA.getArrowPos().y >= 0) {
                this.rot = arcA;
            } else if (this.vectorB.getArrowPos().y < 0 && this.vectorA.getArrowPos().y < 0) {
                this.rot = 360 - arcA;
            }
        } else {
            if (this.vectorB.getArrowPos().y >= 0 && this.vectorA.getArrowPos().y >= 0) {
                this.rot = arcA;
            } else if (this.vectorB.getArrowPos().y >= 0 && this.vectorA.getArrowPos().y < 0) {
                this.rot = 360 - arcA;
            } else if (this.vectorB.getArrowPos().y < 0 && this.vectorA.getArrowPos().y >= 0) {
                this.rot = arcA;
            } else if (this.vectorB.getArrowPos().y < 0 && this.vectorA.getArrowPos().y < 0) {
                this.rot = 360 - arcA;
            }
        }
    }

    moveEnd(v: Vector): void {
        this.moveStep++;
        if (this.moveStep === 2) {
            this.moveStep = 0;
            this.updateVector();
            this.vectorShadow1.setVisible(true);
            this.vectorShadow2.setVisible(true);
            this.vectorShadow3.setVisible(true);
            this.vectorShadow4.setVisible(true);
            this.setMeshVisible([this.LineHeight, this.LineAngle, this.LineOH, this.Circle], true);
            this.setGUIVisible([this.textAngle, this.imageH, this.textO], true);
        }
        this.vectorA.setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true);
        this.vectorB.setArrowPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true);
    }

    /**
     * '投影'按钮
     */
    ButtonEvent(index: number) {
        this.vectorA.setPickAble(false).setRootLabelVisible(false).setArrowLabelVisible(false);
        this.vectorB.setPickAble(false).setRootLabelVisible(false).setArrowLabelVisible(false);

        this.setGUIVisible([this.imageH, this.textO, this.textAngle], false);
        this.setMeshVisible([this.Circle, this.LineOH, this.LineHeight, this.LineAngle], false);
        this.vectorShadow1.setVisible(false);
        this.vectorShadow2.setVisible(false);
        this.vectorShadow3.setVisible(false);
        this.vectorShadow4.setVisible(false);

        if (index === 1) {
            this.vectorB.isCheck = false;
            // this.vectorA.setCheck(this.vectorB.position.scale(1));
            this.imageH.source = B1;
        } else if (index === 2) {
            this.imageH.source = A1;
            this.vectorA.isCheck = false;
            // this.vectorB.setCheck(this.vectorA.position.scale(1));
        }
        this.vectorA.setCheck(Vector3.Zero());
        this.vectorB.setCheck(Vector3.Zero());
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.moveStep = 0;
        this.setGUIVisible([this.imageH, this.textO, this.textAngle], false);
        this.setMeshVisible([this.Circle, this.LineOH, this.LineHeight, this.LineAngle], false);
        this.vectorShadow1.setVisible(false);
        this.vectorShadow2.setVisible(false);
        this.vectorShadow3.setVisible(false);
        this.vectorShadow4.setVisible(false);
        this.vectorA.notCheck().setPos(this.vectorAPos).setArrowPos(this.vectorAArrowPos)
            .setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true).updateRotation();
        this.vectorB.notCheck().setPos(this.vectorBPos).setArrowPos(this.vectorBArrowPos)
            .setPickAble(true).setRootLabelVisible(true).setArrowLabelVisible(true).updateRotation();
        this.updateVector();
    }
}
