import { Vector3, Scene, Ray } from '@babylonjs/core/Legacy/legacy';

export class Utils {

    static castForPos(origin: Vector3, direction: Vector3, length: number, scene: Scene): Vector3 {
        const ray = new Ray(origin, direction, length);
        const hit = scene.pickWithRay(ray, null, false);
        if (hit.pickedMesh) {
                return hit.pickedPoint;
        } else {
            return null;
        }
    }
}

export class Point {
    meshName: string;
    pos: Vector3;
    constructor(meshName: string, pos: Vector3) {
        this.meshName = meshName;
        this.pos = pos;
    }
}
