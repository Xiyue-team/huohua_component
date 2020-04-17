import {
    Vector3, Color3, StandardMaterial, Scene, ArcRotateCamera, Texture, Mesh, TransformNode
} from '@babylonjs/core/Legacy/legacy';
import { GeoUtils } from '../../../../babylon/Geography/GeoUtils';

export class Utils {
    /**
     * 创建相机
     * @param scene 
     */
    static CreateRotateCamera(scene: Scene, canvas: HTMLCanvasElement): ArcRotateCamera {
        const camera = new ArcRotateCamera('Camera', 0, 0, 13, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 11;
        camera.upperRadiusLimit = 20;
        // camera.angularSensibilityX = 5000;
        // camera.wheelDeltaPercentage = 0.5;
        // camera.pinchDeltaPercentage = 0.5;
        camera.inertia = 0.2;
        camera.panningSensibility = 0;
        // camera.speed = 0;
        scene.activeCameras.push(camera);
        return camera;
    }

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

    static GetPosArray(apost: Vector3, bpost: Vector3, r: number, offset: Vector3 = Vector3.Zero()): Vector3[] {
        const apos = GeoUtils.CartesianToGeographic(apost);
        const bpos = GeoUtils.CartesianToGeographic(bpost);
        apos.z = bpos.z = r;
        const temp = apos.subtract(bpos).scale(1 / 180);
        const vertices = [];
        for (let i = 0; i < 180; i++) {
            const GeographicPos = bpos.add(temp.scale(i));
            vertices.push(GeoUtils.GeographicToCartesian(GeographicPos.x, GeographicPos.y).scale(GeographicPos.z).add(offset));
        }
        vertices.push(GeoUtils.GeographicToCartesian(apos.x, apos.y).scale(apos.z).add(offset));
        return vertices;
    }

    /**
     * 场景地面材质
     * @param scene 
     */
    static CreateGroundMat(plan: string, scene: Scene): StandardMaterial {
        const planSampler = new Texture(plan, scene);
        planSampler.hasAlpha = true;
        const mat = new StandardMaterial('dog', scene);
        mat.diffuseTexture = planSampler;
        mat.diffuseColor = Color3.FromHexString('#ffee00');
        mat.emissiveColor = Color3.FromHexString('#ffee00');
        mat.useAlphaFromDiffuseTexture = true;
        mat.specularColor = new Color3(0, 0, 0);
        mat.backFaceCulling = false;
        return mat;
    }

    /**
     * 创建箭头
     * @param scene 
     */
    static CreateArrow(scene: Scene, c: Color3) {
        const mat = new StandardMaterial('', scene);
        mat.specularColor = new Color3(0, 0, 0);
        mat.diffuseColor = c;
        mat.emissiveColor = c;
        mat.freeze();
        const yaxi = Mesh.CreateCylinder('Arrow', 0.2, 0, 0.1, 16, 1, scene);
        yaxi.material = mat;
        yaxi.rotation = new Vector3(0, 0, Math.PI / 2);
        yaxi.position = new Vector3(10, 0, 0);
        return yaxi;
    }


    /**
     * 创建太阳
     * @param scene
     */
    static createSun(sun: string, scene: Scene) {
        const sunMat = Utils.CreateMaterial(sun, scene, new Color3(0, 0, 0));
        sunMat.emissiveColor = new Color3(5, 0.3, 0.1);
        const sunMesh = Mesh.CreateSphere('sun', 32, 10, scene);
        sunMesh.material = sunMat;
        sunMesh.isPickable = false;
        sunMesh.position = new Vector3(100, 0, 0);
    }

    /**
     * 创建地球
     * @param scene
     */
    static createEarth(eartnTex: string, r: number, root: TransformNode, scene: Scene): TransformNode {
        const material = new StandardMaterial('earthMat', scene);
        material.diffuseTexture = new Texture(eartnTex, scene);
        material.roughness = 0.01;
        material.specularColor = new Color3(0, 0, 0);
        material.freeze();
        const earthg = new TransformNode('earth');
        const earth = Mesh.CreateSphere('earth', 32, 2 * r, scene);
        earth.material = material;
        earth.rotation = new Vector3(0, 0, Math.PI);
        earth.setParent(earthg);

        const cylinder = Mesh.CreateCylinder('cylinder', 2 * r + 1.2, 0.05, 0.05, 16, 1, scene);
        const cylinderMat = new StandardMaterial('cylinder', scene);
        cylinderMat.emissiveColor = Color3.Gray();
        cylinder.material = cylinderMat;
        cylinder.setParent(earthg);
        earthg.setParent(root);
        return earthg;
    }
}
