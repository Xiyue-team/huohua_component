import {
    Scene, TransformNode, Texture, StandardMaterial, Mesh
} from '@babylonjs/core/Legacy/legacy';

import * as env from '../sub_static/image/env.jpg';

export class Sky extends TransformNode {

    constructor(name: string, scene?: Scene, isPure?: boolean) {
        super(name, scene, isPure);
        this.createSkybox(scene);
    }
    /**
     * 创建天空
     * @param scene 
     */
    createSkybox(scene: Scene) {
        const tex = new Texture(env, scene);
        const material2 = new StandardMaterial('skyMat', scene);
        const skybox = Mesh.CreateSphere('skyBox', 50, 2000, scene);
        material2.diffuseTexture = tex;
        material2.emissiveTexture = tex;
        material2.backFaceCulling = false;
        skybox.material = material2;
        skybox.isPickable = false;
    }
}
