import {  StandardMaterial, Color3, ShaderMaterial, Scene, Effect } from '@babylonjs/core/Legacy/legacy';
import { EarthShader } from './EarthShader';

export class Utils {

    /**
    * 材质
    * @param scene
    */
   static CreateRedHeartMaterial(scene: Scene): StandardMaterial {
       const redheartMaterial = new StandardMaterial('metal', scene);
       redheartMaterial.specularColor = new Color3(0, 0, 0);
       redheartMaterial.emissiveColor = new Color3(0, 0, 0);
       redheartMaterial.diffuseColor = new Color3(54 / 255, 54 / 255, 54 / 255);
       return redheartMaterial;
   }

   static CreateSurfaceMat(scene: Scene): StandardMaterial {
       const redheartMaterial = new StandardMaterial('metal', scene);
       redheartMaterial.specularColor = new Color3(0, 0, 0);
       redheartMaterial.emissiveColor = new Color3(0, 0, 0);
       redheartMaterial.diffuseColor = new Color3(254 / 255, 254 / 255, 54 / 255);
       redheartMaterial.freeze();
       redheartMaterial.backFaceCulling = false;
       return redheartMaterial;
   }
   static CreateMat(scene: Scene): ShaderMaterial {
       Effect.ShadersStore['customVertexShader'] = EarthShader.customVertex;
       Effect.ShadersStore['customFragmentShader'] = EarthShader.customFragment;
       const shaderMaterial = new ShaderMaterial('shader', scene,
           { vertex: 'custom', fragment: 'custom' },
           {
               attributes: ['position', 'normal', 'uv'],
               uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection']
           });

       shaderMaterial.backFaceCulling = false;
       return shaderMaterial;
   }
}
