<template>
    <div id="app">
        <div class="control-container">
            <p>等压面</p>
            <i id="clear"><img class="btn" src="static/image/chongzhi.png" /></i>
        </div>
         <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <div id='addC'>
            <div class="addB">等压面</div>
        </div>
        <div id="notSupported" class="hidden">loading...</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMob: /iPad|Android/g.test(navigator.userAgent),
        };
    },
    methods: {
        init() {
            // Launch render loop
            var canvas = document.getElementById("renderCanvas");
            var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
            var thiz = this;
            window.addEventListener("resize", () => {
                $('.renderCanvas-container').height($(window).height());
                engine.resize();
            });

            if (!BABYLON.Engine.isSupported()) {
                //TODO显示webgl不支持信息
            } else {
                var scene = this.loadCustomScene(this.createScene, engine);
                var renderTimes=0;
                var renderFunction = function() {
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
        loadCustomScene(demoConstructor, engine) {
            document.getElementById("notSupported").className = "";
            var scene = demoConstructor(engine);
            return scene;
        },
        createScene(engine) {
            console.log("Create By APEN");
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
                    vNormal = normal;
                }`;
            var customFragmentShader = `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform vec4 color;
                uniform vec3 pos;
                uniform sampler2D Sampler; 
                void main(void) {
                    vec4 texturecolor = texture2D(Sampler, vUV).rgba; 
                vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                if (vPositionW.y>pos.x-pos.y&&vPositionW.y<pos.x+pos.y) {
                    texturecolor=color;
                }
                gl_FragColor = vec4(texturecolor);}`;
                var colorFragmentShader = `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform vec4 color;
                void main(void) {
                gl_FragColor = vec4(color);}`;

            var canvas = engine.getRenderingCanvas();
            engine.enableOfflineSupport = false;
            engine.setHardwareScalingLevel(0.5);
            var scene = new BABYLON.Scene(engine);
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 1;
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), scene);
            light.intensity = 1;
            var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 130,  new BABYLON.Vector3(0, 25, 0), scene);
            camera.attachControl(canvas, false);
            camera.lowerRadiusLimit = 130;
            camera.upperRadiusLimit = 130;
            camera.upperBetaLimit =Math.PI/2;//600
            camera.minZ = 1.0;
            scene.activeCamera = camera;
            scene.clearColor = new BABYLON.Color3(0.95,0.95,0.95);
            var skyTexture = new BABYLON.Texture("static/image/sky.png", scene);

            var materialsky = new BABYLON.StandardMaterial("kosh2", scene);
            materialsky.diffuseTexture = skyTexture;
            materialsky.emissiveTexture = skyTexture;
            materialsky.backFaceCulling = false;
            var sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 2000, scene);
            sphere. material=materialsky;

            BABYLON.Effect.ShadersStore["customVertexShader"] = customVertexShader;
            BABYLON.Effect.ShadersStore["customFragmentShader"] = customFragmentShader;
            BABYLON.Effect.ShadersStore["colorFragmentShader"] = colorFragmentShader;

            var SaturnplanSampler = new BABYLON.Texture("static/image/view.png", scene);
            var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "custom", fragment: "custom", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
            shaderMaterial.setVector4("color", new BABYLON.Vector4(1, 0,0,1));
            shaderMaterial.setVector3("pos", new BABYLON.Vector3(1,0.01, 0));
            shaderMaterial.setTexture("Sampler", SaturnplanSampler);
            shaderMaterial.backFaceCulling = false;

               var zeroplanSampler = new BABYLON.Texture("static/image/view2.png", scene);
            var zeroshaderMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "custom", fragment: "custom", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
            zeroshaderMaterial.setVector4("color", new BABYLON.Vector4(0, 1,1,1));
            zeroshaderMaterial.setVector3("pos", new BABYLON.Vector3(0,0.01, 0));
            zeroshaderMaterial.setTexture("Sampler", zeroplanSampler);
            zeroshaderMaterial.backFaceCulling = false;

            var colorMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "custom", fragment: "color", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
            colorMaterial.setVector4("color", new BABYLON.Vector4(0.9,0.9,0.8,1));
            colorMaterial.backFaceCulling = false;

            var planMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "custom", fragment: "color", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
            planMaterial.setVector4("color", new BABYLON.Vector4(1,0.5,0,0.25));
            planMaterial.backFaceCulling = false;

            var dot, ground,plan,dimian,nurbsToPoly1,nurbsToPoly2,nurbsToPoly3,nurbsToPoly4,nurbsToPolyone,nurbsToPolytwo,nurbsToPolythree,nurbsToPolyfour,arr,number,ctrl;
            var group=new BABYLON.Mesh("p",scene);
            BABYLON.SceneLoader.ImportMesh("", "", "data:" + strData, scene, 
                function (newMeshes, particleSystems, skeletons) {
                    for (var i = 0; i < newMeshes.length; i++) {
                    newMeshes[i].isVisible = true;
                    newMeshes[i].scaling=new BABYLON.Vector3(1,1,1);
                        if (!newMeshes[i].rotationQuaternion) {
                            if(newMeshes[i].name=='dimian'){
                                dimian=newMeshes[i];
                                dimian.material=planMaterial;
                            }else if(newMeshes[i].name=='arr'){
                                arr=newMeshes[i];
                                arr.material=colorMaterial;
                            }else if(newMeshes[i].name=='ctrl'){
                                ctrl=newMeshes[i];
                                ctrl.material=colorMaterial;
                            }else if(newMeshes[i].name=='number'){
                                number=newMeshes[i];
                                number.material=colorMaterial;
                            }else if(newMeshes[i].name=='nurbsToPoly1'){
                                nurbsToPoly1=newMeshes[i];
                                nurbsToPoly1.material=shaderMaterial;
                                  nurbsToPolyone=newMeshes[i].clone();
                                nurbsToPolyone.material=zeroshaderMaterial;
                            }else if(newMeshes[i].name=='nurbsToPoly2'){
                                nurbsToPoly2=newMeshes[i];
                                nurbsToPoly2.material=shaderMaterial;
                                  nurbsToPolytwo=newMeshes[i].clone();
                                nurbsToPolytwo.material=zeroshaderMaterial;
                            }else if(newMeshes[i].name=='nurbsToPoly3'){
                                nurbsToPoly3=newMeshes[i];
                                nurbsToPoly3.material=shaderMaterial;
                                  nurbsToPolythree=newMeshes[i].clone();
                                nurbsToPolythree.material=zeroshaderMaterial;
                            }else if(newMeshes[i].name=='nurbsToPoly4'){
                                nurbsToPoly4=newMeshes[i];
                                nurbsToPoly4.material=shaderMaterial;
                                nurbsToPolyfour=newMeshes[i].clone();
                                nurbsToPolyfour.material=zeroshaderMaterial;
                            }
                            else if(newMeshes[i].name=='controller'){
                                dot=newMeshes[i];
                                dot.isVisible = false;
                            }else if(newMeshes[i].name=='ground'){
                                ground=newMeshes[i];
                                ground.isVisible = false;
                            }else if(newMeshes[i].name=='plan'){
                                plan=newMeshes[i];
                                plan.material=planMaterial;
                            }
                        }
                    }
                }
            );
            nurbsToPolyone.setParent(group);
            nurbsToPolytwo.setParent(group);
            nurbsToPolythree.setParent(group);
            nurbsToPolyfour.setParent(group);
            //动画
            function Animation(mesh,valuestart,valueend, scene,onAnimationEnd) {
                var animation = new BABYLON.Animation("animation", "position.y", 30,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                animation.setKeys([{frame: 0, value: valuestart},{frame: 20, value: valueend}]);
                mesh.animations.push(animation);
                scene.beginAnimation(mesh, 0, 20, false,1.0,onAnimationEnd);
            }

            ctrl.setParent(dot);
            
            function onValueChange(value) {
                plan.position.y=value;
                group.position.y=-value;
                shaderMaterial.setVector3("pos", new BABYLON.Vector3(value,0.02, 0));
            }

            // Events
            var minvalue =18.5;
            var maxvalue =42.5;
            var startingPoint;
            var currentMesh;
            var hasCurrentMesh = false;
            var getGroundPosition = function() {
                var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh) {return mesh == ground; });
                if (pickinfo.hit) { return pickinfo.pickedPoint; }
                return null;
            }
            var onPointerDown = function(evt) {
                if (showfuntrue){return; }
                if (evt.button !== 0) { return; }
                var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh) { return mesh !== ground; });
                if (pickInfo.hit) {
                    if (hasCurrentMesh == false) {
                        currentMesh = pickInfo.pickedMesh;
                    }
                    if (currentMesh.name == "controller") {
                        hasCurrentMesh = true;
                        startingPoint = getGroundPosition(evt);
                        if (startingPoint) {
                            camera.detachControl(canvas);
                        }
                    }
                }
            }
            var onPointerUp = function() {
                if (startingPoint) {
                    camera.attachControl(canvas, true);
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
                        camera.attachControl(canvas, true);
                        startingPoint = null;
                        hasCurrentMesh = false;
                        return;
                    }
                    return;
                }
                var sliderang;
                if (startingPoint.y <= maxvalue && startingPoint.y >= minvalue) {
                    currentMesh.position.y = startingPoint.y;
                } else if (startingPoint.y > maxvalue) {
                    currentMesh.position.y = maxvalue;
                } else if (startingPoint.y < minvalue) {
                    currentMesh.position.y = minvalue;
                }
                var slidervalue = currentMesh.position.y;
                onValueChange(slidervalue);
                startingPoint = current;
            }

            canvas.addEventListener("pointerdown", onPointerDown, false);
            canvas.addEventListener("pointerup", onPointerUp, false);
            canvas.addEventListener("pointermove", onPointerMove, false);

            scene.onDispose = function() {
                canvas.removeEventListener("pointerdown", onPointerDown);
                canvas.removeEventListener("pointerup", onPointerUp);
                canvas.removeEventListener("pointermove", onPointerMove);
            }

            var reset = function() {
                resetfun();
            };
            function resetfun(){
                dot.position=new BABYLON.Vector3(25,0,-50);
                onValueChange(0);
                showfuntrue = true;
                arr.isVisible=false;
                number.isVisible=false;
                dimian.isVisible=false;
                plan.isVisible=false;
                ctrl.isVisible=false;
                nurbsToPoly1.position.y=10;
                nurbsToPoly2.position.y=4;
                nurbsToPoly3.position.y=-4;
                nurbsToPoly4.position.y=-10;
                $('.addB').css({ color: "#000", background: "#fff" });
                $('.addB').html("等压面");
            }

            var showfuntrue = false;
            var showfun = function() {
                 $('.addB').hide();
                if (showfuntrue) {
                    Animation(nurbsToPoly1,10,0, scene,() => {});
                    Animation(nurbsToPoly2,4,0, scene,() => {});
                    Animation(nurbsToPoly3,-4,0, scene,() => {});
                    Animation(nurbsToPoly4,-10,0, scene,() => {denggaoxian();});
                } else {
                    dot.position=new BABYLON.Vector3(25,0,-50);
                    onValueChange(0);
                    arr.isVisible=false;
                    number.isVisible=false;
                    dimian.isVisible=false;
                    plan.isVisible=false;
                    ctrl.isVisible=false;
                    Animation(nurbsToPoly1,0,10, scene,() => {});
                    Animation(nurbsToPoly2,0,4, scene,() => {});
                    Animation(nurbsToPoly3,0,-4, scene,() => {});
                    Animation(nurbsToPoly4,0,-10, scene,() => {dengyamian();});
                }
            };
            function dengyamian(){
                showfuntrue = true;
                $('.addB').show();
                $('.addB').css({ color: "#000", background: "#fff" });
                $('.addB').html("等压面");
            }

            function denggaoxian(){
                showfuntrue = false;
                 $('.addB').show();
                $('.addB').css({ 'background': '#5CAEFD', color: "#fff" });
                $('.addB').html("等高线");
                dot.position.y=minvalue;
                onValueChange(minvalue);
                arr.isVisible=true;
                number.isVisible=true;
                dimian.isVisible=true;
                plan.isVisible=true;
                ctrl.isVisible=true;
            }
      
            resetfun();
            if (this.isMob) {
                $('#clear').on('touchstart', reset);
                $('.addB').on('touchstart', showfun);
            } else {
                $('#clear').on('click', reset);
                $('.addB').on('click', showfun);
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

    #addC {
        width: 240px;
        height: 44px;
        position: absolute;
        right: 20px;
        bottom: 20px;
        cursor: pointer;
    }

    .addB {
        background: #fff;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        width: 100%;
        height: 44px;
        font-size: 14px;
        line-height: 44px;
        position: relative;
    }

    .addB {
        color: #000;
        background: #fff;
        font-size: 16px;
        text-align: center;
    }
</style>