<template>
    <div id="app">
        <div class="control-container">
            <p>黄赤交角与温度带</p>
            <i id="clear"><img class="btn" src="static/image/chongzhi.png" /></i>
        </div>
        <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <div id="ts" :style="'position:absolute;z-index:666;width:100%;height:100%;background:rgba(0,0,0,0.5)'">
            <div :style="'position:absolute;z-index:666;width:100px;height:50px;margin:auto;left:0;right:0;top:21%;'">
                <img src="static/image/jt.png" alt="" :style="'height:14px;width:auto;position:absolute;left:0;right:0;margin:auto;'">
                <img src="static/image/ts.png" alt="" :style="'height:40px;width:auto;position:absolute;right:-225px;top:-20px;margin:auto;'">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            canvas: null,
            SET:window.SET
        };
    },
    methods: {
        init() {
            this.canvas = document.getElementById("renderCanvas");
            var engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
            if (!BABYLON.Engine.isSupported()) {
                //TODO显示webgl不支持信息
            } else {
                var scene = this.loadCustomScene(this.createScene, (scene) => {
                    // Launch render loop
                }, engine);
                var renderTimes=0;
                var renderFunction =()=>{
                    var sceneChecked = null;
                    // Render scene
                    if (scene) {
                        if (scene.activeCamera) {
                            renderTimes++;
                            if(renderTimes%4!=0)return;
                            scene.render();
                        }
                        // Streams
                        if (scene.useDelayedTextureLoading) {
                            var waiting = scene.getWaitingItemsCount();
                            if (waiting <= 0) {
                                document.getElementById("notSupported").className = "hidden";
                                clearInterval(this.SET);
                            }
                        } else if (!sceneChecked) {
                            var remaining = scene.getWaitingItemsCount();
                            if (remaining == 0) {
                                sceneChecked = true;
                                document.getElementById("notSupported").className = "hidden";
                                clearInterval(this.SET);
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
            // engine.displayLoadingUI();
            var scene = demoConstructor(engine);
            if (scene.activeCamera) {
//                scene.activeCamera.attachControl(this.canvas, false);
            }

            scene.executeWhenReady(() => {
                this.canvas.style.opacity = 1;
                // engine.hideLoadingUI();
                if (then) {
                    then(scene);
                }
            });
            return scene;
        },
        drawcircle(r, ang, y) {
            var x = r * Math.cos(ang * Math.PI / 180);
            var z = r * Math.sin(ang * Math.PI / 180);
            return new BABYLON.Vector3(x, y, z);
        },
        setvertices(r, value, y) {
            var vertices = [];
            for (var i = 0; i <= value; i++) {
                vertices.push(this.drawcircle(r, i, y));
            }
            return vertices;
        },
        createcircle(r, value, y, scene) {
            var vertices = this.setvertices(r, value, y);
            var circle = BABYLON.MeshBuilder.CreateLines("lines", {
                points: vertices,
                updatable: true,
                instance: circle
            }, scene);
            return circle;
        },
        createLabel(advancedTexture, mesh, name) {
            var label = new BABYLON.GUI.Rectangle(name);
            label.height = "20px";
            label.alpha = 1;
            label.width = "80px";
            label.cornerRadius = 20;
            label.thickness = 0;
            label.linkOffsetX = 30;
            advancedTexture.addControl(label);
            label.linkWithMesh(mesh);
            var text1 = new BABYLON.GUI.TextBlock();
            text1.text = name;
            text1.fontSize = "12px"
            text1.color = "white";
            label.addControl(text1);
        },
        createScene(engine) {
            var earthFragmentShader = "precision highp float;\r\n" +
                "varying vec3 vPosition;\r\n" +
                "varying vec3 vNormal;\r\n" +
                "varying vec2 vUV;\r\n" +
                "uniform mat4 world;\r\n" +
                "uniform vec3 cameraPosition;\r\n" +
                "uniform vec3 lightVectorW;\r\n" +
                "uniform sampler2D daySampler;\r\n" +
                "uniform sampler2D nightSampler;\r\n" +
                "uniform float intsmooth;\r\n" +
                "uniform float intsmootht;\r\n" +
                "void main(void) {\r\n" +
                "vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\n" +
                "vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n" +
                "vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\n" +
                "vec4 daycolor = texture2D(daySampler, vUV).rgba;\r\n" +
                "vec4 nightcolor = texture2D(nightSampler, vUV).rgba;\r\n" +
                "float ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;\r\n" +
                "float ndlt = max(0., dot(vNormalW, lightVectorW)) * intsmootht;\r\n" +
                "vec3 angleW = normalize(viewDirectionW + lightVectorW);\r\n" +
                "float specComp = max(0., dot(vNormalW, angleW));\r\n" +
                "specComp = pow(specComp, max(1., 64.)) *0.1;\r\n" +
                "vec4 color=vec4(0.,0.,0.,0.);\r\n" +
                "if (nightcolor.r*(1.-ndlt)>=0.3) {\r\n" +
                "nightcolor.rgb=nightcolor.rgb*1.5;\r\n" +
                "nightcolor.rg=nightcolor.rg+vec2(0.2,0.2);\r\n" +
                "\r\n}else{\r\n" +
                "nightcolor.rgb=nightcolor.rgb*0.1;\r\n" +
                "\r\n}" +
                "daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl + vec3(specComp);\r\n" +
                "gl_FragColor = vec4(daycolor);\r\n}\r\n";
            var customVertexShader = "precision highp float;\r\n" +
                "attribute vec3 position;\r\n" +
                "attribute vec3 normal;\r\n" +
                "attribute vec2 uv;\r\n" +
                "uniform mat4 worldViewProjection;\r\n" +
                "varying vec3 vPosition;\r\n" +
                "varying vec3 vNormal;\r\n" +
                "varying vec2 vUV;\r\n" +
                "void main(void) {\r\n" +
                "vec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\n" +
                "gl_Position = outPosition;\r\n" +
                "vUV = uv;\r\n" +
                "vPosition = position;\r\n" +
                "vNormal = normal;\r\n}\r\n";
            var customFragmentShader = "precision highp float;\r\n" +
                "varying vec3 vPosition;\r\n" +
                "varying vec3 vNormal;\r\n" +
                "varying vec2 vUV;\r\n" +
                "uniform mat4 world;\r\n" +
                "uniform vec3 cameraPosition;\r\n" +
                "uniform vec3 lightVectorW;\r\n" +
                "uniform sampler2D textureSampler;\r\n" +
                "uniform float mixsmooth;\r\n" +
                "uniform float intsmooth;\r\n" +
                "uniform float time;\r\n" +
                "void main(void) {\r\n" +
                "vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\n" +
                "vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n" +
                "vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\n" +
                // "vec2 UV = vec2(vUV.x+sin(time)*0.1+sin(vPosition.x)*0.01,vUV.y);\r\n" +
                "vec4 color = texture2D(textureSampler, vUV).rgba;\r\n" +
                "float ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;\r\n" +
                "vec3 angleW = normalize(viewDirectionW + lightVectorW);\r\n" +
                "float specComp = max(0., dot(vNormalW, angleW));\r\n" +
                "specComp = pow(specComp, max(1., 64.)) * 0.1;\r\n" +
                "color.rgb =color.rgb*mixsmooth+ color.rgb* ndl + vec3(specComp);\r\n" +
                "gl_FragColor = vec4(color);\r\n}\r\n";

            var thiz = this;
            var r = 3;
            this.canvas = engine.getRenderingCanvas();
            engine.enableOfflineSupport = false;
            var scene = new BABYLON.Scene(engine);
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.1;
            var light1 = new BABYLON.DirectionalLight("Omni2", new BABYLON.Vector3(-1, 0, 0), scene);
            light1.intensity = 1;
            var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2-Math.PI/12, 15, BABYLON.Vector3.Zero(), scene);
//            camera.attachControl(this.canvas, false);
            camera.lowerRadiusLimit = 15;
            camera.upperRadiusLimit = 15;
            camera.minZ = 1.0;
            camera.layerMask = 2;
            scene.activeCamera = camera;

            function createtext(mesh, name) {
                var plane = BABYLON.Mesh.CreatePlane("plane", 8);
                plane.rotation = mesh.rotation;
                plane.parent = mesh;
                var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
                var panel2 = new BABYLON.GUI.StackPanel();
                panel2.top = "0px";
                advancedTexture2.addControl(panel2);
                var text1 = new BABYLON.GUI.TextBlock();
                text1.text = name;
                text1.fontSize = "8px"
                text1.color = "#fff";
                panel2.addControl(text1);
            }


            var VertexShader = "precision highp float;\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 uv;\r\nuniform mat4 worldViewProjection;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nvoid main(void) {\r\nvec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\ngl_Position = outPosition;\r\nvUV = uv;\r\nvPosition = position;\r\nvNormal = normal;\r\n}\r\n";
            var FragmentShader = "precision highp float;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nuniform mat4 world;\r\nuniform vec3 cameraPosition;\r\nuniform vec3 color1;\r\nuniform vec3 color2;\r\nuniform vec3 color3;\r\nuniform vec3 color4;\r\nuniform float boolgraw;\r\nuniform float lineoffset;\r\nuniform float lineoffset2;\r\nuniform sampler2D textureSampler;\r\nvoid main(void) {\r\nvec3 vLightPosition = vec3(200,0,0);\r\nvec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\nvec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\n vec3 lightVectorW = normalize(vLightPosition - vPositionW);\r\n vec3 color = texture2D(textureSampler, vUV).rgb;\r\nfloat ndl = max(0., dot(vNormalW, lightVectorW));\r\nvec3 addcolor=vec3(1,1,1);\r\nif(boolgraw==0.){\r\nif((vPosition.y>lineoffset&&vPosition.y<lineoffset2)||(vPosition.y<-lineoffset&&vPosition.y>-lineoffset2)){\r\n addcolor=color1;\r\n }else if(vPosition.y<lineoffset&&vPosition.y>-lineoffset){\r\naddcolor=color2;\r\n}else{\r\naddcolor=color3;\r\n}\r\n}else{\r\naddcolor=color4;\r\n}\r\nvec3 angleW = normalize(viewDirectionW + lightVectorW);\r\n float specComp = max(0., dot(vNormalW, angleW));\r\nspecComp = pow(specComp/2., max(1., 64.)) * 2.;\r\ngl_FragColor = vec4(addcolor, 0.3);\r\n}\r\n";
            BABYLON.Effect.ShadersStore["customVertexShader"] = VertexShader;
            BABYLON.Effect.ShadersStore["customFragmentShader"] = FragmentShader;
            var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                vertex: "custom",
                fragment: "custom",
            }, {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
                    needAlphaBlending: true
                });
            var mainTexture = new BABYLON.Texture("static/image/textures/5665_96e613415040362e27cb94c335597.jpg", scene);
            shaderMaterial.setTexture("textureSampler", mainTexture);
            shaderMaterial.setFloat("time", 0);
            shaderMaterial.setFloat("lineoffset", 1);
            shaderMaterial.setFloat("lineoffset2", 2.5);
            shaderMaterial.setFloat("boolgraw", 1);
            shaderMaterial.setVector3("color1", new BABYLON.Vector3(0, 0.8, 0.3));
            shaderMaterial.setVector3("color2", new BABYLON.Vector3(0.7, 0.4, 0.02));
            shaderMaterial.setVector3("color3", new BABYLON.Vector3(0.02, 0.3, 0.8));
            shaderMaterial.setVector3("color4", new BABYLON.Vector3(0., 0., 0.));
            shaderMaterial.setVector3("cameraPosition", camera.position);
            shaderMaterial.backFaceCulling = false;

            var earthgroup = new BABYLON.Mesh("g", scene);
            earthgroup.position = new BABYLON.Vector3(0, 0, 0);
            //地球node
            var earthgroupcloud = new BABYLON.Mesh("g", scene);
            earthgroupcloud.position = new BABYLON.Vector3(0, 0, 0);
            var earthp = new BABYLON.Mesh("p", scene);
            earthp.position = new BABYLON.Vector3(0, 0, 0);
            var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
            earth.material = shaderMaterial;
            earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
            earthgroup.setParent(earthp);
            earth.setParent(earthgroup);

            //画地轴
            function CreateAxisLine(radius, parent) {
                var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * radius, 0.05, 0.05, 16, 1, scene);
                var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
                cylinderMat.emissiveColor = BABYLON.Color3.Gray();
                cylinder.material = cylinderMat;
                cylinder.setParent(parent);
            }
            CreateAxisLine(r + 1, earthgroup);
            //画地球
//            var diffusetex = new BABYLON.Texture("./static/earth/earth8k.jpg", scene);
            var daySampler = new BABYLON.Texture("./static/earth/earth8k.jpg", scene);
            var nightSampler = new BABYLON.Texture("./static/earth/night.jpg", scene);
//            var NRMtex = new BABYLON.Texture("./static/earth/earth8k_NRM.jpg", scene);

            BABYLON.Effect.ShadersStore["earthVertexShader"] = customVertexShader;
            BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
            var earthforMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "earth", fragment: "earth", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"] });
            earthforMaterial.setTexture("daySampler", daySampler);
            earthforMaterial.setTexture("nightSampler", nightSampler);
            earthforMaterial.setVector3("cameraPosition", scene.activeCamera.position);
            earthforMaterial.setFloat("intsmooth", 1);//晨昏线明显度
            earthforMaterial.setFloat("intsmootht", 5);//晨昏线明显度
            earthforMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
            earthforMaterial.backFaceCulling = false;

            // var earthMaterial = new BABYLON.StandardMaterial("earth", scene);
            // earthMaterial.diffuseTexture = diffusetex;
            // earthMaterial.specularColor = new BABYLON.Color3(0., 0., 0.);

            var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
            earth.material = earthforMaterial;
            earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
            earth.setParent(earthgroup);

            //画地球云图
            var planTexture = new BABYLON.Texture("./static/earth/cloud.png", scene);
            BABYLON.Effect.ShadersStore["planVertexShader"] = customVertexShader;
            BABYLON.Effect.ShadersStore["planFragmentShader"] = customFragmentShader;
            var cloudMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "plan", fragment: "plan", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
            cloudMaterial.setTexture("textureSampler", planTexture);
            cloudMaterial.setVector3("cameraPosition", scene.activeCamera.position);
            cloudMaterial.setFloat("mixsmooth", 0.1);//云图阴影叠加值
            cloudMaterial.setFloat("intsmooth", 3.);//晨昏线明显度
            cloudMaterial.setFloat("time", 0);//晨昏线明显度
            cloudMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
            cloudMaterial.backFaceCulling = false;

            var cloud = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r + 0.1, scene);
            cloud.material = cloudMaterial;
            cloud.rotation = new BABYLON.Vector3(0, 0, Math.PI);
            cloud.setParent(earthgroupcloud);
            earthgroupcloud.setParent(earthgroup);


            var ncircle = thiz.createcircle(r, 360, 0);
            var scircle = thiz.createcircle(r, 360, 0);
            var ntcircle = thiz.createcircle(0., 360, 0);
            var stcircle = thiz.createcircle(0, 360, 0);
            ncircle.setParent(earthgroup);
            scircle.setParent(earthgroup);
            ntcircle.setParent(earthgroup);
            stcircle.setParent(earthgroup);

            var equatorial = thiz.createcircle(r, 360, 0);
            equatorial.setParent(earthgroup);
            // Skybox
            var tex = new BABYLON.Texture("static/image/textures/SPACE006SX.jpg", scene);
            var material2 = new BABYLON.StandardMaterial("kosh2", scene);
            var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
            material2.diffuseTexture = tex;
            material2.emissiveTexture = tex;
            material2.backFaceCulling = false;
            skybox.material = material2;
            var rot = new BABYLON.Vector3(0, -Math.PI / 4, 0);
            function createdot(position, rotation) {
                var dot = BABYLON.Mesh.CreateSphere("txt", 4, 0.01, scene);
                dot.position = position;
                dot.rotation = rotation;
                dot.setParent(earthgroup);
                return dot;
            }

            var txt = createdot(new BABYLON.Vector3(r, 0, 0), rot);
            var txt2 = createdot(new BABYLON.Vector3(-r, 0, 0), rot);
            var ttxt = createdot(new BABYLON.Vector3(0, r, 0), rot);
            var ttxt2 = createdot(new BABYLON.Vector3(0, -r, 0), rot);
            var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            advancedTexture2.layer.layerMask = 5;
            thiz.createLabel(advancedTexture2, txt, "北回归线");
            thiz.createLabel(advancedTexture2, txt2, "南回归线");
            thiz.createLabel(advancedTexture2, ttxt, "北极圈");
            thiz.createLabel(advancedTexture2, ttxt2, "南极圈");
            // createtext(txt, "北回归线");
            // createtext(txt2, "南回归线");
            // createtext(ttxt, "北极圈");
            // createtext(ttxt2, "南极圈");
            // Another GUI on the right
            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            advancedTexture.layer.layerMask = 2;

            var panel3 = new BABYLON.GUI.StackPanel();
            panel3.width = "150px";
            panel3.fontSize = "18px";
            panel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            panel3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            advancedTexture.addControl(panel3);

            var PH = BABYLON.MeshBuilder.CreatePlane("ctrl", {width: 9,height:7}, scene);
            PH.material = new BABYLON.StandardMaterial("red", scene);
            PH.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
            PH.material.specularColor = new BABYLON.Color3(1, 1, 1);
            PH.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
            PH.material.alpha=0.5;
            PH.layerMask=2;
            PH.rotation.x=Math.PI/2;

            var header = new BABYLON.GUI.TextBlock();
            header.text = "黄赤交角:" + 0 + "°";
            header.height = "150px";
            header.color = "#ff0";
            header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            header.paddingTop = "50px";
            panel3.addControl(header);

            function onValueChange(value) {
                var revalue = 90 - value;
                var addvalue = Math.cos(revalue * Math.PI / 180) * r;
                var taddvalue = Math.cos(value * Math.PI / 180) * r;
                if (value >= 45 || value <= 0) {
                    shaderMaterial.setFloat("boolgraw", 1);
                    advancedTexture2.layer.layerMask = 5;
                } else {
                    shaderMaterial.setFloat("boolgraw", 0);
                    advancedTexture2.layer.layerMask = 2;
                }
                scircle = BABYLON.MeshBuilder.CreateLines("lines", {
                    points: thiz.setvertices(Math.sqrt(r * r - addvalue * addvalue), 360, addvalue),
                    instance: scircle
                });
                ncircle = BABYLON.MeshBuilder.CreateLines("lines", {
                    points: thiz.setvertices(Math.sqrt(r * r - addvalue * addvalue), 360, -addvalue),
                    instance: ncircle
                });
                stcircle = BABYLON.MeshBuilder.CreateLines("lines", {
                    points: thiz.setvertices(Math.sqrt(r * r - taddvalue * taddvalue), 360, taddvalue),
                    instance: stcircle
                });
                ntcircle = BABYLON.MeshBuilder.CreateLines("lines", {
                    points: thiz.setvertices(Math.sqrt(r * r - taddvalue * taddvalue), 360, -taddvalue),
                    instance: ntcircle
                });
                txt.position = new BABYLON.Vector3(Math.sqrt(r * r - addvalue * addvalue), addvalue, 0);
                txt2.position = new BABYLON.Vector3(Math.sqrt(r * r - addvalue * addvalue), -addvalue, 0);
                ttxt.position = new BABYLON.Vector3(Math.sqrt(r * r - taddvalue * taddvalue), taddvalue, 0);
                ttxt2.position = new BABYLON.Vector3(Math.sqrt(r * r - taddvalue * taddvalue), -taddvalue, 0);

                shaderMaterial.setFloat("lineoffset2", taddvalue);
                shaderMaterial.setFloat("lineoffset", addvalue);

            }

            // Events
            var minvalue = 0;
            var sliderR = r + 0.6;
            var maxvalue = sliderR / Math.sqrt(2);
            var redMat = new BABYLON.StandardMaterial("ground", scene);
            redMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            redMat.specularColor = new BABYLON.Color3(0, 0, 0);
            redMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
            var dot = BABYLON.Mesh.CreateSphere("controller", 32, 1, scene);
            var dots = BABYLON.Mesh.CreateSphere("dot", 32, 0.05, scene);
            dots.material = redMat;
            dot.position = new BABYLON.Vector3(0, sliderR, 0);
            dots.position = new BABYLON.Vector3(0, sliderR, 0);
            dots.setParent(dot);
            dot.isVisible = false;
            dots.isVisible = false;
            var ground = BABYLON.Mesh.CreateGround("ground", 2 * sliderR + 1, 2 * sliderR + 1, 1, scene, false);
            ground.rotation.x = -1 / 180 * 90 * Math.PI;
            ground.isVisible = false;

            var startingPoint;
            var currentMesh;
            var getGroundPosition = function() {
                var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh) {
                    return mesh == ground;
                });
                if (pickinfo.hit) {
                    return pickinfo.pickedPoint;
                }
                return null;
            }
            var hasCurrentMesh = false;
            var onPointerDown = function(evt) {
                if (evt.button !== 0) {
                    return;
                }
                var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh) {
                    return mesh !== ground;
                });
                if (pickInfo.hit) {
                    if (hasCurrentMesh == false) {
                        currentMesh = pickInfo.pickedMesh;
                    }
                    if (currentMesh.name == "controller") {
                        hasCurrentMesh = true;
                        startingPoint = getGroundPosition(evt);
                        if (startingPoint) {
//                            camera.detachControl(thiz.canvas);
                        }
                    }
                }
            };

            var onPointerUp = function() {
                if (startingPoint) {
//                    camera.attachControl(thiz.canvas, true);
                    startingPoint = null;
                    hasCurrentMesh = false;
                    return;
                }
            }

            var onPointerMove = function(evt) {
                if (!startingPoint) {
                    return;
                }
                var current = getGroundPosition(evt);
                if (!current) {
                    if (startingPoint) {
                        startingPoint = null;
                        hasCurrentMesh = false;
//                        camera.attachControl(thiz.canvas, true);
                        return;
                    }
                    return;
                }
                var sliderang;
                if (startingPoint.x <= maxvalue && startingPoint.x >= minvalue) {
                    currentMesh.position.x = startingPoint.x;
                    currentMesh.position.y = Math.sqrt(sliderR * sliderR - startingPoint.x * startingPoint.x);
                    sliderang = Math.atan(currentMesh.position.x / currentMesh.position.y);
                } else if (startingPoint.x > maxvalue) {
                    currentMesh.position.x = maxvalue;
                    currentMesh.position.y = maxvalue;
                    sliderang = 1 / 180 * 45 * Math.PI;
                } else if (startingPoint.x < minvalue) {
                    currentMesh.position.x = minvalue;
                    currentMesh.position.y = sliderR;
                    sliderang = 0;
                }
                earthp.rotation.z = -sliderang;
                var ang = sliderang / Math.PI * 180;
                onValueChange(ang);
                header.text = "黄赤交角:" + Math.abs(ang.toFixed(2)) + "°";
                startingPoint = current;
            }

            thiz.canvas.addEventListener("pointerdown", onPointerDown, false);
            thiz.canvas.addEventListener("pointerup", onPointerUp, false);
            thiz.canvas.addEventListener("pointermove", onPointerMove, false);

            scene.onDispose = function() {
                thiz.canvas.removeEventListener("pointerdown", onPointerDown);
                thiz.canvas.removeEventListener("pointerup", onPointerUp);
                thiz.canvas.removeEventListener("pointermove", onPointerMove);
            }
