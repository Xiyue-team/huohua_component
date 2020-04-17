<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <canvas id="renderCanvas" touch-action="none" tabindex="1" style="opacity: 1;" ref="main"></canvas>
            <ui-btn type="reset1" id="clear"></ui-btn>
        </div>
        <!--侧边按钮区-->
        <div class="btn_space">
            <ui-slider :min="-90"
                       :max="90"
                       :value="valueS"
                       :label="['N','S']"
                       :speed="0"
                       :beyondCircle="true"
                       title="纬度位置"
                       @callback="changeA"
                       :dotTxt="['B','A']"
                       :formatter="formatter"
                       :noBlueProcess="true" :style="'position:absolute;right:390px;top:0;'"></ui-slider>
            <ui-group class="switchWithSlider" :style="'position:absolute;right:20px;top:0;'">
                <ui-slider :min="0"
                           :max="360"
                           :label="['0°','360°']"
                           title="自转角度"
                           :speed="0"
                           v-model="value"
                           ref="value2slider"
                           :formatter="formatter"></ui-slider>
                <ui-btn type="switch" v-model="switch_checked">自转</ui-btn>
            </ui-group>
        </div>
        <div id="notSupported">loading...</div>
    </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    import uiGroup from '@/components/UI/uiGroup';//单选组
    import uiSlider from '@/components/UI/uiSlider';//滑块
    export default {
        name: 'app',
        components: {uiHead, uiBtn, uiGroup, uiSlider},
        data() {
            return {
                isMob: /iPad|Android/g.test(navigator.userAgent),
                title: '地球自转的速度',
                switch_checked: false,
                switch_checkedO1: '',
                switch_checkedO2: '',
                valueA: 0,
                valueAO: 0,
                valueB: -60,
                valueBO: -60,
                value: 60,
                valueO: 0,
                valueS: [-60, 0]
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
            var canvas = document.getElementById("renderCanvas");
            var engine = new BABYLON.Engine(canvas, true);
            var scene = this.init(engine);
            var renderTimes=0;
            var renderFunction = function () {
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
                scene.render();
            };
            engine.runRenderLoop(renderFunction);
        },
        methods: {
            formatDegree(value) {
                value = Math.abs(value);
                var v1 = Math.floor(value);//度
                var v2 = Math.floor((value - v1) * 60);//分
                var v3 = Math.round((value - v1) * 3600 % 60);//秒
                if (v2 === 0) {
                    return v1 + '°';
                } else {
                    return v1 + '°' + v2 + '′';
                }

            },
            //转换显示
            formatter(value) {
                return this.formatDegree(value)
            },
            changeA(v) {
                this.valueA = v[1];
                this.valueB = v[0];
            },
            init(engine) {
                var thiz = this;
//                var customVertexShader =
//                    "precision highp float;\r\n" +
//                    "attribute vec3 position;\r\n" +
//                    "attribute vec3 normal;\r\n" +
//                    "attribute vec2 uv;\r\n" +
//                    "uniform mat4 worldViewProjection;\r\n" +
//                    "varying vec3 vPosition;\r\n" +
//                    "varying vec3 vNormal;\r\n" +
//                    "varying vec2 vUV;\r\n" +
//                    "void main(void) {\r\n" +
//                    "vec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\n" +
//                    "gl_Position = outPosition;\r\n" +
//                    "vUV = uv;\r\n" +
//                    "vPosition = position;\r\n" +
//                    "vNormal = normal;\r\n}\r\n";
//                var customFragmentShader =
//                    "precision highp float;\r\n" +
//                    "varying vec3 vPosition;\r\n" +
//                    "varying vec3 vNormal;\r\n" +
//                    "varying vec2 vUV;\r\n" +
//                    "uniform mat4 world;\r\n" +
//                    "uniform float Rotation1;\r\n" +
//                    "uniform float pi;\r\n" +
//                    "uniform vec3 color;\r\n" +
//                    "void main(void) {\r\n" +
//                    "vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n" +
//                    "float dotProd1 = tan(Rotation1)*vPosition.x;\r\n" +
//                    "vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\n" +
//                    "float dis = distance(vPositionW, vec3(0.,0.,0.));\r\n" +
//                    "if (dis> 3.0 ) {\r\n" +
//                    "discard;\r\n" +
//                    "}\r\n" +
//                    "if (Rotation1<=pi) {\r\n" +
//                    "if (vPosition.z>=dotProd1 || vPosition.z<0.) {\r\n" +
//                    "discard;\r\n" +
//                    "\r\n}\r\n" +
//                    "\r\n} else if (Rotation1<=2.0*pi && Rotation1>pi) {\r\n" +
//                    "if ((vPosition.z<=dotProd1&&vPosition.x<0.) || vPosition.z<0.) {\r\n" +
//                    "discard;\r\n" +
//                    "\r\n}\r\n" +
//                    "\r\n} else if (Rotation1<=3.0*pi && Rotation1>2.0*pi) {\r\n" +
//                    "if ((vPosition.z<=dotProd1&&vPosition.x<0.) || (vPosition.z<0.&&vPosition.x>0.)) {\r\n" +
//                    "discard;\r\n" +
//                    "\r\n}\r\n" +
//                    "\r\n} else if (Rotation1<4.0*pi && Rotation1>3.0*pi) {\r\n" +
//                    "if ((vPosition.z>=dotProd1&&vPosition.x>0.)&& vPosition.z<0.) {\r\n" +
//                    "discard;\r\n" +
//                    "\r\n}\r\n" +
//                    "\r\n}\r\n" +
//                    "gl_FragColor = vec4(color, 1.);\r\n}\r\n";
//                var earthFragmentShader = "precision highp float;\r\n" +
//                    "varying vec3 vPosition;\r\n" +
//                    "varying vec3 vNormal;\r\n" +
//                    "varying vec2 vUV;\r\n" +
//                    "uniform sampler2D textureSampler;\r\n" +
//                    "void main(void) {\r\n" +
//                    "vec4 color = texture2D(textureSampler, vUV).rgba;\r\n" +
//                    "gl_FragColor = vec4(color);\r\n}\r\n";
                var r = 3; //球的半径
                var cameralayerMask = 0x10000000;
                var camerafulllayerMask = 0x40000000;
                var TargetCameralayerMask = 0x20000000;
                this.canvas = engine.getRenderingCanvas();
                engine.enableOfflineSupport = false;
                var scene = new BABYLON.Scene(engine);
                scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
                var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 4, 0), scene);
                light1.intensity = 0.7;
                var light2 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -4, 0), scene);
                light2.intensity = 0.6

                var camerafull = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), scene);
                camerafull.lowerRadiusLimit = 10;
                camerafull.upperRadiusLimit = 10;
                camerafull.layerMask = camerafulllayerMask;

                var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2 - Math.PI/12, 10, new BABYLON.Vector3(0, 0, 0), scene);
                camera.lowerRadiusLimit = 10;
                camera.upperRadiusLimit = 10;
                camera.viewport = new BABYLON.Viewport(-0.1, 0.1, 0.8, 0.8);
                camera.layerMask = cameralayerMask;

                var TargetCamera = new BABYLON.TargetCamera("camera1", new BABYLON.Vector3(0, 10, 0), scene);
                camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                TargetCamera.setTarget(new BABYLON.Vector3(0, 0, 0));
                TargetCamera.viewport = new BABYLON.Viewport(0.5, 0.25, 0.5, 0.5);
                TargetCamera.layerMask = TargetCameralayerMask;

                function ResizeCamera() {
                    var z=2.5;
                    if(window.innerHeight<540){
                        z=3;
                    }
                    var sb = engine.getRenderHeight() / engine.getRenderWidth();
                    camera.orthoTop = z * sb * r;
                    camera.orthoBottom = -z * sb * r;
                    camera.orthoLeft = -z * r;
                    camera.orthoRight = z * r;
                }

                ResizeCamera();

                camerafull.detachControl(this.canvas);
                camera.attachControl(this.canvas, true);
                scene.activeCameras.push(camerafull);
                scene.activeCameras.push(camera);
                scene.activeCameras.push(TargetCamera);

                var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
                var advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
                advancedTexture2.layer.layerMask = TargetCameralayerMask;// TargetCameralayerMask;
                advancedTexture1.layer.layerMask = cameralayerMask;// cameralayerMask;

                function CreateLabel(advanced, text, fontSize, box) {
                    var label = new BABYLON.GUI.Rectangle("label");
                    label.height = "48px";
                    label.alpha = 1;
                    label.width = "150px";
                    label.cornerRadius = 20;
                    label.thickness = 0;
                    label.linkOffsetY = 0;
                    advanced.addControl(label);
                    label.linkWithMesh(box);
                    var text1 = new BABYLON.GUI.TextBlock();
                    text1.text = text;
                    text1.color = "#66ccff";
                    text1.fontSize = fontSize;
                    label.addControl(text1);
                }

                // Skybox
                function CreateSkybox() {
                    var tex = new BABYLON.Texture("./static/image/SPACE006SX.jpg", scene);
                    var material2 = new BABYLON.StandardMaterial("kosh2", scene);
                    var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
                    material2.diffuseTexture = tex;
                    material2.emissiveTexture = tex;
                    material2.backFaceCulling = false;
                    skybox.material = material2;
                    skybox.layerMask = camerafulllayerMask;
                }

                CreateSkybox();

                var meshforclone = new BABYLON.Mesh("g", scene);
                //地球node
                var earthgroup = meshforclone.clone("earthgroup");
                earthgroup.position = new BABYLON.Vector3(0, 0, 0);
                //地球角度偏移node
                var earthgroupAngle = meshforclone.clone("earthgroupAngle");
                earthgroupAngle.position = new BABYLON.Vector3(0, 0, 0);

                var pointGAB = meshforclone.clone("pointGA");
                pointGAB.position = new BABYLON.Vector3(0, 0, 0);

                var pointA = BABYLON.Mesh.CreateSphere("sphere1", 32, 0.1, scene);
                pointA.layerMask = cameralayerMask;
                pointA.isVisible = false;
                pointA.setParent(pointGAB);

                var pointB = BABYLON.Mesh.CreateSphere("sphere1", 32, 0.1, scene);
                pointB.layerMask = cameralayerMask;
                pointB.isVisible = false;
                pointB.setParent(pointGAB);

                var h1=-thiz.valueA/90*3;
                var h2=-thiz.valueB/90*3;
                var r1=Math.sqrt(r*r-h1*h1);
                var r2=Math.sqrt(r*r-h2*h2);
                var ang=thiz.value/180*Math.PI;
                pointA.position.y=h1;
                pointA.position.x=-r1*Math.sin(ang);
                pointA.position.z=r1*Math.cos(ang);
                pointB.position.y=h2;
                pointB.position.x=-r2*Math.sin(ang);
                pointB.position.z=r2*Math.cos(ang);

                var pointGABZ = meshforclone.clone("pointGA");
                pointGABZ.position = new BABYLON.Vector3(0, 0, 0);

                var pointAZ = meshforclone.clone("pointA", pointGABZ);
                var pointBZ = meshforclone.clone("pointB", pointGABZ);

                pointAZ.position.z=r1*Math.sin(ang);
                pointAZ.position.x=r1*Math.cos(ang);
                pointBZ.position.z=r2*Math.sin(ang);
                pointBZ.position.x=r2*Math.cos(ang);
                CreateLabel(advancedTexture1, "A", "25px", pointA);
                CreateLabel(advancedTexture1, "B", "25px", pointB);
                CreateLabel(advancedTexture2, "A", "40px", pointAZ);
                CreateLabel(advancedTexture2, "B", "40px", pointBZ);

                function CreateCylinder() {
                    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * r + 1.2, 0.05, 0.05, 16, 1, scene);
                    var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
                    cylinderMat.emissiveColor = BABYLON.Color3.Gray();
                    cylinder.material = cylinderMat;
                    cylinder.layerMask = cameralayerMask;
                }

                CreateCylinder()
                var colorA = new BABYLON.Color3(242 / 255, 198 / 255, 0);
                var colorB = new BABYLON.Color3(1, 1, 1);
                var colorC = new BABYLON.Color3(0.5, 0.5, 0.5);

                //画出可更新的圆，并设置颜色
                function createCircle(r,ang,color) {
                    var circle = BABYLON.MeshBuilder.CreateDisc("disc", {radius: r, arc: ang/360, tessellation: ang, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
                    circle.material=new BABYLON.StandardMaterial("m", scene);
                    circle.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                    circle.material.specularColor = new BABYLON.Color3(0, 0, 0);
                    circle.material.emissiveColor = color;
                    return circle;
                }

                var earth = BABYLON.Mesh.CreateSphere("sphere1", 32, 2 * r, scene);
                var blueMat = new BABYLON.StandardMaterial("blueMat", scene);
                blueMat.alpha = 0.7;
                blueMat.diffuseTexture = new BABYLON.Texture("static/image/earth8k.jpg", scene);
                blueMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
                blueMat.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
//                blueMat.emissiveColor = BABYLON.Color3.White();
                earth.material = blueMat;
                earth.rotation.x = -Math.PI;
                earth.layerMask = cameralayerMask;
                earth.setParent(pointGAB);


                var cicA=null,cicB=null,cicA1=null,cicB1=null,circleAng=null;

                var reset = function () {
                    thiz.valueA = 0;
                    thiz.valueB = -60;
                    thiz.value = 60;
                    thiz.valueS=[-60, 0];
                    thiz.switch_checkedO1 = '';
                    thiz.switch_checked = false;
                    camera.alpha = 0;
                    camera.beta = Math.PI / 2 - Math.PI/12;
                    advancedTexture2.layer.layerMask = TargetCameralayerMask;
                    advancedTexture1.layer.layerMask = cameralayerMask;
                };

                if (this.isMob) {
                    document.getElementById("clear").addEventListener("touchstart", reset);
                } else {
                    document.getElementById("clear").addEventListener("click", reset);
                }
                scene.registerBeforeRender(function () {
                    if(thiz.value!=thiz.valueO || thiz.valueA!=thiz.valueAO || thiz.valueB!=thiz.valueBO){
                        cicA!=null?cicA.dispose():'';
                        cicA!=null?cicA1.dispose():'';
                        cicB!=null?cicB.dispose():'';
                        cicB1!=null?cicB1.dispose():'';
                        circleAng!=null?circleAng.dispose():'';
                        var h1=-thiz.valueA/90*3;
                        var h2=-thiz.valueB/90*3;
                        var r1=Math.sqrt(r*r-h1*h1);
                        var r2=Math.sqrt(r*r-h2*h2);
                        var ang=thiz.value/180*Math.PI;
                        earth.rotation.y=-ang;
                        var colorA1=colorA,colorB1=colorB;
                        if(r1==r2){
                            colorA1=colorC;
                            colorB1=colorC;
                        }
                        if(thiz.value!=0){
                            if(r1!=0){
                                cicA = createCircle(r1,thiz.value,colorA1);
                                cicA.rotation.x=Math.PI/2;
                                cicA.rotation.y=-Math.PI/2;
                                cicA.layerMask=cameralayerMask;
                                cicA.position.y=h1;

                                cicA1 = createCircle(r1,thiz.value,colorA1);
                                cicA1.rotation.x=Math.PI/2;
                                cicA1.layerMask=TargetCameralayerMask;
                            }
                            if(r2!=0){
                                cicB = createCircle(r2,thiz.value,colorB1);
                                cicB.rotation.x=Math.PI/2;
                                cicB.rotation.y=-Math.PI/2;
                                cicB.layerMask=cameralayerMask;
                                cicB.position.y=h2;

                                cicB1 = createCircle(r2,thiz.value,colorB1);
                                cicB1.rotation.x=Math.PI/2;
                                cicB1.layerMask=TargetCameralayerMask;
                            }
                            if(r1>r2){
                                cicA1.position.y=0;
                                cicB1.position.y=0.01;
                            }else{
                                cicA1.position.y=0.01;
                                cicB1.position.y=0;
                            }
                        }
                        var vertices=[];
                        for(var i=0;i<=thiz.value;i++){
                            var x=0.3*Math.sin(i*Math.PI/180);
                            var z=-0.3*Math.cos(i*Math.PI/180);
                            vertices.push(new BABYLON.Vector3(x,0.1,z));
                        }
                        if(vertices.length>1){
                            circleAng = BABYLON.Mesh.CreateLines("lines", vertices, scene);
                            circleAng.rotation.y=-Math.PI/2;
                            circleAng.color=new BABYLON.Color3(0, 0, 1);
                            circleAng.layerMask=TargetCameralayerMask;
                        }
                        pointA.position.y=h1;
                        pointA.position.x=-r1*Math.sin(ang);
                        pointA.position.z=r1*Math.cos(ang);
                        pointB.position.y=h2;
                        pointB.position.x=-r2*Math.sin(ang);
                        pointB.position.z=r2*Math.cos(ang);

                        pointAZ.position.z=r1*Math.sin(ang);
                        pointAZ.position.x=r1*Math.cos(ang);
                        pointBZ.position.z=r2*Math.sin(ang);
                        pointBZ.position.x=r2*Math.cos(ang);

                        thiz.valueO=thiz.value;
                        thiz.valueAO=thiz.valueA;
                        thiz.valueBO=thiz.valueB;
                    }
                    if(thiz.switch_checked){
                        thiz.switch_checkedO1='yes';
                    }else{
                        thiz.switch_checkedO1='';
                    }
                    if(thiz.switch_checkedO1!=thiz.switch_checkedO2){
                        if(thiz.value>=360){
                            return;
                        }
                        thiz.value+=2;
                        var ang=thiz.value*Math.PI/180;
                        earth.rotation.y=-ang;
                    }
                });
                window.addEventListener("resize", () => {
                    engine.resize();
                    ResizeCamera();
                });
                return scene;
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }

    input, button {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }

    canvas {
        outline: none;
    }

    /*盒模型，padding尺寸不用再减去*/
    *,
    *:before,
    *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
    }

    html, body, #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        touch-action: none;
        -ms-touch-action: none
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently not supported by any browser */
    }

    /*内容区*/
    .container {
        width: 100%;
        height: 100%;
    }

    .container h3 {
        font-size: 24px;
        color: #fff;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
        position: absolute;
        z-index: 999;
    }

    canvas {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    #clear {
        margin: 20px 24px;
        position: absolute;
        top: 0;
        right: 0;
    }

    .btn_space {
        position: absolute;
        height: 108px;
        bottom: 20px;
        width: 100%;
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
</style>
