<template>
    <div>
        <p id="title">自然界中的水循环</p>
        <i id="clear" v-show="!narrowShow"><img class="btn" src="static/image/chongzhi.png"/></i>
        <span id="narrow" v-show="narrowShow">—</span>
        <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1"
                    style="opacity: 1;"></canvas>
        </div>
        <div id="menu" @click="menuF=!menuF;menu=menuF?'static/image/close.png':'static/image/G.png'"
             style="width:50px;height:50px;z-index:666;position:absolute;right:20px;bottom:85px;cursor: pointer;">
            <img :src="menu">
        </div>
        <div v-show="menuF" id="menuM"
             style="padding:10px;position:absolute;bottom:150px;right:15px;opacity: 0.8;background: #FFFFFF;border: 1px solid rgba(0,0,0,0.08);box-shadow: 0 0 2px 0 rgba(0,0,0,0.50);border-radius: 10px;width:120px;height:162px;">
            <div class="btnC" :class="{colorF:an1}">海陆间循环</div>
            <div class="btnC" :class="{colorF:an2}" :style="'margin:15px 0;'">海上循环</div>
            <div class="btnC" :class="{colorF:an3}">陆地内循环</div>
        </div>
        <p id="prompt">{{prompt}}</p>
        <!--<div id="fps">fps</div>-->
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
                menu: 'static/image/G.png',
                menuF: false,
                an1: false,
                an2: false,
                an3: false,
                nextNum: 0,
                narrowShow: false,
                pointClick: true,
                userAF: true,
                prompt:'全景图'
            };
        },
        methods: {
            init() {
                this.canvas = document.getElementById("renderCanvas");
                var engine = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true});
                var thiz = this;
                var userA = navigator.userAgent;
                this.userAF = userA.includes('MQQBrowser') && (userA.includes('HUAWEIM2') || userA.includes('HUAWEI M2'))
                window.addEventListener("resize", () => {
                    engine.resize();
                });
                if (!BABYLON.Engine.isSupported()) {
                } else {
                    var scene = this.loadCustomScene(this.createScene, engine);
                    // var divFps = document.getElementById("fps");
                    var renderFunction = function () {
                        // if (divFps) {
                        //     divFps.innerHTML = engine.getFps().toFixed() + " fps";
                        // }
                        if (scene) {
                            if (scene.activeCamera) {
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
                engine.resize();
            },
            // Render loop
            loadCustomScene(demoConstructor, engine) {
                document.getElementById("notSupported").className = "";
                var scene = demoConstructor(engine);
                return scene;
            },
            createScene(engine) {
                var thiz = this;
                this.canvas = engine.getRenderingCanvas();
                engine.enableOfflineSupport = false;
                var scene = new BABYLON.Scene(engine);
                var UP = 30;
                if (this.userAF) {
                    UP = 14;
                    engine.setHardwareScalingLevel(1.2);
                } else {
                    UP = 30;
                    engine.setHardwareScalingLevel(0.8);
                }

                BABYLON.Effect.ShadersStore["customVertexShader"] = VertexShader;
                BABYLON.Effect.ShadersStore["customFragmentShader"] = FragmentShader;
                BABYLON.Effect.ShadersStore["waveVertexShader"] = waterVertexShader;
                BABYLON.Effect.ShadersStore["waveFragmentShader"] = waterFragmentShader;

                var particleSystem1, particleSystem2, particleSystem3;
                var cloud1, cloud2, cloud3, cloud4;
                var arrow = [];
                var hm_js, hm_zf, ld_js, ld_zf, sq_ss, db_jl, dx_jl;

                var HemisphericLight = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(0, -1, 0), scene);
                HemisphericLight.intensity = 0.5;

                var HemisphericLight1 = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(0, 1, 0), scene);
                HemisphericLight1.intensity = 0.7;
                /*------------------相机控制---------------------*/
                var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 150, BABYLON.Vector3.Zero(), scene);
                scene.activeCamera = camera;
                camera.upperBetaLimit = Math.PI / 2;
                camera.layerMask = 0x20000000;
                //当前位置
                var targetpos;
                var camerapos;

                var setCamera=()=> {
                    camera.lowerRadiusLimit = 120;
                    camera.upperRadiusLimit = 300;
                    camera.setTarget(new BABYLON.Vector3(0, 36.7, 0));
                    camera.setPosition(new BABYLON.Vector3(-200.8, 36, 0));
                    camera.attachControl(thiz.canvas, false);
                    targetpos = new BABYLON.Vector3(0, 36.7, 0);
                    camerapos = camera.position;
                }

                setCamera();
                camera.minZ = 1.0;

                var gotonextpos = false;
                //初始位置
                // var camerastartpos = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
                //下一步位置
                var targetnextpos = new BABYLON.Vector3(0, 36.7, 0);
                var cameranextpos = new BABYLON.Vector3(-200.8, 36, 0);
                /*------------------相机控制---------------------*/
                var d1 = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(1, -1, -2), scene);
                d1.position = new BABYLON.Vector3(300, 300, 600);
                d1.intensity = 0.3;
                var shadowGenerator = new BABYLON.ShadowGenerator(512, d1);

                var shuiliujiantouTexture = new BABYLON.Texture("./static/image/uvanima.png", scene);
                var watercycleTexture = new BABYLON.Texture("./static/image/waterland.png", scene);
                var skyTexture = new BABYLON.Texture("static/image/sky.png", scene);

                var materialsky = new BABYLON.StandardMaterial("kosh2", scene);
                materialsky.diffuseTexture = skyTexture;
                materialsky.emissiveTexture = skyTexture;

                var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
                materialPlane.diffuseTexture = shuiliujiantouTexture;
                materialPlane.specularColor = new BABYLON.Color3(0, 0, 0);
                materialPlane.diffuseTexture.hasAlpha = true;
                materialPlane.diffuseTexture.uScale = 1;
                materialPlane.diffuseTexture.vScale = 1.2;
                materialPlane.backFaceCulling = false;
                materialPlane.alpha = 1;

                var materialMesh = new BABYLON.StandardMaterial("textureMesh", scene);
                materialMesh.diffuseTexture = watercycleTexture;
                materialMesh.specularColor = new BABYLON.Color3(0, 0, 0);

                var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                    vertex: "custom",
                    fragment: "custom",
                }, {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                });
                shaderMaterial.setVector3("textureSampler", new BABYLON.Vector3(0.5, 0, 0));
                shaderMaterial.setFloat("time", 0);
                shaderMaterial.backFaceCulling = false;

                var waterMaterial = new BABYLON.ShaderMaterial("watershader", scene, {
                    vertex: "wave",
                    fragment: "wave",
                }, {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
                    needAlphaBlending: true
                });
                waterMaterial.setTexture("textureSampler", watercycleTexture);
                waterMaterial.setFloat("time", 0);
                waterMaterial.setVector3("cameraPosition", new BABYLON.Vector3(0, 0, 0));
                waterMaterial.setVector3("LightPosition", new BABYLON.Vector3(0, -1, 0));
                waterMaterial.backFaceCulling = false;

                // var top;
                function RainFX(particleSystem, texturepath, minSize, maxSize, updateSpeed, num, maxEmitPower, pos) {
                    particleSystem = new BABYLON.ParticleSystem("particles", num, scene);
                    particleSystem.particleTexture = new BABYLON.Texture(texturepath, scene);
                    var top = BABYLON.Mesh.CreatePlane("snowpanel", 10, scene);
                    top.rotation.x = Math.PI / 2;
                    top.visibility = 0;
                    top.position = pos;
                    particleSystem.emitter = top;
                    particleSystem.minEmitBox = new BABYLON.Vector3(-6, -6, 0);
                    particleSystem.maxEmitBox = new BABYLON.Vector3(6, 6, 0);
                    particleSystem.color1 = new BABYLON.Color4(1, 1, 1.0, 1.0);
                    particleSystem.color2 = new BABYLON.Color4(1, 1, 1.0, 1.0);
                    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
                    particleSystem.minSize = minSize;
                    particleSystem.maxSize = maxSize;
                    particleSystem.minLifeTime = 0.5;
                    particleSystem.maxLifeTime = 4;
                    particleSystem.direction1 = new BABYLON.Vector3(0, 1, 0);
                    particleSystem.direction2 = new BABYLON.Vector3(0, 1, 0);
                    particleSystem.emitRate = 1500;
                    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
                    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
                    particleSystem.minAngularSpeed = 0;
                    particleSystem.maxAngularSpeed = Math.PI / 2;
                    particleSystem.minEmitPower = 0.1;
                    particleSystem.maxEmitPower = maxEmitPower;
                    particleSystem.updateSpeed = updateSpeed;

                    function my_startDirectionFunction(emitPower, worldMatrix, directionToUpdate, particle) {
                        var randX = randomNumber(this.direction1.x, this.direction2.x);
                        var randY = randomNumber(this.direction1.y, this.direction2.y);
                        var randZ = randomNumber(this.direction1.z, this.direction2.z);
                        BABYLON.Vector3.TransformNormalFromFloatsToRef(randX * emitPower, randY * emitPower, randZ * emitPower, worldMatrix, directionToUpdate);
                    }

                    function my_startPositionFunction(worldMatrix, positionToUpdate, particle) {
                        var randX = randomNumber(this.minEmitBox.x, this.maxEmitBox.x);
                        var randY = randomNumber(this.minEmitBox.y, this.maxEmitBox.y);
                        var randZ = randomNumber(this.minEmitBox.z, this.maxEmitBox.z);
                        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
                    }

                    function my_updateFunction(particles) {
                        for (let index = 0; index < particles.length; index++) {
                            var particle = particles[index];
                            particle.age += this._scaledUpdateSpeed;
                            if (particle.age >= particle.lifeTime) {
                                this.recycleParticle(particle);
                                index--;
                                continue;
                            } else {
                                particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep);
                                particle.color.addInPlace(this._scaledColorStep);
                                if (particle.color.a < 0) particle.color.a = 0;
                                particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                                particle.position.addInPlace(this._scaledDirection);
                                this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
                                particle.direction.addInPlace(this._scaledGravity);
                            }
                        }
                    }
                    var randomNumber = function (min, max) {
                        if (min === max) {
                            return min;
                        }
                        var random = Math.random();
                        return random * (max - min) + min;
                    };

                    particleSystem.startDirectionFunction = my_startDirectionFunction;
                    particleSystem.startPositionFunction = my_startPositionFunction;
                    particleSystem.updateFunction = my_updateFunction;
                    particleSystem.start();
                    return particleSystem;
                }

                //箭头动画
                function ArrowAnimation(mesh, moveY1, scene) {
                    var animationPos = new BABYLON.Animation("animation", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                    var keys = [{frame: 0, value: moveY1}, {frame: 100, value: 20}];
                    animationPos.setKeys(keys);
                    mesh.animations.push(animationPos);
                    scene.beginAnimation(mesh, 0, 100, true);
                }

                var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
                advancedTexture.layer.layerMask = 0x20000000;

                function createLabel(mesh) {
                    var label = new BABYLON.GUI.Rectangle("label for " + mesh.name);
                    label.background = "black"
                    label.height = "25px";
                    label.alpha = 0.5;
                    label.width = "80px";
                    label.cornerRadius = 20;
                    label.thickness = 0.1;
                    label.linkOffsetY = UP;
                    advancedTexture.addControl(label);
                    label.linkWithMesh(mesh);
                    var text1 = new BABYLON.GUI.TextBlock();
                    text1.text = mesh.name;
                    text1.color = "white";
                    text1.fontSize = "16";
                    label.addControl(text1);
                }

                var sphere = BABYLON.Mesh.CreateSphere("海面蒸发", 16, 2, scene);
                sphere.position = new BABYLON.Vector3(20, 57, -70);
                var sphere2 = sphere.clone("水汽输送");
                sphere2.position = new BABYLON.Vector3(20, 67, -40);
                var sphere3 = sphere.clone("径流");
                sphere3.position = new BABYLON.Vector3(-70, 5, 30);
                var sphere4 = sphere.clone("下渗");
                sphere4.position = new BABYLON.Vector3(-93, -4, -5);
                createLabel(sphere);
                createLabel(sphere2);
                createLabel(sphere3);
                createLabel(sphere4);

                var jinliu, shenliu;
                //模型导入
                BABYLON.SceneLoader.ImportMesh("", "", "data:" + strData1, scene,
                    function (newMeshes) {
                        for (let i = 0; i < newMeshes.length; i++) {
                            newMeshes[i].isVisible = true;
                            newMeshes[i].layerMask = 0x20000000;
                            newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
                            newMeshes[i].material = materialMesh;
                            newMeshes[i].convertToFlatShadedMesh();
                            shadowGenerator.getShadowMap().renderList.push(newMeshes[i]);
                            if (!newMeshes[i].rotationQuaternion) {
                                if (newMeshes[i].name == "jinliu") {
                                    jinliu = newMeshes[i];
                                    jinliu.material = materialPlane;
                                    jinliu.visibility = false;
                                } else if (newMeshes[i].name == "shenliu") {
                                    shenliu = newMeshes[i];
                                    shenliu.material = materialPlane;
                                    shenliu.visibility = false;
                                } else if (newMeshes[i].name == "haimian1") {
                                    newMeshes[i].material = waterMaterial;
                                } else if (newMeshes[i].name == "yunkeyidong1") {
                                    cloud1 = newMeshes[i];
                                    cloud1.position = new BABYLON.Vector3(20, 40, -70);
                                } else if (newMeshes[i].name == "yunkeyidong2") {
                                    cloud2 = newMeshes[i];
                                    cloud2.position = new BABYLON.Vector3(20, 50, -40);
                                    sphere2.setParent(cloud2);
                                } else if (newMeshes[i].name == "yunkeyidong3") {
                                    cloud3 = newMeshes[i];
                                    cloud3.position = new BABYLON.Vector3(20, 50, 10);
                                    cloud3.visibility = false;
                                } else if (newMeshes[i].name.indexOf("box") > -1) {
                                    newMeshes[i].visibility = false;
                                }
                            }
                        }
                    }
                );

                var jiantoumaterialMesh = new BABYLON.StandardMaterial("textureMesh", scene);
                jiantoumaterialMesh.diffuseTexture = watercycleTexture;
                jiantoumaterialMesh.specularColor = new BABYLON.Color3(0, 0, 0);

                var setarrowfalse=()=> {
                    for (let i = 0; i < 3; i++) {
                        arrow[i].visibility = false;
                    }
                }

                var arrowNum=["arrowwave","arrowone","arrowtwo","arrowthree",'arrowfour',"arrowfive","arrowsix","arrowseven","sky"];
                BABYLON.SceneLoader.ImportMesh("", "", "data:" + strData2, scene, function (newMeshes) {
                    var NUM=0;
                    for (let i = 0; i < newMeshes.length; i++) {
                        newMeshes[i].isVisible = true;
                        newMeshes[i].layerMask = 0x20000000;
                        if (!newMeshes[i].rotationQuaternion) {
                            newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
                            newMeshes[i].material = jiantoumaterialMesh;
                            NUM=arrowNum.indexOf(newMeshes[i].name);
                            switch (NUM){
                                case 0:
                                    newMeshes[i].material = shaderMaterial;
                                    newMeshes[i].rotation = new BABYLON.Vector3(-Math.PI / 2, Math.PI / 2, 0);
                                    newMeshes[i].material.diffuseColor = new BABYLON.Color3(1, 0, 0);
                                    newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
                                    arrow[0] = newMeshes[i].clone();
                                    arrow[0].position = new BABYLON.Vector3(20, 0, -70);
                                    arrow[1] = newMeshes[i].clone();
                                    arrow[1].position = new BABYLON.Vector3(-70, 5, 35);
                                    arrow[2] = newMeshes[i].clone();
                                    arrow[2].position = new BABYLON.Vector3(20, 5, 20);
                                    setarrowfalse();
                                    newMeshes[i].dispose();
                                    break;
                                case 1:
                                    dx_jl = newMeshes[i];
                                    dx_jl.visibility = false;
                                    break;
                                case 2:
                                    db_jl = newMeshes[i];
                                    db_jl.visibility = false;
                                    break;
                                case 3:
                                    sq_ss = newMeshes[i];
                                    sq_ss.visibility = false;
                                    break;
                                case 4:
                                    ld_js = newMeshes[i];
                                    ld_js.visibility = false;
                                    break;
                                case 5:
                                    hm_zf = newMeshes[i];
                                    hm_zf.visibility = false;
                                    break;
                                case 6:
                                    hm_js = newMeshes[i];
                                    hm_js.visibility = false;
                                    break;
                                case 7:
                                    ld_zf = newMeshes[i];
                                    ld_zf.visibility = false;
                                    break;
                                case 8:
                                    newMeshes[i].material = materialsky;
                                    break;
                            }
                        }
                    }
                });


                ArrowAnimation(arrow[0], 0, scene);
                ArrowAnimation(arrow[1], 5, scene);
                ArrowAnimation(arrow[2], 5, scene);

                var alpha = 0;
                var beta = 0;
                var num = 0.3;
                var israin = false;
                var cloud2_move = false;
                var cloud3_move = false;
                var cloud3_canmove = true;
                var cloud2_canmove = true;
                var attachControl = true;
                particleSystem1 = RainFX(particleSystem1, "./static/image/RainStreak.png", 0.8, 1.8, 0.02, 500, 0.2, cloud1.position);
                particleSystem2 = RainFX(particleSystem2, "./static/image/RainStreak.png", 0.8, 1.8, 0.02, 500, 0.2, new BABYLON.Vector3(cloud1.position.x, cloud1.position.y + 6, 10));
                particleSystem3 = RainFX(particleSystem3, "./static/image/Snowflake8.png", 0.1, .8, 0.005, 500, 0.1, new BABYLON.Vector3(cloud1.position.x, cloud1.position.y + 30, 70));
                particleSystem1.layerMask = 0x80000000;
                particleSystem2.layerMask = 0x80000000;
                particleSystem3.layerMask = 0x80000000;
                var smooth = 0.05;

                //大箭头动画
                var BigArrowAnimation=(mesh, scene)=> {
                    mesh.visibility = true;
                    var animationAlpha = new BABYLON.Animation("animation", "material.alpha", 30,
                        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                    var keys = [{frame: 0, value: 0}, {frame: 20, value: 1}];
                    animationAlpha.setKeys(keys);
                    mesh.animations.push(animationAlpha);
                    scene.beginAnimation(mesh, 0, 20, false);
                }

                var narrow=()=> {
                    nextCamera(5);
                }

                var SET1=null, SET2=null, SET3=null;
                var choose =function(){
                    var index = $(this).index();
                    if (index == 0) {
                        thiz.an1 = !thiz.an1;
                        if (thiz.an1) {
                            BigArrowAnimation(hm_zf, scene);
                            SET1 = setTimeout(() => {
                                BigArrowAnimation(sq_ss, scene);
                                clearTimeout(SET1);
                                SET1=null;
                                SET1 = setTimeout(() => {
                                    BigArrowAnimation(ld_js, scene);
                                    clearTimeout(SET1);
                                    SET1=null;
                                    SET1 = setTimeout(() => {
                                        BigArrowAnimation(db_jl, scene);
                                        clearTimeout(SET1);
                                        SET1=null;
                                        SET1 = setTimeout(() => {
                                            BigArrowAnimation(dx_jl, scene);
                                            clearTimeout(SET1);
                                            SET1=null;
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        } else {
                            clearTimeout(SET1);
                            SET1=null;
                            if (thiz.an2 == false) {
                                hm_zf.visibility = false;
                            }
                            sq_ss.visibility = false;
                            if (thiz.an3 == false) {
                                ld_js.visibility = false;
                            }
                            db_jl.visibility = false;
                            dx_jl.visibility = false;
                        }
                    } else if (index == 1) {
                        thiz.an2 = !thiz.an2;
                        if (thiz.an2) {
                            BigArrowAnimation(hm_zf, scene);
                            SET2 = setTimeout(() => {
                                BigArrowAnimation(hm_js, scene);
                                clearTimeout(SET2);
                                SET2=null;
                            }, 1000);
                        } else {
                            clearTimeout(SET2);
                            SET2=null;
                            if (this.an1 == false) {
                                hm_zf.visibility = false;
                            }
                            hm_js.visibility = false;
                        }
                    } else if (index == 2) {
                        thiz.an3 = !thiz.an3;
                        if (thiz.an3) {
                            BigArrowAnimation(ld_zf, scene);
                            SET3 = setTimeout(() => {
                                BigArrowAnimation(ld_js, scene);
                                clearTimeout(SET3);
                                SET3=null;
                            }, 1000);
                        } else {
                            clearTimeout(SET3);
                            SET3=null;
                            ld_zf.visibility = false;
                            if (thiz.an1 == false) {
                                ld_js.visibility = false;
                            }
                        }
                    }
                }

                var gotolowerRadiusLimit;
                var gotoupperRadiusLimit;
                var boolcameraRadiusLimit = false;

                var pointMove=(procameranextpos, protargetnextpos, lowerRadiusLimit, upperRadiusLimit)=> {
                    camera.detachControl(this.canvas);
                    camerapos = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
                    targetnextpos = protargetnextpos;
                    cameranextpos = procameranextpos;
                    gotolowerRadiusLimit = lowerRadiusLimit;
                    gotoupperRadiusLimit = upperRadiusLimit;
                    gotonextpos = true;
                    boolcameraRadiusLimit = true;
                }

                var nextCamera = (nextNum) => {
                    if (gotonextpos) {
                        return;
                    }
                    switch (nextNum) {
                        case 1://海上
                            attachControl = true;
                            arrow[0].visibility = true;
                            particleSystem1.layerMask = 0x20000000;
                            this.prompt='海面蒸发(降水)';
                            this.pointClick = false;
                            pointMove(new BABYLON.Vector3(-50, 36, -60), new BABYLON.Vector3(20, 15, -70), 50, 75);
                            break;
                        case 2://陆上
                            attachControl = true;
                            cloud2_move = true;
                            this.prompt='水汽输送';
                            break;
                        case 3://径流
                            cloud2_move = true;

                            cloud3_move = true;
                            attachControl = false;
                            arrow[1].visibility = true;
                            arrow[2].visibility = true;
                            jinliu.visibility = true;
                            this.prompt='径流';
                            break;
                        case 4://渗流
                            attachControl = false;
                            this.pointClick = false;
                            shenliu.visibility = true;
                            this.prompt='下渗';
                            pointMove(new BABYLON.Vector3(-150, 0, 0), new BABYLON.Vector3(-60, -10, 0), 30, 150);
                            break;
                        case 5:
                            this.pointClick = true;
                            attachControl = true;
                            this.prompt='全景图';
                            pointMove(new BABYLON.Vector3(-200.8, 36, 0), new BABYLON.Vector3(0, 36.7, 0), 120, 300);
                            break;
                        default:
                            break;
                    }
                }

                scene.registerBeforeRender(() => {
                    shaderMaterial.setFloat("time", alpha * 50);
                    waterMaterial.setFloat("time", alpha * 50);
                    waterMaterial.setVector3("cameraPosition", scene.activeCamera.position);
                    waterMaterial.setVector3("LightPosition", new BABYLON.Vector3(0, -1, 0));
                    materialPlane.diffuseTexture.vOffset -= 0.01;
                    alpha += 0.002;

                    /*------------------相机控制---------------------*/
                    if (gotonextpos) {
                        beta++;
                        if (beta % 2 == 0) {
                            targetpos = BABYLON.Vector3.Lerp(targetpos, targetnextpos, smooth);
                            camerapos = BABYLON.Vector3.Lerp(camerapos, cameranextpos, smooth);
                            camera.setTarget(targetpos);
                            camera.setPosition(camerapos);
                            beta = 0;
                        }
                        if (BABYLON.Vector3.Distance(targetpos, targetnextpos) < 0.5 && BABYLON.Vector3.Distance(camerapos, cameranextpos) < 0.5) {
                            gotonextpos = false;
                            if (!this.pointClick) {
                                this.narrowShow = true;
                            } else {
                                this.narrowShow = false;
                            }
                            if (attachControl) {
                                camera.attachControl(thiz.canvas, false);
                            }
                        }
                    }
                    if (boolcameraRadiusLimit) {
                        if (camera.lowerRadiusLimit > gotolowerRadiusLimit) {
                            camera.lowerRadiusLimit -= 1;
                        } else {
                            camera.lowerRadiusLimit += 1;
                        }
                        if (camera.upperRadiusLimit > gotoupperRadiusLimit) {
                            camera.upperRadiusLimit -= 1;
                        } else {
                            camera.upperRadiusLimit += 1;
                        }
                        if (Math.abs(camera.lowerRadiusLimit - gotolowerRadiusLimit) <= 1.0 &&
                            Math.abs(camera.upperRadiusLimit - gotoupperRadiusLimit) <= 1.0) {
                            boolcameraRadiusLimit = false;
                        }
                    }

                    /*------------------相机控制---------------------*/
                    //位置移动
                    if (cloud2_move && cloud2_canmove) {
                        cloud2.position.z += num;
                        if (cloud2.position.z >= 10) {

                            num = 0;
                            var SET=setTimeout(() => {
                                clearTimeout(SET);
                                israin = true;
                                materialPlane.alpha = 1;
                            }, 1000);
                            cloud2_move = false;
                            cloud2_canmove = false;
                            cloud2.position.z = 10;
                        }
                    }
                    if (cloud3_move && cloud3_canmove && cloud2.position.z == 10) {
                        num = 0.3;
                        cloud3.visibility = true;
                        cloud3.position.z += num;
                        cloud3.position.y += num / 2.6;
                        if (cloud3.position.z >= 70) {
                            num = 0;
                            particleSystem2.layerMask = 0x20000000;
                            particleSystem3.layerMask = 0x20000000;
                            cloud3_move = false;
                            cloud3_canmove = false;
                        }
                    }

                });

                var resetW = () => {
                    clearTimeout(SET1,SET2,SET3);
                    boolcameraRadiusLimit = false;
                    this.prompt='全景图';
                    this.narrowShow = false;
                    this.pointClick = true;
                    this.an1 = false;
                    this.an2 = false;
                    this.an3 = false;
                    this.menu = 'static/image/G.png';
                    this.menuF = false;
                    this.nextNum = 0;
                    this.nextF = true;
                    if (particleSystem3 != null) {
                        particleSystem3.layerMask = 0x80000000;
                    }
                    if (particleSystem2 != null) {
                        particleSystem2.layerMask = 0x80000000;
                    }
                    if (particleSystem1 != null) {
                        particleSystem1.layerMask = 0x80000000;
                    }
                    alpha = 0;
                    num = 1;

                    hm_zf.visibility = false;
                    hm_js.visibility = false;
                    sq_ss.visibility = false;
                    ld_zf.visibility = false;
                    ld_js.visibility = false;
                    db_jl.visibility = false;
                    dx_jl.visibility = false;

                    israin = false;
                    cloud2.position = new BABYLON.Vector3(20, 50, -40);
                    cloud3_canmove = true;
                    cloud2_canmove = true;
                    cloud2_move = false;
                    cloud3_move = false;
                    gotonextpos = false;

                    cloud3.position = new BABYLON.Vector3(20, 50, 10);
                    cloud3.visibility = false;

                    setarrowfalse();
                    jinliu.visibility = false;
                    shenliu.visibility = false;
                    setCamera();
                };
                // Events
                var show = true;
                var onPointerDown = (evt) => {
                    if(!evt.pointerId){
                        return;
                    }
                    var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
                    if (pickInfo.hit) {
                        var currentMesh = pickInfo.pickedMesh;
                        if (this.pointClick) {
                            if (currentMesh.name == "yunkeyidong1") {
                                nextCamera(1);
                            } else if (currentMesh.name == "yunkeyidong2") {
                                nextCamera(2);
                            } else if (currentMesh.name == "box3") {
                                nextCamera(3);
                            } else if (currentMesh.name == "box4") {
                                nextCamera(4);
                            }
                        }
                    }
                };

                this.canvas.addEventListener("pointerdown", onPointerDown, false);
                scene.onDispose = () =>{
                    this.canvas.removeEventListener("pointerdown", onPointerDown);
                };
                if (this.isMob) {
                    $('.btnC').on('touchstart', choose);
                    $('#narrow').on('touchstart', narrow);
                    $('.btn').on('touchstart', resetW);
                } else {
                    $('.btnC').on('click', choose);
                    $('#narrow').on('click', narrow);
                    $('.btn').on('click', resetW);
                }
                return scene;
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style>
    html, body, h1, h2, h3,
    h4, h5, h6, hr, p, iframe, dl, dt, dd, ul,
    ol, li, pre, form, button,
    input, textarea, th, td, fieldset {
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

    body, html {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
        position: fixed;
        font-family: "Segoe WP", "Segoe UI", Verdana, Arial;
        touch-action: none;
        -ms-touch-action: none;
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

    #title {
        position: absolute;
        left: 24px;
        top: 24px;
        color: #aae7e9;
        font-size: 24px;
        z-index: 666;
    }

    .btn {
        position: absolute;
        width: 48px;
        height: 40px;
        right: 20px;
        top: 18px;
        z-index: 666;
        cursor: pointer;
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

    #menuM > div {
        width: 120px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #000;
        font-size: 16px;
        cursor: pointer;
    }

    #menuM > div.colorF {
        color: #4A90E2;
    }

    #notSupported {
        color: #232f32;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: #ffffff;
        text-align: center;
        padding-top: 0;
        font-size: 30px;
        z-index: 999;
        cursor: default;
    }

    #renderCanvas {
        width: 100%;
        height: 100%;
        outline: 0;
        touch-action: none;
    }

    #fps {
        position: absolute;
        right: 20px;
        top: 5em;
        font-size: 20px;
        color: #6cf;
    }

    .hidden {
        display: none;
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

    #narrow {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 18px;
        right: 20px;
        text-align: center;
        line-height: 36px;
        font-size: 20px;
        /* box-shadow:0px 3px 5px #333333; */
        border-radius: 50%;
        z-index: 999;
        background-color: #ffffff;
    }

    #prompt {
        width: 160px;
        height: 40px;
        position: absolute;
        bottom: 20px;
        right: 20px;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        border-radius: 6px;
        /* box-shadow:0px 3px 5px #333333; */
        z-index: 999;
        background-color: #ffffff;
    }
</style>
