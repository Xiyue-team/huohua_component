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

    /**
     * 地面材质
     * @param planStr 
     * @param scene 
     */
    static CreateGroundMat(planStr: string, scene: Scene): StandardMaterial {
        const planSampler = new Texture(planStr, scene);
        planSampler.hasAlpha = true;
        const mat = new StandardMaterial('dog', scene);
        mat.diffuseTexture = planSampler;
        mat.diffuseColor = Color3.FromHexString('#ffffff');
        mat.emissiveColor = Color3.FromHexString('#ffffff');
        mat.useAlphaFromDiffuseTexture = true;
        mat.specularColor = new Color3(0, 0, 0);
        mat.backFaceCulling = false;
        return mat;
    }

    /**
     * 创建太阳材质
     * @param diffuseTextureString
     * @param scene
     * @param emissiveColor
     */
    static CreateSunMaterial(diffuseTextureString: string, scene: Scene, emissiveColor?: Color3): StandardMaterial {
        const mat = new StandardMaterial('sunMat', scene);
        mat.diffuseTexture = new Texture(diffuseTextureString, scene);
        mat.diffuseTexture.hasAlpha = true;
        mat.specularColor = new Color3(0, 0, 0);
        if (emissiveColor) {
            mat.emissiveColor = emissiveColor;
        } else {
            mat.emissiveColor = new Color3(0, 0.03, 0.1);
        }
        mat.backFaceCulling = false;
        mat.freeze();
        return mat;
    }

}
