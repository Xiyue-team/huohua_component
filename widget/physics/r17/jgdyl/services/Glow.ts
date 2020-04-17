
import { Mesh, Group, SphereGeometry, MeshBasicMaterial, ShaderMaterial } from 'three';
import * as THREE from 'three';

export class Glow {


    static AdditiveBlendShader = {

        uniforms: {

            'tSampler1': {type: 't', value: null},
            'tSampler2': {type: 't', value: null}
        },

        vertexShader: [

            'varying vec2 vUv;',

            'void main() {',

            'vUv = uv;',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

            '}'

        ].join('\n'),

        fragmentShader: [

            'uniform sampler2D tSampler1;',
            'uniform sampler2D tSampler2;',

            'varying vec2 vUv;',

            'void main() {',

            'vec4 texture1 = texture2D( tSampler1, vUv );',
            'vec4 texture2 = texture2D( tSampler2, vUv );',
            'gl_FragColor = texture1 + texture2;',

            '}'

        ].join('\n')

    };

    static vertexShader = [
        'varying vec3 vNormal;',

        'void main() {',

        'vNormal = normalize( normalMatrix * normal );',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

        '}'

    ].join('\n');

    static fragmentShader = [
        'uniform float c;',
        'uniform float p;',
        'varying vec3 vNormal;',

        'void main() {',

        'float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), p );',
        'gl_FragColor = vec4( 0.2, 0.58, 0.9, 0.3 ) * intensity;',
        '}'

    ].join('\n');

    static createOuterGlow () {
        const glowGroup = new Group();
        glowGroup.name = 'glowGroup';
        // glowGroup.visible = false;

        glowGroup.add(this.createGlow());
        glowGroup.add(this.createBlack());

        return glowGroup;
    }

    static createBlack () {
        const sphere = new SphereGeometry(25, 40, 40);
        const blackMaterial = new MeshBasicMaterial({color: 0x000000});

        const blackSphere = new Mesh(sphere, blackMaterial);
        (blackSphere.material as any).transparent = false;
        blackSphere.name = 'blackSphere';

        return blackSphere;
    }

    static createGlow () {
        const sphere = new SphereGeometry(25, 40, 40);
        const material = this.createFlowMaterial();

        const glowSphere = new Mesh(sphere, material);
        (glowSphere.material as any).side = THREE.BackSide;
        (glowSphere.material as any).transparent = false;
        glowSphere.scale.x = glowSphere.scale.y = glowSphere.scale.z = 1.3;
        glowSphere.name = 'glowSphere';

        return glowSphere;
    }

    static createFlowMaterial () {
        const material = new ShaderMaterial({

            uniforms: {
                'c': {type: 'f', value: 0.44},
                'p': {type: 'f', value: 9.17}
            },
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader

        });

        return material;
    }

}
