<template>
    <div id="app">
        <div class="control-container">
            <p>日地月运动系统</p>
            <i id="clear"><img class="btn" src="static/image/chongzhi.png"/></i>
        </div>
        <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1"
                    style="opacity: 1;"></canvas>
        </div>
        <div id='checktwo'>
            <div>公转</div>
            <span>
                <span></span>
            </span>
        </div>
        <div id='check'>
            <div>显示轨迹</div>
            <span>
                <span></span>
            </span>
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
            };
        },
        methods: {
            init() {
                this.canvas = document.getElementById("renderCanvas");
                var engine = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true});
                if (!BABYLON.Engine.isSupported()) {
                } else {
                    var scene = this.loadCustomScene(this.createScene, (scene) => {
                    }, engine);
                    var renderFunction = function () {
                        var sceneChecked = null;
                        if (scene) {
                            if (scene.activeCamera) {
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
                    if (then) {
                        then(scene);
                    }
                });
                return scene;
            },
            createScene(engine) {

                console.log("Create By APEN");
                var earthFragmentShader = `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform sampler2D daySampler;
                 uniform vec3 color;
                void main(void) {
                vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                vec4 daycolor = texture2D(daySampler, vUV).rgba;
                gl_FragColor =vec4(color,1)* vec4(daycolor);}`;
                var customVertexShader = `precision highp float;
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

                var shadowFragmentShader =
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
                    daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl + vec3(specComp);
                    gl_FragColor = vec4(daycolor);
                }`;

                var thiz = this;
                var colorindex = 0.2;
                var r = 2;
                this.canvas = engine.getRenderingCanvas();
                engine.enableOfflineSupport = false;
                var scene = new BABYLON.Scene(engine);
                var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                light.intensity = 0.1;

                var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 4, 100, BABYLON.Vector3.Zero(), scene);
                camera.lowerRadiusLimit = 80;
                camera.upperRadiusLimit = 120;
                camera.layerMask = 0x20000000;
                scene.activeCameras.push(camera);
                scene.clearColor.set(0, 0, 0.3, 1);

                //地球node
                var earthgroup = new BABYLON.Mesh("g", scene);
                earthgroup.position = new BABYLON.Vector3(0, 0, 0);

                //地球node
                var earthmoongroup = new BABYLON.Mesh("g", scene);
                earthmoongroup.position = new BABYLON.Vector3(0, 0, 0);

                var earthp = new BABYLON.Mesh("p", scene);
                earthp.position = new BABYLON.Vector3(0, 0, 0);

                var earthpangle = new BABYLON.Mesh("p", scene);
                earthpangle.position = new BABYLON.Vector3(0, 0, 0);

                var moonpangle = new BABYLON.Mesh("p", scene);
                moonpangle.position = new BABYLON.Vector3(0, 0, 0);

                var earthmoon = new BABYLON.Mesh("p", scene);
                earthmoon.position = new BABYLON.Vector3(0, 0, 0);
                earthmoon.rotation = new BABYLON.Vector3(0, 0, Math.PI / 30);
                earthmoon.setParent(earthmoongroup);

                earthgroup.setParent(earthpangle);
                earthmoongroup.setParent(moonpangle);
                earthpangle.setParent(earthp);
                moonpangle.setParent(earthp);

                //画地球
                BABYLON.Effect.ShadersStore["customVertexShader"] = customVertexShader;
                BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
                BABYLON.Effect.ShadersStore["shadowFragmentShader"] = shadowFragmentShader;

                var sunSampler = new BABYLON.Texture("./static/earth/sun.jpg", scene);
                var earthdaySampler = new BABYLON.Texture("./static/earth/earthday.jpg", scene);
                var earthnightSampler = new BABYLON.Texture("./static/earth/earthnight.jpg", scene);
                var moondaySampler = new BABYLON.Texture("./static/earth/moonday.jpg", scene);
                var moonnightSampler = new BABYLON.Texture("./static/earth/moonnight.jpg", scene);
                var planSampler = new BABYLON.Texture("./static/earth/plan.png", scene);

                var sunforMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                    vertex: "custom",
                    fragment: "earth",
                }, {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                });
                sunforMaterial.setTexture("daySampler", sunSampler);
                sunforMaterial.setVector3("color", new BABYLON.Vector3(2.5, 2.5, 2.5));


                var sun = BABYLON.Mesh.CreateSphere("earth", 32, 10, scene);
                sun.position = new BABYLON.Vector3(0, 0, 25);
                sun.material = sunforMaterial;
                sun.layerMask = 0x20000000;
                sunforMaterial.emissiveColor = new BABYLON.Color3(0.6, 0.4, 0);

                var gl = new BABYLON.GlowLayer("glow", scene, {mainTextureSamples: 4});
                gl.addIncludedOnlyMesh(sun);
                var helper = scene.createDefaultEnvironment();
                helper.setMainColor(BABYLON.Color3.Gray());

                var earthforMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                    vertex: "custom",
                    fragment: "shadow",
                }, {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                });
                earthforMaterial.setTexture("daySampler", earthdaySampler);
                earthforMaterial.setTexture("nightSampler", earthnightSampler);
                earthforMaterial.setVector3("cameraPosition", camera.position);
                earthforMaterial.setVector3("vLightPosition", sun.position);
                earthforMaterial.backFaceCulling = false;

                var moonMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                    vertex: "custom",
                    fragment: "shadow",
                }, {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                });
                moonMaterial.setTexture("daySampler", moondaySampler);
                moonMaterial.setTexture("nightSampler", moonnightSampler);
                moonMaterial.setVector3("cameraPosition", camera.position);
                moonMaterial.setVector3("vLightPosition", sun.position);
                moonMaterial.backFaceCulling = false;

                var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
                earth.material = earthforMaterial;
                earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
                earth.setParent(earthgroup);
                earth.layerMask = 0x20000000;

                var moon = BABYLON.Mesh.CreateSphere("earth", 32, 1, scene);
                moon.material = moonMaterial;
                moon.position = new BABYLON.Vector3(0, 0, 6);
                moon.setParent(earthmoon);
                moon.layerMask = 0x20000000;

                var sunMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                    vertex: "custom",
                    fragment: "earth",
                }, {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
                    needAlphaBlending: true
                });
                sunMaterial.setTexture("daySampler", planSampler);
                sunMaterial.setVector3("color", new BABYLON.Vector3(0.6, 0.6, 0.1));
                sunMaterial.backFaceCulling = false;

                var eplanMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                    vertex: "custom",
                    fragment: "earth",
                }, {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
                    needAlphaBlending: true
                });
                eplanMaterial.setTexture("daySampler", planSampler);
                eplanMaterial.setVector3("color", new BABYLON.Vector3(0.6, 0.6, 0.6));
                eplanMaterial.backFaceCulling = false;

                BABYLON.SceneLoader.ImportMesh("", "", "data:" + strData1, scene, function (newMeshes, particleSystems, skeletons) {
                        for (var i = 0; i < newMeshes.length; i++) {
                            newMeshes[i].isVisible = true;
                            newMeshes[i].layerMask = 0x20000000;
                            newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
                            if (!newMeshes[i].rotationQuaternion) {
                                if (newMeshes[i].name == "earth") {
                                    newMeshes[i].material = eplanMaterial;
                                    newMeshes[i].setParent(earthmoon);
                                } else if (newMeshes[i].name == "sun") {
                                    newMeshes[i].material = sunMaterial;
                                }
                            }
                        }
                    }
                );

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

                //根据半径、角度求圆上的点，并设置坐标轴及轴上的值
                function tdrawcircle(ra, rb, ang, axisvalue, axis) {
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
                function tsetvertices(ra, rb, value, y, axis) {
                    var vertices = [];
                    for (var i = 0; i <= value; i += 3 / r) {
                        vertices.push(tdrawcircle(ra, rb, i, y, axis));
                    }
                    vertices.push(tdrawcircle(ra, rb, value, y, axis));
                    return vertices;
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
                function tcreateCircle(ra, rb, value, y, color, scene, axis) {
                    var vertices = tsetvertices(ra, rb, value, y, axis);
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
                    return Dashedcircle;
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

                var linecolor = new BABYLON.Color3(1, 1, 1);
                var lineradius = r + 0.01;
                var cra = 30;
                var crb = 40;

                CreateWeftLine(0, lineradius, 360, linecolor);//赤道
                tcreateCircle(cra, crb, 360, 0, linecolor, scene, "y");

                function CreateSunLine(earthangle, r, angle, color, pos) {
                    var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
                    if (pos) {
                        var y = Math.sqrt(r * r - x * x);//所算出y值
                    } else {
                        var y = -Math.sqrt(r * r - x * x);//所算出y值
                    }
                    var circle = createCircle(x, angle, y, color);
                    circle.setParent(earthgroup);
                    return circle;
                }

                var suncircle = CreateSunLine(0, lineradius, 360, linecolor);

                var tex = new BABYLON.Texture("static/sb.jpg", scene);
                var material2 = new BABYLON.StandardMaterial("kosh2", scene);
                var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
                material2.diffuseTexture = tex;
                material2.emissiveTexture = tex;
                material2.backFaceCulling = false;
                skybox.material = material2;
                skybox.layerMask = 0x20000000;
                skybox.rotation.x = Math.PI / 6;
                // Events
                var sliderR = r + 0.6;
                var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * sliderR + 0.6, 0.05, 0.05, 16, 1, scene);
                var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);

                cylinderMat.emissiveColor = BABYLON.Color3.Gray();
                cylinder.material = cylinderMat;
                cylinder.setParent(earthgroup);
                cylinder.layerMask = 0x20000000;


                function reset() {
                    alpha = 0;
                    bata = 0;
                    boolrotate = false;
                    camera.alpha = 0;
                    camera.beta = Math.PI / 4;
                    camera.radius = 100;
                    if (vet != null) {
                        ciclev.dispose();
                        vet = [];
                    }
                    $("#checktwo>span").css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
                    booldraw = false;
                    $("#check>span").css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
                    earthgroup.rotation = new BABYLON.Vector3(0, Math.PI / 180, 0);
                    earthmoongroup.rotation = new BABYLON.Vector3(0, 0, 0);
                    var earthpos = tdrawcircle(cra, crb, 0, 0, "y");
                    earthp.position = earthpos;
                }

                function rotset() {
                    if (boolrotate) {
                        boolrotate = false;
                        $("#checktwo>span").css('background', '#F0F0F0').children().css({
                            'left': '2px',
                            'right': 'auto'
                        });
                    } else {
                        boolrotate = true;
                        $("#checktwo>span").css('background', '#5CAEFD').children().css({
                            'right': '2px',
                            'left': 'auto'
                        });
                    }
                }

                function open() {
                    if (booldraw) {
                        $("#check>span").css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
                        if (vet != null) {
                            ciclev.dispose();
                            vet = [];
                        }
                        booldraw = false;
                    } else {
                        booldraw = true;
                        $("#check>span").css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
                    }
                }

                earthp.position = new BABYLON.Vector3(0, 0, 20);

                var vet = [];
                var ciclev = BABYLON.MeshBuilder.CreateLines("lines", {points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0)]}, scene);
                ciclev.layerMask = 0x20000000;
                var alpha = 0;
                var bata = 0;

                var boolrotate = false;
                var booldraw = false;
                earthpangle.rotation = new BABYLON.Vector3(0, 0, Math.PI / 180 * 23.6);
                moonpangle.rotation = new BABYLON.Vector3(0, 0, Math.PI / 180 * 5.1);

                earthgroup.rotation = new BABYLON.Vector3(0, Math.PI / 180, 0);
                earthmoongroup.rotation = new BABYLON.Vector3(0, 0, 0);
                var earthpos = tdrawcircle(cra, crb, 0, 0, "y");
                earthp.position = earthpos;

                scene.registerBeforeRender(function () {
                    if (boolrotate) {
                        earthgroup.rotation = new BABYLON.Vector3(0, -alpha + Math.PI / 180, 0);
                        earthmoongroup.rotation = new BABYLON.Vector3(0, -alpha / 4, 0);
                        var earthpos = tdrawcircle(cra, crb, alpha, 0, "y");
                        earthp.position = earthpos;
                        if (booldraw) {
                            if (bata / 8 == 1) {
                                var pos = new BABYLON.Vector3(moon.getWorldMatrix().getTranslation().x,
                                    moon.getWorldMatrix().getTranslation().y,
                                    moon.getWorldMatrix().getTranslation().z);
                                vet.push(pos);
                                if (vet.length > 1) {
                                    ciclev.dispose();
                                    ciclev = BABYLON.MeshBuilder.CreateLines("lines", {points: vet,}, scene);
                                    ciclev.layerMask = 0x20000000;
                                }
                                bata = 0;
                            }
                            bata++;
                        } else {
                            if (vet != null) {
                                ciclev.dispose();
                                vet = [];
                            }
                        }

                        alpha += 0.1;
                    }
                });

                if (this.isMob) {
                    $('#clear').on('touchstart', reset);
                    $('#check').on('touchstart', open);
                    $('#checktwo').on('touchstart', rotset);
                } else {
                    $('#clear').on('click', reset);
                    $('#check').on('click', open);
                    $('#checktwo').on('click', rotset);
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
    html, body, h1, h2, h3, h4, h5,
    h6, hr, p, iframe, dl,
    dt, dd, ul, ol, li, pre,
    form, button, input,
    textarea, th, td, fieldset {
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

    ol, ul {
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
        cursor: pointer;
    }

    .ibtn {
        position: absolute;
        width: 48px;
        height: 40px;
        right: 120px;
        top: 18px;
        cursor: pointer;
    }

    body, html {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        border: none;
        overflow: hidden;
        position: fixed;
        font-family: "Segoe WP", "Segoe UI", Verdana, Arial;
        touch-action: none;
        -ms-touch-action: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
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
        z-index: 1000;
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

    #check {
        background: #fff;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        width: 100%;
        height: 45px;
        font-size: 14px;
        line-height: 48px;
        width: 240px;
        text-indent: 1em;
        position: fixed;
        right: 40px;
        bottom: 40px;
        z-index: 999;
        cursor: pointer;
    }

    #check > span {
        width: 40px;
        height: 24px;
        background: #F0F0F0;
        border-radius: 13px;
        position: absolute;
        right: 12px;
        top: 11px;
    }

    #check > span > span {
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

    #checktwo {
        background: #fff;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        width: 100%;
        height: 45px;
        font-size: 14px;
        line-height: 48px;
        width: 240px;
        text-indent: 1em;
        position: fixed;
        right: 40px;
        bottom: 90px;
        z-index: 999;
        cursor: pointer;
    }

    #checktwo > span {
        width: 40px;
        height: 24px;
        background: #F0F0F0;
        border-radius: 13px;
        position: absolute;
        right: 12px;
        top: 11px;
    }

    #checktwo > span > span {
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

    .hidden {
        display: none
    }
</style>
