import { ArcRotateCamera } from '@babylonjs/core/Legacy/legacy';

export class TravelCamera extends ArcRotateCamera {

    /**
     * 创建相机
     * @param canvas
     */
    setCanvas(canvas: HTMLCanvasElement): TravelCamera {
        this.attachControl(canvas, true);
        this.lowerRadiusLimit = 11;
        this.upperRadiusLimit = 30;
        this.inertia = 0.5;
        this.panningSensibility = 0;
        this._scene.activeCameras.push(this);
        return this;
    }
}
