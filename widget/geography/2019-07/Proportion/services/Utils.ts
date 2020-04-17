import {Vector3, Color3, Texture, Scene, Mesh, StandardMaterial, MeshBuilder} from '@babylonjs/core/Legacy/legacy';
export class Utils {
    
    static CreatePlan(diffuseTexture: Texture, position: Vector3,
        options: { width?: number; height?: number; }, scene: Scene): Mesh {
        const mat = new StandardMaterial('dog', scene);
        mat.diffuseTexture = diffuseTexture;
        mat.useAlphaFromDiffuseTexture = true;
        mat.specularColor = new Color3(0, 0, 0);
        mat.backFaceCulling = false;
        const plan = MeshBuilder.CreatePlane('plan', options, scene);
        plan.material = mat;
        plan.position = position;
        return plan;
    }

}
