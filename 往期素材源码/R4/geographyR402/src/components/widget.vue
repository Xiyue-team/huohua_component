<template>
    <div>
        <div class="control-container">
            <p>晨昏线</p>
            <i id="clear"><img class="btn" src="static/image/chongzhi.png" /></i>
        </div>
        <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <div id="ts" :style="'position:absolute;z-index:666;width:100%;height:100%;background:rgba(0,0,0,0.5)'">
            <div :style="'position:absolute;z-index:666;width:100px;height:50px;margin:auto;left:0;right:0;top:22%;'">
                <img src="static/image/jt.png" alt="" :style="'height:14px;width:auto;position:absolute;left:0;right:0;margin:auto;'">
                <img src="static/image/ts.png" alt="" :style="'height:40px;width:auto;position:absolute;right:-225px;top:-20px;margin:auto;'">
            </div>
        </div>
        <div id="notSupported" class="hidden">loading...</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMob: /iPad|Android/g.test(navigator.userAgent),
            canvas: null,
            checked: false,
            sceneChecked: false,
        };
    },
    methods: {
        init() {
            // Launch render loop
            this.canvas = document.getElementById("renderCanvas");
            var engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
            var thiz = this;
            window.addEventListener("resize", () => {
                $('.renderCanvas-container').height($(window).height());
                engine.resize();
            });
            if (!BABYLON.Engine.isSupported()) {
                //TODO显示webgl不支持信息
            } else {
                var scene = this.loadCustomScene(this.createScene, () => {

                }, engine);
                var renderFunction = function() {
                    // Render scene
                    if (scene) {
                        if (scene.activeCamera) {
                            scene.render();
                        }
                        // Streams
                        if (scene.useDelayedTextureLoading) {
                            var waiting = scene.getWaitingItemsCount();
                            if (waiting <= 0) {
                                document.getElementById("notSupported").className = "hidden";
                            }
                        } else if (!thiz.sceneChecked) {
                            var remaining = scene.getWaitingItemsCount();
                            if (remaining === 0) {
                                thiz.sceneChecked = true;
                                document.getElementById("notSupported").className = "hidden";
                            }
                        }
                    }
                };
                engine.runRenderLoop(renderFunction);
            }
            $('.renderCanvas-container').height($(window).height());
            engine.resize();
        },
        // Render loop
        loadCustomScene(demoConstructor, then, engine) {
            document.getElementById("notSupported").className = "";
            var scene = demoConstructor(engine);
            if (scene.activeCamera) {
                scene.activeCamera.attachControl(this.canvas, false);
            }
            scene.executeWhenReady(() => {
                this.canvas.style.opacity = 1;
                if (then) {
                    then(scene);
                }
            });
            return scene;
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
            var colorindex = 0.2;
            var r = 3;
            this.canvas = engine.getRenderingCanvas();
            engine.enableOfflineSupport = false;
            var scene = new BABYLON.Scene(engine);
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.1;
            var light1 = new BABYLON.DirectionalLight("Omni2", new BABYLON.Vector3(-1, 0, 0), scene);
            light1.intensity = 1;
            var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 15, BABYLON.Vector3.Zero(), scene);
            camera.lowerRadiusLimit = 15;
            camera.upperRadiusLimit = 15;
            camera.minZ = 1.0;
            camera.layerMask = 2;
            scene.activeCamera = camera;
            scene.clearColor.set(0, 0, 0.3, 1);

            var earthp = new BABYLON.Mesh("p", scene);
            earthp.position = new BABYLON.Vector3(0, 0, 0);
            //地球node
            var earthgroup = new BABYLON.Mesh("g", scene);
            earthgroup.position = new BABYLON.Vector3(0, 0, 0);
            //地球node
            var earthgroupcloud = new BABYLON.Mesh("g", scene);
            earthgroupcloud.position = new BABYLON.Vector3(0, 0, 0);

            earthgroup.setParent(earthp);


            function createtext(mesh, name) {
                var plane = BABYLON.Mesh.CreatePlane("plane", 0.5);
                plane.rotation = mesh.rotation;
                plane.parent = mesh;
                var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
                var panel2 = new BABYLON.GUI.StackPanel();
                panel2.top = "0px";
                advancedTexture2.addControl(panel2);
                var text1 = new BABYLON.GUI.TextBlock();
                text1.text = name;
                text1.fontSize = "256px"
                text1.color = "#fff";
                panel2.addControl(text1);
            }
            function createWefttext(mesh, name) {
                var plane = BABYLON.Mesh.CreatePlane("plane", 0.5);
                plane.rotation = new BABYLON.Vector3(mesh.rotation.x, -Math.PI / 2, 0);
                if (name == "国际日期变更线") {
                    plane.rotation = new BABYLON.Vector3(Math.PI + mesh.rotation.x, -Math.PI / 2, Math.PI / 2);
                } else if (name == "本初子午线") {
                    plane.rotation = new BABYLON.Vector3(Math.PI + mesh.rotation.x, Math.PI / 2, Math.PI / 2);
                }
                var plane1 = new BABYLON.Mesh("plane", scene);
                plane1.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
                plane.setParent(plane1);
                mesh.rotation = new BABYLON.Vector3(0, 0, 0);
                plane1.parent = mesh;
                var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
                var panel2 = new BABYLON.GUI.StackPanel();
                panel2.top = "0px";
                advancedTexture2.addControl(panel2);
                var text1 = new BABYLON.GUI.TextBlock();
                text1.text = name;
                text1.fontSize = "256px"
                text1.color = "#fff";
                panel2.addControl(text1);
            }
            //根据半径、角度求圆上的点，并设置坐标轴及轴上的值
            function drawcircle(r, ang, axisvalue, axis) {
                var x = r * Math.cos(ang * Math.PI / 180);
                var y = r * Math.sin(ang * Math.PI / 180);
                if (axis == "x") {
                    return new BABYLON.Vector3(axisvalue, x, y);
                } else if (axis == "z") {
                    return new BABYLON.Vector3(x, y, axisvalue);
                } else {
                    return new BABYLON.Vector3(x, axisvalue, y);
                }
            }
            //设置将要画圆的坐标集
            function setvertices(r, value, y, axis) {
                var vertices = [];
                for (var i = 0; i <= value; i += 3 / r) {
                    vertices.push(drawcircle(r, i, y, axis));
                }
                vertices.push(drawcircle(r, value, y, axis));
                return vertices;
            }
            //画出可更新的圆，并设置颜色
            function createCircle(r, value, y, color, scene, axis) {
                var vertices = setvertices(r, value, y, axis);
                var circle = BABYLON.MeshBuilder.CreateLines("lines", {
                    points: vertices,
                    updatable: true,
                    instance: circle
                }, scene);
                circle.color = color;
                return circle;
            }
            //画出可更新的圆，并设置颜色
            function createDashedCircle(r, value, y, color, scene, axis) {
                var vertices = setvertices(r, value, y, axis);
                var Dashedcircle = BABYLON.Mesh.CreateDashedLines("lines", vertices, 10, 10, vertices.length, scene, true, Dashedcircle);
                Dashedcircle.color = color;
                return Dashedcircle;
            }
            var i;
            //创建纬线
            function CreateWeft(r, percentPI, color) {
                for (i = 0; i < 90; i += percentPI) {
                    if (i == 0) {
                        // CreateWeftLine(i, r, 360, color);
                    } else {
                        CreateWeftLine(i, r, 360, color);
                        CreateWeftLine(i, r, 360, color, true);
                    }
                }
            }
            //创建纬线标签
            function CreateWeftLabel(r, percentPI) {
                for (i = 0; i < 90; i += percentPI) {
                    if (i == 0) {
                        //CreateWeftLineLabel(i, r);
                    } else {
                        CreateWeftLineLabel(i, r);
                        CreateWeftLineLabel(i, r, true);
                    }
                }
            }
            function CreateWeftLineLabel(earthangle, r, pos) {
                //earthangle地球从赤道开始角度
                var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
                var rot = new BABYLON.Vector3(earthangle * Math.PI / 180, 0, 0);
                if (pos) {
                    var y = Math.sqrt(r * r - x * x);//所算出y值
                } else {
                    var y = -Math.sqrt(r * r - x * x);//所算出y值
                    rot = new BABYLON.Vector3(-earthangle * Math.PI / 180, 0, 0);
                }

                var circledot = new BABYLON.Mesh("g", scene);
                circledot.rotation = rot;
                circledot.position = new BABYLON.Vector3(x, y, 0);

                if (earthangle == 23.26 && pos) {
                    createWefttext(circledot, "北回归线");
                } else if (earthangle == 23.26 && !pos) {
                    createWefttext(circledot, "南回归线");
                } else if (earthangle == 66.74 && pos) {
                    createWefttext(circledot, "北极圈");
                } else if (earthangle == 66.74 && !pos) {
                    createWefttext(circledot, "南极圈");
                } else if (earthangle == 31.1 && pos) {
                    circledot.position = new BABYLON.Vector3(-x, y, 0);
                    circledot.rotation = new BABYLON.Vector3(-earthangle * Math.PI / 180, Math.PI, 0);
                    createWefttext(circledot, "国际日期变更线");
                } else if (earthangle == 7.2 && pos) {
                    circledot.rotation = new BABYLON.Vector3(-earthangle * Math.PI / 180, Math.PI, 0);
                    createWefttext(circledot, "本初子午线");
                } else if (earthangle == 0 && pos) {
                    circledot.rotation = new BABYLON.Vector3(-earthangle * Math.PI / 180, Math.PI, 0);
                    createWefttext(circledot, "赤道");
                } else {
                    createWefttext(circledot, earthangle + "°");
                }
                circledot.setParent(earthgroup);
            }
            function CreateWeftLine(earthangle, r, angle, color, pos) {
                //earthangle地球从赤道开始角度
                var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
                if (pos) {
                    var y = Math.sqrt(r * r - x * x);//所算出y值
                } else {
                    var y = -Math.sqrt(r * r - x * x);//所算出y值
                }
                var circle = createCircle(x, angle, y, color);
                circle.setParent(earthgroup);
            }
            //创建纬线（虚线）
            function CreateDashedWeft(earthangle, r, angle, color, pos) {
                //earthangle地球从赤道开始角度
                var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
                if (pos) {
                    var y = Math.sqrt(r * r - x * x);//所算出y值
                } else {
                    var y = -Math.sqrt(r * r - x * x);//所算出y值
                }
                var Dashedcircle = createDashedCircle(x, angle, y, color);
                Dashedcircle.setParent(earthgroup);
            }
            //创建经线
            function createWarp(r, percentPI, color) {

                for (i = 0; i < 2 * Math.PI; i += Math.PI / percentPI) {
                    var ncircles = createCircle(r, 360, 0, color, scene, "x");
                    var rot = new BABYLON.Vector3(0, i, 0);
                    ncircles.rotation = rot;
                    ncircles.setParent(earthgroup);
                }
            }
            //设置将要画国际日期变更线的坐标集
            function setDateChangevertices(r, value, y) {
                var verty = [];
                for (var i = 0; i <= value; i++) {
                    var varr = r / 180 * 2 * i - r;
                    var yv = Math.sqrt(r * r - varr * varr);
                    verty.push(yv);
                }
                var rotangle = 0;
                var vertices = [];
                for (var i = 0; i <= value; i++) {
                    var va = r / 180 * 2 * i - r;
                    if (i >= 20 && i < 25) {
                        rotangle = rotangle + 1;
                    } else if (i >= 60 && i < 70) {
                        rotangle = rotangle - 0.5;
                    } else if (i >= 160 && i < 163) {
                        rotangle = rotangle - 2.8;
                    } else if (i >= 163 && i < 169) {
                        rotangle = rotangle + 1.77;
                    } else if (i >= 169 && i < 174) {
                        rotangle = rotangle + 1.80;
                    } else if (i >= 177 && i < 178) {
                        rotangle = rotangle - 11;
                    }
                    vertices.push(drawcircle(verty[i], rotangle, va));
                }
                return vertices;
            }
            //创建国际日期变更线
            function createDateChangeLine(r, value, y, color, scene) {
                var vertices = setDateChangevertices(r, value, y);
                var circle = BABYLON.MeshBuilder.CreateLines("lines", {
                    points: vertices, updatable: true, instance: circle
                }, scene);
                circle.color = color;
                circle.rotation.y = Math.PI;
                circle.setParent(earthgroup);
            }
            //创建经线
            function createWarpLabel(r, percentPI) {
                var anglev = 0;
                for (i = 0; i < 2 * Math.PI; i += Math.PI / percentPI) {
                    var vall = i / 2 + Math.PI / 4;
                    var rot = new BABYLON.Vector3(0, -vall, 0);
                    var x = r * Math.cos(i);
                    var z = r * Math.sin(i);
                    var circledot = new BABYLON.Mesh("g", scene);
                    circledot.rotation = rot;
                    circledot.position = new BABYLON.Vector3(x, 0, z);
                    if (anglev < 180 && anglev > 0) {
                        createtext(circledot, anglev + "°");
                    } else if (anglev == 180) {
                        var va = 360 - anglev;
                        createtext(circledot, "东经" + va + "°西经");
                    } else if (anglev == 0) {
                        createtext(circledot, "西经" + anglev + "°东经");
                    } else {
                        var va = 360 - anglev;
                        createtext(circledot, va + "°");
                    }
                    circledot.setParent(earthgroup);
                    anglev += 6 / percentPI * 30;
                }
            }

            var linecolor = new BABYLON.Color3(0.5, 0.5, 0.5);
            var DashedLineColor = new BABYLON.Color3(1, 1, 0);
            var lineradius = r + 0.01;
            CreateWeft(lineradius, 15, linecolor);//创建纬线：0°至南北纬90°，间隔15°；
            CreateDashedWeft(23.26, lineradius, 360, DashedLineColor, true);//创建回归线：0°至南北纬90°，间隔30°；
            CreateDashedWeft(23.26, lineradius, 360, DashedLineColor);
            CreateDashedWeft(66.74, lineradius, 360, DashedLineColor);//创建极圈：0°至南北纬90°，间隔30°；
            CreateDashedWeft(66.74, lineradius, 360, DashedLineColor, true);
            CreateWeftLine(0, lineradius, 360, DashedLineColor, true);
            createWarp(lineradius, 12, linecolor);//创建经线：起始线0°至180°，间隔30°；

            CreateWeftLineLabel(23.26, lineradius);
            CreateWeftLineLabel(23.26, lineradius, true);
            CreateWeftLineLabel(66.74, lineradius);
            CreateWeftLineLabel(66.74, lineradius, true);
            CreateWeftLineLabel(0, lineradius, true);

            //画地球
            var daySampler = new BABYLON.Texture("./static/earth/earth8k.jpg", scene);
            var nightSampler = new BABYLON.Texture("./static/earth/night.jpg", scene);

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
            //地球偏移node偏移

            // Another GUI on the right
            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            advancedTexture.layer.layerMask = 2;
            var panel3 = new BABYLON.GUI.StackPanel();
            panel3.width = "200px";
            panel3.fontSize = "18px";
            panel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            panel3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            advancedTexture.addControl(panel3);

            var header = new BABYLON.GUI.TextBlock();
            header.text = "太阳直射点:" + 0 + "°";
            header.height = "150px";
            header.color = "#ff0";
            header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            header.paddingTop = "30px";
            panel3.addControl(header);

            var tex = new BABYLON.Texture("static/image/SPACE006SX.jpg", scene);
            var material2 = new BABYLON.StandardMaterial("kosh2", scene);
            var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
            material2.diffuseTexture = tex;
            material2.emissiveTexture = tex;
            material2.backFaceCulling = false;
            skybox.material = material2;

            var sliderangular = 23.26;
            var gotoautumn = true;

            function onValueChange(value) {
                var val = value / Math.PI * 180;
            }

            // Events
            var sliderR = r + 0.6;
            var minvalue = -Math.cos(66.5 * Math.PI / 180) * sliderR;
            var maxvalue = Math.cos(66.5 * Math.PI / 180) * sliderR;
            var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * sliderR + 0.6, 0.05, 0.05, 16, 1, scene);
            var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
            cylinderMat.emissiveColor = BABYLON.Color3.Gray();
            cylinder.material = cylinderMat;
            cylinder.setParent(earthgroup);

            var dot = BABYLON.Mesh.CreateSphere("controller", 32, 0.8, scene);
            dot.position = new BABYLON.Vector3(0, sliderR, 0);
            dot.isVisible = false;
            var ground = BABYLON.Mesh.CreateGround("ground", 2 * sliderR + 1, 2 * sliderR + 1, 1, scene, false);
            ground.rotation.x = -1 / 180 * 90 * Math.PI;
            ground.isVisible = false;

            //晨昏线
