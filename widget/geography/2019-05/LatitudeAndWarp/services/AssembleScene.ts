/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/14 10:10
 */
import Vue from 'vue';
import { ViewModel } from '../ViewModel';
import {
    Vector3, Color3, AbstractMesh, Mesh, Scene, TransformNode, ArcRotateCamera, Engine, Viewport, SceneLoader, Texture, StandardMaterial
} from '@babylonjs/core/Legacy/legacy';
import { StackPanel, TextBlock, AdvancedDynamicTexture, Rectangle } from '@babylonjs/gui';

import { Base3DScene } from '../../../../babylon/template/Base3DScene';
import { DrawEarth } from '../../../../babylon/Geography/util/DrawEarth';
import { DrawLabel } from './DrawLabel';
import { MaterialLab } from '../../../../babylon/Geography/util/MaterialLab';
import { Shader } from '../../../../babylon/Geography/Shader';
import { GeoUtils } from '../../../../babylon/Geography/GeoUtils';
import * as day from '../sub_static/earth/day.jpg';
import * as map from '../sub_static/label.babylon';
import * as dot from '../sub_static/label.png';
import * as locat from '../sub_static/image/dots.png';

export class AssembleScene extends Base3DScene {
    viewModel: ViewModel;
    r = 3.1;
    lineradius = this.r + 0.01;
    tipFontSize: string;
    tipborder = 8;
    showimgx: number;
    showimgy: number;
    showimgw: number;
    showimgh: number;
    divAx: number;
    divAy: number;
    divBx: number;
    divBy: number;
    showimgbg = <HTMLElement>document.getElementById('showimgbg');
    showimg = <HTMLElement>document.getElementById('showimg');
    showimgA = <HTMLElement>document.getElementById('showimgA');
    showimgB = <HTMLElement>document.getElementById('showimgB');
    offset = 1;

    windowheight = window.innerHeight;
    windowwidth = window.innerWidth;
    camera: ArcRotateCamera;
    mapChecked = true;
    locationChecked = true;

    tipA: Mesh;
    labelA: Rectangle;
    tiptextA: TextBlock;

    tipB: Mesh;
    labelB: Rectangle;
    tiptextB: TextBlock;
    scene: Scene;
    texta = 'A (0°,135°E)';
    textb = 'B (0°,45°E)';

    ANormalPos: Vector3;
    BNormalPos: Vector3;
    earthgroupAngle: TransformNode;
    earthgroup: TransformNode;
    earthLinegroup: TransformNode;
    SN = 'N';
    EW = 'E';
    boxp: TransformNode;
    drag = false;
    EWFloat: number;
    SNFloat: number;
    angule: number;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /** 窗口尺寸重置 */
    resize() {
        super.resize();
        if (window.screen.height < 499 || window.screen.width < 699) {
            this.tipborder = 4;
        } else {
            this.tipborder = 8;
        }
        this.tipReSize();
        this.reSizecamera();
    }

    /**
     *  初始化数值 
     * */
    initValue(scene: Scene) {
        this.tipA = Mesh.CreateSphere('tipA', 8, 0.5, scene);
        this.tiptextA = new TextBlock();
        this.tipB = Mesh.CreateSphere('tipB', 8, 0.5, scene);
        this.tiptextB = new TextBlock();
        this.boxp = new TransformNode('Node');
        this.ANormalPos = Vector3.Normalize(new Vector3(-1, 0, 1));
        this.BNormalPos = Vector3.Normalize(new Vector3(1, 0, 1));
    }

    /** 创建父子关系节点 */
    createTransformNode() {
        this.boxp.position = new Vector3(0, 0, 0);
        this.earthgroupAngle = this.boxp.clone('earthgroupAngle', null);
        this.earthgroup = this.boxp.clone('earthgroup', null);
        this.earthLinegroup = this.boxp.clone('earthLinegroup', null);
        this.earthLinegroup.setParent(this.earthgroup);
        this.earthgroup.setParent(this.earthgroupAngle);
        this.boxp.dispose();
    }

