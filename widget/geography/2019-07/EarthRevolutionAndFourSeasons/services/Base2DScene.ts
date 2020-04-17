import { BaseScene } from '../../../../babylon/template/Base/BaseScene';
import { Vector3, Color3, Texture, Scene, AbstractMesh } from '@babylonjs/core/Legacy/legacy';
import $ from 'jquery-ts';

export class Base2DScene extends BaseScene {

    BaseContainer = $('#Container');
    Container = $('#Container3d');
    orthoX: number;
    orthoY: number;
    //地球顶点着色器
    customVertexShader = `precision highp float;
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
                vNormal = normal;}`;
    //地球片段着色器
    shadowFragmentShader =
        `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform vec3 cameraPosition;
                uniform vec3 vLightPosition;
                uniform sampler2D daySampler;
                uniform sampler2D nightSampler;
                void main(void) {
                    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
                    vec4 daycolor = texture2D(daySampler, vUV).rgba;
                    vec4 nightcolor = texture2D(nightSampler, vUV).rgba;
                    vec3 lightVectorW = normalize(vLightPosition - vPositionW);
                    float ndl = max(0., dot(vNormalW, lightVectorW)) * 1.;
                    float ndlt = max(0., dot(vNormalW, lightVectorW)) * 5.;
                    vec3 angleW = normalize(viewDirectionW + lightVectorW);
                    float specComp = max(0., dot(vNormalW, angleW));
                    specComp = pow(specComp, max(1., 64.)) *0.1;
                    if (nightcolor.r*(1.-ndlt)>=0.3) {
                        nightcolor.rgb=nightcolor.rgb*2.5;
                        nightcolor.rg=nightcolor.rg+vec2(0.2,0.2);
                    }else{
                        nightcolor.rgb=nightcolor.rgb*0.1;
                    }
                    daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl + vec3(specComp);
                    gl_FragColor = vec4(daycolor);
                }`;
    //地球片段着色器2
    FragmentShader =
        `precision highp float;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUV;
        uniform mat4 world;
        uniform vec3 cameraPosition;
        uniform vec3 LightPosition;
        uniform sampler2D daySampler;
        uniform sampler2D nightSampler;
        uniform float intsmooth;
        uniform float intsmootht;
        void main(void) {
            vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
            vec3 lightVectorW = normalize(LightPosition - vec3(0.,0.,0.));
            vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
            vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
            vec4 daycolor = texture2D(daySampler, vUV).rgba;
            vec4 nightcolor = texture2D(nightSampler, vUV).rgba;
            float ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;
            float ndlt = max(0., dot(vNormalW, lightVectorW)) * intsmootht;
            vec3 angleW = normalize(viewDirectionW + lightVectorW);
            float specComp = max(0., dot(vNormalW, angleW));
            specComp = pow(specComp, max(1., 64.)) *0.1;
            vec4 color=vec4(0.,0.,0.,0.);
            if (nightcolor.r*(1.-ndlt)>=0.3) {
                nightcolor.rgb=nightcolor.rgb*1.5;
                nightcolor.rg=nightcolor.rg+vec2(0.2,0.2);
            }else{
                nightcolor.rgb=nightcolor.rgb*0.1;
            }
            daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl + vec3(specComp);
            gl_FragColor = vec4(daycolor);
        }`;

    /**
     * 手势监听
     * @param pickinfoMesh
     * @param canvas
     * @param scene
     */
    addPointerEventListener(canvas: HTMLCanvasElement, scene: Scene) {
        let currentMesh: AbstractMesh;
        // 场景输入坐标监听（按下）
        const onPointerDown = (evt: any) => {
            if (evt.button !== 0) {
                return;
            }
            const pickInfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) { return mesh.isPickable !== false; });
            if (pickInfo.hit) {
                currentMesh = pickInfo.pickedMesh;
                if (currentMesh.name.indexOf('tip') !== -1) {
                    this.onPointerDown(currentMesh);
                }
            }
        };

        canvas.addEventListener('pointerdown', onPointerDown, false);

        scene.onDispose = function () {
            canvas.removeEventListener('pointerdown', onPointerDown);
        };
    }

    // 场景输入坐标监听（按下）
    onPointerDown(currentMesh: AbstractMesh) {

    }

}
