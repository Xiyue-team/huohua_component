import {
    Texture, Color3, CubeTexture, PBRMaterial, Scene
} from '@babylonjs/core/Legacy/legacy';

export class MaterialUtils {
    /**
     * 蛋壳外部材质
     * @param bump 
     * @param skyTexture 
     * @param scene 
     */
    static CreateShellMat(bump: string, skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const shellMat1 = new PBRMaterial('Shell1Mat', scene);
        shellMat1.reflectionTexture = skyTexture;
        shellMat1.environmentIntensity = 0.3;
        shellMat1.specularIntensity = 0.39;
        shellMat1.microSurface = 1;
        shellMat1.reflectivityColor = new Color3(0.7333333333333333, 0.7333333333333333, 0.7333333333333333);
        shellMat1.bumpTexture = new Texture(bump, scene);
        shellMat1.metallic = 0.4;
        shellMat1.roughness = 0.66;
        shellMat1.useMicroSurfaceFromReflectivityMapAlpha = true;
        shellMat1.albedoColor = Color3.FromHexString('#F6AB78');
        shellMat1.backFaceCulling = false;
        return shellMat1;
    }
    /**
     * 蛋壳内部材质
     * @param skyTexture 
     * @param scene 
     */
    static CreateShell2Mat(skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const shellMat2 = new PBRMaterial('Shell2Mat', scene);
        shellMat2.reflectionTexture = skyTexture;
        shellMat2.environmentIntensity = 0.3;
        shellMat2.specularIntensity = 0.3;
        shellMat2.reflectivityColor = new Color3(0.2, 0.2, 0.2);
        shellMat2.metallic = 0.4;
        shellMat2.roughness = 0.74;
        shellMat2.useMicroSurfaceFromReflectivityMapAlpha = true;
        shellMat2.albedoColor = Color3.FromHexString('#FFF0E7');
        shellMat2.backFaceCulling = false;
        return shellMat2;
    }
    /**
     * 壳膜材质
     * @param skyTexture 
     * @param scene 
     */
    static CreateShellMembraneMat(skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const shellMembraneMat = new PBRMaterial('ShellMembraneMat', scene);
        shellMembraneMat.reflectionTexture = skyTexture;
        shellMembraneMat.environmentIntensity = 0.3;
        shellMembraneMat.specularIntensity = 0.3;
        shellMembraneMat.reflectivityColor = new Color3(0.5176470588235295, 0.5176470588235295, 0.5176470588235295);
        shellMembraneMat.alpha = 1;
        shellMembraneMat.metallic = 0.4;
        shellMembraneMat.roughness = 0.74;
        shellMembraneMat.useMicroSurfaceFromReflectivityMapAlpha = true;
        shellMembraneMat.albedoColor = Color3.FromHexString('#FFFBF8');
        shellMembraneMat.backFaceCulling = false;
        return shellMembraneMat;
    }
    /**
     * 膜材质
     * @param skyTexture 
     * @param scene 
     */
    static CreateMembraneMat(skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const membraneMat = new PBRMaterial('MembraneMat', scene);
        membraneMat.reflectionTexture = skyTexture;
        membraneMat.environmentIntensity = 0.3;
        membraneMat.alpha = 1;
        membraneMat.specularIntensity = 0.3;
        membraneMat.reflectivityColor = new Color3(0.2, 0.2, 0.2);
        membraneMat.metallic = 0.3;
        membraneMat.roughness = 0.73;
        membraneMat.useMicroSurfaceFromReflectivityMapAlpha = true;
        membraneMat.albedoColor = Color3.FromHexString('#FFFFFF');
        membraneMat.backFaceCulling = false;
        return membraneMat;
    }
    /**
     * 蛋白材质
     * @param skyTexture 
     * @param scene 
     */
    static CreateWhiteMat(skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const whiteMat = new PBRMaterial('WhiteMat', scene);
        whiteMat.alpha = 0.63;
        whiteMat.albedoColor = new Color3(0.9568627450980393, 0.9921568627450981, 0.8411764705882353);
        whiteMat.reflectionTexture = skyTexture;
        whiteMat.refractionTexture = skyTexture;
        whiteMat.subSurface.refractionIntensity = 0.07;
        whiteMat.indexOfRefraction = 0.68;
        whiteMat.useMicroSurfaceFromReflectivityMapAlpha = true;
        whiteMat.transparencyMode = 3;
        whiteMat.alphaMode = 2;
        whiteMat.emissiveColor = new Color3(0.10196078431372549, 0.10196078431372549, 0.10196078431372549);
        whiteMat.ambientColor = new Color3(1, 1, 1);
        whiteMat.environmentIntensity = 1;
        whiteMat.subSurface.isTranslucencyEnabled = true;
        whiteMat.backFaceCulling = true;
        whiteMat.reflectivityColor = new Color3(0.0392156862745098, 0.0392156862745098, 0.0392156862745098);
        whiteMat.microSurface = 1;
        whiteMat.metallic = 0;
        whiteMat.roughness = 0.2;
        whiteMat.specularIntensity = 0.24;
        whiteMat.alpha = 0.65;
        whiteMat.environmentIntensity = 0.08;
        return whiteMat;
    }