//            var STT=setTimeout(function () {
//                $('#ts').hide();
//                clearTimeout(STT);
//            },3000);
            $('#ts').on('touchstart',function () {
                $('#ts').hide();
            });
            $('#ts').on('click',function () {
                $('#ts').hide();
            });
            var alpha = 0;
            $('#clear').on('click', function() {
                onValueChange(0);
                earthp.rotation.z = 0;
                camera.alpha = -Math.PI / 2;
                camera.beta = Math.PI / 2-Math.PI/12;
                camera.radius = 15;
                dot.position = new BABYLON.Vector3(0, sliderR, 0);
                header.text = "黄赤交角:" + 0 + "°";
            });
            scene.registerBeforeRender(function() {
                var activeCameraPosition = scene.activeCamera.position;
                var direction = new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z);
                cloudMaterial.setVector3("cameraPosition", activeCameraPosition);
                cloudMaterial.setVector3("lightVectorW", direction);
                cloudMaterial.setFloat("time", alpha);//晨昏线明显度
                earthforMaterial.setVector3("cameraPosition", activeCameraPosition);
                earthforMaterial.setVector3("lightVectorW", direction);
                earthgroupcloud.rotation = new BABYLON.Vector3(0, alpha * 0.2, 0);
                earthgroup.rotation = new BABYLON.Vector3(0, -alpha, 0);
                alpha += 0.002;
            });
            return scene;
        }
    },
    mounted() {
        var thiz = this;
        this.init();
    }
}
</script>

<style>
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
iframe,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
button,
input,
textarea,
th,
td,
fieldset {
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

ol,
ul {
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
    background-color: transparent;
    z-index: 666;
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
    cursor: pointer;
}

body,
html {
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
    /* background-color: #ffffff; */
}
#renderCanvas {
    width: 100%;
    height: 100%;
    outline: 0
}
.hidden {
    display: none
}
</style>
