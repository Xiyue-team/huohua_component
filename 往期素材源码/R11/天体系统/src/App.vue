<template>
    <div id="app">
        <div class="control-container">
            <p>天体系统</p>
             <i id="clear"><img class="btn" src="static/image/chongzhi.png" /></i>
        </div>
        <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <!-- <div id="fps">fps</div> -->
         <div id="right"><img class="btn2" src="static/image/skip_next.png" /></div>
        <p id="prompt">总星系</p>
         <div id="left"><img class="btn2" src="static/image/skip_previous.png" /></div>
        <div id="notSupported" class="hidden">loading...</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMob: /iPad|Android/g.test(navigator.userAgent),
            canvas: null,
        };
    },
    methods: {
        init() {
            this.canvas = document.getElementById("renderCanvas");
            var engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
            if (!BABYLON.Engine.isSupported()) {
            } else {
                var scene = this.loadCustomScene(this.createScene, (scene) => {
                }, engine);
                // var divFps = document.getElementById("fps");
                var sceneChecked = false;
            var renderFunction = function () {
            //   if (divFps) {divFps.innerHTML = engine.getFps().toFixed() + " fps";}  
                    if (scene) {
                        if (scene.activeCamera) {
                            scene.render();
                        }
                        if (scene.useDelayedTextureLoading) {
                            var waiting = scene.getWaitingItemsCount();
                            if (waiting <= 0) {
                                document.getElementById("notSupported").className = "hidden";
                            }
                        } else if (sceneChecked==false) {
                            var remaining = scene.getWaitingItemsCount();
                            if (remaining == 0) {
                                sceneChecked = true;
                                document.getElementById("notSupported").className = "hidden";
                            }
                        }
                    }
                };
                engine.runRenderLoop(renderFunction);
                    $('.renderCanvas-container').height($(window).height());
                engine.resize();
                window.addEventListener("resize", () => {
                    $('.renderCanvas-container').height($(window).height());
                    engine.resize();
                });
            }
        },
        loadCustomScene(demoConstructor, then, engine) {
            document.getElementById("notSupported").className = "";
            var scene = demoConstructor(engine);
            if (scene.activeCamera) {
                scene.activeCamera.attachControl(this.canvas, false);
            }
            scene.executeWhenReady(() => {
                this.canvas.style.opacity = 1;
                if (then) {then(scene);}
            });
            return scene;
        },
        createScene(engine) {
            var GalaxySystemVertexShader = 
                `precision highp float;
                attribute vec3 position;
                attribute vec3 normal;
                attribute vec2 uv;
                uniform mat4 worldViewProjection;
                uniform float time;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                varying vec2 vtime;
                void main(void) {
                    vec3 v = position;
                    v.x += sin(2.0 * position.y + (time)) * 0.1;
                    vec4 outPosition = worldViewProjection * vec4(position, 1.0);
                    gl_Position = outPosition;
                    vUV = uv;
                    vPosition = position;
                    vtime.x=time;
                    vNormal = normal;
                }`;
            var GalaxySystemFragmentShader = 
                `precision highp float;
                varying vec3 vPosition; 
                varying vec3 vNormal;
                varying vec2 vUV;
                varying vec2 vtime;
                uniform mat4 world;
                uniform sampler2D daySampler; 
                uniform vec4 color;
                void main(void) {
                    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                    vec2 UV=vec2(vUV.x*(1.+sin(vtime.x*vPosition.x)*0.01),vUV.y*(1.+cos(vtime.x*vPosition.y)*0.01));
                    vec4 daycolor = texture2D(daySampler, vUV).rgba; 
                    daycolor=daycolor*2.*daycolor;
                    daycolor.r=daycolor.r*(1.+sin(vtime.x)*0.03);
                    gl_FragColor =color* vec4(daycolor);
                }`;
            var GalaxySystemParVertexShader = 
                `precision highp float;
                attribute vec3 position;
                attribute vec3 normal;
                attribute vec2 uv;
                uniform mat4 worldViewProjection;
                uniform float time;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                varying vec2 vtime;
                void main(void) {
                    vec3 v = position;
                    v.z += sin(2.0 * position.y + (time)) * 0.3;
                    vec4 outPosition = worldViewProjection * vec4(v, 1.0);
                    gl_Position = outPosition;
                    vUV = uv;
                    vPosition = v;
                    vtime.x=time;
                    vNormal = normal;
                }`;
                var GalaxySystemParFragmentShader = 
                `precision highp float;
                varying vec3 vPosition; 
                varying vec3 vNormal;
                varying vec2 vUV;
                varying vec2 vtime;
                uniform mat4 world;
                uniform sampler2D daySampler; 
                uniform vec3 camerapos;
                uniform vec4 color;
                void main(void) {
                    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                    vec3 V=normalize(camerapos - vPositionW);
                    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                    float bright=2.*clamp(dot(vNormalW,V),0.,1.);
                    vec2 UV=vec2(vUV.x*(1.+sin(vtime.x*vPosition.x)*0.01),vUV.y*(1.+cos(vtime.x*vPosition.y)*0.01));
                    vec4 daycolor = texture2D(daySampler, vUV).rgba; 
                    daycolor=daycolor*2.*daycolor;
                    daycolor.r=daycolor.r*(1.+sin(vtime.x)*0.03);
                    gl_FragColor =color* vec4(daycolor.rgb,0.3*daycolor.a)*bright;
                }`;
                var GalaxySystemSPSVertexShader = 
                `precision highp float;
                attribute vec3 position;
                attribute vec3 normal;
                attribute vec2 uv;
                uniform mat4 worldViewProjection;
                uniform float time;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                varying vec2 vtime;
                void main(void) {
                    vec4 outPosition = worldViewProjection * vec4(position, 1.0);
                    gl_Position = outPosition;
                    vUV = uv;
                    vPosition = position;
                    vtime.x=time;
                    vNormal = normal;
                }`;
                var GalaxySystemSPSFragmentShader = 
                `precision highp float;
                varying vec3 vPosition; 
                varying vec3 vNormal;
                varying vec2 vUV;
                varying vec2 vtime;
                uniform mat4 world;
                uniform sampler2D daySampler; 
                uniform vec3 camerapos;
                uniform vec4 color;
                void main(void) {
                    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                    vec3 V=normalize(camerapos - vPositionW);
                    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                    float bright=1.*clamp(dot(vNormalW,V),0.,1.);
                    vec2 UV=vec2(vUV.x*(1.+sin(vtime.x*vPosition.x)*0.01),vUV.y*(1.+cos(vtime.x*vPosition.y)*0.01));
                    vec4 daycolor = texture2D(daySampler, vUV).rgba; 
                    daycolor=daycolor*2.*daycolor;
                    daycolor.r=daycolor.r*(1.+sin(vtime.x)*0.03);
                    gl_FragColor =color* vec4(daycolor.rgb,0.3*daycolor.a)*bright;
                }`;
             var SolarSystemParVertexShader = 
                `precision highp float;
                attribute vec3 position;
                attribute vec3 normal;
                attribute vec2 uv;
                uniform mat4 worldViewProjection;
                uniform float time;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                varying vec2 vtime;
                void main(void) {
                    vec3 v = position;
                    v.x += sin(2.0 * position.y + (time)) * 0.1;
                    vec4 outPosition = worldViewProjection * vec4(position, 1.0);
                    gl_Position = outPosition;
                    vUV = uv;
                    vPosition = position;
                    vtime.x=time;
                    vNormal = normal;
                }`;
            
            var SolarSystemParFragmentShader = 
                `precision highp float;
                varying vec3 vPosition; 
                varying vec3 vNormal;
                varying vec2 vUV;
                varying vec2 vtime;
                uniform mat4 world;
                uniform sampler2D daySampler; 
                uniform vec4 color;
                void main(void) {
                    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                    vec4 daycolor = texture2D(daySampler, vUV).rgba; 
                    daycolor=daycolor*12.*daycolor;
                    gl_FragColor =color* vec4(daycolor);
                }`;

                var sunFragmentShader = 
                `precision highp float;
                varying vec3 vPosition; 
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform sampler2D daySampler; 
                uniform vec4 color;
                void main(void) {
                    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                    vec4 daycolor = texture2D(daySampler, vUV).rgba; 
                    gl_FragColor =color* vec4(daycolor);
                }`;
            var sunVertexShader = 
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
                    vec2 suv=uv*0.333333333;
                    vUV =vec2(0.666666666+suv.x,suv.y);
                    vPosition = position;
                    vNormal = normal;
                }`;


            var earthFragmentShader = 
                `precision highp float;
                varying vec3 vPosition; 
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform sampler2D daySampler; 
                uniform vec4 color;
                void main(void) {
                    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                    vec4 daycolor = texture2D(daySampler, vUV).rgba; 
                    gl_FragColor =color* vec4(daycolor);
                }`;
            var customVertexShader = 
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
  
            console.log("Create By APEN");
            BABYLON.Effect.ShadersStore["customVertexShader"] = customVertexShader;
            BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
            
            BABYLON.Effect.ShadersStore["sunVertexShader"] = sunVertexShader;
            BABYLON.Effect.ShadersStore["sunFragmentShader"] = sunFragmentShader;

            BABYLON.Effect.ShadersStore["GalaxySystemVertexShader"] = GalaxySystemVertexShader;
            BABYLON.Effect.ShadersStore["GalaxySystemFragmentShader"] = GalaxySystemFragmentShader;

            BABYLON.Effect.ShadersStore["GalaxySystemParVertexShader"] = GalaxySystemParVertexShader;
            BABYLON.Effect.ShadersStore["GalaxySystemParFragmentShader"] = GalaxySystemParFragmentShader;

            BABYLON.Effect.ShadersStore["GalaxySystemSPSVertexShader"] = GalaxySystemSPSVertexShader;
            BABYLON.Effect.ShadersStore["GalaxySystemSPSFragmentShader"] = GalaxySystemSPSFragmentShader;

            BABYLON.Effect.ShadersStore["SolarSystemParVertexShader"] = SolarSystemParVertexShader;
            BABYLON.Effect.ShadersStore["SolarSystemParFragmentShader"] = SolarSystemParFragmentShader;

            var thiz = this;
            this.canvas = engine.getRenderingCanvas();
            engine.enableOfflineSupport = false;
            var scene = new BABYLON.Scene(engine);
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.9;
            var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 0, 0), scene);
            var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 80, BABYLON.Vector3.Zero(), scene);
            camera.lowerRadiusLimit =300;//600
            camera.upperRadiusLimit =600;
            camera.layerMask = 0x20000000;
            camera.setPosition(new BABYLON.Vector3(300,300,0));
            camera.attachControl(this.canvas, false);
            scene.activeCameras.push(camera);
            scene.clearColor.set(0, 0, 0, 1);
            //根据半径、角度求圆上的点，并设置坐标轴及轴上的值
            function tdrawcircle(ra,rb, ang, axisvalue, axis) {
                var x = ra * Math.cos(ang * Math.PI / 180);
                var y = rb * Math.sin(ang * Math.PI / 180);
                if (axis == "x") {
                    return new BABYLON.Vector3(axisvalue, x, y);
                } else if (axis == "z") {
                    return new BABYLON.Vector3(x, y, axisvalue);
                } else {
                    return new BABYLON.Vector3(x, axisvalue, y);
                }
            }
            //设置将要画圆的坐标集
            function tsetvertices(ra,rb, value, y, axis) {
                var vertices = [];
                for (var i = 0; i <= value; i ++) {
                    vertices.push(tdrawcircle(ra,rb, i, y, axis));
                }
                vertices.push(tdrawcircle(ra,rb, value, y, axis));
                return vertices;
            }
            //画出可更新的椭圆，并设置颜色
            function tcreateCircle(ra,rb, value, y, color, scene, axis) {
                var vertices = tsetvertices(ra,rb, value, y, axis);
                var circle = BABYLON.MeshBuilder.CreateLines("lines", {
                    points: vertices,
                    updatable: true,
                    instance: circle}, scene);
                circle.color = color;
                return circle;
            }
            var starSampler = new BABYLON.Texture("static/system/star.png", scene);
                starSampler.uScale=1/3;
                starSampler.vScale=1/3;
            var sunSampler = starSampler.clone();
            var planSampler = new BABYLON.Texture("static/system/huan_g.png", scene);
            var rayTexture = new BABYLON.Texture("static/system/ray.png", scene);
            
            var Mercurytex = starSampler.clone();
                Mercurytex.uOffset=0;
                Mercurytex.vOffset=2/3;
            var Moontex = Mercurytex.clone();
            var Venustex = starSampler.clone();
                Venustex.uOffset=1/3;
                Venustex.vOffset=2/3;
            var Earthtex = starSampler.clone();
                Earthtex.uOffset=2/3;
                Earthtex.vOffset=2/3;
            var Marstex = starSampler.clone();
                Marstex.uOffset=0;
                Marstex.vOffset=1/3;
            var Jupitertex= starSampler.clone();
                Jupitertex.uOffset=1/3;
                Jupitertex.vOffset=1/3;
            var Saturntex = starSampler.clone();
                Saturntex.uOffset=2/3;
                Saturntex.vOffset=1/3;
            var Uranustex = starSampler.clone();
                Uranustex.uOffset=0;
                Uranustex.vOffset=0;
            var Neptunetex = starSampler.clone();
                Neptunetex.uOffset=0;
                Neptunetex.vOffset=1/3;
            var SaturnplanSampler = new BABYLON.Texture("static/system/Saturn_Circle.png", scene);
            var UranusplanSampler = new BABYLON.Texture("static/system/Uranus_Circle.png", scene);
            var Galaxytex = new BABYLON.Texture("static/system/Galaxy.png", scene);
            var Othertex = new BABYLON.Texture("static/system/GalaxyOther.png", scene);
            var Pointtex= new BABYLON.Texture("static/system/taiyangxi3.png", scene);

            var UranusplanMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "custom",fragment: "earth",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true});
            UranusplanMaterial.setTexture("daySampler", UranusplanSampler);
            UranusplanMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            UranusplanMaterial.backFaceCulling = false;

            var SaturnplanMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "custom",fragment: "earth",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true});
            SaturnplanMaterial.setTexture("daySampler", SaturnplanSampler);
            SaturnplanMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            SaturnplanMaterial.backFaceCulling = false;

            var GalaxyMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "GalaxySystem",fragment: "GalaxySystem",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true});
            GalaxyMaterial.setTexture("daySampler", Galaxytex);
            GalaxyMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            GalaxyMaterial.setFloat("time", 0);
            GalaxyMaterial.backFaceCulling = false;

            var GalaxyOutMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "GalaxySystemPar",fragment: "GalaxySystemPar",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true});
            GalaxyOutMaterial.setTexture("daySampler", Galaxytex);
            GalaxyOutMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            GalaxyOutMaterial.setVector3("camerapos", new BABYLON.Vector3( 1, 1, 1));
            GalaxyOutMaterial.setFloat("time", 0);
            GalaxyOutMaterial.backFaceCulling = false;

            var GalaxySPSMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "GalaxySystemSPS",fragment: "GalaxySystemSPS",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true});
            GalaxySPSMaterial.setTexture("daySampler", Galaxytex);
            GalaxySPSMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            GalaxySPSMaterial.setVector3("camerapos", new BABYLON.Vector3( 1, 1, 1));
            GalaxySPSMaterial.setFloat("time", 0);
            GalaxySPSMaterial.backFaceCulling = false;

            var SolarSPSMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "GalaxySystemSPS",fragment: "GalaxySystemSPS",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true});
            SolarSPSMaterial.setTexture("daySampler", Galaxytex);
            SolarSPSMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            SolarSPSMaterial.setVector3("camerapos", new BABYLON.Vector3( 1, 1, 1));
            SolarSPSMaterial.setFloat("time", 0);
            SolarSPSMaterial.backFaceCulling = false;

            var OtherMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "GalaxySystem",fragment: "GalaxySystem",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true});
            OtherMaterial.setTexture("daySampler", Othertex);
            OtherMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            OtherMaterial.setFloat("time", 0);
            OtherMaterial.backFaceCulling = false;

            var SolarSystemParMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "SolarSystemPar",fragment: "SolarSystemPar",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true});
            SolarSystemParMaterial.setTexture("daySampler", Pointtex);
            SolarSystemParMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            SolarSystemParMaterial.setFloat("time", 0);
            SolarSystemParMaterial.backFaceCulling = false;

            var sunforMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "sun",fragment: "sun",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]});
            sunforMaterial.setTexture("daySampler", sunSampler);
            sunforMaterial.setVector4("color", new BABYLON.Vector4(2.5, 2.5, 2.5,1));
            sunforMaterial.backFaceCulling = true;
            sunforMaterial.emissiveColor = new BABYLON.Color3(0.6,0.4,0);

            var planMaterial = new BABYLON.ShaderMaterial("shader", scene, {vertex: "custom",fragment: "earth",}, {
            attributes: ["position", "normal", "uv"],uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true});
            planMaterial.setTexture("daySampler", planSampler);
            planMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
            planMaterial.backFaceCulling = false;

            var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
            materialPlane.diffuseTexture = rayTexture;
            materialPlane.specularColor = new BABYLON.Color3(0, 0, 0);
            materialPlane.diffuseTexture.hasAlpha = true;
            materialPlane.diffuseTexture.uScale = 1;
            materialPlane.diffuseTexture.vScale = 1.2;
            materialPlane.backFaceCulling = false;
            materialPlane.alpha = 1;

            var Asteroidmaterial = new BABYLON.StandardMaterial("kosh2", scene);
            Asteroidmaterial.diffuseColor = new BABYLON.Color3(0,0,0);
            Asteroidmaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            Asteroidmaterial.specularPower = 0;

            var moonmaterial = new BABYLON.StandardMaterial("kosh2", scene);
            moonmaterial.diffuseTexture = Moontex;
            moonmaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            moonmaterial.specularPower = 0;

            //-----------------逻辑开始----------------
            var HeavenlySystem = new BABYLON.Mesh("p", scene);//总星系
            var GalaxySystem = new BABYLON.Mesh("p", scene);//银河系
            var SolarSystem =  new BABYLON.Mesh("p", scene);//太阳系
            var SolarSystemDot =BABYLON.Mesh.CreateSphere("SolarSystem", 32, 1000, scene);
            SolarSystemDot.setParent(SolarSystem);
            var SolarSystemBorder =BABYLON.Mesh.CreateSphere("SolarSystemBorder", 32, 8000, scene);
            SolarSystemBorder.setParent(SolarSystem);

            var sun = BABYLON.Mesh.CreateSphere("sun", 32, 15, scene);
            sun.material = sunforMaterial;
            sun.layerMask = 0x20000000;
            sun.setParent(SolarSystem);

            var gl = new BABYLON.GlowLayer("glow", scene, { mainTextureSamples: 4});
            gl.addIncludedOnlyMesh(sun);
            var helper = scene.createDefaultEnvironment();
            helper.setMainColor(BABYLON.Color3.Gray());

            var CometGlow;
            var Asteroid=new BABYLON.Mesh("p");
            Asteroid.setParent(SolarSystem);
            Asteroid.layerMask = 0x20000000;
            var GalaxySystemDot;
            var SolarSystemOut;
            BABYLON.SceneLoader.ImportMesh("", "", "data:" + strData, scene, 
                function (newMeshes, particleSystems, skeletons) {
                    for (var i = 0; i < newMeshes.length; i++) {
                    newMeshes[i].isVisible = true;
                    newMeshes[i].layerMask = 0x20000000;
                    newMeshes[i].scaling=new BABYLON.Vector3(1,1,1);
                        if (!newMeshes[i].rotationQuaternion) {
                            if(newMeshes[i].name=="plan"){
                                newMeshes[i].setParent(Asteroid);
                                newMeshes[i].material=planMaterial;
                            }else if(newMeshes[i].name=="Asteroid"){
                                newMeshes[i].material=Asteroidmaterial;
                                newMeshes[i].setParent(Asteroid);
                            }else if(newMeshes[i].name=="CometGlow"){
                                CometGlow=newMeshes[i];
                                CometGlow.material=materialPlane;
                                CometGlow.material.emissiveColor = new BABYLON.Color3(0,0.1,0.7);
                                gl.addIncludedOnlyMesh(CometGlow);
                                CometGlow.layerMask = 0x20000000;
                                CometGlow.scaling=new BABYLON.Vector3(0.004,0.004,0.004);
                            }else if(newMeshes[i].name=="SolarSystemOut"){
                                SolarSystemOut=newMeshes[i];
                                SolarSystemOut.material=SolarSystemParMaterial;
                                SolarSystemOut.layerMask = 0x20000000;
                                SolarSystemOut.isPickable = false;
                                SolarSystemOut.setParent(SolarSystem);
                            }else if(newMeshes[i].name=="SolarSystemsp"){
                                newMeshes[i].isPickable = false;
                                newMeshes[i].layerMask = 0x20000000;
                                newMeshes[i].setParent(SolarSystem);
                                newMeshes[i].material=SolarSPSMaterial;
                            }else if(newMeshes[i].name=="GalaxyPlan2"){
                                newMeshes[i].isPickable = false;  
                                newMeshes[i].scaling=new BABYLON.Vector3(10,10,10);
                                newMeshes[i].layerMask = 0x20000000;
                                newMeshes[i].setParent(GalaxySystem);
                                newMeshes[i].material=GalaxyMaterial;
                            }else if(newMeshes[i].name=="Galaxyout"){
                                newMeshes[i].isPickable = false;  
                                newMeshes[i].scaling=new BABYLON.Vector3(10,10,10);
                                newMeshes[i].layerMask = 0x20000000;
                                newMeshes[i].material.emissiveColor = new BABYLON.Color3(0.7,0.1,0.1);
                                gl.addIncludedOnlyMesh(newMeshes[i]);
                                newMeshes[i].setParent(GalaxySystem);
                                newMeshes[i].material=GalaxyOutMaterial;
                            }else if(newMeshes[i].name=="Galaxysp"){
                                newMeshes[i].isPickable = false;  
                                newMeshes[i].scaling=new BABYLON.Vector3(10,10,10);
                                newMeshes[i].layerMask = 0x20000000;
                                newMeshes[i].setParent(GalaxySystem);
                                newMeshes[i].material=GalaxySPSMaterial;
                            }else if(newMeshes[i].name=="other"){
                                newMeshes[i].isPickable = false;  
                                newMeshes[i].scaling=new BABYLON.Vector3(10,10,10);
                                newMeshes[i].layerMask = 0x20000000;
                                newMeshes[i].setParent(GalaxySystem);
                                newMeshes[i].material=OtherMaterial;
                            }else if(newMeshes[i].name=="GalaxySystem"){
                                newMeshes[i].scaling=new BABYLON.Vector3(10,10,10);
                                newMeshes[i].layerMask = 0x80000000;
                                GalaxySystemDot= newMeshes[i];
                                GalaxySystemDot.setParent(GalaxySystem);
                            }
                        }
                    }
                }
            );
   

            function NewPlanet(publicRA,publicRB,pubPlanetRot,praPlanetRot,R,tex,linecolor,name,childmesh){
                var group=[];
                var PubPlanetRot = new BABYLON.Mesh("p", scene);//公转轨道偏移层
                var PubPlanet = new BABYLON.Mesh("p", scene);//公转轨道运动层
                var PraPlanetRot = new BABYLON.Mesh("p", scene);//自转轨道偏移层
                var PraPlanet = new BABYLON.Mesh("g", scene);//自转轨道运动层
                var satellite = new BABYLON.Mesh("g", scene);//自转轨道运动层
                satellite.setParent(PraPlanetRot);
                PraPlanet.setParent(PraPlanetRot);
                PraPlanetRot.setParent(PubPlanet);
                var material = new BABYLON.StandardMaterial("kosh2", scene);
                material.diffuseTexture = tex;
                material.specularColor = new BABYLON.Color3(0, 0, 0);
                material.specularPower = 0;
                var Planet = BABYLON.Mesh.CreateSphere(name, 32, R, scene);//行星
                Planet.rotation = new BABYLON.Vector3(0, 0, Math.PI);
                Planet.material = material;
                Planet.layerMask = 0x20000000;
                if(childmesh!=""){
                    if(childmesh.name=="moong"){
                        childmesh.setParent(satellite);
                    }else {
                        childmesh.setParent(Planet);
                    }
                }
                Planet.setParent(PraPlanet);
                PraPlanetRot.rotation=praPlanetRot;
                PubPlanet.position=new BABYLON.Vector3(0,0,100);
                var cir= tcreateCircle(publicRA,publicRB, 360, 0,linecolor, scene, "y");
                cir.setParent(PubPlanetRot);
                cir.layerMask = 0x20000000;
                PubPlanet.setParent(PubPlanetRot);
                PubPlanetRot.rotation=pubPlanetRot;
                PubPlanetRot.setParent(SolarSystem);
                group.push(PubPlanetRot,PubPlanet,PraPlanetRot,PraPlanet,publicRA,publicRB,satellite,Planet);
                return group;
            }
         
            var Mercury= NewPlanet(15,13,new BABYLON.Vector3(0,0,Math.PI/180*7),new BABYLON.Vector3(0,0,Math.PI/180*177),3,
            Mercurytex,new BABYLON.Color3(1, 0, 0),"Mercury","");
            var Venus= NewPlanet(24,22,new BABYLON.Vector3(0,0,Math.PI/180*3.4),new BABYLON.Vector3(0,0,0),5,
            Venustex,new BABYLON.Color3(1, 0.5, 0),"Venus","");

            var moon = BABYLON.Mesh.CreateSphere("moon", 32, 1, scene);//moon
            moon.material = moonmaterial;
            moon.position=new BABYLON.Vector3(0,0,5);
            var moongroup=new BABYLON.Mesh("moong");
            moon.setParent(moongroup);
            moon.layerMask = 0x20000000;

            var Earth= NewPlanet(35,30,new BABYLON.Vector3(0,0,0),new BABYLON.Vector3(0,0,Math.PI/180*23.26),6,
            Earthtex,new BABYLON.Color3(1, 1, 0),"Earth",moongroup);
            var Mars= NewPlanet(45,40,new BABYLON.Vector3(0,0,Math.PI/180*1.9),new BABYLON.Vector3(0,0,Math.PI/180*25),3,
            Marstex,new BABYLON.Color3(0, 1, 1),"Mars","");
            var Jupiter= NewPlanet(90,85,new BABYLON.Vector3(0,0,Math.PI/180*1.3),new BABYLON.Vector3(0,0,Math.PI/180*3),15,
            Jupitertex,new BABYLON.Color3(0, 0.8, 1),"Jupiter","");

            var Saturnpan=BABYLON.Mesh.CreatePlane("",30,scene);
            Saturnpan.rotation=new BABYLON.Vector3(Math.PI/2,0,0);
            Saturnpan.material=SaturnplanMaterial;
            Saturnpan.layerMask = 0x20000000;

            var Saturn= NewPlanet(135,130,new BABYLON.Vector3(0,0,Math.PI/180*2.5),new BABYLON.Vector3(0,0,Math.PI/180*27),12,
            Saturntex,new BABYLON.Color3(0, 0.6, 1),"Saturn",Saturnpan);

            var Uranuspan=BABYLON.Mesh.CreatePlane("Uranus",15,scene);
            Uranuspan.rotation=new BABYLON.Vector3(Math.PI/2,0,0);
            Uranuspan.material=UranusplanMaterial;
            Uranuspan.layerMask = 0x20000000;

            var Uranus= NewPlanet(170,165,new BABYLON.Vector3(0,0,Math.PI/180*0.8),new BABYLON.Vector3(0,0,Math.PI/180*98),6,
            Uranustex,new BABYLON.Color3(0, 0.4, 1),"Uranus",Uranuspan);
            var Neptune= NewPlanet(195,190,new BABYLON.Vector3(0,0,Math.PI/180*2.8),new BABYLON.Vector3(0,0,Math.PI/180*30),6,
            Neptunetex,new BABYLON.Color3(0, 0.2, 1),"Neptune","");
            var Comet= NewPlanet(125,40,new BABYLON.Vector3(0,0,Math.PI/180*17.6),new BABYLON.Vector3(0,0,Math.PI/180*23.6), 0.9,
            Neptunetex,new BABYLON.Color3(0, 0.2, 0.8),"Comet","");//Neptunetex
            Comet[0].position=new BABYLON.Vector3(100,35,0);
            Comet[7].material.emissiveColor = new BABYLON.Color3(0,0.5,1);
         
            gl.addIncludedOnlyMesh(Comet[7]);
            GalaxySystem.position=new BABYLON.Vector3(0,0,1800);
            SolarSystem.scaling=new BABYLON.Vector3(0.02,0.02,0.02);
            SolarSystem.setParent(GalaxySystem);
            GalaxySystem.setParent(HeavenlySystem);
            HeavenlySystem.scaling=new BABYLON.Vector3(0.01,0.01,0.01);
            // HeavenlySystem.scaling=new BABYLON.Vector3(100,100,100);


            //------------太阳系更新----------
            function SolarSystemUpdate(){
                materialPlane.diffuseTexture.vOffset -= 0.01;

                Mercury[1].position=tdrawcircle(Mercury[4],Mercury[5],alpha/0.24, 0, "y");
                Mercury[3].rotation = new BABYLON.Vector3(0, -alpha/58.65+Math.PI/180, 0);

                Venus[1].position=tdrawcircle(Venus[4],Venus[5],alpha/0.62, 0, "y");
                Venus[3].rotation = new BABYLON.Vector3(0, alpha/243.01+Math.PI/180, 0);

                Earth[1].position=tdrawcircle(Earth[4],Earth[5],alpha, 0, "y");
                Earth[3].rotation = new BABYLON.Vector3(0, -alpha+Math.PI/180, 0);
                Earth[6].rotation = new BABYLON.Vector3(0, -alpha/27+Math.PI/180, 0);

                Mars[1].position=tdrawcircle(Mars[4],Mars[5],alpha/1.88, 0, "y");
                Mars[3].rotation = new BABYLON.Vector3(0, -alpha/1.026+Math.PI/180, 0);

                Jupiter[1].position=tdrawcircle(Jupiter[4],Jupiter[5],alpha/11.86+200, 0, "y");
                Jupiter[3].rotation = new BABYLON.Vector3(0, -alpha/0.41+Math.PI/180, 0);

                Saturn[1].position=tdrawcircle(Saturn[4],Saturn[5],alpha/15.46+100, 0, "y");
                Saturn[3].rotation = new BABYLON.Vector3(0, -alpha/0.426+Math.PI/180, 0);

                Uranus[1].position=tdrawcircle(Uranus[4],Uranus[5],alpha/20+180, 0, "y");
                Uranus[3].rotation = new BABYLON.Vector3(0, alpha/0.426+Math.PI/180, 0);

                Neptune[1].position=tdrawcircle(Neptune[4],Neptune[5],alpha/23+70, 0, "y");
                Neptune[3].rotation = new BABYLON.Vector3(0, -alpha/0.75+Math.PI/180, 0);

                Comet[1].position=tdrawcircle(Comet[4],Comet[5],-alpha/25+230, 0, "y");
                Comet[3].rotation = new BABYLON.Vector3(0, -alpha*20/700+Math.PI/180, 0);
                CometGlow.position=Comet[7].getWorldMatrix().getTranslation();
                CometGlow.lookAt(sun.position);
                Asteroid.rotation = new BABYLON.Vector3(0, -alpha*0.01, 0);
                camera.setTarget(sun.getWorldMatrix().getTranslation());
            }
             
            var alpha = 0;

            var showSystem=false;
            var value=0;
            var value2=1;
            var scaling=0;
            function showSystemFunc(){
                if(scaling<0.1){
                    value=0.005;
                }else if(scaling>15){
                    value=0.5;
                }else{
                    value=scaling/30;
                }
                if(goback){
                    if(showSystem==true){
                        scaling=HeavenlySystem.scaling.x+=value;
                        HeavenlySystem.scaling=new BABYLON.Vector3( scaling,scaling,scaling);
                            if( HeavenlySystem.scaling.z<=15){
                                GalaxyMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1-scaling/15));
                                GalaxyOutMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1-scaling/15));
                                GalaxySPSMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1-scaling/15));
                                OtherMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1-scaling/15));
                            }
                        if( scaling>=value2){
                            showSystem=false;
                            if(value2==100){
                                CometGlow.scaling=new BABYLON.Vector3(0.4,0.4,0.4);
                            }else{
                                CometGlow.scaling=new BABYLON.Vector3(0.004,0.004,0.004);
                            }
                             if(booleanlefthide==true){
                                $("#left").hide();
                            }else{
                                $("#left").show();
                            }
                            if(booleanrighthide==true){
                                $("#right").hide();
                            }else{
                                $("#right").show();
                            }
                        }
                    }
                }else{
                    if(showSystem==true){
                        scaling=HeavenlySystem.scaling.x-=value;
                        HeavenlySystem.scaling=new BABYLON.Vector3(scaling,scaling,scaling);
                            if( scaling<=15){
                                GalaxyMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1-scaling/15));
                                GalaxyOutMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1-scaling/15));
                                GalaxySPSMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1-scaling/15));
                                OtherMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1-scaling/15));
                            }
                        if( scaling<=value2){
                            showSystem=false;
                            if(value2==100){
                                CometGlow.scaling=new BABYLON.Vector3(0.4,0.4,0.4);
                            }else{
                                CometGlow.scaling=new BABYLON.Vector3(0.004,0.004,0.004);
                            }
                            if(booleanlefthide==true){
                                $("#left").hide();
                            }else{
                                $("#left").show();
                            }
                            if(booleanrighthide==true){
                                $("#right").hide();
                            }else{
                                $("#right").show();
                            }
                        }
                    }
                }
            }
            scene.registerBeforeRender(function() {
               SolarSystemUpdate();
                GalaxyOutMaterial.setVector3("camerapos",camera.position);
                GalaxyOutMaterial.setFloat("time",alpha/4);
                GalaxySPSMaterial.setVector3("camerapos",camera.position);
                GalaxySPSMaterial.setFloat("time",alpha/4);
                SolarSPSMaterial.setVector3("camerapos",camera.position);
                SolarSPSMaterial.setFloat("time",alpha/4);
                SolarSystemParMaterial.setFloat("time",alpha/4);
                GalaxyMaterial.setFloat("time", alpha/4);
                OtherMaterial.setFloat("time", alpha/4);
                alpha += 0.4;
                showSystemFunc();
            });

            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
             var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
            var tip =new BABYLON.Mesh("tip");
            tip.position = new BABYLON.Vector3(0,0,0);
            var label = new BABYLON.GUI.Rectangle("label");
            label.background = "black"
            label.height = "120px";
            label.alpha = 0.5;
            label.width = "300px";
            label.cornerRadius = 5;
            label.thickness = 1;
            label.linkOffsetY = -80;
            label.linkOffsetX = 150;
            advancedTexture.addControl(label); 
            label.linkWithMesh(tip);
            var tiptext = new BABYLON.GUI.TextBlock();
            tiptext.text ="sun";
            tiptext.textHorizontalAlignment=0;
            tiptext.color = "white";
            label.addControl(tiptext);  
            advancedTexture.layer.layerMask = 0x80000000;
            var label2 = new BABYLON.GUI.Rectangle("label");
            label2.background = "black"
            label2.height = "30px";
            label2.alpha = 0.5;
            label2.width = "80px";
            label2.cornerRadius = 5;
            label2.thickness = 1;
            advancedTexture2.addControl(label2); 
            label.linkWithMesh(tip);
            var tiptext2 = new BABYLON.GUI.TextBlock();
            tiptext2.text ="太阳系";
            tiptext2.color = "white";
            label2.addControl(tiptext2);  
            advancedTexture2.layer.layerMask = 0x80000000;
            //事件
            var currentMesh;
            var onPointerDown = function(evt) {
                if (evt.button !== 0) { return; }
                var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
                if (pickInfo.hit) {
                    currentMesh = pickInfo.pickedMesh;
                    advancedTexture.layer.layerMask = 0x20000000;
                     label.linkWithMesh(currentMesh);
                    if(currentMesh.name == "Mercury"){
                        tiptext.text =MercuryStr;
                    }else if(currentMesh.name == "Venus"){
                        tiptext.text =VenusStr;
                    }else if(currentMesh.name == "Earth"){
                        tiptext.text =EarthStr;
                    }else if(currentMesh.name == "Mars"){
                        tiptext.text =MarsStr;
                    }else if(currentMesh.name == "Jupiter"){
                        tiptext.text =JupiterStr;
                    }else if(currentMesh.name == "Saturn"){
                        tiptext.text =SaturnStr;
                    }else if(currentMesh.name == "Uranus"){
                        tiptext.text =UranusStr;
                    }else if(currentMesh.name == "Neptune"){
                        tiptext.text =NeptuneStr;
                    }else if(currentMesh.name == "CometGlow"){
                        tiptext.text =CometStr;
                    } else{
                        advancedTexture.layer.layerMask = 0x80000000;
                    }
                }
            }
            $("#left").hide();
            var nextNum=0;
            var goback=true;

            var booleanlefthide=false;
            var booleanrighthide=false;
            function gotopostion(){
                $("#left").hide();
                $("#right").hide();
                booleanlefthide=false;
                booleanrighthide=false;
                 advancedTexture2.layer.layerMask = 0x80000000;
                if(goback){
                    switch (nextNum) {
                        case 1://银河系
                        showSystem=true;
                        value2=0.1;
                        GalaxySystemDot.isPickable = true;
                         advancedTexture2.layer.layerMask = 0x20000000;
                        $('#prompt').html('银河系');
                        break;
                        case 2://太阳系外层
                        showSystem=true;
                        value2=15;
                        $('#prompt').html('奥尔特星云');
                        SolarSystemBorder.isPickable = true;
                        break;
                        case 3://太阳系
                         showSystem=true;
                         value2=100;
                        $('#prompt').html('太阳系');
                        SolarSystemDot.isPickable = true;
                        booleanrighthide=true;
                        break;
                        default:
                        if(nextNum>3){
                            nextNum=3;
                            booleanrighthide=true;
                        }
                        break;
                    }
                }else{
                    switch (nextNum) {
                       case 0://总星系
                       booleanlefthide=true;
                        showSystem=true;
                        value2=0.01;
                        GalaxySystemDot.isPickable = false;
                        $('#prompt').html('总星系');
                        break;
                        case 1://银河系
                        showSystem=true;
                        value2=0.1;
                        $('#prompt').html('银河系');
                         advancedTexture2.layer.layerMask = 0x20000000;
                        SolarSystemBorder.isPickable = false;
                        break;
                        case 2://太阳系外层
                         showSystem=true;
                         value2=15;
                        $('#prompt').html('奥尔特星云');
                        SolarSystemDot.isPickable = false;
                        break;
                        default:
                        if(nextNum<0){
                            nextNum=0;
                            booleanlefthide=true;
                        }
                        break;
                    }
                }
            }
            function reset(){
                $("#left").hide();
                $("#right").show();
                scaling=0;
                value=0;
                value2=1;
                showSystem=false;
                advancedTexture2.layer.layerMask = 0x80000000;
			    nextNum=0;
                SolarSystemDot.isPickable = true;
                SolarSystemBorder.isPickable = true;  
                GalaxySystemDot.isPickable = true;
                       CometGlow.scaling=new BABYLON.Vector3(0.004,0.004,0.004);
                $('#prompt').html('总星系');
                 camera.setPosition(new BABYLON.Vector3(300,300,0));
                advancedTexture.layer.layerMask = 0x80000000;
                GalaxyMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
                GalaxyOutMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
                GalaxySPSMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
                OtherMaterial.setVector4("color", new BABYLON.Vector4(1, 1, 1, 1));
                HeavenlySystem.scaling=new BABYLON.Vector3(0.01,0.01,0.01);
            }
            function right(){
                nextNum++;
                goback=true;
                gotopostion();
            }
            function left(){
                nextNum--;
                goback=false;
                gotopostion()
            }
            thiz.canvas.addEventListener("pointerdown", onPointerDown, false);
            scene.onDispose = function() {thiz.canvas.removeEventListener("pointerdown", onPointerDown);}
            if (this.isMob) {
                $('#clear').on('touchstart', reset);
                $('#right').on('touchstart', right);
                $('#left').on('touchstart', left);
            } else {
                $('#clear').on('click', reset);
                $('#right').on('click', right);
                $('#left').on('click', left);
            }
            return scene;
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<style>
html,body,h1,h2,h3,h4,h5,h6,hr,p,iframe,dl,dt,dd,ul,ol,li,pre,form,button,input,textarea,th,td,fieldset {
    margin: 0;
    padding: 0;
    border: none;
}

html {
    font: 14px/1.5 "微软雅黑", "宋体", "sans-serif";
    background-color: #ffffff;
    word-break: break-all;
    color: #545454;
    overflow-y: scroll;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

ol,ul {
    list-style: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

img {
    width: 100%;
    border: 0;
}

a {
    text-decoration: none;
    color: #545454;
}

.control-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 76px;
    padding: 0;
    margin: 0;
    color: #fff;
    z-index: 999;
    background-color: transparent;
}

.control-container p {
    position: absolute;
    left: 24px;
    top: 24px;
    font-size: 24px;
}

.btn {
    position: absolute;
    width: 48px;
    height: 40px;
    right: 20px;
    top: 18px;
}

@media (width: 370px) and (height: 246px) {
    .three {
        margin: 0;
    }
    .control-container,
    .three .three-controller {
        display: none;
    }
}

body,html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: none;
    overflow: hidden;
    position: fixed;
    font-family: "Segoe WP", "Segoe UI", Verdana, Arial;
    touch-action: none;
    -ms-touch-action: none
}

.renderCanvas-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

#notSupported {
    color: #232F32;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #ffffff;
    text-align: center;
    padding-top: 0;
    font-size: 30px;
    z-index: 999;
    cursor: default
}

#renderCanvas {
    width: 100%;
    height: 100%;
    outline: 0
}

#fps {
    position: absolute;
    right: 20px;
    top: 5em;
    font-size: 20px;
    color: #fff;
    text-shadow: 2px 2px 0 #000
}
 #prompt {
    width: 160px;
    height: 40px;
    position: absolute;
    bottom: 20px;
    right: 70px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    border-radius: 6px;
    z-index: 999;
    background-color: #ffffff;
  }
  .btn2 {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0px;
    top: 0px;
}
   #right {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    border-radius: 6px;
    z-index: 999;
    background-color: #ffffff00;
  }
   #left {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 20px;
    right: 240px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    border-radius: 6px;
    z-index: 999;
    background-color: #ffffff00;
  }
.hidden {
    display: none
}
</style>