    /**
     * 蛋黄材质
     * @param bump 
     * @param skyTexture 
     * @param scene 
     */
    static CreateYolkMat(bump: string, skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const yolkMat = new PBRMaterial('YolkMat', scene);
        yolkMat.albedoTexture = new Texture(bump, scene);
        yolkMat.reflectionTexture = skyTexture;
        yolkMat.environmentIntensity = 0.07;
        yolkMat.specularIntensity = 0.03;
        yolkMat.reflectivityColor = new Color3(0.9, 0.5019607843137255, 0);
        yolkMat.metallic = 0;
        yolkMat.roughness = 0.19;
        yolkMat.useMicroSurfaceFromReflectivityMapAlpha = true;
        yolkMat.albedoColor = Color3.FromHexString('#ffffff');
        yolkMat.ambientColor = new Color3(0.17647058823529413, 0.08627450980392157, 0);
        yolkMat.backFaceCulling = false;
        return yolkMat;
    }

    /**
     * 胚盘材质
     * @param bump 
     * @param skyTexture 
     * @param scene 
     */
    static CreateBlastodermMat(bump: string, skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const blastodermMat = new PBRMaterial('blastodermMat', scene);
        blastodermMat.albedoTexture = new Texture(bump, scene);
        blastodermMat.reflectionTexture = skyTexture;
        blastodermMat.environmentIntensity = 0.07;
        blastodermMat.specularIntensity = 0.03;
        blastodermMat.reflectivityColor = new Color3(1, 0.5019607843137255, 0);
        blastodermMat.metallic = 0;
        blastodermMat.roughness = 0.19;
        blastodermMat.useMicroSurfaceFromReflectivityMapAlpha = true;
        blastodermMat.albedoColor = Color3.FromHexString('#ffffff');
        blastodermMat.ambientColor = new Color3(0.17647058823529413, 0.08627450980392157, 0);
        blastodermMat.backFaceCulling = false;
        return blastodermMat;
    }
    /**
     * 气室材质
     * @param skyTexture 
     * @param scene 
     */
    static CreateAirMat(skyTexture: CubeTexture, scene: Scene): PBRMaterial {
        const airMat = new PBRMaterial('airMat', scene);
        airMat.reflectionTexture = skyTexture;
        airMat.environmentIntensity = 0.3;
        airMat.alpha = 0;
        airMat.specularIntensity = 0.3;
        airMat.reflectivityColor = new Color3(0.2, 0.2, 0.2);
        airMat.metallic = 0.3;
        airMat.roughness = 0.73;
        airMat.emissiveColor = new Color3(0.1, 0.05, 0);
        airMat.useMicroSurfaceFromReflectivityMapAlpha = true;
        airMat.albedoColor = Color3.FromHexString('#cccccc');
        airMat.backFaceCulling = false;
        return airMat;
    }
}
