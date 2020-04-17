<template>
  <div id="app">
    <div class="title">
      <h2>太阳回归运动与三线谱</h2>
      <i id="reset"><img class="btn" src="static/image/reset.png"/></i>
    </div>
    <div class="main" ref="main">
      <div class="main-left">
        <canvas id="renderCanvas" touch-action="none" tabindex="1" ref="renderCanvas"></canvas>
        <div class="b1">23°26′N</div>
        <div class="b2">23°26′S</div>
        <div class="time" :style="'z-index:999;pointer-events:none;height：1px;'"></div>
      </div>
      <!--<div style="position:absolute;top:0;left:0;width:50%;height: 100%;background-color: transparent;z-index: 999;"></div>-->
    </div>
    <div id="notSupported">loading...</div>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                isMob:'',
                sc:0,
            };
        },
        methods: {
            init1:function () {
                this.isMob = /iPad|Android/g.test(navigator.userAgent);
                this.sc=692/510/700*600;
                $('.main-left>.b1').css({'right':window.innerWidth/2-75*this.sc*window.innerHeight/692,'top':window.innerHeight/2-10-60*this.sc*window.innerHeight/692 });
                $('.main-left>.b2').css({'right':window.innerWidth/2-75*this.sc*window.innerHeight/692,'top':window.innerHeight/2-10+60*this.sc*window.innerHeight/692 });
                $('.time').css({'top':window.innerHeight/2+140*this.sc*window.innerHeight/692 ,'right':window.innerWidth/2-26-84*this.sc*window.innerHeight/692}).text('03月21日');
            },
            init:function () {
                var canvas = document.getElementById("renderCanvas");
                var engines = new BABYLON.Engine(canvas, true);
                engines.enableOfflineSupport = false;
                var scene = new BABYLON.Scene(engines);
                scene.clearColor.set(1, 1 , 1, 1);
                this.createScene(canvas,scene,engines);
                var renderTimes=0;
                var renderFunction =function () {
                    var sceneChecked = null;
                    if (scene) {
                        if (scene.activeCamera) {
                          renderTimes++;
                          if(renderTimes%4!=0)return;
                            scene.render();
                        }
                        if (scene.useDelayedTextureLoading) {
                            var waiting = scene.getWaitingItemsCount();
                            if (waiting <= 0) {
                                document.getElementById("notSupported").className = "hidden";
                            }
                        } else if (!sceneChecked) {
                            var remaining = scene.getWaitingItemsCount();
                            if (remaining == 0) {
                                document.getElementById("notSupported").className = "hidden";
                            }
                        }
                    }
                }
                engines.runRenderLoop(renderFunction);
            },
            createScene:function(canvas,scene,engines) {
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

                var r=50;
                var thiz=this;
                var linecolor = new BABYLON.Color3(0.5, 0.5, 0.5);
                var DashedLineColor = new BABYLON.Color3(0.8, 0.8, 0);

                var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI/2, Math.PI/2, 350, new BABYLON.Vector3(0, 0, 0), scene);
                camera.upperRadiusLimit = 350;
                camera.lowerRadiusLimit = 350;
                camera.attachControl(canvas, true);
                camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                var sb = engines.getRenderHeight() / engines.getRenderWidth();
                camera.orthoTop = 3 * sb * r;
                camera.orthoBottom = -3 * sb * r;
                camera.orthoLeft = -3 * r;
                camera.orthoRight = 3 * r;
                camera.layerMask = 0x20000000;
                camera.viewport = new BABYLON.Viewport(-0.25, 0, 1, 1);

                var camera1 = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI/2, Math.PI/2, 700, new BABYLON.Vector3(0, 0, 0), scene);
                camera1.upperRadiusLimit = 700;
                camera1.lowerRadiusLimit = 700;

                var camera2 = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI/2, Math.PI/2, 700, new BABYLON.Vector3(0, 0, 0), scene);
                camera2.upperRadiusLimit = 700;
                camera2.lowerRadiusLimit = 700;
                camera2.layerMask = 0x40000000;

                scene.activeCameras.push(camera2,camera,camera1);
                var changelight = new BABYLON.DirectionalLight("Dir", new BABYLON.Vector3(1, 0, 0), scene);
                changelight.intensity = 0;
                changelight.diffuse = new BABYLON.Color3(1, 0.8, 0.6);
                changelight.specular = new BABYLON.Color3(1, 0.8, 0.6);
                var light1=changelight;
                var lights = new BABYLON.HemisphericLight("sss", new BABYLON.Vector3(0, 1, 0), scene);
                lights.intensity = 0.3;
                var lights = new BABYLON.HemisphericLight("sss", new BABYLON.Vector3(0, -1, 0), scene);
                lights.intensity = 0.3;

              var tex=new BABYLON.Texture("./static/image/textures/bg.jpg",scene);
              var material2 = new BABYLON.StandardMaterial("kosh", scene);
              material2.diffuseTexture=tex;
              material2.emissiveTexture=tex;
              material2.backFaceCulling = false;
              var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
              skybox.material = material2;
              skybox.layerMask = 0x40000000;
                skybox.rotation.y=-Math.PI/2;

                //地球node
                var earthgroup = new BABYLON.Mesh("g", scene);
                earthgroup.position = new BABYLON.Vector3(0, 0, 0);
                //地球角度偏移node
                var earthgroupAngle = new BABYLON.Mesh("g", scene);
                earthgroupAngle.position = new BABYLON.Vector3(0, 0, 0);

                //地球node
                var earthgroupcloud = new BABYLON.Mesh("g", scene);
                earthgroupcloud.position = new BABYLON.Vector3(0, 0, 0);


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
                    text1.fontSize = "14px"
                    text1.color = "#fff";
                    panel2.addControl(text1);
                }
                function createWefttext(mesh, name) {
                    var plane = BABYLON.Mesh.CreatePlane("plane", 8);
                    plane.rotation = new BABYLON.Vector3(mesh.rotation.x, -Math.PI / 2, 0);
                    if (name == "国际日期变更线") {
                        plane.rotation = new BABYLON.Vector3(Math.PI+mesh.rotation.x, -Math.PI / 2,Math.PI/2);
                    }else if (name == "本初子午线") {
                        plane.rotation = new BABYLON.Vector3(Math.PI+mesh.rotation.x, Math.PI / 2,Math.PI/2);
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
                    text1.fontSize = "14px"
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
                    for (var i = 0; i <= value; i+=3/r) {
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
                    circle.layerMask = 0x20000000;
                    return circle;
                }
                //画出可更新的圆，并设置颜色
                function createDashedCircle(r, value, y, color, scene, axis) {
                    var vertices = setvertices(r, value, y, axis);
                    var Dashedcircle = BABYLON.Mesh.CreateDashedLines("lines", vertices, 10, 10, vertices.length, scene, true, Dashedcircle);
                    Dashedcircle.color = color;
                    Dashedcircle.layerMask = 0x20000000;
                    return Dashedcircle;
                }
                var i;
                //创建纬线
                function CreateWeft(r, percentPI, color) {
                    for (i = 0; i < 90; i += percentPI) {
                        if (i == 0) {
                            CreateWeftLine(i, r, 360, color);
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
                    } else {
                        createWefttext(circledot, earthangle + "°");
                    }

                    circledot.setParent(earthgroup);
                    circledot.layerMask = 0x20000000;
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
                    circle.layerMask = 0x20000000;
//                    circle.position.x=220;
//                    circle.scaling=new BABYLON.Vector3(0.965, 1, 0.965);
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
                    Dashedcircle.layerMask = 0x20000000;
//                    Dashedcircle.position.x=220;
//                    Dashedcircle.scaling=new BABYLON.Vector3(0.965, 1, 0.965);
                    Dashedcircle.setParent(earthgroup);
                }
                //创建经线
                function createWarp(r, percentPI, color) {

                    for (i = 0; i < Math.PI; i += Math.PI / percentPI) {
                        var ncircles = createCircle(r, 360, 0, color, scene, "x");
                        var rot = new BABYLON.Vector3(0, i, 0);
                        ncircles.rotation = rot;
                        ncircles.setParent(earthgroup);
                        ncircles.layerMask = 0x20000000;
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
                    circle.layerMask = 0x20000000;
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
//                //画地轴
//                function CreateAxisLine(radius, parent) {
//                    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * radius, 0.05, 0.05, 16, 1, scene);
//                    var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
//                    cylinderMat.emissiveColor = BABYLON.Color3.Gray();
//                    cylinder.material = cylinderMat;
//                    cylinder.setParent(parent);
//                }
//
//                CreateAxisLine(r+1, earthgroup);
                var lineradius = r + 1;
                CreateWeft(lineradius, 15, linecolor);//创建纬线：0°至南北纬90°，间隔15°；
                // CreateWeft(lineradius,30, linecolor);//创建纬线：0°至南北纬90°，间隔30°；
                CreateDashedWeft(23.26, lineradius, 360, DashedLineColor, true);//创建回归线：0°至南北纬90°，间隔30°；
                CreateDashedWeft(23.26, lineradius, 360, DashedLineColor);
                CreateDashedWeft(66.74, lineradius, 360, DashedLineColor);//创建极圈：0°至南北纬90°，间隔30°；
                CreateDashedWeft(66.74, lineradius, 360, DashedLineColor, true);
                createWarp(lineradius, 12, linecolor);//创建经线：起始线0°至180°，间隔30°；

//                CreateWeftLabel(lineradius, 15);
//                CreateWeftLineLabel(23.26, lineradius);
//                CreateWeftLineLabel(23.26, lineradius, true);
//                CreateWeftLineLabel(66.74, lineradius);
//                CreateWeftLineLabel(66.74, lineradius, true);
//                createWarpLabel(lineradius, 12);//创建经线标签：起始线0°至180°，间隔30°；
//                CreateWeftLineLabel(31.1, lineradius, true);//国际日期变更线
//                CreateWeftLineLabel(7.2, lineradius, true);//本初子午线
                createDateChangeLine(r + 1, 180, 0, DashedLineColor, scene);

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

                // var earthMaterial = new BABYLON.StandardMaterial("earth", scene);
                // earthMaterial.diffuseTexture = diffusetex;
                // earthMaterial.specularColor = new BABYLON.Color3(0., 0., 0.);

                var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
                earth.material = earthforMaterial;
                earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
                earth.setParent(earthgroup);
                earth.layerMask = 0x20000000;

                //画地球云图
                var planTexture = new BABYLON.Texture("./static/earth/cloud.png", scene);
                console.log(planTexture)
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

                var cloud = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r + 1, scene);
                cloud.material = cloudMaterial;
                cloud.rotation = new BABYLON.Vector3(0, 0, Math.PI);
                cloud.setParent(earthgroupcloud);
                cloud.layerMask = 0x20000000;
                earthgroupcloud.setParent(earthgroup);
                //地球偏移node偏移
                earthgroup.setParent(earthgroupAngle);
//                earthgroupAngle.rotation = new BABYLON.Vector3(0, 0, Math.PI / 180 * 23.26);

                var alpha=0;
                scene.registerBeforeRender(function() {
                    var activeCameraPosition = scene.activeCamera.position;
                    var direction = new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z);
                    cloudMaterial.setVector3("cameraPosition", activeCameraPosition);
                    cloudMaterial.setVector3("lightVectorW", direction);
                    cloudMaterial.setFloat("time", alpha);//晨昏线明显度
                    earthforMaterial.setVector3("cameraPosition", activeCameraPosition);
                    earthforMaterial.setVector3("lightVectorW", direction);

                    earthgroupcloud.rotation = new BABYLON.Vector3(0, alpha * 0.2, 0);
                    earthgroup.rotation = new BABYLON.Vector3(0, alpha, 0);
                    alpha -= 0.002;
                });

                var vertices=[];
                vertices.push(new BABYLON.Vector3(-60, 0, 0),new BABYLON.Vector3(-400, 0, 0));
                createLine(vertices,false);

                vertices=[];
                vertices.push(new BABYLON.Vector3(-80, 160, 0),new BABYLON.Vector3(-80, -160, 0));
                createLine(vertices,false);

                vertices=[];
                vertices.push(new BABYLON.Vector3(0, 0, 10),new BABYLON.Vector3(-3, 0, 0),new BABYLON.Vector3(3, 0, 0));
                var t1=createPolygonFace(vertices);
                t1.rotation.x=Math.PI/2;
                t1.position.set(-80,-160,0);
                var t2=createPolygonFace(vertices);
                t2.rotation.x=-Math.PI/2;
                t2.rotation.y=Math.PI;
                t2.position.set(-80,160,0);
                var t3=createPolygonFace(vertices);
                t3.rotation.y=-Math.PI/2;
                t3.rotation.z=-Math.PI/2;
                t3.position.x=-400;

                vertices=[];
                vertices.push(new BABYLON.Vector3(-80, 60, 0),new BABYLON.Vector3(-360, 60, 0));
                createLine(vertices,false);

                vertices=[];
                vertices.push(new BABYLON.Vector3(-80, -60, 0),new BABYLON.Vector3(-360, -60, 0));
                createLine(vertices,false);

                vertices=[];
                for(var i=0;i<=260*186/365;i+=0.1){
                    var a=180/(260*186/365)*i;
                    var x=-i-80;
                    var y=Math.sin(a*Math.PI/180)*60;
                    vertices.push(new BABYLON.Vector3(x, y, 0));
                }
                createLine(vertices,false);

                vertices=[];
                for(var i=0;i<=260*179/365;i+=0.1){
                    var a=180/(260*179/365)*i;
                    var x=-i-80-260*186/365;
                    var y=-Math.sin(a*Math.PI/180)*60;
                    vertices.push(new BABYLON.Vector3(x, y, 0));
                }
                createLine(vertices,false);

                var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, scene);
                ground.rotation.x = 1 / 180 * 90 * Math.PI;
                ground.isVisible = false;

                var ctrl = BABYLON.MeshBuilder.CreatePlane("ctrl", {width: 100,height:80}, scene,false);
                var ctrl2 = BABYLON.MeshBuilder.CreatePlane("ctrl2", {width: 40,height:20}, scene);
//                ctrl.isVisible=false;
                ctrl2.setParent(ctrl);
                ctrl.material = new BABYLON.StandardMaterial("red", scene);
                ctrl.material.alpha=0;
                ctrl.rotation.y=Math.PI;
                ctrl.position.y=-120;
                ctrl.position.x=-80;
                ctrl.position.z=5;
                ctrl2.position.z=10;
                ctrl2.material = new BABYLON.StandardMaterial("red", scene);
                ctrl2.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
                ctrl2.material.specularColor = new BABYLON.Color3(1, 1, 1);
                ctrl2.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
//                ctrl.material = new BABYLON.StandardMaterial("red", scene);
//                ctrl.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
//                ctrl.material.specularColor = new BABYLON.Color3(1, 1, 1);
//                ctrl.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
                vertices=[];
                vertices.push(new BABYLON.Vector3(-80, -110, 0),new BABYLON.Vector3(-80, 0, 0));
                var scircle=BABYLON.Mesh.CreateDashedLines("lines", vertices,10,10,20,scene,true,scircle);
                scircle.color=new BABYLON.Color3(1, 1, 1);

                vertices=[];
                for(var i=0;i<361;i+=2){
                    var x=4*Math.cos(i*Math.PI/180);
                    var z=4*Math.sin(i*Math.PI/180);
                    vertices.push(new BABYLON.Vector3(x, 0, z))
                }
                var circle=createPolygonFace(vertices);
                circle.rotation.x=Math.PI/2;
                circle.position.x=-80;
                circle.material = new BABYLON.StandardMaterial("red", scene);
                circle.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
                circle.material.specularColor = new BABYLON.Color3(1, 1, 1);
                circle.material.emissiveColor = new BABYLON.Color3(1, 0, 0);

                function createLine(vertices, type) {
                    var circle=null;
                    if(type){
                        circle = BABYLON.Mesh.CreateDashedLines("lines", vertices,0,0,vertices.length, scene);
                    }else{
                        circle = BABYLON.Mesh.CreateLines("lines", vertices, scene);
                    }
                    circle.color=new BABYLON.Color3(1, 1, 1);
                    return circle;
                }
                function createPolygonFace(vertices) {
                    var polygon = BABYLON.MeshBuilder.CreatePolygon("polygon",{shape:vertices}, scene);
                    polygon.material = new BABYLON.StandardMaterial("red", scene);
                    polygon.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
                    polygon.material.specularColor = new BABYLON.Color3(1, 1, 1);
                    polygon.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
                    return polygon;
                }

                var startingPoint;
                var currentMesh;
                var getGroundPosition = function () {
                    var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
                    if (pickinfo.hit) { return pickinfo.pickedPoint; }
                    return null;
                };
                var onPointerDown = function (evt) {
                    if (evt.button !== 0) {
                        return;
                    }
                    var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh !== ground; });
                    if (pickInfo.hit) {
                        currentMesh = pickInfo.pickedMesh;
                        if (currentMesh.name == "ctrl") {
                            camera.detachControl(canvas);
                            startingPoint = getGroundPosition();
                        }
                    }
                };
                var onPointerMove = function (evt) {
                    if (!startingPoint) { return; }
                    var current = getGroundPosition(evt);
                    if (!current) { return; }

                    if(startingPoint.x<=-80&&startingPoint.x>=-340){
                        currentMesh.position.x=startingPoint.x;
                    }else if(startingPoint.x>-80){
                        currentMesh.position.x=-80;
                    }else if(startingPoint.x<-340){
                        currentMesh.position.x=-340;
                    }
                    var XX=currentMesh.position.x;
                    var x=-(currentMesh.position.x+80);
                    var vertices=[];
                    var y;
                    if(x<186/365*260){
                        y=Math.sin(x*180/(186/365*260)*Math.PI/180)*60;
                    }else{
                        y=-Math.sin((x-186/365*260)*180/(260-186/365*260)*Math.PI/180)*60;
                    }
                    vertices.push(new BABYLON.Vector3(XX, -110, 0),new BABYLON.Vector3(XX, y , 0));
                    scircle=BABYLON.Mesh.CreateDashedLines("lines", vertices,10,10,20,scene,true,scircle);
                    scircle.color=new BABYLON.Color3(1, 1, 1);
                    circle.position.set(XX,y,0);
                    ctrl.position.x=XX;
                    changelight.direction.set(1,-Math.tan(y/60*23.5*Math.PI/180),0);

                    var valueTime=Math.floor(x*365/260);
                    var newT=transferCouponValueTime('2017/3/21',valueTime);

                    var Wheight=window.innerHeight;
                    var WWidth=window.innerWidth;
                    $('.time').css({'top':Wheight/2+140*thiz.sc*Wheight/692 ,'right':WWidth/2-26+(XX-4)*thiz.sc*Wheight/692}).text(newT);
                    startingPoint = current;
                };
                var onPointerUp = function () {
                    if(startingPoint){
                        startingPoint = null;
                        camera.attachControl(canvas,true);
                        return;
                    }
                };
                var transferCouponValueTime=function(startDate,valueTime){
                    var date = new Date(startDate);
                    var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()+valueTime);
                    var month = newDate.getMonth()+1;
                    month=month>9?month:'0'+month;
                    var day = newDate.getDate();
                    day=day>9?day:'0'+day;
                    return month+"月"+day+'日';
                };
                window.addEventListener("pointerdown", onPointerDown, false);
                window.addEventListener("pointerup", onPointerUp, false);
                window.addEventListener("pointermove", onPointerMove, false);
                scene.onDispose = function () {
                    window.removeEventListener("pointerdown", onPointerDown);
                    window.removeEventListener("pointerup", onPointerUp);
                    window.removeEventListener("pointermove", onPointerMove);
                }

                function reset() {
                    changelight.direction.set(1,0,0);
                    $('.time').css({'top':window.innerHeight/2+140*thiz.sc*window.innerHeight/692 ,'right':window.innerWidth/2-26-84*thiz.sc*window.innerHeight/692}).text('03月21日');
                    var vertices=[];
                    vertices.push(new BABYLON.Vector3(-80, -110, 0),new BABYLON.Vector3(-80,0, 0));
                    scircle=BABYLON.Mesh.CreateDashedLines("lines", vertices,10,10,20,scene,true,scircle);
                    scircle.color=new BABYLON.Color3(1, 1, 1);
                    circle.position.set(-80,0,0);
                    ctrl.position.x=-80;
                    camera.alpha=Math.PI/2;
                    camera.beta=Math.PI/2;
                }
                var resetB=document.getElementById("reset");
                if(this.isMob){
                    resetB.addEventListener('touchstart',reset);
                }else{
                    resetB.addEventListener('click',reset);
                }
                window.onresize=()=>{
                    this.init1();
                    engines.resize();
                    var sb = engines.getRenderHeight() / engines.getRenderWidth();
                    camera.orthoTop = 2 * sb * r;
                    camera.orthoBottom = -2 * sb * r;
                    camera.orthoLeft = -2 * r;
                    camera.orthoRight = 2 * r;
                    $('.time').css({'top':window.innerHeight/2+140*this.sc*window.innerHeight/692 ,'right':window.innerWidth/2-25+(circle.position.x-5)*this.sc*window.innerHeight/692});
                }
            },
        },
        mounted(){
            this.init1();
            this.init();
        }
    }
</script>

<style>
  .title{
    height: 76px;
    width: 100%;
    background:transparent;
    box-shadow:0 0 0 0 rgba(0,0,0,0.12);
    position: absolute;
    z-index: 999;
  }
  .title h2{
    padding: 26px 24px;
    font-size: 24px;
    line-height: 24px;
    height: 24px;
    color:#fff;
  }
  #reset{
    position: absolute;
    right: 20px;
    bottom: 18px;
  }
  #reset img{
    width: 49px;
    height: 41px;
    cursor: pointer;
  }
  .main{
    position: absolute;
    top:0;
    width:100%;
    height: 100%;
  }
  .main>div{
    width: 100%;
    height:100%;
    position: relative;
  }
  .main-left canvas{
    width:100%;
    height:100%;
    position: absolute;
    outline: none;
  }
  .main-left>div{
    position: absolute;
    color:#fff;
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
    z-index: 3;
    cursor: default
  }
  .hidden {
    display: none
  }
  @media(max-width: 720px) {
    .title h2{
      font-size: 22px;
    }
  }
  @media(max-width: 655px) {
    .title h2{
      font-size: 20px;
    }
  }
</style>