//            var circleCH = BABYLON.Mesh.CreateTorus("tk",2*r+0.01,0.01,72, scene);
//            circleCH.color=new BABYLON.Color3(0,0,0);
//            circleCH.rotation.x=Math.PI/2;
//            circleCH.rotation.y=Math.PI/2;
//            var circleCHMat = new BABYLON.StandardMaterial("circleCH", scene);
//            circleCHMat.diffuseColorColor = new BABYLON.Color3(0,0,0);
//            circleCHMat.specularColor = new BABYLON.Color3(0,0,0);
//            circleCHMat.emissiveColor = new BABYLON.Color3(0,0,1);
//            circleCH.material=circleCHMat;
            var vertices=[];
            for(var i=0;i<361;i++){
                var x=r*Math.cos(i*Math.PI/180);
                var y=r*Math.sin(i*Math.PI/180);
                vertices.push(new BABYLON.Vector3(x, y, 0));
            }
            var circle = BABYLON.MeshBuilder.CreateLines("lines", {
                points: vertices,
            }, scene);
            circle.color=new BABYLON.Color3(0,0,1);
            circle.rotation.y=Math.PI/2;

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
            camera.attachControl(this.canvas, false);
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
                            camera.detachControl(thiz.canvas);
                        }
                    }
                }
            }

            var onPointerUp = function() {
                if (startingPoint) {
                    camera.attachControl(thiz.canvas, true);
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
                        camera.attachControl(thiz.canvas, true);
                        startingPoint = null;
                        hasCurrentMesh = false;
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
                    currentMesh.position.y = Math.sqrt(sliderR * sliderR - maxvalue * maxvalue);
                    sliderang = 1 / 180 * 23.5 * Math.PI;
                } else if (startingPoint.x < minvalue) {
                    currentMesh.position.x = minvalue;
                    currentMesh.position.y = Math.sqrt(sliderR * sliderR - minvalue * minvalue);
                    sliderang = -1 / 180 * 23.5 * Math.PI;
                }

                var slidervalue = currentMesh.position.x / sliderR / 180 * 90 * Math.PI;
                onValueChange(slidervalue);
                var ang = sliderang / Math.PI * 180;
                var angleabs = Math.abs(ang.toFixed(2));
                if (ang.toFixed(2) < 0) {
                    header.text = "太阳直射点:" + angleabs + "°S";
                } else {
                    header.text = "太阳直射点:" + angleabs + "°N";
                }
                // header.text = "太阳直射点:"+ angleabs + "°N~0°~"+ angleabs + "°S";// + Math.abs(ang.toFixed(2)) + "°";
                earthp.rotation.z = -sliderang;
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

            $('#clear').on('click', () => {
                onValueChange(0);
                earthp.rotation.z = 0;
                header.text = "太阳直射点:0°";
                dot.position = new BABYLON.Vector3(0, sliderR, 0);
                camera.attachControl(this.canvas, false);
                camera.radius = 15;
                camera.alpha = -Math.PI / 2;
                camera.beta = Math.PI / 2;
                $('#check>span').css('background', '#F0F0F0').children().css({ 'left': '2px', 'right': 'auto' });
            });
            var alpha = 0;
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
    position: absolute;
    z-index: 555;
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

.hidden {
    display: none
}


#check>span {
    width: 40px;
    height: 24px;
    background: #F0F0F0;
    border-radius: 13px;
    position: absolute;
    right: 12px;
    top: 11px;
}

#check>span>span {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #FFFFFF;
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 2px;
    left: 2px;
}
</style>