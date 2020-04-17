import {
    ArcRotateCamera, AbstractMesh, Mesh, Vector3, TargetCamera, Camera, Scene
} from '@babylonjs/core/Legacy/legacy';
import { BaseScene } from '../../../../babylon/template/Base/BaseScene';

export class Base2DScene extends BaseScene {
    camera: Camera;
    orthoX: number;
    orthoY: number;
    offset = 1.8;
    Container = <HTMLElement>document.getElementById('Container3d');
    /**
     * 创建相机
     * @param scene
     * @param orthoY
     */
    createTargetCamera4Math(scene: Scene, orthoY: number) {
        this.orthoY = orthoY;
        this.camera = new TargetCamera('targetCamera', new Vector3(0, 0, -18), scene);
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.changeCameraSize();
        this.camera.attachControl(this.canvas, false);
        scene.activeCameras.push(this.camera);
    }

    changeCameraSize() {
        this.camera.orthoTop = this.orthoY;
        this.camera.orthoBottom = -this.orthoY;
        this.orthoX = this.orthoY * this.Container.clientWidth / this.Container.clientHeight;
        this.camera.orthoLeft = -this.orthoX;
        this.camera.orthoRight = this.orthoX;
    }

    changeCamera(orthoY: number) {
        this.orthoY = orthoY;
        this.camera.orthoTop = this.orthoY;
        this.camera.orthoBottom = -this.orthoY;
        this.orthoX = this.orthoY * this.Container.clientWidth / this.Container.clientHeight;
        this.camera.orthoLeft = -this.orthoX;
        this.camera.orthoRight = this.orthoX;
    }

    /**
     * 创建相机
     * @param scene 
     */
    createArcRotateCamera4Math(scene: Scene): ArcRotateCamera {
        const camera = new ArcRotateCamera('Camera', 0, 0, 10, Vector3.Zero(), scene);
        camera.attachControl(this.canvas, true);
        camera.lowerRadiusLimit = camera.upperRadiusLimit = 30;
        camera.minZ = 1.0;
        camera.maxZ = 100;
        camera.lowerAlphaLimit = camera.upperAlphaLimit = -Math.PI / 2;
        camera.lowerBetaLimit = camera.upperBetaLimit = Math.PI / 2;
        camera.panningSensibility = 0;
        camera.setPosition(new Vector3(0, 0, 30));
        scene.activeCameras.push(camera);
        return camera;
    }


    /**
     * 手势监听
     * @param canvas
     * @param scene
     */
    addPointerEventListener(canvas: HTMLCanvasElement, scene: Scene) {
        let startingPoint: Vector3;
        let currentMesh: AbstractMesh;
        const pickinfoMesh = Mesh.CreatePlane('plan', 160, scene);
        pickinfoMesh.isVisible = false;
        const getGroundPosition = (evt: any) => {
            const pickinfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) { return mesh === pickinfoMesh; });
            if (pickinfo.hit) { return pickinfo.pickedPoint; }
            return null;
        };
        // 场景输入坐标监听（按下）
        const onPointerDown = (evt: any) => {
            if (evt.button !== 0) { return; }
            const pickInfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) { return mesh !== pickinfoMesh && mesh.isPickable !== false; });
            if (pickInfo.hit) {
                currentMesh = pickInfo.pickedMesh;
                if (currentMesh.name.indexOf('tip') !== -1) {
                    startingPoint = getGroundPosition(evt);
                    this.onPointerDown(startingPoint, currentMesh);
                } else if (currentMesh.name.indexOf('dot') !== -1) {
                    this.onPointerDown(null, currentMesh);
                }
            }
        };
        // 场景输入坐标监听（移动）
        const onPointerMove = (evt: any) => {
            if (!startingPoint) { return; }
            const current = getGroundPosition(evt);
            if (!current) { return; }
            startingPoint.x = startingPoint.x < -this.orthoX + this.offset ? -this.orthoX + this.offset : startingPoint.x;
            startingPoint.x = startingPoint.x > this.orthoX - this.offset ? this.orthoX - this.offset : startingPoint.x;
            startingPoint.y = startingPoint.y < -this.orthoY + this.offset ? -this.orthoY + this.offset : startingPoint.y;
            startingPoint.y = startingPoint.y > this.orthoY - this.offset ? this.orthoY - this.offset : startingPoint.y;
            this.onPointerMove(startingPoint, currentMesh);
            startingPoint = current;
        };
        // 场景输入坐标监听（抬起）
        const onPointerUp = (evt: any) => {
            if (startingPoint) {
                this.onPointerUp(evt, currentMesh, scene);
                startingPoint = null;
                return;
            }
        };
        // 场景输入坐标监听（抬起）
        const onPointerOut = () => {
            if (startingPoint) {
                startingPoint = null;
                this.onPointerOut(startingPoint);
                return;
            }
        };
        canvas.addEventListener('pointerdown', onPointerDown, false);
        canvas.addEventListener('pointerup', onPointerUp, false);
        canvas.addEventListener('pointermove', onPointerMove, false);
        canvas.addEventListener('pointerout', onPointerOut, false);
        scene.onDispose = function () {
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerout', onPointerOut);
        };
    }
    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh): void { }
    onPointerUp(evt: any, currentMesh: AbstractMesh, scene: Scene): void { }
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) { }
    onPointerOut(startingPoint: Vector3) { }
}
