import {
    Vector3, Scene, StandardMaterial,
    MeshBuilder, Color3, LinesMesh, Color4, Texture, Effect, ShaderMaterial, Vector2
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
            uniform float isDull;
            void main(void) {
            vec4 texturecolor = texture2D(tex, vUV).rgba;
            vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
            if (vPositionW.y>pos.x||vPositionW.y<pos.y) {
                texturecolor.a = 0.;
            }
            if(isDull > 0.){
                texturecolor.a = texturecolor.a * 0.3;
            }
            gl_FragColor = vec4(texturecolor);}`;

    static CreateLightMaterial(color: Color3, scene: Scene, alpha?: number): StandardMaterial {
        const mat = new StandardMaterial('red', scene);
        mat.diffuseColor = new Color3(0, 0, 0);
        mat.specularColor = new Color3(0, 0, 0);
        mat.emissiveColor = color;
        if (alpha) {
            mat.alpha = alpha;
        }
        mat.freeze();
        return mat;
    }

    /**
     * 画线
     * @param vertices 点集
     * @param color 颜色
     * @param edgesWidth 边宽
     * @param scene 场景
     * @param name
     */
    static CreateLines(vertices: Vector3[], color: Color3, edgesWidth: number, scene: Scene, name = 'lines'): LinesMesh {
        let line: LinesMesh;
        line = MeshBuilder.CreateLines(name, { points: vertices }, scene);
        line.color = color;
        line.enableEdgesRendering();
        line.edgesColor = Color4.FromColor3(color, 1);
        line.edgesWidth = edgesWidth;
        line.alwaysSelectAsActiveMesh = true;
        line.isPickable = false;
        return line;
    }


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
        zeroshaderMaterial.setFloat('isDull', 0);
        zeroshaderMaterial.backFaceCulling = true;
        return zeroshaderMaterial;
    }

}
