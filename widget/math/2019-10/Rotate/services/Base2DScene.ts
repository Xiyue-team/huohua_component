import {
    AbstractMesh, Mesh, Vector3, TargetCamera, Camera, Scene
} from '@babylonjs/core/Legacy/legacy';
import { BaseScene } from '../../../../babylon/template/Base/BaseScene';

export class Base2DScene extends BaseScene {
    camera: Camera;
    orthoX: number;
    orthoY: number;
    offset = 1.8;
    Container: HTMLElement;
    formatterV = 0;
    max = 40;

    init() {
        this.Container = <HTMLElement>document.getElementById('Container3d');
        super.init();
    }
    /**
     * 创建相机
     * @param scene 
     */
    createTargetCamera4Math(scene: Scene, orthoY: number) {
        this.orthoY = orthoY;
        this.camera = new TargetCamera('targetCamera', new Vector3(0, 0, -18), scene);
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.changeCameraSize();
        this.camera.attachControl(this.canvas, false);
        scene.activeCameras.push(this.camera);
    }
    /**
     * 重置视口
     */
    changeCameraSize() {
        this.camera.orthoTop = this.orthoY;
        this.camera.orthoBottom = -this.orthoY;
        this.orthoX = this.orthoY * this.Container.clientWidth / this.Container.clientHeight;
        this.camera.orthoLeft = -this.orthoX;
        this.camera.orthoRight = this.orthoX;
    }
    /**
     * 改变视口
     * @param orthoY 
     */
    changeCamera(orthoY: number) {
        this.orthoY = orthoY;
        this.camera.orthoTop = this.orthoY;
        this.camera.orthoBottom = -this.orthoY;
        this.orthoX = this.orthoY * this.Container.clientWidth / this.Container.clientHeight;
        this.camera.orthoLeft = -this.orthoX;
        this.camera.orthoRight = this.orthoX;
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
        let evCache = new Array();
        let prevDiff = -1;
        // 场景输入坐标监听（按下）
        const onMouseWheel = (event: any) => {
            if (event.deltaY > 0) {
                this.formatterV += 1;
            } else {
                this.formatterV -= 1;
            }
            this.formatterV = this.formatterV >= 0 ? this.formatterV < this.max ? this.formatterV : this.max : 0;
            this.formatterFov(this.formatterV);
        };

        const getGroundPosition = (evt: any) => {
            const pickinfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) { return mesh === pickinfoMesh; });
            if (pickinfo.hit) { return pickinfo.pickedPoint; }
            return null;
        };
        // 场景输入坐标监听（按下）
        const onPointerDown = (evt: any) => {
            if (evt.button !== 0) { return; }
            prevDiff = -1;
            evCache.push(evt);
            const pickInfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) { return mesh !== pickinfoMesh && mesh.isPickable !== false; });
            if (pickInfo.hit) {
                currentMesh = pickInfo.pickedMesh;
                if (currentMesh.name.indexOf('tip') !== -1) {
                    startingPoint = getGroundPosition(evt);
                    this.onPointerDown(startingPoint);
                }
            }
        };
        // 场景输入坐标监听（移动）
        const onPointerMove = (evt: any) => {
            for (let i = 0; i < evCache.length; i++) {
                if (evt.pointerId === evCache[i].pointerId) {
                    evCache[i] = event;
                    break;
                }
            }

            if (evCache.length >= 2) {
                const curDiff = Math.sqrt(Math.pow(evCache[1].pageX - evCache[0].pageX, 2) +
                    Math.pow(evCache[1].pageY - evCache[0].pageY, 2)) / 10;
                if (prevDiff > 0) {
                    const dif = curDiff - prevDiff;
                    this.formatterV -= dif;
                    this.formatterV = this.formatterV >= 0 ? this.formatterV < this.max ? this.formatterV : this.max : 0;
                    this.formatterFov(this.formatterV);
                }
                prevDiff = curDiff;
                if (startingPoint) {
                    startingPoint = null;
                }
            } else {
                if (!startingPoint) { return; }
                const current = getGroundPosition(evt);
                if (!current) { return; }
                startingPoint.x = startingPoint.x < -this.orthoX + this.offset ? -this.orthoX + this.offset : startingPoint.x;
                startingPoint.x = startingPoint.x > this.orthoX - this.offset ? this.orthoX - this.offset : startingPoint.x;
                startingPoint.y = startingPoint.y < -this.orthoY + this.offset ? -this.orthoY + this.offset : startingPoint.y;
                startingPoint.y = startingPoint.y > this.orthoY - this.offset ? this.orthoY - this.offset : startingPoint.y;
                this.onPointerMove(startingPoint, currentMesh);
                startingPoint = current;
            }
        };
        // 场景输入坐标监听（抬起）
        const onPointerUp = (evt: any) => {
            evCache = evCache.filter(item => item.pointerId !== evt.pointerId);
            if (startingPoint) {
                startingPoint = null;
                this.onPointerUp(evt, pickinfoMesh, scene);
                return;
            }
        };
        // 场景输入坐标监听（抬起）
        const onPointerOut = (evt: any) => {
            evCache = evCache.filter(item => item.pointerId !== evt.pointerId);
            if (startingPoint) {
                startingPoint = null;
                return;
            }
        };
        canvas.addEventListener('pointerdown', onPointerDown, false);
        canvas.addEventListener('pointerup', onPointerUp, false);
        canvas.addEventListener('pointermove', onPointerMove, false);
        canvas.addEventListener('pointerout', onPointerOut, false);
        canvas.addEventListener('wheel', onMouseWheel, false);
        scene.onDispose = function () {
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerout', onPointerOut);
            canvas.removeEventListener('wheel', onMouseWheel);
        };
    }

    onPointerDown(startingPoint: Vector3): void { }

    onPointerUp(evt: any, pickmesh: AbstractMesh, scene: Scene): void { }

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) { }
    /**
     * 手势或鼠标滑轮控制视口
     * @param n 
     */
    formatterFov(n: number) {
        const s = Math.pow(10, n / 100);
        const v = s * 10;
        this.changeCamera(v);
    }
}
