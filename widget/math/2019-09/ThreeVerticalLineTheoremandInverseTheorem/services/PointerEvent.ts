import { Vector3, Mesh, Camera, Scene, AbstractMesh } from '@babylonjs/core/Legacy/legacy';

export class PointerEvent {

    /**
     * 手势监听
     * @param plan
     * @param canvas
     * @param scene
     */
    addPointerEventListener(rule: string, plan: Mesh, outPlan: Mesh, 
        canvas: HTMLCanvasElement, pointerHandler: PointerHandler, camera: Camera, scene: Scene): void {
        let currentMesh: AbstractMesh;
        let startingPoint: Vector3;
        const getGroundPosition = (evt: any) => {
            const pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                return mesh === plan;
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
                function (mesh) { return mesh !== plan && mesh !== outPlan && mesh.isPickable !== false; });
            if (pickInfo.hit) {
                currentMesh = pickInfo.pickedMesh;
                if (currentMesh.name.indexOf(rule) !== -1) {
                    startingPoint = getGroundPosition(evt);
                    if (startingPoint) {
                        camera.detachControl(canvas);
                    }
                }
            }
        };
        // 场景输入坐标监听（移动）
        const onPointerMove = (evt: any) => {
            if (!startingPoint) { return; }
            const current = getGroundPosition(evt);
            if (!current) { return; }
            if (currentMesh.name.indexOf(rule) !== -1) {
                pointerHandler.onPointerMove(startingPoint, currentMesh, plan);
            }
            startingPoint = current;
        };
        // 场景输入坐标监听（抬起）
        const onPointerUp = () => {
            if (startingPoint) {
                camera.attachControl(canvas, true);
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

}

export interface PointerHandler {
    onPointerMove(startingPoint: Vector3, currentMesh: AbstractMesh, plan: Mesh): void;
}
