import {
    Scene, Texture, ShaderMaterial, Effect, StandardMaterial, Color3
} from '@babylonjs/core/Legacy/legacy';
import { EarthShader } from './EarthShader';

export class MaterialCreater {

    /**
     * 创建地球材质
     * @param day
     * @param night
     * @param scene
     */
    static CreateEarthMaterial(day: Texture, night: Texture, scene: Scene): ShaderMaterial {
        Effect.ShadersStore['customVertexShader'] = EarthShader.customVertex;
        Effect.ShadersStore['shadowFragmentShader'] = EarthShader.earthFragment;
        const earthforMaterial = new ShaderMaterial('shader', scene, {
            vertex: 'custom', fragment: 'shadow',
        }, {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection']
        });
        earthforMaterial.setTexture('daySampler', day);
        earthforMaterial.setTexture('nightSampler', night);
        earthforMaterial.setFloat('hasShadow', 1);
        earthforMaterial.backFaceCulling = false;
        earthforMaterial.freeze();
        return earthforMaterial;
    }

    /**
     * 创建云层材质
     * @param cloudT
     * @param scene
     */
    static CreateCloudMaterial(cloudT: Texture, scene: Scene): ShaderMaterial {
        Effect.ShadersStore['cloudVertexShader'] = EarthShader.customVertex;
        Effect.ShadersStore['cloudFragmentShader'] = EarthShader.cloudFragment;
        const cloudMaterial = new ShaderMaterial('shader', scene, {
            vertex: 'cloud', fragment: 'cloud',
        }, {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection'],
            needAlphaBlending: true
        });
        cloudMaterial.setTexture('textureSampler', cloudT);
        cloudMaterial.setFloat('mixsmooth', 0.1); //云图阴影叠加值
        cloudMaterial.setFloat('intsmooth', 3.); //晨昏线明显度
        cloudMaterial.setFloat('hasShadow', 1);
        cloudMaterial.backFaceCulling = false;
        cloudMaterial.freeze();
        return cloudMaterial;
    }

}
