
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
    static customFragment =
        `precision highp float;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUV;
        uniform mat4 world;
        uniform float rotation;
        uniform float pi;
        void main(void) {
            vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
            vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
            vec3 color = vec3(1., 0.6705882352941176, 0.12549019607843137);
            float dotProd1 = tan(rotation)*vPosition.x;
            float dis = distance(vPositionW, vec3(0.,0.,0.));
            if (dis> 443.0 ) {
                discard;
            }
            if (rotation<=pi) {
                if (vPosition.z>=dotProd1 || vPosition.z<0.) {
                    discard;
                }
            } else if (rotation<=2.0*pi && rotation>pi) {
                if ((vPosition.z<=dotProd1&&vPosition.x<0.) || vPosition.z<0.) {
                    discard;
                }
            } else if (rotation<=3.0*pi && rotation>2.0*pi) {
                if ((vPosition.z<=dotProd1&&vPosition.x<0.) || (vPosition.z<0.&&vPosition.x>0.)) {
                    discard;
                }
            } else if (rotation<4.0*pi && rotation>3.0*pi) {
                if ((vPosition.z>=dotProd1&&vPosition.x>0.)&& vPosition.z<0.) {
                    discard;
                }
            }
            if(vPositionW.y<-1110.){
                discard;
            }
            gl_FragColor = vec4(color, 1.);
        }`;
}
