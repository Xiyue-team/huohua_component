import { ShaderMaterial, Scene, Effect, Vector4, Vector3} from '@babylonjs/core/Legacy/legacy';

export class MaterialUtils {

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
            uniform vec4 color1;
            uniform vec3 pos;
            uniform vec4 color2;
            void main(void) {
                vec4 texturecolor = vec4(0.,0.,0.,0.); 
                vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                if (abs(vPositionW.x)<pos.x+0.01&&abs(vPositionW.y)<pos.y+0.01&&abs(vPositionW.z)<pos.z+0.01) {
                    texturecolor = color2;
                    texturecolor.a=1.;
                }
                if((abs(vPositionW.x)>pos.x+0.01&&abs(vPositionW.x)<pos.x+0.06)
                &&abs(vPositionW.y)<pos.y+0.01&&abs(vPositionW.z)<pos.z+0.01){
                    texturecolor = color2;
                    texturecolor.a=1.-(abs(vPositionW.x)-pos.x)*20.;
                }
                if(abs(vPositionW.x)<pos.x+0.01&&(abs(vPositionW.y)>pos.y+0.01&&abs(vPositionW.y)<pos.y+0.06)
                &&abs(vPositionW.z)<pos.z+0.01){
                    texturecolor = color2;
                    texturecolor.a=1.-(abs(vPositionW.y)-pos.y)*20.;
                }
                if(abs(vPositionW.x)<pos.x+0.01&&abs(vPositionW.y)<pos.y+0.01&&
                (abs(vPositionW.z)>pos.z+0.01&&abs(vPositionW.z)<pos.z+0.06)){
                    texturecolor = color2;
                    texturecolor.a=1.-(abs(vPositionW.z)-pos.z)*20.;
                }
                gl_FragColor = vec4(texturecolor);
            }`;

    static CreateMaterial(scene: Scene): ShaderMaterial {
        Effect.ShadersStore['customVertexShader'] = this.customVertexShader;
        Effect.ShadersStore['customFragmentShader'] = this.customFragmentShader;

        const zeroshaderMaterial = new ShaderMaterial('shader', scene,
            { vertex: 'custom', fragment: 'custom', },
            {
                attributes: ['position', 'normal', 'uv'],
                uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection']
                , needAlphaBlending: true
            });
        zeroshaderMaterial.setVector4('color1', new Vector4(0, 0, 0, 0));
        zeroshaderMaterial.setVector4('color2', new Vector4(0.803921568627451,  0.8509803921568627,  0.4196078431372549, 0.99));
        zeroshaderMaterial.setVector3('pos', new Vector3(4, 4, 4));
        zeroshaderMaterial.backFaceCulling = true;
        return zeroshaderMaterial;
    }
}