    /** 创建场景*/
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.camera = this.createArcRotateCamera(scene);
        this.camera.inertia = 0.5;
        this.camera.panningSensibility = 0;
        this.camera.lowerRadiusLimit =10; 
        this.camera.upperRadiusLimit = 19;
        this.camera.position=new Vector3(0, 0, 14.5);
        this.initValue(scene);

        const earthMaterial = MaterialLab.CreateNoRayEarthMaterial(`${day}`,
            Shader.customVertexShader, Shader.earthNoRayFragmentShader, scene);
        earthMaterial.freeze();

        this.createTransformNode();
        const earth = DrawEarth.CreateEarth(this.r, earthMaterial, this.earthgroup, scene); //创建地球
        DrawEarth.CreateCylinder(this.r, this.earthgroup, scene); //创建地轴

        this.createWeftAndWarpLine(scene);
        const option = { text: '', color: '#ffff00', fontSize: '18px', size: '40px' };
        let height='90px';
        if (this.isMob) {
            option.fontSize = '24px';
            option.size = '60px';
            height='150px';
        }

        this.labelA = DrawLabel.TipLabelCreate(locat, advancedTexture,
            this.tipA, this.earthgroup, this.ANormalPos.scale(this.r), this.tiptextA, option,height); //创建场景A标签

