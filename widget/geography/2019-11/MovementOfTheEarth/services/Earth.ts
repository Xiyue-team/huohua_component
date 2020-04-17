import {
    Vector3, Scene, TransformNode, Texture, ShaderMaterial, StandardMaterial, Mesh, Color3, Animation, LinesMesh
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import { DrawEarth } from '../../../../babylon/Geography/util/DrawEarth';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import * as earthday from '../sub_static/image/earth/earthday.jpg';
import * as earthnight from '../sub_static/image/earth/earthnight.jpg';
import * as cloudTex from '../sub_static/image/earth/cloud.png';
import * as planTex from '../sub_static/image/plan.png';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { Utils } from './Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { MaterialCreater } from './MaterialCreater';

export class Earth extends TransformNode {
    lang = window.env.browserInfo.lang;
    btntext = this.lang.text;

    earthMat: ShaderMaterial; //地球材质
    cloudMat: ShaderMaterial; //云材质
    earthPlanMat: StandardMaterial; //赤道面材质
    sunPlanMat: StandardMaterial; //黄道面材质

    earthGroup: TransformNode; //地球组
    earthgroupAngle: TransformNode; //地球偏转组

    orbitPlan: Mesh = null; //黄道模型
    r: number; //
    isSelfRotate = false;
    isPubRotate = false;
    alpha = 0;
    equatorialPlan: Mesh = null; //赤道模型
    earthAxis: Mesh = null; //地轴模型
    frameRate = 60;
    planScaleAnima: Animation; //缩放动画
    edgesWidth = 4;
    lineOrbit: LinesMesh; //黄道线
    lineEquatorial: LinesMesh; //赤道线
    lineSunAngle: LinesMesh; //太阳高度角线
    labelAngle: GUI.TextBlock; //角度文本
    goneButton: GUI.Rectangle; //继续按钮
    hand: EventHandler;
    orbitPlanVisible = false;
    constructor(name: string, r: number, advancedTexture: GUI.AdvancedDynamicTexture, hand: EventHandler, scene?: Scene, isPure?: boolean) {
        super(name, scene, isPure);
        this.r = r;
        this.hand = hand;
        this.earthgroupAngle = new TransformNode('earthgroupAngle');
        this.earthGroup = new TransformNode('earthGroup');
        this.earthGroup.setParent(this.earthgroupAngle);
        this.earthgroupAngle.setParent(this);
        this.earthMat = MaterialCreater.CreateEarthMaterial(new Texture(`${earthday}`, scene), new Texture(`${earthnight}`, scene), scene);
        this.earthMat.setVector3('vSelfPosition',this.getAbsolutePosition());
        this.cloudMat = MaterialCreater.CreateCloudMaterial(new Texture(`${cloudTex}`, scene), scene);
        this.sunPlanMat = MaterialCreater.CreateGroundMat(planTex, scene);
        this.earthPlanMat = MaterialCreater.CreateGroundMat(planTex, scene);
        this.sunPlanMat.emissiveColor = Color3.FromHexString('#ffee00');
        this.sunPlanMat.diffuseColor = Color3.FromHexString('#ffee00');
        this.createEarth();
        this.createCloud();
        this.createWarpAndWeft();
        this.createOrbitPlan();
        this.createEarthAxis();
        this.orbitPlan.isVisible = false;
        this.createYellowAngle(advancedTexture, scene);
        this.createGoneBtn(advancedTexture, scene);
        this.earthgroupAngle.rotation = new Vector3(0, 0, -Math.PI / 180 * 23.26);
        scene.registerBeforeRender(() => {
            if (this.isSelfRotate) {
                this.earthGroup.rotation = new Vector3(0, this.alpha * 0.2, 0);
                this.alpha -= this.isPubRotate ? 0.5 : 0.04;
            }
        });
    }
    /**
     * 创建黄赤交角角度辅助线
     * @param advancedTexture 
     * @param scene 
     */
    createYellowAngle(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        this.lineOrbit = LinesBuild.CreateLines([new Vector3(this.r * 2, 0, 0), Vector3.Zero()],
            Color3.Yellow(), this.edgesWidth, scene);
        this.lineOrbit.setParent(this);
        const p = FormulasUtils.GetCirclePoint(this.r * 2, -23.26);
        this.lineEquatorial = LinesBuild.CreateLines([p, Vector3.Zero()],
            Color3.Yellow(), this.edgesWidth, scene);
        this.lineEquatorial.setParent(this);

        const vertices = Utils.GetPosArray(p, new Vector3(this.r * 2, 0, 0), this.r + 2);
        this.lineSunAngle = LinesBuild.CreateLines(vertices, Color3.Yellow(), this.edgesWidth, scene);
        this.lineSunAngle.setParent(this);
        this.lineSunAngle.isVisible = this.lineEquatorial.isVisible = this.lineOrbit.isVisible = false;
        const options = {
            height: 30, width: 120, color: '#FFFFFF',
            fontSize: '24px', fontFamily: '', fontStyle: ''
        };
        const dot = new Mesh('d');
        dot.position = FormulasUtils.GetCirclePoint(this.r * 2, -12);
        dot.setParent(this);
        this.labelAngle = LabelUtils.CreateLabel(advancedTexture, dot, '23°26′', options);
        this.labelAngle.isVisible = false;
    }

    /**
     * 创建继续按钮
     * @param advancedTexture 
     * @param scene 
     */
    createGoneBtn(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        const options = { height: 30, width: 70, color: '#353535', fontSize: '18px', fontFamily: '', fontStyle: '' };
        const dot = new Mesh('d');
        dot.position = new Vector3(0, this.r * 2, 0);
        dot.setParent(this);
        this.goneButton = Utils.CreateGoneLabel(advancedTexture, dot, this.btntext[6], options);
        this.goneButton.isVisible = false;
        this.goneButton.onPointerClickObservable.add(() => {
            this.setButtonVisible(false);
            this.hand.go();
        });
    }

    /**
     * 设置按钮可见性
     * @param isVisible 
     */
    setButtonVisible(isVisible: boolean): Earth {
        this.goneButton.isVisible = isVisible;
        return this;
    }

    /**
     * 更新材质灯光、相机位置
     * @param cameraPos 
     * @param sunPos 
     */
    updateAllMaterial(cameraPos: Vector3, sunPos: Vector3): Earth {
        this.updateMaterial(cameraPos, sunPos);
        this.updateCloudMaterial(cameraPos, sunPos);
        return this;
    }

    updateMaterial(cameraPos: Vector3, sunPos: Vector3): Earth {
        this.earthMat.setVector3('cameraPosition', cameraPos);
        this.earthMat.setVector3('vLightPosition', sunPos);
        return this;
    }

    updateCloudMaterial(cameraPos: Vector3, sunPos: Vector3): Earth {
        this.cloudMat.setVector3('cameraPosition', cameraPos);
        this.cloudMat.setVector3('vLightPosition', sunPos);
        return this;
    }

    /**
     * 创建赤道面
     */
    createEquatorialPlan(): Earth {
        this.equatorialPlan = Mesh.CreateGround('plan', 4 * this.r, 4 * this.r, 4, this._scene);
        this.equatorialPlan.material = this.earthPlanMat;
        this.equatorialPlan.setParent(this.earthGroup);
        this.equatorialPlan.rotation = Vector3.Zero();
        this.equatorialPlan.position = Vector3.Zero();
        this.equatorialPlan.isPickable = false;
        return this;
    }

    /**
     * 创建黄道面
     */
    createOrbitPlan(): Earth {
        this.orbitPlan = Mesh.CreateGround('plan', 4 * this.r, 4 * this.r, 4, this._scene);
        this.orbitPlan.material = this.sunPlanMat;
        this.orbitPlan.setParent(this);
        this.orbitPlan.rotation = Vector3.Zero();
        this.orbitPlan.position = Vector3.Zero();
        this.orbitPlan.isPickable = false;
        return this;
    }

    /**
     * 更新黄赤交角可见性
     * @param isShow 
     */
    updatePlanVisible(isShow: boolean): Earth {
        this.orbitPlanVisible = isShow;
        if (this.equatorialPlan === null) {
            this.createEquatorialPlan();
        }
        if (this.orbitPlan) {
            this.orbitPlan.isVisible = isShow;
            this.orbitPlan.scaling = this.isPubRotate ? Vector3.Zero() : Vector3.One();
            this.labelAngle.isVisible = !this.isPubRotate && isShow;
            this.lineSunAngle.isVisible = this.lineEquatorial.isVisible = this.lineOrbit.isVisible = !this.isPubRotate && isShow;
        }
        this.equatorialPlan.isVisible = isShow;
        return this;
    }

    /**
     * 是否开启阴影
     * @param has 
     */
    hasShadow(has: boolean): Earth {
        this.earthMat.setFloat('hasShadow', has ? 1 : 0);
        this.cloudMat.setFloat('hasShadow', has ? 1 : 0);
        return this;
    }

    /**
     * 设置公转
     * @param active 
     */
    setPubRotate(active: boolean): Earth {
        this.isPubRotate = active;
        if (active) {
            this.labelAngle.isVisible = false;
            Utils.SetMeshVisible([this.lineSunAngle, this.lineEquatorial, this.lineOrbit], false);
        } else {
            this.labelAngle.isVisible = this.orbitPlanVisible;
            Utils.SetMeshVisible([this.lineSunAngle, this.lineEquatorial, this.lineOrbit], this.orbitPlanVisible);
        }
        return this;
    }

    /**
     * 设置自转
     * @param active 
     */
    setSelfRotate(active: boolean): Earth {
        this.isSelfRotate = active;
        this.earthAxis.isVisible = active;
        return this;
    }

    /**
     * 创建地球
     */
    createEarth(): Earth {
        const earth = Mesh.CreateSphere('earth', 32, 2 * this.r, this._scene);
        earth.material = this.earthMat;
        earth.rotation = new Vector3(0, 0, Math.PI);
        earth.setParent(this.earthGroup);
        return this;
    }

    /**
     * 创建云层
     */
    createCloud(): Earth {
        const cloud = Mesh.CreateSphere('cloud', 32, 2 * this.r + 0.2, this._scene);
        cloud.material = this.cloudMat;
        cloud.rotation = new Vector3(0, 0, Math.PI);
        cloud.setParent(this.earthGroup);
        cloud.isPickable = false;
        return this;
    }

    /**
     * 创建经纬网
     */
    createWarpAndWeft(): Earth {
        const warpAndWeft = DrawEarth.CreateWarpAndWeft(new Color3(1, 1, 1), 15, 15, this.r + 0.02, this._scene);
        warpAndWeft.setParent(this.earthGroup);
        return this;
    }

    /**
     * 创建地球
     */
    createEarthAxis(): Earth {
        const sliderR = this.r + 0.6;
        const cylinderMat = new StandardMaterial('EarthAxisMat', this._scene);
        cylinderMat.emissiveColor = Color3.Gray();
        cylinderMat.freeze();
        this.earthAxis = Mesh.CreateCylinder('EarthAxis', 2 * sliderR + 0.6, 0.05, 0.05, 16, 1, this._scene);
        this.earthAxis.material = cylinderMat;
        this.earthAxis.setParent(this.earthGroup);
        this.earthAxis.isVisible = this.earthAxis.isPickable = false;
        return this;
    }

    setAnima(active: boolean): Earth {
        this.createAnimation(active ? Vector3.One() : Vector3.Zero(), active ? Vector3.Zero() : Vector3.One());
        this._scene.beginDirectAnimation(this.orbitPlan, [this.planScaleAnima], 0, 90, false, 1, () => {
            this.animationFinish();
        });
        return this;
    }

    /**
     * 动画回调
     */
    animationFinish() {
        // this.planScaleAnima=null;
    }

    /**
     * 创建动画
     * @param fromTargetPos
     * @param toTargetPos
     */
    createAnimation(fromTargetPos: Vector3, toTargetPos: Vector3) {
        this.planScaleAnima = new Animation('scaling', 'scaling', this.frameRate,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.planScaleAnima.setKeys([{ frame: 0, value: fromTargetPos }, { frame: 90, value: toTargetPos }]);
    }
}

export interface EventHandler {
    go(): void;
}

