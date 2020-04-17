import { BaseScene } from '../../../../babylon/template/Base/BaseScene';
import { AbstractMesh, Camera, Scene, TargetCamera, Vector3 } from '@babylonjs/core/Legacy/legacy';
export class OrthoGraphicScene extends BaseScene {
    Container = <HTMLElement>document.getElementById('Container3d');
    orthoX: number;
    orthoY: number;

    /**
     * 创建相机
     * @param scene
     * @param orthoX
     * @param orthoY 半高度
     */
    TargetCamera(scene: Scene, orthoX: number, orthoY: number) {
        this.camera = new TargetCamera('', new Vector3(0, 0, -25), scene);
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.changeCameraSize(orthoX, orthoY);
        this.camera.attachControl(this.canvas, false);
        scene.activeCameras.push(this.camera);
    }

    changeCameraSize(orthoX: number, orthoY: number) {
        if (this.Container.clientWidth / this.Container.clientHeight < orthoX / orthoY) {
            this.orthoY = orthoX * this.Container.clientHeight / this.Container.clientWidth;
            this.camera.orthoTop = this.orthoY;
            this.camera.orthoBottom = -this.orthoY;
            this.orthoX = orthoX;
            this.camera.orthoLeft = -this.orthoX;
            this.camera.orthoRight = this.orthoX;
        } else {
            this.orthoY = orthoY;
            this.camera.orthoTop = this.orthoY;
            this.camera.orthoBottom = -this.orthoY;
            this.orthoX = this.orthoY * this.Container.clientWidth / this.Container.clientHeight;
            this.camera.orthoLeft = -this.orthoX;
            this.camera.orthoRight = this.orthoX;
        }
    }
    /**
     * 手势监听
     * @param pickinfoMesh
     * @param canvas
     * @param scene
     */
    addPointerEventListener(pickinfoMesh: AbstractMesh, canvas: HTMLCanvasElement, scene: Scene) {
        let startingPoint: Vector3;
        let currentMesh: AbstractMesh;

        const getGroundPosition = (evt: any) => {
            const pickinfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) { return mesh === pickinfoMesh && mesh.isPickable !== false; });
            if (pickinfo.hit) { return pickinfo.pickedPoint; }
            return null;
        };

        // 场景输入坐标监听（按下）
        const onPointerDown = (evt: any) => {
            if (evt.button !== 0) { return; }
                currentMesh = scene.getMeshByName('tipLight');
                if (currentMesh.name.indexOf('tip') !== -1) {
                    startingPoint = getGroundPosition(evt);
                    this.onPointerDown(startingPoint, currentMesh);
                }
        };

        // 场景输入坐标监听（移动）
        const onPointerMove = (evt: any) => {
            if (!startingPoint) { return; }
            const current = getGroundPosition(evt);
            if (!current) { return; }
            if (currentMesh.name.indexOf('tip') !== -1) {
                this.onPointerMove(startingPoint, currentMesh);
            }
            startingPoint = current;
        };

        // 场景输入坐标监听（抬起）
        const onPointerUp = () => {
            if (startingPoint) {
                if (currentMesh.name.indexOf('tip') !== -1) {
                    this.onPointerUp(startingPoint, currentMesh);
                }
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

    onPointerDown(startingPoint: Vector3, currentMesh: AbstractMesh) {

    }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {

    }

    onPointerUp(startingPoint: Vector3, currentMesh: AbstractMesh) {

    }
    onPointerOut(startingPoint: Vector3) { }
}