        this.labelB = DrawLabel.TipLabelCreate(locat, advancedTexture,
            this.tipB, this.earthgroup, this.BNormalPos.scale(this.r), this.tiptextB, option,height); //创建场景B标签
        SceneLoader.ImportMesh('', map.replace('label.babylon', ''), 'label.babylon', scene, (v) => { this.importMeshSuccess(v); });
        this.addTipMoveEventListener();
        this.addPointerEventListener(earth, canvas, scene);
        this.reset();
        scene.registerBeforeRender(() => {
            const border = Vector3.Distance(this.camera.position, new Vector3(0, 0, 0));
            const bordera = Vector3.Distance(this.camera.position, this.tipA.position);
            const borderb = Vector3.Distance(this.camera.position, this.tipB.position);
            const borderlength = border * border + this.r * this.r;
            this.labelA.alpha = bordera * bordera > borderlength ? 0 : 1;
            this.labelB.alpha = borderb * borderb > borderlength ? 0 : 1;
        });
        return scene;
    }

    importMeshSuccess(meshes: AbstractMesh[]) {
        const dotTex = new Texture(dot, this.scene);
        dotTex.hasAlpha = true;
        const tipMat = this.createMaterial('dotMat', dotTex, this.scene);
        for (let i = 0; i < meshes.length; i++) {
            if (meshes[i].name.indexOf('label') !== -1) {
                meshes[i].scaling = new Vector3(1, 1, 1);
                meshes[i].material = tipMat;
                meshes[i].isVisible = true;
                meshes[i].setParent(this.earthgroup);
            }
        }
    }

    createMaterial(name: string, diffuseTexture: Texture, scene: Scene): StandardMaterial {
        const mat = new StandardMaterial(name, scene);
        mat.diffuseTexture = diffuseTexture;
        mat.useAlphaFromDiffuseTexture = true;
        mat.specularColor = new Color3(0, 0, 0);
        mat.emissiveColor = new Color3(1, 1, 1);
        return mat;
    }

    /** 创建地球经纬网 */
    createWeftAndWarpLine(scene: Scene) {
        const linecolor = new Color3(1, 1, 1), DashedLineColor = new Color3(1, 1, 0);
        const line = DrawEarth.CreateWarpAndWeft(linecolor, 20, 20, this.lineradius, scene);
        line.setParent(this.earthgroup);
        DrawEarth.CreateDashedWeft(23.26, this.lineradius, 360, DashedLineColor, true, this.earthLinegroup); //创建回归线；
        DrawEarth.CreateDashedWeft(23.26, this.lineradius, 360, DashedLineColor, false, this.earthLinegroup);
        DrawEarth.CreateDashedWeft(66.74, this.lineradius, 360, DashedLineColor, false, this.earthLinegroup); //创建极圈；
        DrawEarth.CreateDashedWeft(66.74, this.lineradius, 360, DashedLineColor, true, this.earthLinegroup);
        DrawEarth.CreateDateChangeLine(this.r + 0.02, 180, 0, DashedLineColor, this.earthgroup, scene); //创建国际日期变更线
    }

    /** 平面图经纬度监听 */
    addTipMoveEventListener() {
        let target: any = null;
        const onTipBeforeMove = (e: any) => {
            this.drag = true;
            if (e.currentTarget.id === 'showimgA') {
                target = this.showimgA;
            } else if (e.currentTarget.id === 'showimgB') {
                target = this.showimgB;
            }
        };

        const onTipMove = (e: any) => {
            if (this.drag && target) {
                let pageX: number, pageY: number;
                if (this.isMob) {
                    pageX = e.touches[0].pageX;
                    pageY = e.touches[0].pageY;
                } else {
                    pageX = e.pageX;
                    pageY = e.pageY;
                }

                if (pageX < this.showimgx || pageX > this.showimgx + this.showimgw ||
                    pageY < this.showimgy || pageY > this.showimgy + this.showimgh) { return; }
                const divTempx = pageX - this.showimgx, divTempy = pageY - this.showimgy;
                if (divTempx < this.showimgw / 2 && divTempx > 0) {
                    this.EWFloat = (this.showimgw / 2 - divTempx) * 360 / this.showimgw;
                    this.EW = 'W';
                } else if (divTempx > this.showimgw / 2 && divTempx < this.showimgw) {
                    this.EWFloat = (divTempx - this.showimgw / 2) * 360 / this.showimgw;
                    this.EW = 'E';
                } else {
                    this.EWFloat = divTempx === this.showimgw / 2 ? 0 : 180;
                    this.EW = '';
                }

                this.angule = divTempx * 360 / this.showimgw;
                const poscart = GeoUtils.GeographicToCartesian(this.angule + 180, -(divTempy * 180 / this.showimgh - 90)).scale(this.r);
                if (divTempy < this.showimgh / 2 && divTempy > 0) {
                    this.SNFloat = (this.showimgh / 2 - divTempy) * 180 / this.showimgh;
                    this.SN = 'N';
                } else if (divTempy > this.showimgh / 2 && divTempy < this.showimgh) {
                    this.SNFloat = (divTempy - this.showimgh / 2) * 180 / this.showimgh;
                    this.SN = 'S';
                } else {
                    this.SNFloat = divTempy === this.showimgh / 2 ? 0 : 90;
                    this.SN = '';
                }

                if (target === this.showimgA) {
                    this.setPos(this.showimgA, pageY - this.showimgy - 20, pageX - this.showimgx - 20);
                    this.texta = `A (${this.SNFloat.toFixed(2)}°${this.SN},${this.EWFloat.toFixed(2)}°${this.EW})`;
                    if (this.locationChecked) {
                        this.tiptextA.text = this.texta;
                        this.viewModel.btn[0].text = this.texta;
                    }
                    this.tipA.position = poscart;
                } else if (target === this.showimgB) {
                    this.setPos(this.showimgB, pageY - this.showimgy - 20, pageX - this.showimgx - 20);
                    this.textb = `B (${this.SNFloat.toFixed(2)}°${this.SN},${this.EWFloat.toFixed(2)}°${this.EW})`;
                    if (this.locationChecked) {
                        this.tiptextB.text = this.textb;
                        this.viewModel.btn[1].text = this.textb;
                    }
                    this.tipB.position = poscart;
                }
            }
        };

        const onTipAfterMove = (e: any) => {
            this.drag = false;
            if (target) {
                target = null;
            }
        };

        if (this.isMob) {
            document.body.addEventListener('touchmove', (event) => { event.preventDefault(); });
            this.showimgA.addEventListener('touchstart', onTipBeforeMove);
            this.showimgA.addEventListener('touchmove', onTipMove);
            this.showimgA.addEventListener('touchend', onTipAfterMove);
            this.showimgB.addEventListener('touchstart', onTipBeforeMove);
            this.showimgB.addEventListener('touchmove', onTipMove);
            this.showimgB.addEventListener('touchend', onTipAfterMove);
        } else {
            this.showimgA.addEventListener('pointerdown', onTipBeforeMove);
            this.showimgB.addEventListener('pointerdown', onTipBeforeMove);
            this.showimg.addEventListener('pointermove', onTipMove);
            this.showimg.addEventListener('pointerup', onTipAfterMove);
        }
    }

    /** 地球经纬度监听 */
    addPointerEventListener(earth: Mesh, canvas: HTMLCanvasElement, scene: Scene) {
        let startingPoint: Vector3;
        let currentMesh: AbstractMesh;
        const getGroundPosition = (evt: any) => {
            const pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                return mesh === earth;
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
                function (mesh) { return mesh !== earth && mesh.isPickable !== false; });
            if (pickInfo.hit) {
                currentMesh = pickInfo.pickedMesh;
                if (currentMesh.name.indexOf('tip') !== -1) {
                    currentMesh.setParent(null);
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
            const diff = current.subtract(startingPoint);
            if (currentMesh.name.indexOf('tip') !== -1) {
                currentMesh.position.addInPlace(diff);
                const tempMesh = this.boxp.clone(currentMesh.name, null);
                tempMesh.position = currentMesh.position;
                tempMesh.setParent(this.earthgroup);
                this.reLabelPosition(tempMesh);
                tempMesh.setParent(null);
                tempMesh.dispose();
            }
            startingPoint = current;
        };

        // 场景输入坐标监听（抬起）
        const onPointerUp = () => {
            if (startingPoint) {
                this.camera.attachControl(canvas, true);
                startingPoint = null;
                if (currentMesh.name.indexOf('tip') !== -1) {
                    const Distancelength = currentMesh.position.length();
                    if (Distancelength > this.r + 0.01 || Distancelength < this.r - 0.01) {
                        const Normalize = Vector3.Normalize(currentMesh.position);
                        currentMesh.position = new Vector3(Normalize.x * this.r, Normalize.y * this.r, Normalize.z * this.r);
                    }
                    const tempMesh = this.boxp.clone(currentMesh.name, null);
                    tempMesh.position = currentMesh.position;
                    tempMesh.setParent(this.earthgroup);
                    this.reLabelPosition(tempMesh);
                    tempMesh.setParent(null);
                    tempMesh.dispose();
                }
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

    /** 获取平面地图坐标 */
    reLabelPosition(currentMesh: TransformNode): void {
        let divx: number, divy: number;
        const a = Vector3.Dot(new Vector3(1, 0, 0),
            Vector3.Normalize(new Vector3(currentMesh.position.x, 0, currentMesh.position.z)));
        const xV = Math.acos(a) * 180 / Math.PI;

        const b = Vector3.Dot(new Vector3(0, 1, 0), currentMesh.position.clone().normalize());
        const yV: number = 90 - Math.acos(b) * 180 / Math.PI;

        if (currentMesh.position.z < 0) {
            this.EW = 'W';
            divx = this.showimgh - xV * this.offset;
        } else if (currentMesh.position.z > 0) {
            this.EW = 'E';
            divx = xV * this.offset + this.showimgh;
        } else {
            this.EW = '';
            divx = xV * this.offset;
        }
        this.SN = yV === 0 ? '' : (yV < 0 ? 'S' : 'N');
        divy = Math.acos(b) * 180 / Math.PI * this.offset;
        if (currentMesh.name === 'tipA') {
            this.texta = `A (${Math.abs(yV).toFixed(2)}°${this.SN},${xV.toFixed(2)}°${this.EW})`;
            if (this.locationChecked) {
                this.tiptextA.text = this.texta;
                this.viewModel.btn[0].text = this.texta;
            }
            this.setPos(this.showimgA, divy - 20, divx - 20);
            this.divAx = divx;
            this.divAy = divy;
        } else if (currentMesh.name === 'tipB') {
            this.textb = `B (${Math.abs(yV).toFixed(2)}°${this.SN},${xV.toFixed(2)}°${this.EW})`;
            if (this.locationChecked) {
                this.tiptextB.text = this.textb;
                this.viewModel.btn[1].text = this.textb;
            }
            this.setPos(this.showimgB, divy - 20, divx - 20);
            this.divBx = divx;
            this.divBy = divy;
        }
    }

    /** 展开或折叠平面地图 */
    mapCheck(isC: boolean): void {
        this.mapChecked = isC;
        setTimeout(() => {
            this.resize();
        }, 50);
    }

    /** 显示或隐藏经纬度 */
    locationCheck(isC: boolean): void {
        this.locationChecked = !this.locationChecked;
        if (this.locationChecked) {
            this.tiptextA.text = this.texta;
            this.tiptextB.text = this.textb;
            this.viewModel.btn[0].text = this.texta;
            this.viewModel.btn[1].text = this.textb;
        } else {
            this.tiptextA.text = 'A';
            this.tiptextB.text = 'B';
            this.viewModel.btn[0].text = 'A';
            this.viewModel.btn[1].text = 'B';
        }
    }

    /** 显示坐标信息 */
    showTip(): void {
        this.showimgbg.style.height = `${this.showimgh}px`;
        this.showimgbg.style.top = `${this.showimgy - this.tipborder}px`;
        this.showimgbg.style.left = `${this.showimgx - this.tipborder}px`;
        this.setPos(this.showimgA, this.divAy - 20, this.divAx - 20);
        this.setPos(this.showimgB, this.divBy - 20, this.divBx - 20);
        this.viewModel.btn[0].text = this.locationChecked ? this.texta : 'A';
        this.viewModel.btn[1].text = this.locationChecked ? this.textb : 'B';
    }

    setPos(p: HTMLElement, top: number, left: number) {
        p.style.top = `${top}px`;
        p.style.left = `${left}px`;
    }

    /** 
     * 重置视图尺寸位置 
     **/
    tipReSize(): void {
        this.showimgw = this.showimg.clientWidth === 0 ? this.showimgw : this.showimg.clientWidth;
        this.offset = this.showimgw / 360;
        this.showimgh = this.showimgw / 2;
        const v = window.innerWidth / 16;
        this.showimgx = v < 70 ? 70 : v;
        this.showimgy = (window.innerHeight - this.showimgh) / 2;
        this.divAx = this.showimgw * 7 / 8;
        this.divAy = this.showimgh / 2;
        this.divBx = this.showimgw * 5 / 8;
        this.divBy = this.showimgh / 2;
    }

    reSizecamera(): void {
        if (window.innerWidth / window.innerHeight < 16 / 10) {
            const l = this.camera.position.length() < 13 ? 13 : this.camera.position.length();
            this.camera.setPosition(this.camera.position.clone().normalize().scale(l));
            this.camera.lowerRadiusLimit = 13;
            this.camera.upperRadiusLimit = 19;
        } else {
            const l = this.camera.position.length() > 16 ? 13 : this.camera.position.length();
            this.camera.setPosition(this.camera.position.clone().normalize().scale(l));
            this.camera.lowerRadiusLimit = 10;
            this.camera.upperRadiusLimit = 16;
        }
        this.showTip();
    }
    /** 重置按钮按下 */
    reset(): void {
        this.locationChecked = false;
        this.camera.detachControl(this.canvas);
        this.texta = 'A (0°,135°E)';
        this.textb = 'B (0°,45°E)';
        this.tipA.position = this.ANormalPos.scale(this.r);
        this.tiptextA.text = this.texta;
        this.tipB.position = this.BNormalPos.scale(this.r);
        this.tiptextB.text = this.textb;
        this.locationCheck(true);
        this.camera.position=new Vector3(0, 0, 14.5);
        this.camera.attachControl(this.canvas, true);
        this.mapCheck(false);
    }
}
