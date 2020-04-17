/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/7/14 10:10
 */
import Vue from 'vue';
import {
    Vector3, Color3, TransformNode, DirectionalLight, Mesh, LinesMesh, Scene, Engine, SceneLoader,
     AbstractMesh, Texture, StandardMaterial
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';
import { BaseScene } from '../../../../babylon/template/Base/BaseScene';
import { DrawEarth } from '../../../../babylon/Geography/util/DrawEarth';
import { Utils } from './Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { System } from './CoordinateSystem';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { ViewModel } from '../ViewModel';
import { GeoUtils } from '../../../../babylon/Geography/GeoUtils';

import * as sun from '../sub_static/image/sun.jpg';
import * as eartnTex from '../sub_static/01.jpg';
import { DrawEarthLabel } from '../../../../babylon/Geography/util/DrawEarthLabel';
import * as map from '../sub_static/label.babylon';
import * as dot from '../sub_static/label.png';

export class AssembleScene extends BaseScene {
    r = 4;
    viewModel: ViewModel;
    edgesWidth = 2;
    tipA: Mesh;
    posStart = new Vector3(this.r, 0, 0);

    hexRed = '#FF5A5A';
    hexYellow = '#ffffff';
    colorRed: Color3;
    colorYellow: Color3;

    earth: TransformNode;
    earthgroup: TransformNode;
    system: System;

    LineSun: LinesMesh;
    LineSunShadow: LinesMesh;
    LineSunAngle: LinesMesh;
    arrow: Mesh;
    angleTip: Mesh;
    angleText: GUI.TextBlock;
    type = 0;
    tempPos = new Vector3(0, 0, 0);
    lineradius = this.r + 0.01;
    layerMask: any = null;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /**
     *  初始化数值
     * */
    initValue(scene: Scene) {
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorYellow = Color3.FromHexString(this.hexYellow);
        this.tipA = new Mesh('tipA');
        this.tipA.position = this.posStart;
        this.angleTip = new Mesh('angle');
        this.earthgroup = new TransformNode('earthgroup');
        this.tipA.setParent(this.earthgroup);
        Utils.createSun(sun, scene);
        const WarpAndWeft = DrawEarth.CreateWarpAndWeft(new Color3(1, 1, 1), 15, 15, this.r + 0.02, scene);
        this.createWeftAndWarpLabel(scene);
        this.earth = Utils.createEarth(eartnTex, this.r, this.earthgroup, scene);
        WarpAndWeft.setParent(this.earth);
    }

    /** 创建地球经纬标签 */
    createWeftAndWarpLabel(scene: Scene) {
        const textColor = 'white';
        const fontSize = 20;
        // DrawEarthLabel.CreateWeftLabel(textColor, fontSize, this.lineradius, 15, this.earthgroup, scene, this.layerMask);
        // DrawEarthLabel.CreateWarpLabel(textColor, fontSize, this.lineradius, 12, this.earthgroup, scene, this.layerMask);

    }

    /** 创建场景*/
    createScene(engine: Engine): Scene {
        const canvas = engine.getRenderingCanvas();
        const scene = new Scene(engine);
        scene.clearColor.set(0, 0, 0, 1);
        this.initValue(scene);
        // scene.debugLayer.show();
        this.camera = Utils.CreateRotateCamera(scene, canvas);
        this.camera.position = new Vector3(0, 0, -16);

        const dLight = new DirectionalLight('DLight', new Vector3(-1, 0, 0), scene);
        dLight.position = new Vector3(100, 0, 0);
        dLight.intensity = 0.9;

        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const options = {
            height: 80, width: 80, color: this.hexYellow,
            fontSize: '24px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };
        this.angleText = LabelUtils.CreateLabel(advancedTexture, this.angleTip, '45°', options);
        this.system = new System('system', scene).setPos(Vector3.Zero());
        this.arrow = Utils.CreateArrow(scene, this.colorRed);
        this.LineSun = LinesBuild.CreateUpdateLines([this.tipA.position, Vector3.Zero()],
            this.colorRed, this.edgesWidth, this.LineSun, scene);

        this.LineSunShadow = LinesBuild.CreateUpdateLines([Vector3.Zero(), Vector3.Zero()],
            this.colorRed, this.edgesWidth, this.LineSunShadow, scene);

        const vertices = Utils.GetPosArray(new Vector3(5, 5, 5), new Vector3(-5, -5, -5), 1);
        this.LineSunAngle = LinesBuild.CreateUpdateLines(vertices, this.colorYellow, this.edgesWidth, this.LineSunAngle, scene);

        scene.registerBeforeRender(() => {
            const MatrixA = this.tipA.getWorldMatrix().getTranslation();
            const border = Vector3.Distance(this.camera.position, new Vector3(0, 0, 0));
            const bordera = Vector3.Distance(this.camera.position, MatrixA);
            const borderlength = Math.pow(border, 2) + Math.pow(this.r, 2);
            this.angleText.isVisible = Math.pow(bordera, 2) <= borderlength ? MatrixA.x >= 0 ? true : false : false;
            if (Vector3.Distance(this.tempPos, MatrixA) > 0.01) {
                this.updateMessage(MatrixA);
            }
            this.setMeshVisible([this.arrow, this.LineSun, this.LineSunShadow, this.LineSunAngle], MatrixA.x >= 0);
        });
        SceneLoader.ImportMesh('', map.replace('label.babylon', ''), 'label.babylon', scene, (v) => { this.importMeshSuccess(v); });
        this.reset();
        return scene;
    }
    importMeshSuccess(meshes: AbstractMesh[]) {
        const dotTex = new Texture(dot, this.scene);
        dotTex.hasAlpha = true;
        const tipMat = this.createMaterial('dotMat', dotTex, this.scene);
        for (let i = 0; i < meshes.length; i++) {
            if (meshes[i].name.indexOf('label') !== -1) {
                meshes[i].scaling = new Vector3(1, 1, 1);
                // meshes[i].rotationQuaternion = new Quaternion(Math.PI / 4, 0, Math.PI / 4, 0);
                // meshes[i].rotation.y = Math.PI / 2;
                meshes[i].material = tipMat;
                meshes[i].isVisible = true;
                meshes[i].setParent(this.earth);
            }
        }
    }

    createMaterial(name: string, diffuseTexture: Texture, scene: Scene): StandardMaterial {
        const mat = new StandardMaterial(name, scene);
        mat.diffuseTexture = diffuseTexture;
        mat.useAlphaFromDiffuseTexture = true;
        mat.specularColor = new Color3(0, 0, 0);
        mat.emissiveTexture = diffuseTexture;
        mat.backFaceCulling = false;
        return mat;
    }

    updateMessage(pos: Vector3) {
        this.tempPos = pos;
        const s = Vector3.Dot(new Vector3(1, 0, 0), Vector3.Normalize(pos));
        const temppos = new Vector3(this.r / s, 0, 0);
        const shadowPos = pos.add(Vector3.Normalize(temppos.subtract(pos)));
        this.angleTip.position = Vector3.Normalize(shadowPos.subtract(pos).add(new Vector3(1, 0, 0))).add(pos);
        const angle = Vector3.Dot(Vector3.Normalize(shadowPos.subtract(pos)), new Vector3(1, 0, 0));
        this.angleText.text = `${(Math.acos(angle) * 180 / Math.PI).toFixed(1)}°`;
        this.arrow.position = pos.add(new Vector3(2, 0, 0));
        this.system.position = pos;
        this.system.lookAt(Vector3.Zero());
        this.updateMeshVertData(this.LineSun, Vector3Utils.ToArray([pos, pos.add(new Vector3(3, 0, 0))]));
        this.updateMeshVertData(this.LineSunShadow, Vector3Utils.ToArray([pos, shadowPos]));
        this.updateMeshVertData(this.LineSunAngle,
            Vector3Utils.ToArray(Utils.GetPosArray(shadowPos.subtract(pos), new Vector3(1, 0, 0), 0.4, pos)));
    }

    selectChange(type: number) {
        this.type = type;
        if (type === 0) {
            const timer = this.viewModel.time + this.viewModel.timeOffset;
            this.viewModel.value = timer > 240 ? timer - 240 : timer;
        } else if (type === 1) {
            this.viewModel.value = this.viewModel.lng;
        } else {
            this.viewModel.value = this.viewModel.lat;
        }
        this.calculation();
    }

    formatter(time: number) {
        if (this.type === 0) {
            this.viewModel.time = time - this.viewModel.timeOffset;
        } else if (this.type === 1) {
            this.viewModel.lng = time;
            this.viewModel.timeOffset = time;
        } else {
            this.viewModel.lat = time;
        }
        this.calculation();
    }

    calculation() {
        this.earthgroup.rotation.y = -Math.PI / 180 * (this.viewModel.time - 120) / 240 * 360;
        this.tipA.position = GeoUtils.GeographicToCartesian(this.viewModel.lng / 240 * 360,
            -(this.viewModel.lat / 240 * 180 - 90)).scale(this.r);
    }

    /** 重置按钮按下 */
    reset(): void {
        this.tipA.position = this.posStart;
        this.earth.rotation.y = 0;
        this.earthgroup.rotation.y = -Math.PI / 180 * (60 - 120) / 240 * 360;
        this.camera.detachControl(this.canvas);
        this.camera.position = new Vector3(0, 0, -16);
        this.camera.attachControl(this.canvas, true);
    }
}
