import { Vector3, Color3, StandardMaterial, Texture, Scene } from '@babylonjs/core/Legacy/legacy';

export class Utils {
    /**
     * 创建材质
     * @param diffuseTextureString 
     * @param scene 
     * @param emissiveColor 
     */
    static CreateMaterial(diffuseTextureString: string, scene: Scene, emissiveColor?: Color3): StandardMaterial {
        const mat = new StandardMaterial('dog', scene);
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
    
    /**
     * 椭圆坐标方程
     * @param ra 
     * @param rb 
     * @param ang 
     */
    static GetEllipsePoint(ra: number, rb: number, ang: number) {
        const x = ra * Math.cos(ang * Math.PI / 180);
        const z = rb * Math.sin(ang * Math.PI / 180);
        return new Vector3(x, 0, z);
    }
}
