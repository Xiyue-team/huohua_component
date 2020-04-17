
export class EarthShader {

    //顶点着色器
    static customVertex =
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

    //云层着色器
    static cloudFragment =
        `precision highp float;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUV;
        uniform mat4 world;
        uniform vec3 cameraPosition;
        uniform vec3 vLightPosition;
        uniform sampler2D textureSampler;
        uniform float mixsmooth;
        uniform float intsmooth;
        uniform float hasShadow;
        void main(void) {
            vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
            vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
            vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
            vec4 color = texture2D(textureSampler, vUV).rgba;
            vec3 lightVectorW = normalize(vLightPosition - vPositionW);
            float ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;
            vec3 angleW = normalize(viewDirectionW + lightVectorW);
            float specComp = max(0., dot(vNormalW, angleW));
            specComp = pow(specComp, max(1., 64.)) * 0.1;
            if(hasShadow>0.){
                color.rgb =color.rgb*mixsmooth+ color.rgb* ndl + vec3(specComp);
            }
            gl_FragColor = vec4(color);
        }`;

    //地球片段着色器
    static earthFragment =
        `precision highp float;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUV;
        uniform mat4 world;
        uniform vec3 cameraPosition;
        uniform vec3 vLightPosition;
        uniform sampler2D daySampler;
        uniform sampler2D nightSampler;
        uniform float hasShadow;
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
            if(hasShadow>0.){
                daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl + vec3(specComp);
            }
            gl_FragColor = vec4(daycolor);
        }`;
}
