var THREE = require('./three')
THREE.DotScreenShader = {

    uniforms: {
        "tDiffuse": {value: null},
        "screenSize": {value: new THREE.Vector2(256, 256)},
        "reverse": {value: 0.0},
        "time": {value: 2.0}
    },
    vertexShader: [
        "varying vec2 vUv;",
        "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"

    ].join("\n"),
    fragmentShader: [
        "uniform sampler2D tDiffuse;",
        "varying vec2 vUv;",
        "uniform float reverse;",
        "uniform float time;",
        "uniform vec2 screenSize;",
        "float seed = 0.0;",
        "void init(vec2 uv){",
        "seed = (uv.y + time* 0.523413187) * sqrt(uv.x * 0.546456456456456*time);",
        "}",
        "float rand(vec2 s){",
        "float n = fract(sin(seed+=0.7732423563465456771737774775777)*4378.56456456456456);",
        "return fract(n + fract(sin(dot(vec2(n /s.y, s.x/n)*0.123,vec2(12.9898,78.233))) * 43758.5453));",
        "}",
        "void mainImage(out vec4 fragColor, in vec2 fragCoord){",
        "vec2 uv = fragCoord.xy / screenSize;",
        "seed+=7.3562135463730950;",
        "init(uv*seed);",
        "fragColor = vec4(rand(uv));",
        "}",
        "void main() {",
        "vec4 sum = texture2D( tDiffuse,vUv);",
        "vec3 c = sum.rgb;",
        "vec4 outputColor;",
        "mainImage( outputColor ,vUv);",
        "vec3 p = c - outputColor.rgb/(1.0-c.g);",
        "float a = 0.0;",
        "float a1 = 0.0;",
        "if((p.r+p.g+p.b)*20.0>1.0){",
        "a=1.0;",
        "}else{",
        "a=(p.r+p.g+p.b)*20.0;",
        "}",
        "if(reverse == 1.0){",
        "a1=1.0;",
        "}else{",
        "a1=0.0;",
        "}",
        "if(c.g!=c.r){",
        "if(a==1.0){",
        "gl_FragColor = vec4( vec3(a1),a);",
        "}else{",
        "gl_FragColor = vec4( vec3(0.0) ,a1);",
        "}",
        "}else{",
        "gl_FragColor = vec4( vec3(0.0) ,a1);",
        "}",
        "}"
    ].join("\n")

};