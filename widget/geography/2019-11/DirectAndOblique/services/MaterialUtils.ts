import {
    Scene, Effect, ShaderMaterial, Vector3 } from '@babylonjs/core/Legacy/legacy';

export class MaterialUtils {
    static vert =
        `precision highp float;
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

    static frag =
        `precision highp float;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUV;

        uniform mat4 world;
        uniform vec3 cameraPosition;
        uniform vec3 raycolor;

        void main(void) {
            vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
            vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
            vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
            float ndlb =  dot(vNormalW, viewDirectionW);
            float ndl = max(0., ndlb) * 0.5;
            float al=pow(ndl,2.);
            if (vPositionW.y<5.) {
                al=al*max(0., vPositionW.y)*0.2;
            }
            gl_FragColor = vec4(raycolor.rgb,al);
        }`;


    static CreateEarthMaterial(cameraPosition: Vector3, scene: Scene) {
        Effect.ShadersStore['customVertexShader'] = this.vert;
        Effect.ShadersStore['customFragmentShader'] = this.frag;
        const earthforMaterial = new ShaderMaterial('shader', scene, {
            vertex: 'custom',
            fragment: 'custom',
        }, {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection'],
            needAlphaBlending: true
        });
        earthforMaterial.setVector3('raycolor', new Vector3(1, 1, 0));
        earthforMaterial.setVector3('cameraPosition', cameraPosition);
        return earthforMaterial;
    }
}
