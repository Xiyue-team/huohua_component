import {
    FresnelParameters, Texture, Color3, Mesh, CubeTexture,
    StandardMaterial, PBRMaterial, Scene
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

export class MaterialUtils {
    static CreateStandardMaterial(diffuseTextureString: string, scene: Scene): StandardMaterial {
        const mat = new StandardMaterial('dog', scene);
        mat.diffuseTexture = new Texture(diffuseTextureString, scene);
        mat.diffuseTexture.hasAlpha = true;
        mat.specularColor = new Color3(0, 0, 0);
        mat.emissiveColor = new Color3(0, 0.03, 0.1);
        mat.backFaceCulling = false;
        mat.freeze();
        return mat;
    }

    static CreateWoodMaterial(reflectivity: string, skyTexture: CubeTexture, scene: Scene): PBRMaterial {

        const wood = new PBRMaterial('wood', scene);
        wood.reflectionTexture = skyTexture;
        wood.environmentIntensity = 0.3;
        wood.specularIntensity = 0.3;
        wood.reflectivityTexture = new Texture(reflectivity, scene);
        wood.reflectivityColor = new Color3(0.2, 0.2, 0.2);
        wood.metallic = 0.4;
        wood.roughness = 0.74;
        wood.reflectivityTexture = new Texture(reflectivity, scene);
        wood.useMicroSurfaceFromReflectivityMapAlpha = true;
        wood.albedoColor = new Color3(1, 1, 1);
        return wood;
    }

    static CreateMetalMaterial(skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const metal = new PBRMaterial('metal', scene);
        metal.reflectionTexture = skyTexture;
        metal.microSurface = 0.7;
        metal.environmentIntensity = 0.1;
        metal.specularIntensity = 0.01;
        metal.reflectivityColor = new Color3(0.1, 0.1, 0.1);
        metal.albedoColor = new Color3(0.1, 0.1, 0.1);
        metal.freeze();
        return metal;
    }

    /**
     * 温度计玻璃材质
     * @param skyTexture
     * @param scene
     */
    static CreateGlassMaterial(skyTexture: CubeTexture, scene: Scene): StandardMaterial {
        const glassMaterial = new StandardMaterial('kosh', scene);
        glassMaterial.reflectionTexture = skyTexture;
        glassMaterial.diffuseColor = new Color3(0, 0, 0);
        glassMaterial.emissiveColor = new Color3(0.5, 0.5, 0.5);
        glassMaterial.alpha = 0.2;
        glassMaterial.specularPower = 16;
        glassMaterial.reflectionFresnelParameters = new FresnelParameters();
        glassMaterial.reflectionFresnelParameters.bias = 0.1;
        glassMaterial.emissiveFresnelParameters = new FresnelParameters();
        glassMaterial.emissiveFresnelParameters.bias = 0.6;
        glassMaterial.emissiveFresnelParameters.power = 4;
        glassMaterial.emissiveFresnelParameters.leftColor = Color3.White();
        glassMaterial.emissiveFresnelParameters.rightColor = new Color3(0.5, 0.5, 0.5);
        glassMaterial.opacityFresnelParameters = new FresnelParameters();
        glassMaterial.opacityFresnelParameters.leftColor = new Color3(0.5, 0.5, 0.5);
        glassMaterial.opacityFresnelParameters.rightColor = Color3.Black();
        glassMaterial.freeze();
        return glassMaterial;
    }

}


export class Utils {
    static createLabel(label: GUI.Rectangle, tiptext: GUI.TextBlock, line: GUI.MultiLine,
                       tip: Mesh, tipmesh: Mesh,
                       advancedTexture: GUI.AdvancedDynamicTexture) {
        label.background = '#5F9BEE';
        label.alpha = 0.5;
        label.cornerRadius = 5;
        label.color = '#5F9BEE';
        label.thickness = 4;
        label.linkOffsetY = -80;
        label.linkOffsetX = 150;
        label.paddingTop = '-20px';
        label.paddingLeft = '-20px';
        label.paddingRight = '-10px';
        label.paddingBottom = '-10px';
        label.adaptWidthToChildren = true;
        label.adaptHeightToChildren = true;
        advancedTexture.addControl(label);
        label.linkWithMesh(tip);
        tiptext.text = '';
        tiptext.width = '300px';
        tiptext.color = '#ffffff';
        tiptext.fontStyle = 'bold';
        tiptext.textWrapping = GUI.TextWrapping.WordWrap;
        tiptext.resizeToFit = true;
        tiptext.paddingTop = '10px';
        tiptext.paddingLeft = '10px';
        tiptext.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        tiptext.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        tiptext.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        tiptext.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        label.addControl(tiptext);
        line.color = '#5F9BEE';
        line.add(tip);
        line.add(tipmesh);
        advancedTexture.addControl(line);
    }
}
