<template>
    <div id="app">
        <div class="control-container">
            <p>地月运动特征</p>
            <i id="clear">
                <img class="btn" src="static/image/chongzhi.png" />
            </i>
        </div>
        <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <div id='check'>
            <img id="cleard" class="checkbtn" src="static/image/cotinue.png" />
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
            var engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
            if (!BABYLON.Engine.isSupported()) {} else {
                var scene = this.loadCustomScene(this.createScene, (scene) => {}, engine);
                var renderTimes = 0;
                var renderFunction = function() {
                    var sceneChecked = null;
                    if (scene) {
                        if (scene.activeCamera) {
                            renderTimes++;
                            if (renderTimes % 4 != 0) return;
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
            var earthFragmentShader =
                `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform sampler2D daySampler;
                void main(void) {
                vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                vec4 daycolor = texture2D(daySampler, vUV).rgba;
                gl_FragColor =vec4(daycolor);}`;
            var dotFragmentShader =
                `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform vec3 color;
                void main(void) {
                gl_FragColor =vec4(color,1.);}`;
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
                vNormal = normal;}`;

            var thiz = this;
            var colorindex = 0.2;
            this.canvas = engine.getRenderingCanvas();
            engine.enableOfflineSupport = false;
            var scene = new BABYLON.Scene(engine);
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.1;

            var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 4, 20, BABYLON.Vector3.Zero(), scene);
            camera.lowerRadiusLimit = 10;
            camera.upperRadiusLimit = 30;
            scene.activeCameras.push(camera);
            scene.clearColor.set(0, 0, 0.3, 1);

            //地球node
            var earthgroup = new BABYLON.Mesh("g", scene);
            earthgroup.position = new BABYLON.Vector3(0, 0, 0);

            var earthp = new BABYLON.Mesh("p", scene);
            earthp.position = new BABYLON.Vector3(0, 0, 0);

            var earthpangle = new BABYLON.Mesh("p", scene);
            earthpangle.position = new BABYLON.Vector3(0, 0, 0);

            var earthrot = new BABYLON.Mesh("g", scene);
            earthrot.position = new BABYLON.Vector3(0, 0, 0);

            earthgroup.setParent(earthpangle);
            earthpangle.setParent(earthp);
            //画地球
            BABYLON.Effect.ShadersStore["earthVertexShader"] = customVertexShader;
            BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
            BABYLON.Effect.ShadersStore["dotFragmentShader"] = dotFragmentShader;
            var earthSampler = new BABYLON.Texture("./static/earth/earth8k.png", scene);
            var moonSampler = new BABYLON.Texture("./static/earth/yueqiu.jpg", scene);

            var earthforMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "earth", fragment: "earth", }, {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
                needAlphaBlending: true
            });
            earthforMaterial.setTexture("daySampler", earthSampler);

            var moonMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "earth", fragment: "earth", }, {
                attributes: [
                    "position", "normal", "uv"
                ],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });
            moonMaterial.setTexture("daySampler", moonSampler);

            var earth = BABYLON.Mesh.CreateSphere("earth", 32, 5, scene);
            earth.material = earthforMaterial;
            earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
            earth.setParent(earthrot);
            var earthdot = BABYLON.Mesh.CreateSphere("earth", 32, 0.1, scene);
            earthdot.setParent(earth);

            var dotMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "earth", fragment: "dot", }, {
                attributes: [
                    "position", "normal", "uv"
                ],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });
            dotMaterial.setVector3("color", new BABYLON.Vector3(1, 0, 0));
            earthdot.material = dotMaterial;
            earthrot.position = new BABYLON.Vector3(0, 0, -1);
            earthrot.setParent(earthgroup);

            var centerdot = BABYLON.Mesh.CreateSphere("earth", 32, 0.1, scene);
            centerdot.material = dotMaterial;
            centerdot.position = new BABYLON.Vector3(0, 0, 0);

            var dotmoonMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "earth", fragment: "dot", }, {
                attributes: [
                    "position", "normal", "uv"
                ],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });
            dotmoonMaterial.setVector3("color", new BABYLON.Vector3(1, 0, 0));
            var moon = BABYLON.Mesh.CreateSphere("earth", 32, 1, scene);
            moon.material = moonMaterial;
            moon.position = new BABYLON.Vector3(0, 0, 5);
            var moondot = BABYLON.Mesh.CreateSphere("earth", 32, 0.1, scene);
            moondot.material = dotmoonMaterial;
            moondot.position = new BABYLON.Vector3(0, 0, 4.5);
            moondot.setParent(earthgroup);
            moon.setParent(earthgroup);


            // var centerdot = BABYLON.Mesh.CreateSphere('centerdot',32,1,scene);

            var linecolor = new BABYLON.Color3(1, 1, 1);
            var torusMaterial = new BABYLON.StandardMaterial("torus", scene);
            torusMaterial.diffuseColor = linecolor;
            torusMaterial.emissiveColor = linecolor;

            var torus1 = BABYLON.Mesh.CreateTorus("torus1", 2, 0.02, 36, scene, false); //地轨
            torus1.material = torusMaterial;
            var torus2 = BABYLON.Mesh.CreateTorus("torus2", 10, 0.02, 72, scene, false); //月轨
            torus2.material = torusMaterial;

            //天空盒
            var tex = new BABYLON.Texture("static/sb.jpg", scene);
            var material2 = new BABYLON.StandardMaterial("kosh2", scene);
            var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
            material2.diffuseTexture = tex;
            material2.emissiveTexture = tex;
            material2.backFaceCulling = false;
            skybox.material = material2;
            skybox.rotation.x = Math.PI / 6;

            camera.attachControl(this.canvas, false);

            function reset() {
                document.getElementById("cleard").src = "static/image/cotinue.png";
                alpha = 0;
                earthgroup.rotation = new BABYLON.Vector3(0, 0, 0);
                earth.rotation.y = 0;
                rotated = false;
                camera.alpha = 0;
                camera.beta = Math.PI / 4;
                camera.radius = 20;
            }

            function check() {
                if (rotated) {
                    document.getElementById("cleard").src = "static/image/cotinue.png";
                    rotated = false;
                } else {
                    document.getElementById("cleard").src = "static/image/stop.png";
                    rotated = true;
                }
            }
            earthp.position = new BABYLON.Vector3(0, 0, 0);
            var alpha = 0;
            var rotated = false;
            scene.registerBeforeRender(function() {
                if (rotated) {
                    earthgroup.rotation = new BABYLON.Vector3(0, -alpha * Math.PI, 0);
                    earth.rotation.y = -alpha * 27 * Math.PI;
                    alpha += 0.001;
                }

            });

            if (this.isMob) {
                $("#check").on("touchstart", check);
                $('#clear').on('touchstart', reset);
            } else {
                $("#check").on("click", check);
                $('#clear').on('click', reset);
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

@media (width: 370px) and (height: 246px) {
    .three {
        margin: 0;
    }
    .control-container,
    .three .three-controller {
        display: none;
    }
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
    /* background: #fff; */
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    width: 48px;
    height: 40px;
    font-size: 14px;
    line-height: 48px;
    position: fixed;
    right: 24px;
    bottom: 28px;
    z-index: 999;
    cursor: pointer;
}

.hidden {
    display: none
}

</style>
