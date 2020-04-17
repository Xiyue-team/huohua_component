import {
    Vector3, Scene, TransformNode, StandardMaterial, Mesh, Color3, Material, Animation, LinesMesh
} from '@babylonjs/core/Legacy/legacy';
import { AssembleScene } from './AssembleScene';
import { MaterialCreater } from './MaterialCreater';
import { Orbit } from './Orbit';
import * as sunTex from '../sub_static/image/sun.jpg';

export class Sun extends TransformNode {
    sunMat: StandardMaterial;
    sunGroup: TransformNode;
    plan: Mesh; //面片
    sunMesh: Mesh;
    r: number;
    frameRate = 60;
    cra = 40; //长半轴
    crb = 30; //短半轴
    edgesWidth = 4; // 线宽
    planScaleAnima: Animation; //缩放动画
    sunScaleAnima: Animation; //缩放动画
    planVisible = false;
    orbit: LinesMesh; // 公转轨道
    hand: AnimationEventHandler;
    constructor(name: string, r: number, sunPlanMat: Material, hand: AnimationEventHandler, scene?: Scene, isPure?: boolean) {
        super(name, scene, isPure);
        this.hand = hand;
        this.r = r;
        this.sunGroup = new TransformNode('sunGroup');
        this.sunGroup.setParent(this);
        this.createSun(sunTex, scene);
        this.plan = Mesh.CreateGround('plan', 80, 60, 4, scene);
        this.plan.material = sunPlanMat;
        this.plan.scaling = Vector3.Zero();
        this.plan.isVisible = false;
        this.planScaleAnima = new Animation('scaling', 'scaling', this.frameRate,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.sunScaleAnima = new Animation('scaling', 'scaling', this.frameRate,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
    }

    /**
     * 创建太阳
     * @param sun
     * @param scene
     */
    createSun(sun: string, scene: Scene): Sun {
        this.orbit = Orbit.CreateEllipse(this.cra, this.crb, Color3.Red(), this.edgesWidth, scene);
        this.orbit.isVisible = false;
        this.sunMat = MaterialCreater.CreateSunMaterial(sun, scene, new Color3(0, 0, 0));
        this.sunMat.emissiveColor = new Color3(5, 0.3, 0.1);
        this.sunMesh = Mesh.CreateSphere('sun', 32, 2 * this.r, scene);
        this.sunMesh.material = this.sunMat;
        this.sunMesh.setParent(this.sunGroup);
        this.sunMesh.scaling = Vector3.Zero();
        return this;
    }

    /**
     * 设置面片可见性
     * @param isShow
     */
    updatePlanVisible(isShow: boolean): Sun {
        this.planVisible = isShow;
        if (Vector3.Distance(this.plan.scaling.clone(), Vector3.Zero()) > 0.01) {
            this.plan.isVisible = isShow;
        }
        return this;
    }

    /**
     * 设置缩放动画
     * @param fromTargetPos
     * @param toTargetPos
     */
    setAnima(fromTargetPos: Vector3, toTargetPos: Vector3) {
        if (!AssembleScene.instance.pubRot) {
            this.orbit.isVisible = false;
        }
        if (Vector3.Distance(toTargetPos, Vector3.Zero()) > 0.01) {
            if (this.planVisible) {
                this.plan.isVisible = true;
            }
        }
        this.createAnimation(fromTargetPos, toTargetPos);
        this._scene.beginDirectAnimation(this.plan, [this.planScaleAnima], 0, 90, false, 1, () => {
            this.animationFinish();
        });
        this._scene.beginDirectAnimation(this.sunMesh, [this.sunScaleAnima], 0, 60, false, 1);
    }

    /**
     * 动画回调
     */
    animationFinish() {
        if (this.planVisible) {
            this.plan.isVisible = Vector3.Distance(this.plan.scaling, Vector3.Zero()) > 0.01;
        }
        this.orbit.isVisible = AssembleScene.instance.pubRot;
        this.hand.animationFinish();
    }

    /**
     * 创建动画
     * @param fromTargetPos
     * @param toTargetPos
     */
    createAnimation(fromTargetPos: Vector3, toTargetPos: Vector3) {
        this.planScaleAnima.setKeys([{ frame: 0, value: fromTargetPos }, { frame: 90, value: toTargetPos }]);
        this.sunScaleAnima.setKeys([{ frame: 0, value: fromTargetPos }, { frame: 60, value: toTargetPos }]);
    }

}
export interface AnimationEventHandler {
    animationFinish(): void;
}