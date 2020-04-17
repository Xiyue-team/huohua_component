import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { Vector3, Color3, Texture, Scene } from '@babylonjs/core/Legacy/legacy';

export class Utils {
    static CreateTexture(texture: string, uScale: number, vScale: number, uOffset: number, vOffset: number, scene: Scene): Texture {
        const diffuseTexture = new Texture(texture, scene);
        diffuseTexture.uScale = uScale;
        diffuseTexture.vScale = vScale;
        diffuseTexture.uOffset = uOffset;
        diffuseTexture.vOffset = vOffset;
        diffuseTexture.hasAlpha = true;
        return diffuseTexture;
    }

    static CreatePlan(diffuseTexture: BABYLON.Texture, position: Vector3,
        options: { width?: number; height?: number; }, scene: Scene): BABYLON.Mesh {
        const mat = new BABYLON.StandardMaterial('dog', scene);
        mat.diffuseTexture = diffuseTexture;
        mat.useAlphaFromDiffuseTexture = true;
        mat.specularColor = new Color3(0, 0, 0);
        mat.backFaceCulling = false;
        const plan = BABYLON.MeshBuilder.CreatePlane('plan', options, scene);
        plan.material = mat;
        plan.position = position;
        return plan;
    }
}
