/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import Vue from 'vue';
import {
    Vector2, Vector3, Color3, Mesh, LinesMesh,
    StandardMaterial, Texture, Scene, Engine, AbstractMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Coordinate2DSystem } from '../../../../babylon/Math/utils/Coordinate2DSystem';
import { Color } from '../../../../babylon/Math/Color';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';
import { FormulaLineUtils } from '../../../../babylon/Math/utils/FormulaLineUtils';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { BeelineUtils } from '../../../../babylon/Math/BeelineUtils';

import * as dot from '../sub_static/dot.png';
import * as dot2 from '../sub_static/dot2.png';

import * as P from '../sub_static/P.png';
import * as Posa from '../sub_static/Posa.png';
import * as Posb from '../sub_static/Posb.png';
import * as Posc from '../sub_static/Posc.png';
import * as Posd from '../sub_static/Posd.png';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    r = 6; //轨迹圆半径
    step = 0; //解析步骤
    offsetz = 15; //A B C D 点切线半长
    halfLength = 15; //P1点切线半长
    coordinateSystem: Coordinate2DSystem; //坐标系
    //A B C D四点位置与文本
    tipA: Mesh;
    tiptextA: GUI.TextBlock;

    tipB: Mesh;
    tiptextB: GUI.TextBlock;

    tipC: Mesh;
    tiptextC: GUI.TextBlock;

    tipD: Mesh;
    tiptextD: GUI.TextBlock;

    tipM: Mesh;
    tiptextM: GUI.TextBlock;

    tipL: Mesh;
    tiptextL: GUI.TextBlock;
    //四个P点定位点、贴图、文本
    tipP1: Mesh;
    tiptextP: GUI.TextBlock;
    tipImageP: GUI.Image;
    tiptextP1: GUI.Image;
    tipPImage: GUI.Image;

    tipP2: Mesh;
    tipP2Image: GUI.Image;
    tiptextP2: GUI.Image;

    tipP3: Mesh;
    tipP3Image: GUI.Image;
    tiptextP3: GUI.Image;

    tipP4: Mesh;
    tipP4Image: GUI.Image;
    tiptextP4: GUI.Image;
    //需要绘制的圆和椭圆线
    Circle: LinesMesh;
    Ellipse: LinesMesh;
    //P 点切线1、切线1
    LineP1: LinesMesh;
    LineP2: LinesMesh;
    //A B C D 点切线
    LineA: LinesMesh;
    LineB: LinesMesh;
    LineC: LinesMesh;
    LineD: LinesMesh;
    a = 5; //长半轴
    b = 4; //短半轴
    IsMoved = true; //P1是否可移动
    decalMaterial: StandardMaterial; //贴花材质
    Decals: Mesh[] = []; //贴花组
    startPos: Vector2; //绘制开始位置
    tempPos: Vector2; //绘制当前位置
    endPos: Vector2; //绘制结束位置
    boolDraw = false; //是否绘制

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.offset = 8;
        this.init();
    }

    /** 初始化 */
    init() {
        super.init();
        if (Engine.isSupported()) {
            this.registerBeforeRender();
        }
    }
    /** 
     * 窗口尺寸重置 
     */
    resize() {
        super.resize();
        this.changeCameraSize();
    }

    /** BeforeRender循环 */
    registerBeforeRender() {
        this.scene.registerBeforeRender(() => {
            if (this.boolDraw) {
                if (this.endPos.y - this.tempPos.y > 0.5) {
                    this.tempPos.y += 3;
                    this.updateMeshVertData(this.Circle, Vector3Utils.ToArray(
                        FormulasUtils.GetArcUpdateVertices(this.startPos.x, this.startPos.y, this.tempPos.y)));
                    this.tipP1.position = FormulasUtils.GetCirclePoint(this.startPos.x, this.tempPos.y);
                } else {
                    this.tempPos = this.endPos;
                    this.updateMeshVertData(this.Circle, Vector3Utils.ToArray(
                        FormulasUtils.GetArcUpdateVertices(this.startPos.x, this.startPos.y, this.tempPos.y)));
                    this.tipP1.position = FormulasUtils.GetCirclePoint(this.startPos.x, this.endPos.y);
                    this.boolDraw = false;
                }
                this.updateLineData(null, null);
            }
        });
    }

    /**
     * 初始化网格
     * @param scene
     */
    initMesh(scene: Scene) {
        this.tipP1 = Mesh.CreateSphere('tipP1', 8, 1.5, scene);
        this.tipA = Mesh.CreateSphere('tipA', 8, 1.5, scene);
        this.tipB = Mesh.CreateSphere('tipB', 8, 1.5, scene);

        this.tipP2 = new Mesh('ti');
        this.tipP3 = new Mesh('ti');
        this.tipP4 = new Mesh('ti');
        this.tipC = new Mesh('ti');
        this.tipD = new Mesh('ti');

        this.tipM = new Mesh('m');
        this.tipL = new Mesh('l');
        this.setMeshVisible([this.tipA, this.tipB, this.tipP1], false);
    }

    /**
     * 初始化GUI
     * @param scene
     */
    initGUI(scene: Scene) {
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const options = {
            height: '30px', width: '30px', color: Color.StringBlack,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        const linkOffset = { X: '20px', Y: '25px' };
        const ImageOption = { height: '22px', width: '101px', linkOffsetX: '52.5px', linkOffsetY: '13px', color: '#FFFFFF' };
        const option2 = { color: Color.StringBlack, fontSize: '18px', fontFamily: 'Times New Roman', fontStyle: 'normal' };
        let paddingLeft = '20px';
        const tipPImageOption = { height: '22px', width: '200px', linkOffsetX: '110px', linkOffsetY: '0px', color: '#FFFFFF' };
        const ImageLabelOption = { height: '40px', width: '40px', color: '#FFFFFF' };
        // 创建坐标系
        const options2 = {
            height: 70, width: 70, color: '#000000',
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            options.width = options.height = '60px';
            options.fontSize = '48px';
            linkOffset.X = '40px';
            linkOffset.Y = '50px';
            ImageOption.height = '44px';
            ImageOption.width = '202px';
            ImageOption.linkOffsetX = '105px';
            ImageOption.linkOffsetY = '26px';
            option2.fontSize = '36px';
            paddingLeft = '40px';
            tipPImageOption.height = '44px';
            tipPImageOption.width = '400px';
            tipPImageOption.linkOffsetX = '220px';
            ImageLabelOption.width = ImageLabelOption.height = '80px';
            options2.fontSize = '48px';
        }

        this.coordinateSystem = new Coordinate2DSystem('sys', scene)
            .setAdvancedDynamicTexture(advancedTexture)
            .create2DSystem(15, 1, Color3.FromHexString('#000000'), this.edgesWidth)
            .createAxisLabel(options2)
            .createNumberLabel();
        this.tiptextA = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipA, 'A', linkOffset.X, linkOffset.Y, options);
        this.tiptextB = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipB, 'B', linkOffset.X, linkOffset.Y, options);
        this.tiptextC = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipC, 'C', linkOffset.X, linkOffset.Y, options);
        this.tiptextD = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipD, 'D', linkOffset.X, linkOffset.Y, options);

        this.tiptextM = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipM, 'm', linkOffset.X, `-${linkOffset.Y}`, options);
        this.tiptextL = LabelUtils.CreateLabelWithOffset(advancedTexture, this.tipL, 'l', `-${linkOffset.X}`, linkOffset.Y, options);

        this.tiptextP1 = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipP1, P, ImageOption);
        this.tiptextP2 = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipP2, P, ImageOption);
        this.tiptextP3 = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipP3, P, ImageOption);
        this.tiptextP4 = LabelUtils.CreateImageLabelLeft(advancedTexture, this.tipP4, P, ImageOption);
        this.tiptextP = FastCreater.TextBlock('0 0', option2);
        this.tiptextP.paddingLeft = paddingLeft;

        this.tipImageP = LabelUtils.CreateImageTextLabel(advancedTexture, this.tipP1, P, tipPImageOption, [this.tiptextP]);

        LabelUtils.CreateImageLabel(advancedTexture, this.tipA, dot, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipB, dot, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipC, dot2, ImageLabelOption);
        LabelUtils.CreateImageLabel(advancedTexture, this.tipD, dot2, ImageLabelOption);
        this.tipPImage = LabelUtils.CreateImageLabel(advancedTexture, this.tipP1, dot2, ImageLabelOption);
        this.tipP2Image = LabelUtils.CreateImageLabel(advancedTexture, this.tipP2, dot2, ImageLabelOption);
        this.tipP3Image = LabelUtils.CreateImageLabel(advancedTexture, this.tipP3, dot2, ImageLabelOption);
        this.tipP4Image = LabelUtils.CreateImageLabel(advancedTexture, this.tipP4, dot2, ImageLabelOption);
        this.setGUIVisible([this.tiptextP, this.tipImageP, this.tipP2Image, this.tipP3Image, this.tipP4Image], false);
    }

    /**
     * 初始化数值
     * @param scene
     */
    initValue(scene: Scene): void {
        this.initMesh(scene);
        this.initGUI(scene);
        this.tipP1.position = new Vector3(-this.a, this.b, 0);

        this.Circle = FormulaLineUtils.CreateUpdateArc(this.r, 360, Color.Green, this.edgesWidth, this.Circle, scene);
        this.Ellipse = FormulaLineUtils.CreateUpdateEllipse(this.a, this.b, Color.Red, this.edgesWidth, this.Ellipse, scene);
        this.LineP1 = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], Color.Blue, this.edgesWidth, this.LineP1, scene);
        this.LineP2 = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], Color.Blue, this.edgesWidth, this.LineP2, scene);
        this.LineA = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], Color.Black, this.edgesWidth, this.LineA, scene);
        this.LineB = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], Color.Black, this.edgesWidth, this.LineB, scene);
        this.LineC = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], Color.Black, this.edgesWidth, this.LineC, scene);
        this.LineD = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()], Color.Black, this.edgesWidth, this.LineD, scene);
    }

    /**
     * 创建贴花材质
     * @param scene
     */
    createDecalMaterial(scene: Scene): void {
        this.decalMaterial = new StandardMaterial('decalMat', scene);
        this.decalMaterial.diffuseTexture = new Texture(dot2, scene);
        this.decalMaterial.diffuseTexture.hasAlpha = true;
        this.decalMaterial.useAlphaFromDiffuseTexture = true;
        this.decalMaterial.specularColor = new Color3(0, 0, 0);
        this.decalMaterial.zOffset = -2;
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.createTargetCamera4Math(scene, 18);
        this.initValue(scene);
        this.createDecalMaterial(scene);
        this.addPointerEventListener(canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 手势按下
     * @param startingPoint
     */
    onPointerDown(startingPoint: Vector3): void {
        this.Circle.isVisible = false;
        this.boolDraw = false;
        this.viewModel.buttonActived = false;
    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {
        if (currentMesh.name.indexOf('tip') !== -1) {
            this.updateLineData(startingPoint, currentMesh);
        }
    }
    /**
     * 手势抬起
     * @param evt
     * @param pickmesh
     * @param scene
     */
    onPointerUp(evt: any, pickmesh: AbstractMesh, scene: Scene): void {
        if (this.step === 3) {
            const newDecal = Mesh.CreateDecal('decal', pickmesh, this.tipP1.position, new Vector3(0, 0, -1), Vector3.One(), 0);
            newDecal.material = this.decalMaterial;
            this.Decals.push(newDecal);
        }
    }

    /**
     * 更新线条
     */
    updateLineData(startingPoint: Vector3, currentMesh: AbstractMesh): void {
        if (currentMesh === this.tipA) {
            currentMesh.position.x = startingPoint.x;
            this.a = Math.abs(currentMesh.position.x);
        } else if (currentMesh === this.tipB) {
            currentMesh.position.y = startingPoint.y;
            this.b = Math.abs(currentMesh.position.y);
        }

        this.r = Vector3.Distance(new Vector3(this.a, this.b, 0), Vector3.Zero());
        if (this.IsMoved === false) {
            if (startingPoint !== null) {
                if (currentMesh === this.tipP1) {
                    currentMesh.position = startingPoint.scale(1).normalize().scale(this.r);
                } else {
                    this.tipP1.position = this.tipP1.position.scale(1).normalize().scale(this.r);
                }
            }
        } else {
            this.tipP1.position = new Vector3(-this.a, this.b, 0);
        }
        this.AdsorptionPosition();
        this.updatePosition();
        this.updateVerticesData();
        if (Math.abs(this.tipP1.position.x) === this.a && Math.abs(this.tipP1.position.y) === this.b) {
            this.switchMeshGUIVisible(true);
            if (this.tipP1.position.x > 0 && this.tipP1.position.y > 0) {
                this.setTipImage(Posb, Posa, Posd, Posc);
            } else if (this.tipP1.position.x > 0 && this.tipP1.position.y < 0) {
                this.setTipImage(Posd, Posc, Posb, Posa);
            } else if (this.tipP1.position.x < 0 && this.tipP1.position.y > 0) {
                this.setTipImage(Posa, Posb, Posc, Posd);
            } else {
                this.setTipImage(Posc, Posd, Posa, Posb);
            }
        } else {
            this.switchMeshGUIVisible(false);
            this.setGUIVisible([this.tiptextP, this.tipImageP], true);
            this.tiptextP.text = `(${this.tipP1.position.x.toFixed(2)}，${this.tipP1.position.y.toFixed(2)})`;
            this.updateP1TangentLine();
        }
    }

    /**
     * 更新P1切线
     */
    updateP1TangentLine() {
        const va = BeelineUtils.GetFunctionResult(Math.pow(this.a, 2) - Math.pow(this.tipP1.position.x, 2),
            2 * this.tipP1.position.x * this.tipP1.position.y,
            Math.pow(this.b, 2) - Math.pow(this.tipP1.position.y, 2));

        const b1 = this.tipP1.position.y - va.x1 * this.tipP1.position.x;
        const b2 = this.tipP1.position.y - va.x2 * this.tipP1.position.x;

        const x1 = new Vector3(-b1 / va.x1, 0, 0);
        const x2 = new Vector3(-b2 / va.x2, 0, 0);

        const normalizeX1 = this.tipP1.position.subtract(x1).scale(1).normalize();
        const normalizeX2 = this.tipP1.position.subtract(x2).scale(1).normalize();
        this.updateMeshVertData(this.LineP1, Vector3Utils.ToArray([
            this.tipP1.position.add(normalizeX1.scale(this.halfLength)),
            this.tipP1.position.subtract(normalizeX1.scale(this.halfLength))]));

        this.updateMeshVertData(this.LineP2, Vector3Utils.ToArray([
            this.tipP1.position.add(normalizeX2.scale(this.halfLength)),
            this.tipP1.position.subtract(normalizeX2.scale(this.halfLength))]));
    }

    /**
     * 更新点位置
     */
    updatePosition() {
        this.tipA.position = new Vector3(-this.a, 0, 0);
        this.tipB.position = new Vector3(0, this.b, 0);
        this.tipC.position = new Vector3(0, -this.b, 0);
        this.tipD.position = new Vector3(this.a, 0, 0);
        this.tipP2.position = new Vector3(-this.tipP1.position.x, this.tipP1.position.y, 0);
        this.tipP3.position = new Vector3(this.tipP1.position.x, -this.tipP1.position.y, 0);
        this.tipP4.position = new Vector3(-this.tipP1.position.x, -this.tipP1.position.y, 0);
    }

    /**
     * 网格、GUI显示与隐藏
     * @param v1
     */
    switchMeshGUIVisible(v1: boolean) {
        this.setMeshVisible([this.LineA, this.LineB, this.LineC, this.LineD], v1);
        this.setGUIVisible([this.tiptextP1, this.tiptextP2, this.tiptextP3, this.tiptextP4,
        this.tipP2Image, this.tipP3Image, this.tipP4Image, this.tiptextL, this.tiptextM], v1);
        this.setMeshVisible([this.LineP1, this.LineP2], !v1);
        this.setGUIVisible([this.tiptextP, this.tipImageP], !v1);
    }

    /**
     * 更新线条顶点数据
     */
    updateVerticesData() {
        this.updateMeshVertData(this.Ellipse, Vector3Utils.ToArray(FormulasUtils.GetEllipseVertices(this.a, this.b, 360)));

        this.updateMeshVertData(this.LineA, Vector3Utils.ToArray(
            [new Vector3(this.a, this.offsetz, 0), new Vector3(this.a, -this.offsetz, 0)]));
        this.updateMeshVertData(this.LineB, Vector3Utils.ToArray(
            [new Vector3(-this.a, this.offsetz, 0), new Vector3(-this.a, -this.offsetz, 0)]));
        this.updateMeshVertData(this.LineC, Vector3Utils.ToArray(
            [new Vector3(this.offsetz, this.b, 0), new Vector3(-this.offsetz, this.b, 0)]));
        this.updateMeshVertData(this.LineD, Vector3Utils.ToArray(
            [new Vector3(this.offsetz, -this.b, 0), new Vector3(-this.offsetz, -this.b, 0)]));
        this.tipM.position = new Vector3(-this.offsetz, this.b, 0);
        this.tipL.position = new Vector3(-this.a, this.offsetz, 0);
    }

    /**
     * P1位置吸附
     */
    AdsorptionPosition() {
        if (this.boolDraw === false) {
            if (Vector3.Distance(this.tipP1.position, new Vector3(this.a, this.b, 0)) < 0.05) {
                this.tipP1.position = new Vector3(this.a, this.b, 0);
            } else if (Vector3.Distance(this.tipP1.position, new Vector3(-this.a, this.b, 0)) < 0.05) {
                this.tipP1.position = new Vector3(-this.a, this.b, 0);
            } else if (Vector3.Distance(this.tipP1.position, new Vector3(-this.a, -this.b, 0)) < 0.05) {
                this.tipP1.position = new Vector3(-this.a, -this.b, 0);
            } else if (Vector3.Distance(this.tipP1.position, new Vector3(this.a, -this.b, 0)) < 0.05) {
                this.tipP1.position = new Vector3(this.a, -this.b, 0);
            }
        }
    }

    /**
     * 更新提示图片
     * @param p1
     * @param p2
     * @param p3
     * @param p4
     */
    setTipImage(p1: string, p2: string, p3: string, p4: string) {
        this.tiptextP1.source = p1;
        this.tiptextP2.source = p2;
        this.tiptextP3.source = p3;
        this.tiptextP4.source = p4;
    }

    /**
     * 答案步骤
     * @param i
     */
    Answer(i: number) {
        this.step = i;
        this.clearDecals();
        if (i === 1) {
            this.IsMoved = true;
            this.tipP1.name = 'ti';
            this.tipP1.position = new Vector3(-this.a, this.b, 0);
            this.tipPImage.source = `${dot2}`;
            this.DrawEvent(false);
        } else if (i === 2) {
            this.tipPImage.source = `${dot}`;
            this.tipP1.name = 'tipP1';
            this.IsMoved = false;
            this.DrawEvent(false);
        } else if (i === 3) {
            this.tipPImage.source = `${dot}`;
            this.tipP1.name = 'tipP1';
            this.IsMoved = false;
        }
        this.updateLineData(null, null);
    }

    /**
     * 清空贴花
     */
    clearDecals() {
        if (this.Decals && this.Decals.length > 0) {
            for (let i = 0; i < this.Decals.length; i++) {
                this.Decals[i].dispose();
            }
            this.Decals = [];
        }
    }

    /**
     * '绘制'按钮
     * @param isActive
     */
    DrawEvent(isActive: boolean) {
        if (isActive) {
            this.clearDecals();
            const pos = FormulasUtils.GetAngleFromPoint(this.tipP1.position.scale(1));
            if (this.tipP1.position.y > 0) {
                this.tempPos = pos;
            } else {
                this.tempPos = new Vector2(pos.x, 360 - pos.y);
            }
            this.startPos = new Vector2(this.tempPos.x, this.tempPos.y);
            this.endPos = new Vector2(this.tempPos.x, this.tempPos.y + 360);
        }
        this.boolDraw = isActive;
        this.Circle.isVisible = isActive;
    }

    /**
     * '重置'按钮
     */
    reset(): void {
        this.Answer(1);
    }
}
