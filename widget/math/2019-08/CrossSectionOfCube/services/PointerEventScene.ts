import {Vector3, Mesh, Scene, AbstractMesh} from '@babylonjs/core/Legacy/legacy';
import { Base3DScene } from '../../../../babylon/template/Base3DScene';

/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/14 10:10
 */
export class PointerEventScene extends Base3DScene {

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
            if (evt.button !== 0) {
                return;
            }
            const pickInfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) {
                    return mesh !== earth && mesh.isPickable !== false;
                });
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
            if (!startingPoint) {
                return;
            }
            const current = getGroundPosition(evt);
            if (!current) {
                return;
            }
            this.onPointerMove(startingPoint, currentMesh);
            startingPoint = current;
        };

        // 场景输入坐标监听（抬起）
        const onPointerUp = () => {
            if (startingPoint) {
                this.camera.attachControl(canvas, true);
                startingPoint = null;
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

    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh) {}
}
