import { Vector3, Vector2, Color3, Texture, ShaderMaterial, StandardMaterial, Effect, Mesh, MeshBuilder, Scene 
} from '@babylonjs/core/Legacy/legacy';

export class Utils {
    static customVertexShader = `precision highp float;
            attribute vec3 position;
            attribute vec3 normal;
            attribute vec2 uv;
            uniform mat4 worldViewProjection;
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec2 vUV;
            void main(void) {
                vec4 outPosition = worldViewProjection * vec4(position, 1.0);
                gl_Position = outPosition;
                vUV = uv;
                vPosition = position;
                vNormal = normal;
            }`;
    static customFragmentShader = `precision highp float;
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec2 vUV;
            uniform mat4 world;
            uniform vec2 pos;
            uniform sampler2D tex;
            void main(void) {
            vec4 texturecolor = texture2D(tex, vUV).rgba;
            vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
            if (vPositionW.y<pos.y-pos.x) {
                texturecolor.a = 0.;
            }else if(vPositionW.y>pos.y-pos.x&&vPositionW.y<pos.y) {
                texturecolor.a =1.- (pos.y-vPositionW.y)/pos.x;
            }
            gl_FragColor = vec4(texturecolor);}`;

    static CreateMaterial(texture: string, scene: Scene): ShaderMaterial {
        Effect.ShadersStore['customVertexShader'] = this.customVertexShader;
        Effect.ShadersStore['customFragmentShader'] = this.customFragmentShader;

        const zeroshaderMaterial = new ShaderMaterial('shader', scene,
            { vertex: 'custom', fragment: 'custom', },
            {
                attributes: ['position', 'normal', 'uv'],
                uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection'], needAlphaBlending: true
            });
        zeroshaderMaterial.setTexture('tex', new Texture(texture, scene));
        zeroshaderMaterial.setVector2('pos', new Vector2(10, -302));
        zeroshaderMaterial.backFaceCulling = true;
        return zeroshaderMaterial;
    }

    static CreateTexture(texture: string, uScale: number, vScale: number, uOffset: number, vOffset: number, scene: Scene): Texture {
        const diffuseTexture = new Texture(texture, scene);
        diffuseTexture.uScale = uScale;
        diffuseTexture.vScale = vScale;
        diffuseTexture.uOffset = uOffset;
        diffuseTexture.vOffset = vOffset;
        diffuseTexture.hasAlpha = true;
        return diffuseTexture;
    }

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
