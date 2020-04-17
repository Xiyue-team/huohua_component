import { Vector3, ArcRotateCamera, Animation, CircleEase, EasingFunction, Camera, } from '@babylonjs/core/Legacy/legacy';

export class TravelCamera extends ArcRotateCamera {
    animaPos: Animation; //位置动画
    animaCamPos: Animation; //位置动画
    frameRate = 60; //帧
    canvas: HTMLCanvasElement;
    isFull: boolean;

    /**
     * 创建相机
     * @param canvas
     */
    setCanvas(canvas: HTMLCanvasElement): TravelCamera {
        this.attachControl(canvas, true);
        this.canvas = canvas;
        this.lowerRadiusLimit = 11;
        this.upperRadiusLimit = 100;
        this.inertia = 0.5;
        this.panningSensibility = 0;
        this._scene.activeCameras.push(this);
        const easingFunction = new CircleEase();
        easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        this.animaPos = new Animation('target', 'target', this.frameRate,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.animaCamPos = new Animation('position', 'position', this.frameRate,
            Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        // this.animaPos.setEasingFunction(easingFunction);
        // this.animaCamPos.setEasingFunction(easingFunction);
        return this;
    }

    /**
     * 设置动画
     * @param target 
     * @param pos 
     */
    setTargetPos(target: Vector3, pos: Vector3, isFull: boolean) {
        this.isFull = isFull;
        this.lowerRadiusLimit = 15;
        this.upperRadiusLimit = 100;
        this.detachControl(this.canvas);
        this._scene.stopAnimation(this);
        this.createAnimation(this.target.clone(), target, this.position.clone(), pos);
        this._scene.beginDirectAnimation(this, [this.animaPos], 0, 60, false, 1);
        this._scene.beginDirectAnimation(this, [this.animaPos, this.animaCamPos], 0, 180, false, 1, () => {
            this.animationFinish();
        });
    }

    /**
     * 创建动画
     * @param fromTargetPos
     * @param toTargetPos
     * @param fromPos
     * @param toPos
     */
    createAnimation(fromTargetPos: Vector3, toTargetPos: Vector3, fromPos: Vector3, toPos: Vector3) {
        this.animaPos.setKeys([{ frame: 0, value: fromTargetPos }, { frame: 60, value: toTargetPos }]);
        this.animaCamPos.setKeys([{ frame: 0, value: fromPos }, { frame: 180, value: toPos }]);
    }

    /**
     * 动画回调
     */
    animationFinish() {
        if (this.isFull) {
            this.lowerRadiusLimit = 50;
            this.upperRadiusLimit = 100;
        } else {
            this.lowerRadiusLimit = 15;
            this.upperRadiusLimit = 22;
        }
        this.attachControl(this.canvas, true);
    }

    reset() {
        this.lowerRadiusLimit = 15;
        this.upperRadiusLimit = 22;
    }
}
